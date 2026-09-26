// Progetto Gradle dell'app Android "Neurologia per schemi".
// Tutto ciò che viene usato qui è software libero: Gradle (Apache 2.0),
// Android Gradle Plugin e librerie AndroidX (Apache 2.0).
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "NeurologiaPerSchemi"
include(":app")
