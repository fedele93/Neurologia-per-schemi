#!/usr/bin/env bash
# Build locale dell'APK.
#   ./build-apk.sh            -> APK di debug (firma di sviluppo del PC)
#   ./build-apk.sh release    -> APK di release firmato: servono le variabili
#                                ANDROID_KEYSTORE_PATH, ANDROID_KEYSTORE_PASSWORD,
#                                ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD
# Richiede JDK 17 e l'Android SDK (ANDROID_HOME impostato). La versione viene
# letta dall'ultimo tag v* raggiungibile dal commit corrente.
set -euo pipefail
cd "$(dirname "$0")"

type="${1:-debug}"
eval "$(./version-from-tag.sh)"
echo "Versione: $VERSION_NAME (versionCode $VERSION_CODE), build: $type"

case "$type" in
    debug)
        ./gradlew assembleDebug -PappVersionName="$VERSION_NAME" -PappVersionCode="$VERSION_CODE"
        echo "APK: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
        ;;
    release)
        : "${ANDROID_KEYSTORE_PATH:?imposta ANDROID_KEYSTORE_PATH (file .jks)}"
        : "${ANDROID_KEYSTORE_PASSWORD:?imposta ANDROID_KEYSTORE_PASSWORD}"
        : "${ANDROID_KEY_ALIAS:?imposta ANDROID_KEY_ALIAS}"
        : "${ANDROID_KEY_PASSWORD:?imposta ANDROID_KEY_PASSWORD}"
        ./gradlew assembleRelease -PappVersionName="$VERSION_NAME" -PappVersionCode="$VERSION_CODE"
        out="neurologia-per-schemi-${VERSION_NAME}.apk"
        cp app/build/outputs/apk/release/app-release.apk "$out"
        echo "APK: $(pwd)/$out"
        ;;
    *)
        echo "uso: $0 [debug|release]" >&2
        exit 1
        ;;
esac
