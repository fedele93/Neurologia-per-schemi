package it.neurologiaperschemi.app;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.webkit.WebViewAssetLoader;

import java.io.IOException;
import java.io.InputStream;

/**
 * Unica schermata dell'app: una WebView che mostra il sito "Neurologia per
 * schemi" impacchettato negli asset dell'APK (cartella assets/www, riempita
 * dal task Gradle copySiteAssets).
 *
 * Come funziona:
 *  - WebViewAssetLoader serve i file locali all'indirizzo
 *    https://appassets.androidplatform.net/assets/www/... : un'origine https
 *    "vera", cosi' fetch() dei JSON, i link relativi e il localStorage
 *    funzionano esattamente come sul sito pubblicato.
 *  - I link verso il sito pubblicato (fedele93.github.io/Neurologia-per-schemi)
 *    vengono reindirizzati alla copia locale, se esiste.
 *  - I PDF non sono inclusi nell'APK (pesano ~47 MB): si aprono online, nel
 *    browser o nel lettore PDF del telefono.
 *  - Tutti gli altri link esterni (Matrix, Mastodon, GitHub, mailto...) si
 *    aprono nell'app di sistema appropriata.
 */
public class MainActivity extends AppCompatActivity {

    /** Host virtuale usato da WebViewAssetLoader per servire gli asset. */
    private static final String ASSET_HOST = "appassets.androidplatform.net";
    private static final String ASSET_PREFIX = "/assets/www/";
    private static final String ASSET_BASE = "https://" + ASSET_HOST + ASSET_PREFIX;

    /** Indirizzo del sito pubblicato su GitHub Pages. */
    private static final String SITE_HOST = "fedele93.github.io";
    private static final String SITE_PREFIX = "/Neurologia-per-schemi/";
    private static final String SITE_BASE = "https://" + SITE_HOST + SITE_PREFIX;

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Layout: un contenitore blu (colore del brand) che ospita la WebView.
        // Il contenitore riceve un padding pari alle barre di sistema, cosi'
        // la pagina non finisce sotto la barra di stato.
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(getColor(R.color.brand));
        webView = new WebView(this);
        root.addView(webView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(root);

        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowInsetsControllerCompat insetsController =
                WindowCompat.getInsetsController(getWindow(), root);
        insetsController.setAppearanceLightStatusBars(false);     // icone chiare su blu
        insetsController.setAppearanceLightNavigationBars(false);
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            Insets bars = insets.getInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);      // gli schemi usano JS (Mermaid, ricerca...)
        settings.setDomStorageEnabled(true);      // localStorage (es. progressi flashcard)
        settings.setAllowFileAccess(false);       // non servono file:// : usiamo l'asset loader
        settings.setAllowContentAccess(false);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .setDomain(ASSET_HOST)
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view,
                                                              WebResourceRequest request) {
                // Per gli URL appassets.androidplatform.net restituisce il file
                // locale; per tutto il resto (null) la WebView usa la rete.
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleNavigation(request.getUrl());
            }
        });

        // Tasto "indietro": torna alla pagina precedente della WebView;
        // solo dalla home chiude l'app.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });

        // Dopo una rotazione o un ripristino dell'activity riparte dalla stessa
        // pagina; altrimenti dalla home.
        if (savedInstanceState == null || webView.restoreState(savedInstanceState) == null) {
            webView.loadUrl(ASSET_BASE + "index.html");
        }
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    protected void onDestroy() {
        webView.destroy();
        super.onDestroy();
    }

    /**
     * Decide cosa fare quando la pagina prova a navigare verso {@code url}.
     *
     * @return true se la navigazione e' stata gestita qui (la WebView non deve
     *         caricarla), false per lasciare che la WebView la carichi.
     */
    private boolean handleNavigation(Uri url) {
        String scheme = url.getScheme();
        String host = url.getHost();
        String path = url.getPath() == null ? "" : url.getPath();

        if (!"http".equals(scheme) && !"https".equals(scheme)) {
            // mailto:, matrix:, intent: ... -> app di sistema
            openExternal(url);
            return true;
        }

        if (ASSET_HOST.equals(host)) {
            if (path.toLowerCase().endsWith(".pdf") && path.startsWith(ASSET_PREFIX)) {
                // PDF non impacchettato: apri la copia online.
                openExternal(Uri.parse(SITE_BASE + path.substring(ASSET_PREFIX.length())));
                return true;
            }
            return false; // pagina locale: lascia caricare la WebView
        }

        if (SITE_HOST.equals(host) && path.startsWith(SITE_PREFIX)) {
            // Link assoluto al sito pubblicato: usa la copia locale se c'e'.
            String relative = path.substring(SITE_PREFIX.length());
            if (relative.isEmpty()) {
                relative = "index.html";
            }
            if (!relative.toLowerCase().endsWith(".pdf") && assetExists("www/" + relative)) {
                Uri.Builder local = Uri.parse(ASSET_BASE + relative).buildUpon();
                if (url.getEncodedQuery() != null) {
                    local.encodedQuery(url.getEncodedQuery());
                }
                if (url.getEncodedFragment() != null) {
                    local.encodedFragment(url.getEncodedFragment());
                }
                webView.loadUrl(local.build().toString());
                return true;
            }
        }

        // Qualsiasi altro sito: browser esterno.
        openExternal(url);
        return true;
    }

    private boolean assetExists(String assetPath) {
        try (InputStream in = getAssets().open(assetPath)) {
            return in != null;
        } catch (IOException e) {
            return false;
        }
    }

    private void openExternal(Uri url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, url);
        try {
            startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, R.string.no_app_for_link, Toast.LENGTH_SHORT).show();
        }
    }
}
