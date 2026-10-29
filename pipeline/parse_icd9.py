#!/usr/bin/env python3
"""
Pipeline ICD-9-CM per lo strumento SDO (strumenti/sdo.html).

Cosa fa
-------
1. Legge l'elenco DIAGNOSI ICD-9-CM (edizione italiana 2007) dalla sorgente
   pipeline/sorgenti/CodeSystem_ICD9CM_diagnosi.fsh, un CodeSystem FHIR in
   formato FSH pubblicato da HL7 Italia (repo github.com/hl7-it/teleassistenza,
   licenza CC0). Ogni riga utile ha la forma:
       * #342.01 "EMIPLEGIA FLACCIDA ED EMIPARESI DELL'EMISFERO DOMINANTE"
2. Calcola per ogni codice: capitolo, se è un codice V (fattori che
   influenzano lo stato di salute) o E (cause esterne), se è TERMINALE
   (cioè non ha sotto-codici: solo i terminali si possono scrivere in SDO)
   e se richiede la 5ª cifra.
3. Legge le PROCEDURE: se esiste pipeline/sorgenti/icd9cm_procedure.csv
   (elenco completo, due colonne "codice;descrizione", da ricavare dal manuale
   ministeriale) lo usa; altrimenti usa il sottoinsieme neurologico curato a
   mano in data/icd9cm_procedure_neuro.json. In entrambi i casi segna nei
   metadati se l'elenco è completo o parziale.
4. Valida i file curati (sinonimi, scenari, regole): ogni codice citato deve
   esistere, altrimenti lo segnala (e in caso di errori gravi non scrive nulla).
5. Scrive data/icd9cm_diagnosi.json e data/icd9cm_procedure.json e un report
   in pipeline/report_icd9.txt.

Uso
---
    python pipeline/parse_icd9.py

Non servono dipendenze esterne (solo libreria standard).
"""

from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
SORGENTI = RADICE / "pipeline" / "sorgenti"
DATA = RADICE / "data"
REPORT = RADICE / "pipeline" / "report_icd9.txt"

FSH_DIAGNOSI = SORGENTI / "CodeSystem_ICD9CM_diagnosi.fsh"
CSV_PROCEDURE = SORGENTI / "icd9cm_procedure.csv"            # opzionale (elenco completo)
JSON_PROCEDURE_NEURO = DATA / "icd9cm_procedure_neuro.json"  # sottoinsieme curato

OUT_DIAGNOSI = DATA / "icd9cm_diagnosi.json"
OUT_PROCEDURE = DATA / "icd9cm_procedure.json"

# Capitoli dell'elenco sistematico ICD-9-CM (vol. 1). L'intervallo è sul
# codice a 3 cifre; V ed E hanno capitoli "supplementari".
CAPITOLI = [
    (1, 139, "Malattie infettive e parassitarie"),
    (140, 239, "Tumori"),
    (240, 279, "Malattie endocrine, nutrizionali, metaboliche e disturbi immunitari"),
    (280, 289, "Malattie del sangue e degli organi ematopoietici"),
    (290, 319, "Disturbi psichici"),
    (320, 389, "Malattie del sistema nervoso e degli organi di senso"),
    (390, 459, "Malattie del sistema circolatorio"),
    (460, 519, "Malattie dell'apparato respiratorio"),
    (520, 579, "Malattie dell'apparato digerente"),
    (580, 629, "Malattie dell'apparato genitourinario"),
    (630, 679, "Complicazioni della gravidanza, del parto e del puerperio"),
    (680, 709, "Malattie della pelle e del tessuto sottocutaneo"),
    (710, 739, "Malattie del sistema osteomuscolare e del tessuto connettivo"),
    (740, 759, "Malformazioni congenite"),
    (760, 779, "Condizioni morbose di origine perinatale"),
    (780, 799, "Sintomi, segni e stati morbosi mal definiti"),
    (800, 999, "Traumatismi e avvelenamenti"),
]
CAPITOLO_V = "Fattori che influenzano lo stato di salute (codici V)"
CAPITOLO_E = "Cause esterne di traumatismo e avvelenamento (codici E)"

RIGA_FSH = re.compile(r'^\* #(?P<codice>[0-9VE][0-9.]*) "(?P<descr>.*)"\s*$')

report: list[str] = []


def log(msg: str) -> None:
    print(msg)
    report.append(msg)


def normalizza(testo: str) -> str:
    """Minuscole + senza accenti (stessa funzione usata nel frontend)."""
    testo = unicodedata.normalize("NFD", testo.lower())
    return "".join(ch for ch in testo if unicodedata.category(ch) != "Mn")


def pulisci_descrizione(d: str) -> str:
    # La sorgente ha spazi doppi e virgole senza spazio ("ACUTA,NON SPECIFICATA").
    d = re.sub(r"\s+", " ", d).strip()
    d = re.sub(r",(?=\S)", ", ", d)
    # Nella sorgente la "À" maiuscola accentata è diventata "@" (IPOOSMOLARIT@).
    d = d.replace("@", "À")
    return d


