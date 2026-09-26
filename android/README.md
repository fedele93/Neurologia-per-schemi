# App Android (APK) di "Neurologia per schemi"

Questa cartella contiene un'app Android minimale che impacchetta il sito
statico del repository in un APK, per uso personale e da condividere con
amici e colleghi senza passare da uno store.

Tutto il software coinvolto è libero:

| Componente | Licenza |
|---|---|
| Codice dell'app (`app/`) | CC BY-NC-SA 4.0 come il resto del repo |
| Gradle, Android Gradle Plugin, librerie AndroidX (`appcompat`, `webkit`, `core`) | Apache 2.0 |
| OpenJDK (Temurin) | GPLv2 + Classpath Exception |
| GitHub Actions usate (`checkout`, `setup-java`, `setup-android`, `setup-gradle`, `upload-artifact`) | MIT / Apache 2.0 |
| `gh` (CLI di GitHub, già presente sui runner) | MIT |

Unica avvertenza: i pacchetti dell'**Android SDK** (`platforms`, `build-tools`)
sono distribuiti da Google con un proprio accordo di licenza, anche se il
codice di Android (AOSP) è Apache 2.0. Non esiste un modo pratico di
produrre un APK senza usarli: è la stessa toolchain che usa F-Droid. Chi
vuole essere rigoroso può usare i pacchetti `android-sdk-*` di Debian,
ricompilati da AOSP.

## Come funziona

- `MainActivity.java` apre una **WebView** (il motore del browser di sistema)
  e le fa caricare `index.html` dagli asset dell'APK, tramite
  `WebViewAssetLoader`, che serve i file locali a un indirizzo `https://`
  fittizio. Così `fetch()` dei JSON, link relativi e `localStorage`
  funzionano esattamente come sul sito pubblicato.
- Il sito **non viene duplicato**: a ogni build il task Gradle
  `copySiteAssets` (in `app/build.gradle.kts`) copia la radice del repo in
  `app/build/generated/site/www`, escludendo `pdf/`, `pipeline/`, `sw.js`,
  `.git`, `.github` e questa cartella. Quando aggiungi uno schema o un dato,
  finisce nell'APK alla release successiva senza toccare nulla qui.
- I **PDF** (47 MB) restano fuori dall'APK: un link a `pdf/…` apre la copia
  online su GitHub Pages nel browser o nel lettore PDF del telefono.
- I link esterni (Matrix, Mastodon, GitHub, `mailto:`) si aprono nelle app di
  sistema. I link assoluti al sito (`fedele93.github.io/Neurologia-per-schemi/…`)
  vengono reindirizzati alla copia locale.
- Il tasto **indietro** torna alla pagina precedente; dalla home chiude l'app.
- Il **service worker** (`sw.js`) non serve nell'app, i file sono già locali:
  non viene impacchettato e la registrazione fallisce in silenzio (il sito
  gestisce già il caso con `.catch`).
- Le uniche risorse di rete sono quelle che il sito carica da CDN esterne
  (es. Google Fonts in `f_100.html`): senza rete la pagina usa i font di
  sistema. Se aggiungi uno schema che dipende da un CDN, meglio vendorizzarlo
  in `vendor/` come è stato fatto per Mermaid.

## Flusso di lavoro consigliato

Il sito resta la fonte unica: lavori come sempre su `main` e GitHub Pages si
aggiorna a ogni push. L'APK è una **fotografia** del sito nel momento del
tag. Quando ti sembra di aver accumulato abbastanza modifiche (o dopo una
correzione importante), pubblichi una release:

```bash
git checkout main && git pull
git tag v1.1.0            # scegli il numero: vedi "Numerazione" sotto
git push origin v1.1.0
```

Il workflow `.github/workflows/android-release.yml` parte da solo, compila
l'APK, lo firma e lo allega a una **GitHub Release** con le note generate
dai commit dall'ultima release. Dopo qualche minuto lo trovi in
`https://github.com/fedele93/Neurologia-per-schemi/releases`. Gli amici
scaricano il file `neurologia-per-schemi-1.1.0.apk` dal telefono e lo
installano (Android chiede di consentire l'installazione da questa fonte).

Per chi vuole gli aggiornamenti automatici c'è **Obtainium** (app libera,
GPLv3, su F-Droid): si aggiunge l'URL del repository e Obtainium notifica e
installa ogni nuova Release da GitHub.

### Numerazione delle versioni

