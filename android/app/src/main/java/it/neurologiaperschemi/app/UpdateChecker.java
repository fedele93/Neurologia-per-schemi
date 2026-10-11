package it.neurologiaperschemi.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Controlla su GitHub se esiste una release dell'app piu' recente di quella
 * installata e, in caso, mostra una finestra con il pulsante per scaricarla.
 *
 * Come funziona:
 *  - interroga l'API pubblica di GitHub (nessun login necessario):
 *    GET https://api.github.com/repos/fedele93/Neurologia-per-schemi/releases/latest
 *    La risposta contiene il tag della release (es. "v0.1.4"), le note e gli
 *    allegati, tra cui l'APK.
 *  - dal tag ricava lo stesso versionCode che calcola android/version-from-tag.sh
 *    (MAJOR*10000 + MINOR*100 + PATCH) e lo confronta con BuildConfig.VERSION_CODE
 *    dell'app in esecuzione: se e' maggiore, c'e' un aggiornamento.
 *  - il controllo avviene in un thread in background, al massimo una volta
 *    ogni 24 ore (timestamp in SharedPreferences). Senza rete, o se l'API
 *    risponde male, non succede nulla: nessun messaggio all'utente.
 *  - "Scarica" apre l'URL dell'APK con un Intent ACTION_VIEW: il browser lo
 *    scarica e Android propone l'installazione (funziona come aggiornamento
 *    perche' il workflow firma sempre con la stessa chiave).
 *  - "Ignora questa versione" salva il tag: quella release non viene piu'
 *    proposta, la successiva si'.
 */
final class UpdateChecker {

    private static final String TAG = "UpdateChecker";

    static final String RELEASES_API =
            "https://api.github.com/repos/fedele93/Neurologia-per-schemi/releases/latest";
    static final String RELEASES_PAGE =
            "https://github.com/fedele93/Neurologia-per-schemi/releases";

    private static final String PREFS = "update_check";
    private static final String KEY_LAST_CHECK = "last_check_ms";
    private static final String KEY_IGNORED_TAG = "ignored_tag";

    /** Intervallo minimo tra due controlli. */
    private static final long MIN_INTERVAL_MS = 24L * 60 * 60 * 1000;

    private static final int TIMEOUT_MS = 10_000;

    /** Lunghezza massima delle note di release mostrate nella finestra. */
    private static final int MAX_NOTES_CHARS = 1500;

    /** Stessa regola di version-from-tag.sh: vMAJOR.MINOR[.PATCH][-suffisso]. */
    private static final Pattern TAG_PATTERN =
            Pattern.compile("^v(\\d+)\\.(\\d+)(?:\\.(\\d+))?(?:-.*)?$");

    private UpdateChecker() {
    }

    /** Dati essenziali di una release GitHub. */
    static final class Release {
        final String tag;
        final int versionCode;
        final String notes;
        /** URL diretto dell'APK allegato; se manca, la pagina della release. */
        final String downloadUrl;

        Release(String tag, int versionCode, String notes, String downloadUrl) {
            this.tag = tag;
            this.versionCode = versionCode;
            this.notes = notes;
            this.downloadUrl = downloadUrl;
        }

        /** Versione leggibile, senza la "v" iniziale del tag. */
        String versionName() {
            return tag.startsWith("v") ? tag.substring(1) : tag;
        }
    }

    /**
     * Avvia il controllo (in background) se sono passate almeno 24 ore
     * dall'ultimo. Va chiamato dal thread principale, ad esempio in onCreate.
     */
    static void checkIfDue(@NonNull Activity activity) {
        SharedPreferences prefs = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        long last = prefs.getLong(KEY_LAST_CHECK, 0L);
        long now = System.currentTimeMillis();
        if (now - last < MIN_INTERVAL_MS) {
            return;
        }
        // Registra il tentativo subito: senza rete non si riprova a ogni
        // apertura dell'app, ma domani.
        prefs.edit().putLong(KEY_LAST_CHECK, now).apply();
        checkNow(activity);
    }

    /** Avvia il controllo in background senza guardare l'intervallo. */
    static void checkNow(@NonNull Activity activity) {
        Thread worker = new Thread(() -> {
            final Release release;
            try {
                release = fetchLatestRelease();
            } catch (IOException | JSONException | RuntimeException e) {
                Log.d(TAG, "Controllo aggiornamenti non riuscito: " + e);
                return;
            }
            if (release == null || release.versionCode <= BuildConfig.VERSION_CODE) {
                Log.d(TAG, "Nessun aggiornamento (installata " + BuildConfig.VERSION_NAME + ")");
                return;
            }
            SharedPreferences prefs =
                    activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            if (release.tag.equals(prefs.getString(KEY_IGNORED_TAG, null))) {
                Log.d(TAG, "Release " + release.tag + " ignorata dall'utente");
                return;
            }
            activity.runOnUiThread(() -> {
                if (!activity.isFinishing() && !activity.isDestroyed()) {
                    showDialog(activity, release);
                }
            });
        }, "update-check");
        worker.setDaemon(true);
        worker.start();
    }