NOMI_CAPITOLI = [nome for _, _, nome in CAPITOLI] + [CAPITOLO_V, CAPITOLO_E]


def capitolo_di(codice: str) -> int:
    """Indice del capitolo in NOMI_CAPITOLI (nel JSON si salva l'indice, non il
    nome, per non ripetere 16.000 volte la stessa stringa)."""
    if codice.startswith("V"):
        return len(CAPITOLI)
    if codice.startswith("E"):
        return len(CAPITOLI) + 1
    n = int(codice[:3])
    for i, (a, b, _) in enumerate(CAPITOLI):
        if a <= n <= b:
            return i
    raise ValueError(f"codice fuori da ogni capitolo: {codice}")


# ---------------------------------------------------------------- diagnosi
def leggi_diagnosi() -> list[dict]:
    if not FSH_DIAGNOSI.exists():
        sys.exit(f"Sorgente mancante: {FSH_DIAGNOSI}")
    codici: dict[str, str] = {}
    scartate = 0
    for riga in FSH_DIAGNOSI.read_text(encoding="utf-8").splitlines():
        if not riga.startswith("* #"):
            continue
        m = RIGA_FSH.match(riga)
        if not m:
            scartate += 1
            log(f"  riga non riconosciuta: {riga[:80]}")
            continue
        c = m.group("codice")
        if c in codici:
            log(f"  codice duplicato nella sorgente: {c}")
        codici[c] = pulisci_descrizione(m.group("descr"))
    log(f"Diagnosi lette: {len(codici)} (righe scartate: {scartate})")

    # Un codice è "terminale" se nessun altro codice lo estende
    # (es. 342.0 ha 342.00/342.01/342.02 → non terminale, non si usa in SDO).
    tutti = sorted(codici)
    figli: dict[str, list[str]] = {c: [] for c in tutti}
    for c in tutti:
        # il padre è il codice senza l'ultima cifra (e senza il punto se resta solo)
        padre = c[:-1]
        if padre.endswith("."):
            padre = padre[:-1]
        if padre in figli and padre != c:
            figli[padre].append(c)

    out = []
    for c in tutti:
        voce = {
            "c": c,
            "d": codici[c],
            "cap": capitolo_di(c),
            "t": len(figli[c]) == 0,  # terminale = codificabile in SDO
        }
        if c.startswith("V"):
            voce["v"] = True
        elif c.startswith("E"):
            voce["e"] = True
        if figli[c]:
            # quante cifre servono per arrivare al terminale (4 o 5)
            voce["figli"] = len(figli[c])
        out.append(voce)

    n_term = sum(1 for v in out if v["t"])
    log(f"  terminali (codificabili): {n_term}; non terminali: {len(out) - n_term}")
    return out


# --------------------------------------------------------------- procedure
def leggi_procedure() -> tuple[list[dict], bool, str]:
    """Ritorna (lista, completo, fonte)."""
    if CSV_PROCEDURE.exists():
        voci: dict[str, str] = {}
        with CSV_PROCEDURE.open(encoding="utf-8", newline="") as f:
            lettore = csv.reader(f, delimiter=";")
            for riga in lettore:
                if len(riga) < 2 or not re.match(r"^\d\d(\.\d\d?)?$", riga[0].strip()):
                    continue
                voci[riga[0].strip()] = pulisci_descrizione(riga[1])
        log(f"Procedure lette dal CSV completo: {len(voci)}")
        lista = [{"c": c, "d": d} for c, d in sorted(voci.items())]
        fonte = "ICD-9-CM 2007 vol. 3 (elenco completo da pipeline/sorgenti/icd9cm_procedure.csv)"
        completo = True
    else:
        if not JSON_PROCEDURE_NEURO.exists():
            sys.exit(f"Manca sia {CSV_PROCEDURE} sia {JSON_PROCEDURE_NEURO}")
        dati = json.loads(JSON_PROCEDURE_NEURO.read_text(encoding="utf-8"))
        lista = []
        for p in dati["procedure"]:
            voce = {"c": p["codice"], "d": p["descrizione"]}
            if p.get("sinonimi"):
                voce["s"] = p["sinonimi"]
            if p.get("nota"):
                voce["n"] = p["nota"]
            if p.get("gruppo"):
                voce["g"] = p["gruppo"]
            lista.append(voce)
        log(f"Procedure lette dal sottoinsieme neurologico curato: {len(lista)} "
            "(ELENCO PARZIALE: per l'elenco completo mettere icd9cm_procedure.csv in pipeline/sorgenti)")
        fonte = dati.get("meta", {}).get("fonte", "sottoinsieme curato a mano")
        completo = False

    # Terminalità anche per le procedure (es. 88.9 vs 88.91).
    codici = {v["c"] for v in lista}
    for v in lista:
        v["t"] = not any(o != v["c"] and o.startswith(v["c"]) for o in codici)
    return lista, completo, fonte


