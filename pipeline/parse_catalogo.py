# -*- coding: utf-8 -*-
"""
parse_catalogo.py — Estrae il Catalogo Regionale delle Prestazioni di
Specialistica Ambulatoriale (Regione Puglia) da PDF e produce
`data/catalogo_puglia.json`.

COME SI USA
    python pipeline/parse_catalogo.py

Lo script:
  1. cerca il PDF in `pipeline/catalogo.pdf`; se non c'è prova a scaricarlo
     dall'URL ufficiale (e lo salva lì, così i run successivi sono offline);
  2. estrae le tabelle pagina per pagina con pdfplumber;
  3. ricompone le celle spezzate su più righe dal layout del PDF;
  4. valida i dati (univocità dei codici, test di verità nota) e SOLO se
     tutto passa scrive il JSON;
  5. scrive in `pipeline/report_parsing.txt` ogni riga scartata o anomala,
     con il numero di pagina: MAI si "indovina" una riga dubbia.
  6. (extra) se esiste `data/sinonimi.json`, controlla che ogni codice
     citato nei sinonimi esista davvero nel catalogo appena generato.

Il file è organizzato in "celle" delimitate da `# %%`: così puoi aprirlo
in Jupyter/VS Code ed eseguirlo un pezzo alla volta per capire cosa fa.
"""

# %% Import e costanti ------------------------------------------------------
import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

# pdfplumber è l'unica dipendenza esterna: legge i PDF "digitali" (non
# scansioni) e sa riconoscere le tabelle disegnate con righe e colonne.
try:
    import pdfplumber
except ImportError:
    sys.exit(
        "ERRORE: manca la libreria pdfplumber.\n"
        "Installala con:  pip install -r pipeline/requirements.txt"
    )

# URL ufficiale del catalogo (Regione Puglia, portale SIST).
URL_CATALOGO = (
    "https://sist.sanita.puglia.it/documents/76427961/77294284/"
    "Catalogo_Regionale_delle_Prestazioni_di_Specialistica_Ambulatoriale.pdf/"
    "0964be55-00dc-4568-9fec-593a64c9942a"
)

# Percorsi: tutti relativi alla posizione di questo file, così lo script
# funziona da qualunque cartella lo si lanci.
DIR_PIPELINE = Path(__file__).resolve().parent
DIR_REPO = DIR_PIPELINE.parent
PDF_LOCALE = DIR_PIPELINE / "catalogo.pdf"
JSON_USCITA = DIR_REPO / "data" / "catalogo_puglia.json"
REPORT = DIR_PIPELINE / "report_parsing.txt"
SINONIMI = DIR_REPO / "data" / "sinonimi.json"

# Intestazioni attese delle 5 colonne del PDF. Le usiamo per riconoscere
# (e saltare) le righe di intestazione che si ripetono a ogni pagina.
INTESTAZIONI = [
    "codice nomenclatore",
    "denominazione nomenclatore",
    "denominazione estesa catalogo",
    "codice regionale alfanumerico",
    "codice regionale numerico",
]

# Formati attesi dei codici. Servono a distinguere una riga "vera" da una
# riga di continuazione (cella spezzata) o da un residuo di impaginazione.
#   - codice regionale alfanumerico: 4 gruppi di cifre separati da punto,
#     es. 89.13.00.04 (i primi due gruppi ricalcano il nomenclatore).
#     Alcune voci del nomenclatore contengono lettere (es. prestazioni
#     "aggiuntive" regionali), quindi ammettiamo anche lettere maiuscole.
#   - codice regionale numerico: solo cifre, es. 10244.
RE_CODICE_ALFA = re.compile(r"^[0-9A-Z]{2,3}\.[0-9A-Z]{2}\.[0-9A-Z]{2}\.[0-9A-Z]{2}$")
RE_CODICE_NUM = re.compile(r"^[0-9]+$")


# %% Funzioni di utilità -----------------------------------------------------
def pulisci(testo):
    """Normalizza SOLO gli spazi di una cella, senza toccare il contenuto.

    Regola di integrità: le denominazioni vanno riportate esattamente come
    nel PDF. L'unica eccezione ammessa sono gli artefatti dell'estrazione:
    a-capo interni alla cella e spazi multipli, che collassiamo in uno
    spazio singolo, più il trim iniziale/finale.
    """
    if testo is None:
        return ""
    # split() senza argomenti divide su qualunque spazio bianco (inclusi
    # \n e \t) e ignora le sequenze vuote: rimetterli insieme con un solo
    # spazio è il modo più robusto di "collassare" gli spazi.
    return " ".join(str(testo).split())