Usa `vMAJOR.MINOR.PATCH`:

- `PATCH` per correzioni di contenuto (`v1.0.1`);
- `MINOR` per nuovi schemi o strumenti (`v1.1.0`);
- `MAJOR` per cambi grossi dell'app (`v2.0.0`).

Da questo numero `version-from-tag.sh` ricava il `versionCode`
(`1.4.2` → `10402`), che Android usa per riconoscere l'APK come
aggiornamento. Deve sempre crescere: **non riusare né tornare indietro** con
i tag, e tieni `MINOR` e `PATCH` sotto 100.

### Cosa rilasciare e quando

Una cadenza ragionevole: una release per ogni "blocco" di contenuti
(nuovo schema, revisione di una pocket guide) o mensile se le modifiche sono
tante e piccole. Correzioni urgenti (un valore sbagliato in una guida) meritano
subito un `PATCH`. Non c'è alcun costo a rilasciare spesso.

## Impostazione una tantum: chiave di firma

Android accetta un APK come aggiornamento **solo se firmato con la stessa
chiave** dell'APK già installato. Serve quindi una chiave stabile, creata
una volta e conservata con cura (se la perdi, gli utenti dovranno
disinstallare e reinstallare). Si crea con `keytool`, incluso in OpenJDK:

```bash
keytool -genkeypair -v \
  -keystore neurologia-release.jks \
  -alias neurologia \
  -keyalg RSA -keysize 4096 -validity 10000
```

Ti chiede una password per il keystore e una per la chiave (possono essere
uguali) e qualche dato anagrafico (basta il nome). **Non committare** il file
`.jks`: è già in `.gitignore`. Salvane una copia in un posto sicuro
(password manager, disco cifrato).

Poi, nel repository su GitHub, `Settings → Secrets and variables → Actions →
New repository secret`, crea quattro secret:

| Nome | Valore |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | output di `base64 -w0 neurologia-release.jks` (su macOS `base64 -i neurologia-release.jks`) |
| `ANDROID_KEYSTORE_PASSWORD` | password del keystore |
| `ANDROID_KEY_ALIAS` | `neurologia` (o l'alias scelto) |
| `ANDROID_KEY_PASSWORD` | password della chiave |

Se mancano, il workflow di release si ferma subito con un messaggio che li
elenca.

## Build di prova senza release

Il workflow `android-build.yml` compila un APK di **debug** a ogni push che
tocca `android/`, oppure a mano da `Actions → "Android - build di prova" →
Run workflow`. L'APK è scaricabile dagli *Artifacts* dell'esecuzione: serve
a verificare che tutto compili e a provare l'app, ma è firmato con una
chiave temporanea del runner e quindi **non** può aggiornare una release
installata (e viceversa). Sul telefono, se hai già installata la versione
di release, va disinstallata prima.

## Compilare sul proprio PC

Servono JDK 17 e l'Android SDK. La via più semplice è installare Android
Studio (libero, Apache 2.0) e aprire la cartella `android/`; in alternativa
solo i "command line tools" dell'SDK, con la variabile `ANDROID_HOME` che
punta alla loro cartella. Poi:

```bash
cd android
./build-apk.sh            # APK di debug in app/build/outputs/apk/debug/
./build-apk.sh release    # APK firmato: richiede le 4 variabili d'ambiente
                          # ANDROID_KEYSTORE_PATH, ANDROID_KEYSTORE_PASSWORD,
                          # ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

Il primo `./gradlew` scarica Gradle e le dipendenze (qualche centinaio di MB).

## Problemi comuni

- **"App non installata" / "Pacchetto in conflitto"**: l'APK è firmato con una
  chiave diversa da quella installata (debug contro release, o chiave
  rigenerata). Disinstalla e reinstalla.
- **"Versione più vecchia"**: il `versionCode` non è cresciuto. Pubblica un tag
  più alto.
- **Un PDF non si apre**: i PDF stanno online; serve rete e un'app che apra
  i PDF.
- **Il workflow fallisce con tanti "Could not find …" di dipendenze**: il
  runner non è riuscito a raggiungere Maven Central (capita, è transitorio).
  Dalla pagina dell'esecuzione in *Actions* premi "Re-run jobs"; per una
  release basta ripubblicare il tag (`git push --delete origin v1.1.0`, poi
  di nuovo `git push origin v1.1.0`).
- **Uno schema nuovo non c'è nell'app**: l'APK è fermo al tag; pubblica una
  nuova release.
