#!/usr/bin/env bash
# Ricava versionName e versionCode dell'app da un tag git nella forma vMAJOR.MINOR[.PATCH][-suffisso]
# Esempio:  ./version-from-tag.sh v1.4.2   ->   VERSION_NAME=1.4.2  VERSION_CODE=10402
#
# versionCode = MAJOR*10000 + MINOR*100 + PATCH: cresce a ogni release se i tag
# seguono l'ordine naturale (MINOR e PATCH devono restare sotto 100). Android
# usa questo numero per accettare l'APK come aggiornamento di quello installato.
set -euo pipefail

tag="${1:-}"
if [[ -z "$tag" ]]; then
    tag="$(git describe --tags --match 'v*' --abbrev=0 2>/dev/null || echo 'v0.0.0')"
fi

if [[ ! "$tag" =~ ^v([0-9]+)\.([0-9]+)(\.([0-9]+))?(-.*)?$ ]]; then
    echo "Tag non valido: '$tag' (atteso vMAJOR.MINOR[.PATCH][-suffisso], es. v1.4.2)" >&2
    exit 1
fi
major="${BASH_REMATCH[1]}"
minor="${BASH_REMATCH[2]}"
patch="${BASH_REMATCH[4]:-0}"

if (( minor > 99 || patch > 99 )); then
    echo "MINOR e PATCH devono essere <= 99 (tag: $tag)" >&2
    exit 1
fi

echo "VERSION_NAME=${tag#v}"
code=$(( major * 10000 + minor * 100 + patch ))
(( code >= 1 )) || code=1   # Android richiede versionCode >= 1 (caso "nessun tag")
echo "VERSION_CODE=$code"
