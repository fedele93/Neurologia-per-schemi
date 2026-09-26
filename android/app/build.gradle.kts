// Modulo app: una WebView che mostra il sito statico impacchettato negli
// asset dell'APK. Il sito NON viene duplicato nel repository: a ogni build il
// task `copySiteAssets` lo copia dalla radice del repo (due livelli sopra)
// in build/generated/site/www, escludendo ciò che nell'app non serve.
plugins {
    id("com.android.application")
}

// ---- Versione dell'app -----------------------------------------------------
// Il workflow di release passa versione e codice dal tag git (es. v1.4.0).
// In locale, senza parametri, si ottiene una build "0.0.0-dev".
//   versionName: stringa mostrata all'utente (es. "1.4.0")
//   versionCode: intero crescente che Android usa per capire se un APK è più
//                nuovo di quello installato (da v1.4.0 -> 10400)
val appVersionName: String = (project.findProperty("appVersionName") as String?) ?: "0.0.0-dev"
val appVersionCode: Int = ((project.findProperty("appVersionCode") as String?) ?: "1").toInt()

// ---- Firma di release ------------------------------------------------------
// Le credenziali arrivano solo da variabili d'ambiente (nel CI: GitHub Secrets).
// Se mancano, la build di release produce un APK non firmato (non installabile):
// il workflow lo segnala prima di arrivare qui.
val keystorePath: String? = System.getenv("ANDROID_KEYSTORE_PATH")
val keystorePassword: String? = System.getenv("ANDROID_KEYSTORE_PASSWORD")
val signingKeyAlias: String? = System.getenv("ANDROID_KEY_ALIAS")
val signingKeyPassword: String? = System.getenv("ANDROID_KEY_PASSWORD")
val hasReleaseSigning = !keystorePath.isNullOrBlank() && file(keystorePath!!).exists()

android {
    namespace = "it.neurologiaperschemi.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "it.neurologiaperschemi.app"
        minSdk = 24
        targetSdk = 35
        versionCode = appVersionCode
        versionName = appVersionName
    }

    signingConfigs {
        if (hasReleaseSigning) {
            create("release") {
                storeFile = file(keystorePath!!)
                storePassword = keystorePassword
                keyAlias = signingKeyAlias
                keyPassword = signingKeyPassword
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            if (hasReleaseSigning) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    // Gli asset del sito vengono generati dal task copySiteAssets (sotto).
    sourceSets {
        getByName("main") {
            assets.srcDir(layout.buildDirectory.dir("generated/site"))
        }
    }
}

// ---- Copia del sito negli asset -------------------------------------------
val siteRoot = rootProject.projectDir.parentFile   // radice del repository
val siteAssetsDir = layout.buildDirectory.dir("generated/site/www")

val copySiteAssets by tasks.registering(Sync::class) {
    description = "Copia il sito statico (radice del repo) negli asset dell'app."
    from(siteRoot) {
        // Cose che nell'APK non servono o non devono finirci.
        exclude(".git/**", ".github/**", "android/**", "pipeline/**")
        exclude(".gitignore", "README.md")
        // I PDF pesano ~47 MB: restano online, l'app li apre nel browser.
        exclude("pdf/**")
        // Il service worker serve solo al sito web: nell'app i file sono già
        // locali e la registrazione fallirebbe comunque (viene ignorata).
        exclude("sw.js")
    }
    into(siteAssetsDir)
}

tasks.named("preBuild") {
    dependsOn(copySiteAssets)
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.1")
    implementation("androidx.webkit:webkit:1.14.0")
}