# --------------------------------------------------------------- validazioni
def valida_curati(diag: set[str], proc: set[str]) -> int:
    """Controlla che i file curati citino solo codici esistenti. Ritorna n. errori."""
    errori = 0

    def controlla(etichetta: str, codice: str, insieme: set[str]) -> None:
        nonlocal errori
        if codice not in insieme:
            log(f"  ERRORE {etichetta}: codice inesistente {codice}")
            errori += 1

    sin = DATA / "sdo_sinonimi.json"
    if sin.exists():
        for voce in json.loads(sin.read_text(encoding="utf-8")).get("voci", []):
            for c in voce.get("diagnosi", []):
                controlla("sinonimi", c, diag)
            for c in voce.get("procedure", []):
                controlla("sinonimi", c, proc)

    sce = DATA / "sdo_scenari.json"
    if sce.exists():
        for s in json.loads(sce.read_text(encoding="utf-8")).get("scenari", []):
            for p in s.get("principale", []):
                controlla(f"scenario {s['id']} principale", p["codice"], diag)
            for sec in s.get("secondarie", []):
                controlla(f"scenario {s['id']} secondaria", sec["codice"], diag)
            for pr in s.get("procedure", []):
                controlla(f"scenario {s['id']} procedura", pr["codice"], proc)

    reg = DATA / "sdo_regole.json"
    if reg.exists():
        for r in json.loads(reg.read_text(encoding="utf-8")).get("regole", []):
            for c in r.get("codici", []) + r.get("codici_b", []) + r.get("eccezioni", []):
                # le regole possono usare prefissi (es. "780", "434.") oltre a codici
                # interi, e possono citare sia diagnosi sia procedure
                if (c not in diag and c not in proc
                        and not any(d.startswith(c) for d in diag)
                        and not any(p.startswith(c) for p in proc)):
                    log(f"  ERRORE regole {r['id']}: codice/prefisso inesistente {c}")
                    errori += 1
    return errori


def main() -> None:
    log(f"== parse_icd9.py — {date.today().isoformat()} ==")
    diagnosi = leggi_diagnosi()
    procedure, completo, fonte_proc = leggi_procedure()

    log("Validazione dei file curati (sinonimi, scenari, regole):")
    n_err = valida_curati({v["c"] for v in diagnosi}, {v["c"] for v in procedure})
    if n_err:
        log(f"  {n_err} errori: correggi i file curati e rilancia. NESSUN FILE SCRITTO.")
        REPORT.write_text("\n".join(report) + "\n", encoding="utf-8")
        sys.exit(1)
    log("  ok, nessun codice inesistente.")

    # Controlli di verità nota: se la sorgente cambia e questi mancano, qualcosa non va.
    attesi = {"335.20": "SCLEROSI LATERALE AMIOTROFICA", "340": "SCLEROSI MULTIPLA",
              "434.91": None, "V45.81": None, "E888.9": None}
    per_codice = {v["c"]: v["d"] for v in diagnosi}
    for c, d in attesi.items():
        if c not in per_codice or (d and per_codice[c] != d):
            sys.exit(f"Test di verità nota fallito per {c}: {per_codice.get(c)}")

    OUT_DIAGNOSI.write_text(json.dumps({
        "meta": {
            "generato_il": date.today().isoformat(),
            "versione": "ICD-9-CM edizione italiana 2007 (vol. 1, diagnosi)",
            "fonte": "HL7 Italia, CodeSystem diagnosi-icd9cm (github.com/hl7-it/teleassistenza, CC0)",
            "n_codici": len(diagnosi),
            "n_terminali": sum(1 for v in diagnosi if v["t"]),
            "capitoli": NOMI_CAPITOLI,
            "campi": {"c": "codice", "d": "descrizione", "cap": "indice del capitolo in meta.capitoli",
                      "t": "terminale (codificabile in SDO)", "v": "codice V", "e": "codice E",
                      "figli": "numero di sotto-codici (se non terminale)"},
        },
        "codici": diagnosi,
    }, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    OUT_PROCEDURE.write_text(json.dumps({
        "meta": {
            "generato_il": date.today().isoformat(),
            "versione": "ICD-9-CM edizione italiana 2007 (vol. 3, procedure)",
            "fonte": fonte_proc,
            "completo": completo,
            "n_codici": len(procedure),
            "campi": {"c": "codice", "d": "descrizione", "s": "sinonimi", "n": "nota d'uso",
                      "g": "gruppo", "t": "terminale"},
        },
        "procedure": procedure,
    }, ensure_ascii=False, separators=(",", ":"), indent=None), encoding="utf-8")

    log(f"Scritti {OUT_DIAGNOSI.relative_to(RADICE)} ({OUT_DIAGNOSI.stat().st_size // 1024} kB) "
        f"e {OUT_PROCEDURE.relative_to(RADICE)} ({OUT_PROCEDURE.stat().st_size // 1024} kB)")
    REPORT.write_text("\n".join(report) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