def e_riga_intestazione(celle):
    """Riconosce le righe di intestazione ripetute a ogni pagina del PDF."""
    testo = " ".join(pulisci(c).lower() for c in celle)
    # Basta che compaiano due dei titoli di colonna per essere sicuri:
    # nessuna prestazione reale contiene "codice nomenclatore" nel testo.
    return sum(1 for t in INTESTAZIONI if t in testo) >= 2


def deriva_tipo(denominazione_estesa):
    """Euristica per il campo `tipo`, usata dal frontend per i filtri.

    Regole (documentate anche nel README):
      - contiene "PRIMA VISITA"            -> "prima_visita"
      - contiene "CONTROLLO" o "FOLLOW UP" -> "controllo"
      - altrimenti                          -> "esame_o_altro"
    Il confronto ignora maiuscole/minuscole e accetta sia "FOLLOW UP" sia
    "FOLLOW-UP" (nei PDF regionali compaiono entrambe le grafie).
    """
    t = denominazione_estesa.upper()
    if "PRIMA VISITA" in t:
        return "prima_visita"
    if "CONTROLLO" in t or "FOLLOW UP" in t or "FOLLOW-UP" in t:
        return "controllo"
    return "esame_o_altro"


# %% Recupero del PDF --------------------------------------------------------
def ottieni_pdf():
    """Restituisce il percorso del PDF, scaricandolo se serve.

    Ordine di ricerca:
      1. `pipeline/catalogo.pdf` se già presente (così si può lavorare
         offline e il risultato è riproducibile);
      2. download dall'URL ufficiale, salvato in `pipeline/catalogo.pdf`.

    Se entrambi falliscono, lo script termina con un messaggio chiaro:
    NON si prosegue mai con dati inventati.
    """
    if PDF_LOCALE.exists():
        print(f"Uso il PDF locale: {PDF_LOCALE}")
        return PDF_LOCALE

    print(f"PDF locale non trovato, provo a scaricare:\n  {URL_CATALOGO}")
    try:
        # urllib fa parte della libreria standard: evitiamo una dipendenza
        # in più (requests) per un singolo download.
        from urllib.request import Request, urlopen

        richiesta = Request(URL_CATALOGO, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(richiesta, timeout=120) as risposta:
            contenuto = risposta.read()
        # Controllo minimo di sanità: un PDF vero inizia con "%PDF".
        if not contenuto.startswith(b"%PDF"):
            raise ValueError("il file scaricato non sembra un PDF")
        PDF_LOCALE.write_bytes(contenuto)
        print(f"Scaricato e salvato in {PDF_LOCALE} ({len(contenuto)} byte)")
        return PDF_LOCALE
    except Exception as errore:
        sys.exit(
            "\nERRORE: impossibile scaricare il catalogo PDF.\n"
            f"  Motivo: {errore}\n\n"
            "Cosa fare: scarica manualmente il file da\n"
            f"  {URL_CATALOGO}\n"
            "e salvalo come:\n"
            f"  {PDF_LOCALE}\n"
            "poi rilancia:  python pipeline/parse_catalogo.py\n"
            "(Lo script non prosegue senza il PDF ufficiale: niente dati inventati.)"
        )


# %% Estrazione delle righe --------------------------------------------------
def estrai_prestazioni(percorso_pdf):
    """Estrae tutte le righe di prestazione dal PDF.

    Ritorna (prestazioni, scarti):
      - prestazioni: lista di dict già puliti e classificati;
      - scarti: lista di stringhe descrittive per il report.

    Come gestiamo le celle spezzate: nei PDF tabellari capita che una riga
    logica venga divisa in più righe fisiche (il testo lungo va a capo, o
    la riga prosegue nella pagina successiva). pdfplumber di solito le
    ricompone da solo perché segue i bordi disegnati della tabella; quando
    non ci riesce si vedono righe "orfane" con i codici vuoti e solo un
    pezzo di testo. La nostra strategia:
      * una riga con TUTTI i campi codice validi -> prestazione completa;
      * una riga con i 3 campi codice vuoti e solo testo nelle colonne
        descrittive -> continuazione CERTA della prestazione precedente
        (il testo viene accodato alla denominazione corrispondente);
      * qualunque altra combinazione è ambigua -> va nel report, mai
        indovinata.
    """
    prestazioni = []
    scarti = []

    with pdfplumber.open(percorso_pdf) as pdf:
        n_pagine = len(pdf.pages)
        print(f"Pagine nel PDF: {n_pagine}")

        for pagina in pdf.pages:
            num = pagina.page_number  # 1-based, comodo per il report

            # extract_tables() usa i bordi disegnati (strategia "lines"),
            # che è quella giusta per tabelle regolari come questa.
            tabelle = pagina.extract_tables()
            if not tabelle:
                # Pagine senza tabella (copertina, note): non è un errore,
                # ma lo annotiamo per trasparenza.
                scarti.append(f"pagina {num}: nessuna tabella riconosciuta")
                continue

            for tabella in tabelle:
                for riga in tabella:
                    celle = [pulisci(c) for c in riga]

                    # Righe completamente vuote: artefatti, si ignorano.
                    if not any(celle):
                        continue

                    if e_riga_intestazione(celle):
                        continue

                    # Ci aspettiamo 5 colonne. Se sono di più ma quelle in
                    # eccesso sono vuote (capita quando pdfplumber "vede"
                    # un bordo in più), le togliamo; altrimenti scartiamo.
                    if len(celle) > 5 and all(c == "" for c in celle[5:]):
                        celle = celle[:5]
                    if len(celle) != 5:
                        scarti.append(
                            f"pagina {num}: numero colonne inatteso "
                            f"({len(celle)}): {celle!r}"
                        )
                        continue

                    cod_nom, den_nom, den_estesa, cod_alfa, cod_num = celle

                    codici_validi = (
                        RE_CODICE_ALFA.match(cod_alfa)
                        and RE_CODICE_NUM.match(cod_num)
                        and cod_nom != ""
                    )
                    codici_tutti_vuoti = (
                        cod_nom == "" and cod_alfa == "" and cod_num == ""
                    )

                    if codici_validi and den_estesa:
                        prestazioni.append(
                            {
                                "codice_nomenclatore": cod_nom,
                                "denominazione_nomenclatore": den_nom,
                                "denominazione_estesa": den_estesa,
                                "codice_regionale_alfa": cod_alfa,
                                "codice_regionale_num": cod_num,
                                "tipo": deriva_tipo(den_estesa),
                            }
                        )
                    elif codici_tutti_vuoti and (den_nom or den_estesa):
                        # Continuazione certa: accodiamo il testo alla
                        # prestazione precedente, campo per campo.
                        if prestazioni:
                            prec = prestazioni[-1]
                            if den_nom:
                                prec["denominazione_nomenclatore"] = pulisci(
                                    prec["denominazione_nomenclatore"] + " " + den_nom
                                )
                            if den_estesa:
                                prec["denominazione_estesa"] = pulisci(
                                    prec["denominazione_estesa"] + " " + den_estesa
                                )
                                # Il testo è cambiato: ricalcoliamo il tipo.
                                prec["tipo"] = deriva_tipo(prec["denominazione_estesa"])
                        else:
                            scarti.append(
                                f"pagina {num}: continuazione senza riga "
                                f"precedente: {celle!r}"
                            )
                    else:
                        # Ambiguo (es. codice malformato, o codici presenti
                        # ma denominazione vuota): nel report, mai indovinato.
                        scarti.append(f"pagina {num}: riga anomala: {celle!r}")

    return prestazioni, scarti


# %% Validazioni finali ------------------------------------------------------
# Coppie di "verità nota": prestazioni di cui conosciamo con certezza la
# corrispondenza codice alfanumerico <-> codice numerico. Se il parser non
# le ritrova, qualcosa è andato storto nell'estrazione e NON scriviamo il
# JSON (meglio nessun dato che dati sbagliati, trattandosi di sanità).
VERITA_NOTE = [
    ("89.13.00.04", "10244"),  # PRIMA VISITA NEUROLOGICA - DISTURBI DEL SONNO
    ("89.01.00.39", "12158"),  # VISITA NEUROLOGICA DI CONTROLLO - DISTURBI DEL SONNO
]


def valida(prestazioni):
    """Esegue tutte le validazioni. Ritorna la lista degli errori (vuota = ok)."""
    errori = []

    if not prestazioni:
        errori.append("nessuna prestazione estratta")
        return errori

    # 1. Univocità dei codici regionali alfanumerici.
    visti_alfa = {}
    for p in prestazioni:
        c = p["codice_regionale_alfa"]
        if c in visti_alfa:
            errori.append(f"codice alfanumerico duplicato: {c}")
        visti_alfa[c] = p

    # 2. Codici numerici: solo cifre (già garantito dalla regex in
    #    estrazione, ma lo riverifichiamo: le validazioni devono valere
    #    sul risultato finale, non fidarsi dei passi intermedi) e univoci.
    visti_num = set()
    for p in prestazioni:
        c = p["codice_regionale_num"]
        if not RE_CODICE_NUM.match(c):
            errori.append(f"codice numerico non composto da sole cifre: {c!r}")
        if c in visti_num:
            errori.append(f"codice numerico duplicato: {c}")
        visti_num.add(c)

    # 3. Test di verità nota: le coppie devono esistere ed essere accoppiate
    #    tra loro (stesso record).
    for alfa, num in VERITA_NOTE:
        p = visti_alfa.get(alfa)
        if p is None:
            errori.append(f"verità nota fallita: codice {alfa} non trovato")
        elif p["codice_regionale_num"] != num:
            errori.append(
                f"verità nota fallita: {alfa} è associato a "
                f"{p['codice_regionale_num']!r} invece di {num!r}"
            )

    return errori


def controlla_sinonimi(prestazioni):
    """Controllo extra: i codici citati in data/sinonimi.json esistono?

    I sinonimi sono curati a mano, quindi è facile sbagliare un codice:
    questo controllo incrociato segnala subito refusi o codici rimossi da
    un aggiornamento del catalogo. Le voci con lista codici vuota sono
    ammesse (sono "promemoria" da completare) ma vengono elencate.
    """
    if not SINONIMI.exists():
        return []

    codici_catalogo = {p["codice_regionale_alfa"] for p in prestazioni}
    problemi = []
    dati = json.loads(SINONIMI.read_text(encoding="utf-8"))
    for voce in dati.get("voci", []):
        termini = ", ".join(voce.get("termini", [])[:3])
        codici = voce.get("codici", [])
        if not codici:
            print(f"  (promemoria) voce sinonimi senza codici: {termini}")
        for c in codici:
            if c not in codici_catalogo:
                problemi.append(
                    f"sinonimi.json: il codice {c} (voce: {termini}) "
                    "non esiste nel catalogo"
                )
    return problemi


# %% Programma principale ----------------------------------------------------
def main(percorso_pdf=None):
    """Esegue tutta la pipeline. `percorso_pdf` è sovrascrivibile nei test."""
    pdf = Path(percorso_pdf) if percorso_pdf else ottieni_pdf()

    prestazioni, scarti = estrai_prestazioni(pdf)

    # Il report si scrive SEMPRE, anche se vuoto: così si sa che il run
    # c'è stato e con quale esito.
    with REPORT.open("w", encoding="utf-8") as f:
        f.write(
            "Report di parsing del Catalogo Regionale Puglia\n"
            f"Generato il {date.today().isoformat()} da parse_catalogo.py\n"
            f"Prestazioni estratte: {len(prestazioni)}\n"
            f"Righe scartate/anomale: {len(scarti)}\n\n"
        )
        if scarti:
            f.write("Dettaglio (una riga per anomalia):\n")
            for s in scarti:
                f.write(s + "\n")
        else:
            f.write("Nessuna riga scartata.\n")

    errori = valida(prestazioni)
    if errori:
        print("\nVALIDAZIONE FALLITA — il JSON NON viene scritto:")
        for e in errori:
            print("  -", e)
        print(f"Consulta anche {REPORT}")
        sys.exit(1)

    dati = {
        "meta": {
            "fonte": URL_CATALOGO,
            "descrizione": (
                "Catalogo Regionale delle Prestazioni di Specialistica "
                "Ambulatoriale - Regione Puglia"
            ),
            "generato_il": date.today().isoformat(),
            "n_prestazioni": len(prestazioni),
        },
        "prestazioni": prestazioni,
    }
    JSON_USCITA.parent.mkdir(parents=True, exist_ok=True)
    # ensure_ascii=False mantiene le lettere accentate leggibili nel file;
    # indent=1 tiene il file "diffabile" su git senza gonfiarlo troppo.
    JSON_USCITA.write_text(
        json.dumps(dati, ensure_ascii=False, indent=1), encoding="utf-8"
    )

    # Riepilogo finale.
    per_tipo = {}
    for p in prestazioni:
        per_tipo[p["tipo"]] = per_tipo.get(p["tipo"], 0) + 1
    print("\n=== RIEPILOGO ===")
    print(f"Prestazioni estratte : {len(prestazioni)}")
    for tipo, n in sorted(per_tipo.items()):
        print(f"    di cui {tipo:14s}: {n}")
    print(f"Righe scartate/anomale: {len(scarti)}  (dettaglio in {REPORT})")
    print("Validazioni           : OK (univocità codici + verità note)")
    print(f"Scritto               : {JSON_USCITA}")

    problemi_sinonimi = controlla_sinonimi(prestazioni)
    if problemi_sinonimi:
        print("\nATTENZIONE — problemi in data/sinonimi.json (da correggere):")
        for p in problemi_sinonimi:
            print("  -", p)
        # Il catalogo è comunque valido e già scritto: usciamo con codice 2
        # per segnalare che i sinonimi vanno sistemati.
        sys.exit(2)


if __name__ == "__main__":
    main()