    /**
     * Converte un tag "vMAJOR.MINOR[.PATCH]" nel versionCode usato dall'app.
     *
     * @return il codice, oppure -1 se il tag non e' nella forma attesa.
     */
    static int versionCodeFromTag(@Nullable String tag) {
        if (tag == null) {
            return -1;
        }
        Matcher m = TAG_PATTERN.matcher(tag.trim());
        if (!m.matches()) {
            return -1;
        }
        try {
            int major = Integer.parseInt(m.group(1));
            int minor = Integer.parseInt(m.group(2));
            int patch = m.group(3) == null ? 0 : Integer.parseInt(m.group(3));
            if (minor > 99 || patch > 99) {
                return -1;
            }
            return major * 10000 + minor * 100 + patch;
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    /** Scarica e interpreta la release piu' recente. Da chiamare fuori dal thread principale. */
    @Nullable
    static Release fetchLatestRelease() throws IOException, JSONException {
        HttpURLConnection conn = (HttpURLConnection) new URL(RELEASES_API).openConnection();
        try {
            conn.setConnectTimeout(TIMEOUT_MS);
            conn.setReadTimeout(TIMEOUT_MS);
            conn.setRequestProperty("Accept", "application/vnd.github+json");
            // GitHub rifiuta le richieste senza User-Agent.
            conn.setRequestProperty("User-Agent",
                    "NeurologiaPerSchemi-Android/" + BuildConfig.VERSION_NAME);
            int status = conn.getResponseCode();
            if (status != HttpURLConnection.HTTP_OK) {
                throw new IOException("HTTP " + status + " da " + RELEASES_API);
            }
            StringBuilder body = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                char[] buf = new char[4096];
                int n;
                while ((n = reader.read(buf)) != -1) {
                    body.append(buf, 0, n);
                }
            }
            return parseRelease(body.toString());
        } finally {
            conn.disconnect();
        }
    }

    /**
     * Estrae tag, note e URL dell'APK dal JSON dell'API.
     *
     * @return la release, oppure null se e' una bozza/pre-release o il tag
     *         non e' interpretabile.
     */
    @Nullable
    static Release parseRelease(@NonNull String json) throws JSONException {
        JSONObject obj = new JSONObject(json);
        if (obj.optBoolean("draft", false) || obj.optBoolean("prerelease", false)) {
            return null;
        }
        String tag = obj.optString("tag_name", "");
        int code = versionCodeFromTag(tag);
        if (code < 0) {
            return null;
        }
        String downloadUrl = null;
        JSONArray assets = obj.optJSONArray("assets");
        if (assets != null) {
            for (int i = 0; i < assets.length(); i++) {
                JSONObject asset = assets.getJSONObject(i);
                String name = asset.optString("name", "");
                String url = asset.optString("browser_download_url", "");
                if (name.toLowerCase().endsWith(".apk") && !url.isEmpty()) {
                    downloadUrl = url;
                    break;
                }
            }
        }
        if (downloadUrl == null) {
            String page = obj.optString("html_url", "");
            downloadUrl = page.isEmpty() ? RELEASES_PAGE : page;
        }
        String notes = obj.optString("body", "").trim();
        if (notes.length() > MAX_NOTES_CHARS) {
            notes = notes.substring(0, MAX_NOTES_CHARS).trim() + "…";
        }
        return new Release(tag, code, notes, downloadUrl);
    }

    private static void showDialog(@NonNull Activity activity, @NonNull Release release) {
        StringBuilder message = new StringBuilder(activity.getString(
                R.string.update_message, release.versionName(), BuildConfig.VERSION_NAME));
        if (!release.notes.isEmpty()) {
            message.append("\n\n")
                    .append(activity.getString(R.string.update_notes_heading))
                    .append('\n')
                    .append(release.notes);
        }
        new AlertDialog.Builder(activity)
                .setTitle(R.string.update_title)
                .setMessage(message)
                .setPositiveButton(R.string.update_download,
                        (dialog, which) -> openExternal(activity, release.downloadUrl))
                .setNegativeButton(R.string.update_later, null)
                .setNeutralButton(R.string.update_ignore, (dialog, which) ->
                        activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
                                .edit().putString(KEY_IGNORED_TAG, release.tag).apply())
                .show();
    }

    private static void openExternal(@NonNull Activity activity, @NonNull String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        try {
            activity.startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(activity, R.string.no_app_for_link, Toast.LENGTH_SHORT).show();
        }
    }
}
