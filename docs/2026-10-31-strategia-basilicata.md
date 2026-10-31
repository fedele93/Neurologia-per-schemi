# Strategia di implementazione: strumenti "Impegnative" e "SDO" per la Basilicata

Data: 2026-10-31 · Branch di lavoro: `claude/gallant-sagan-ae8xjh` · Stato: **proposta, nessun codice ancora modificato**

Obiettivo: affiancare agli strumenti per la Puglia (`strumenti/impegnative.html`,
`strumenti/sdo.html`) gli equivalenti per la Basilicata, con lo stesso standard
di affidabilità già adottato nel repo: **nessun dato inventato**, pipeline che
si rifiuta di scrivere se le validazioni falliscono, fonti e date dichiarate
nell'interfaccia.

---

## 1. Sintesi in dieci righe

1. Lo strumento **impegnative** è regionale per natura (catalogo, codici, CUP):
   serve un **catalogo Basilicata** estratto da fonte ufficiale con una pipeline
   dedicata, e il frontend va reso **multi-regione** (un solo motore, dati
   per regione) invece di duplicare la pagina.
2. Lo strumento **SDO** è quasi interamente nazionale (ICD-9-CM 2007, grouper
   CMS-DRG v24, DM 380/2000): per la Basilicata cambiano solo i riferimenti
   (disclaimer, fonti, uffici) ed eventuali regole regionali **se esistono
   documentate**. Oggi non ne ho trovate online: non vanno inventate.
3. La fonte ufficiale Basilicata è la **DGR 763 del 13/12/2024** (approvazione
   del nomenclatore tariffario regionale e del CUR, Catalogo Unico Regionale,
   in recepimento del DM 25/11/2024). **Non sono riuscito a scaricarla**: da
   questa sessione i domini `regione.basilicata.it`, `aspbasilicata.it`,
   `salute.basilicata.it` e `millewin.it` sono bloccati dalla policy di rete.
   La fase 0 (acquisizione fonti) la fai tu, a mano, e condiziona tutto il resto.
4. Finché il file ufficiale non è in `pipeline/sorgenti/basilicata/`, il
   catalogo Basilicata **non viene generato** e lo strumento **non viene
   pubblicato**: meglio uno strumento in meno che codici sbagliati.
5. Ordine di lavoro: fonti → pipeline → refactor multi-regione del frontend →
   dati curati Basilicata (pochi, verificati) → SDO (riferimenti) → sito, service
   worker, README, app Android → verifica con un collega lucano → release.

---

## 2. Com'è fatto oggi (cosa è regionale e cosa no)

| Componente | Regionale? | Note |
|---|---|---|
| `data/catalogo_puglia.json` (4074 prestazioni) | **Sì** | Generato da `pipeline/parse_catalogo.py` dal PDF del portale SIST Puglia. Campi: `codice_nomenclatore`, `denominazione_nomenclatore`, `denominazione_estesa`, `codice_regionale_alfa`, `codice_regionale_num`, `tipo`. Chiave univoca: `codice_regionale_num`. |
| `data/sinonimi.json`, `data/percorsi.json`, `data/strutture.json` | **Sì** | Curati a mano, referenziano codici pugliesi (alfa per sinonimi/strutture, numerico per percorsi). Il parser li verifica contro il catalogo. |
| `data/discipline.json` | **In parte** | Regole su parole della denominazione e prefissi del codice nomenclatore nazionale: in larga parte **riutilizzabili** per la Basilicata, da verificare la copertura. |
| `strumenti/impegnative.html` | **Sì** (hardcoded) | Titolo, disclaimer, percorsi dei 5 JSON e messaggi d'errore citano la Puglia. Logica di ricerca, filtri, copia: generica. |
| `data/icd9cm_diagnosi.json`, `icd9cm_procedure*.json` | **No** | ICD-9-CM 2007 nazionale (fonte HL7 Italia, CC0). |
| `data/sdo_sinonimi.json`, `sdo_scenari.json`, `sdo_regole.json` | **No** (regole generali) | Il disclaimer di `sdo_regole.json` cita "linee guida regionali" in generale; nessuna regola è specificamente pugliese. |
| `strumenti/sdo.html` | **Quasi no** | Un solo riferimento alla Puglia (riga 174, disclaimer). |
| `sw.js` | — | Precache elenca i JSON per nome: i nuovi file vanno aggiunti e `CACHE_NAME` incrementato. |
| `android/` | — | Copia la radice del repo a ogni build: nessuna modifica necessaria. |
| `README.md`, `termini.html`, `index.html`, `data/revisioni.json` | — | Da aggiornare (sezioni, link, date). |

Conclusione: il lavoro vero è (a) una **pipeline Basilicata** e (b) rendere
**parametrico per regione** il frontend impegnative. Il resto è integrazione.

---

## 3. Cosa ho verificato sulla Basilicata e cosa no

### Verificato (da risultati di ricerca, non dai documenti originali)

- **Atto di riferimento**: DGR Basilicata **n. 763 del 13/12/2024**,
  "Approvazione del nomenclatore tariffario regionale e del CUR per le
  prestazioni specialistiche ambulatoriali e protesiche", in attuazione
  dell'Intesa Stato-Regioni del 14/11/2024 e del DM 25/11/2024 (GU n. 302 del
  27/12/2024). Fonte: elenco delle delibere regionali di recepimento su
  [fioto.it](https://www.fioto.it/index.php?do=notizia&idnews=580).
  La decorrenza nazionale dei nuovi codici è il **30/12/2024** (altre regioni
  la esplicitano; per la Basilicata va letta nella DGR).
- **Prima del 2024** la Basilicata usava il "Nomenclatore Tariffario Unico
  Regionale" (DGR 1962/2006, in vigore dal 2007) e un "Elenco Prestazioni
  Specialistiche Ambulatoriali in vigore dal 01.07.2017, versione al
  01/12/2022" pubblicato dalla
  [Direzione generale salute](https://www.regione.basilicata.it/giunta/site/giunta/department.jsp?dep=100061&area=3003405).
  Un file "Nomenclatore Tariffario Unico Regionale" (PDF e Excel) è ancora
  linkato da [operatori.salute.basilicata.it](http://operatori.salute.basilicata.it/DNNSanita/PrestazioniSpec/Tariffario.asp)
  e da [ASP Basilicata](https://www.aspbasilicata.it/come-fare-per/tariffario-prestazioni-tariffario-prestazioni-specialistiche-e-diagnostiche-carico-del/),
  ma potrebbe essere la versione **vecchia**: va controllata la data.
- **Avvio scaglionato**: la Regione ha pubblicato una notizia
  "[ASM, dal 1° aprile il nuovo Nomenclatore tariffario](https://www.regione.basilicata.it/asm-dal-1-aprile-il-nuovo-nomenclatore-tariffario/)".
  Non ho potuto leggerla: va verificato se l'adozione del nuovo catalogo è
  partita in date diverse per ASP, ASM e AOR San Carlo.
- **Prescrizione dematerializzata**: in Basilicata i gestionali dei medici
  (es. Millewin) prescrivono su un "catalogo prescrittivo regionale"
  distribuito come tabella; il manuale è su
  [download.millewin.it](https://download.millewin.it/files/Integrazione_Basilicata/Manuale_Demat_SpecialisticaBasilicata.pdf).
  Questo suggerisce che esista una **versione tabellare (CSV/XLSX) del CUR**,
  molto più affidabile da parsare rispetto a un PDF.
- **Prenotazione**: CUP unico regionale, portale
  [prenota.sanita.basilicata.it](https://prenota.sanita.basilicata.it/main/home)
  (accesso con codice fiscale + NRE, oppure SPID/CIE), call center regionale e
  sportelli delle aziende. **Numero verde non verificato** (le fonti trovate
  sono del 2019 o precedenti).
- **SDO**: nessuna linea guida regionale lucana di codifica trovata online
  (a differenza di Piemonte, Veneto, Emilia-Romagna, Lazio, Trento). Il
  riferimento resta il manuale ministeriale + le indicazioni della Direzione
  sanitaria della propria azienda.

### Non verificato (da fare in fase 0)

- Formato e struttura del CUR Basilicata: quali colonne, se esiste un
  **codice regionale** distinto dal codice nomenclatore nazionale (in Puglia
  ci sono due codici regionali, alfanumerico e numerico; in altre regioni il
  CUR usa il solo codice nazionale più eventuali "specificazioni"), se esistono
  denominazioni estese per branca (es. "PRIMA VISITA NEUROLOGICA - EPILESSIA"
  come in Puglia, oppure solo "VISITA NEUROLOGICA").
- Se le visite sono distinte per **sottospecialità** come in Puglia: questo
  decide quanto dei `sinonimi.json` e `percorsi.json` pugliesi ha senso
  replicare.
- Regole di prescrizione locali: numero massimo di prestazioni per impegnativa,
  obbligo del quesito diagnostico (il Piano liste d'attesa 2025 lo richiede),
  classi di priorità.
- Elenco delle strutture (AOR San Carlo Potenza, ASP Basilicata, ASM Matera,
  presidi di Lagonegro, Villa d'Agri, Melfi, Policoro, Tricarico…) e dove si
  eseguono le prestazioni neurologiche: va costruito a mano, con `verificato_il`.

---

## 4. Decisioni di architettura

### 4.1 Un motore, dati per regione (niente copia-incolla della pagina)

Si rende `strumenti/impegnative.html` **parametrico**. La regione si sceglie con
`?regione=basilicata` nell'URL (così l'indice può avere due link distinti e i
link già condivisi per la Puglia continuano a funzionare perché Puglia resta il
default) e con un selettore in testata; l'ultima scelta viene ricordata in
`localStorage` (`impegnative:regione`).

Nuovo file di configurazione `data/regioni.json`:

```json
{
  "regioni": {
    "puglia": {
      "nome": "Puglia",
      "catalogo": "data/catalogo_puglia.json",
      "sinonimi": "data/sinonimi.json",
      "percorsi": "data/percorsi.json",
      "strutture": "data/strutture.json",
      "discipline": "data/discipline.json",
      "chiave": "codice_regionale_num",
      "campi_codice": [
        {"campo": "codice_regionale_alfa", "etichetta": "Codice regionale"},
        {"campo": "codice_regionale_num", "etichetta": "Codice numerico"},
        {"campo": "codice_nomenclatore", "etichetta": "Nomenclatore"}
      ],
      "codice_per_impegnativa": "codice_regionale_alfa",
      "fonte_ufficiale": "Catalogo Regionale (portale SIST) e CUP",
      "prenotazione": "CUP regionale, farmacie abilitate, PugliaSalute",
      "esempio_ricerca": "sonno, OSAS, 89.13…"
    },
    "basilicata": {
      "nome": "Basilicata",
      "catalogo": "data/basilicata/catalogo.json",
      "sinonimi": "data/basilicata/sinonimi.json",
      "percorsi": "data/basilicata/percorsi.json",
      "strutture": "data/basilicata/strutture.json",
      "discipline": "data/discipline.json",
      "chiave": "DA DEFINIRE dopo la fase 0",
      "campi_codice": "DA DEFINIRE dopo la fase 0",
      "codice_per_impegnativa": "DA DEFINIRE",
      "fonte_ufficiale": "DGR 763/2024 (nomenclatore tariffario regionale e CUR) e CUP regionale",
      "prenotazione": "CUP unico regionale: prenota.sanita.basilicata.it, call center, sportelli ASP/ASM/AOR",
      "esempio_ricerca": "…"
    }
  }
}
```

Perché così:
- il JS non contiene più nomi di campo pugliesi: scheda, pulsante "copia" e
  indice di ricerca leggono `campi_codice` e `chiave` dalla configurazione;
- `discipline.json` resta **condiviso** (lavora su parole e prefissi del
  nomenclatore nazionale), con la possibilità di sovrascriverlo per regione se
  la copertura in Basilicata risultasse bassa;
- aggiungere una terza regione in futuro significa aggiungere una voce e una
  cartella `data/<regione>/`.

Organizzazione dei file: i dati pugliesi **restano dove sono** (nessuna
rottura di link, cache, APK già distribuiti); i nuovi vanno in
`data/basilicata/`. Eventuale riordino di Puglia in `data/puglia/` solo in
un secondo momento, con redirect nel service worker.

### 4.2 Pipeline: libreria comune + un estrattore per regione

- `pipeline/catalogo_lib.py`: ciò che oggi è in `parse_catalogo.py` e non
  dipende dal PDF pugliese (`pulisci`, `deriva_tipo`, validazione univocità,
  test di verità nota, scrittura JSON con `meta`, controllo di sinonimi,
  percorsi e copertura discipline), parametrizzato su percorsi e nome del campo
  chiave.
- `pipeline/parse_catalogo.py`: resta l'estrattore Puglia, importa la libreria.
  Comportamento e output **identici** a oggi (verifica: rigenerare il JSON e
  controllare `git diff` vuoto a parte la data).
- `pipeline/parse_catalogo_basilicata.py`: estrattore Basilicata. Il formato si
  decide in fase 0: se il CUR è distribuito in XLSX/CSV si usa `openpyxl`/`csv`
  (niente ricomposizione di celle spezzate, molto meno rischio); se solo PDF,
  `pdfplumber` come per la Puglia.
- Stesse garanzie: `VERITA_NOTE` lucane (almeno 3 coppie codice-denominazione
  lette **a mano** dal documento ufficiale, es. prima visita neurologica, EEG,
  RM encefalo), report `pipeline/report_parsing_basilicata.txt`, uscita con
  errore se una validazione fallisce, exit code 2 se i dati curati citano
  codici inesistenti.
- Sorgenti in `pipeline/sorgenti/basilicata/` (PDF/XLSX in `.gitignore`, come
  il PDF pugliese; versionare solo i JSON estratti) con un `FONTE.md` che
  riporta URL, numero di DGR, data di download e hash SHA-256 del file.

### 4.3 SDO: riferimenti per regione, regole solo se documentate

- Nuovo `data/sdo_regioni.json`: per ogni regione il testo del disclaimer, le
  fonti (manuale ICD-9-CM 2007, DM 380/2000, eventuali linee guida regionali
  con estremi e link), gli uffici a cui chiedere (Direzione sanitaria / ufficio
  SDO di AOR San Carlo, ASP, ASM) e la nota sulle tariffe DRG regionali.
- `strumenti/sdo.html`: selettore regione (stesso parametro `?regione=` e stessa
  chiave `localStorage`, così chi passa dall'uno all'altro strumento resta nella
  stessa regione); il disclaimer e un riquadro "Fonti e riferimenti" vengono
  dalla configurazione. Nessun'altra modifica funzionale.
- `data/sdo_regole.json`: campo opzionale `regioni: ["puglia"]` per regole
  valide solo in una regione. **Per la Basilicata si parte senza regole
  regionali**: se ne aggiungono solo con documento alla mano (circolare o
  linee guida aziendali), citato nel campo `fonte` della regola.

---

## 5. Piano per fasi

### Fase 0: acquisizione e lettura delle fonti (a carico tuo, ~1-2 ore)

Da questa sessione non posso scaricare nulla dai siti lucani. Serve che tu
salvi in `pipeline/sorgenti/basilicata/`:

1. **DGR 763/2024** con **tutti gli allegati** (nomenclatore tariffario
   regionale e CUR). Dove cercarla: Bollettino Ufficiale della Regione
   Basilicata (dicembre 2024) oppure la sezione "Specialistica ambulatoriale"
   della Direzione generale salute. Se gli allegati sono in XLSX, è la
   versione da preferire.
2. La **tabella del catalogo prescrittivo** usata dai gestionali (se la
   Regione o un'azienda la pubblica): è l'elenco effettivamente prescrivibile,
   con codici e denominazioni ufficiali.
3. Eventuali **circolari** aziendali o regionali su prescrizione (quesito
   diagnostico, classi di priorità, numero massimo di prestazioni per ricetta)
   e sulla **codifica SDO**.
4. Una copia della pagina **CUP** con canali e orari aggiornati.

Poi insieme rispondiamo alle domande della sezione 3 ("Non verificato") e
fissiamo `chiave`, `campi_codice` e le verità note. Esito della fase: un
`pipeline/sorgenti/basilicata/FONTE.md` compilato. **Se le fonti non sono
reperibili, ci si ferma qui**: lo strumento non si pubblica.

### Fase 1: pipeline Basilicata (~1 sessione)

- Refactor in `catalogo_lib.py` + test di non regressione sulla Puglia (JSON
  identico).
- Scrittura di `parse_catalogo_basilicata.py` sul formato reale.
- Prima esecuzione, lettura integrale del report: righe scartate zero o
  spiegate una per una.
- Controllo incrociato: per 15-20 prestazioni neurologiche confrontare
  codice e denominazione nel JSON con il documento ufficiale aperto accanto.
- Copertura `discipline.json` sul catalogo lucano: se sotto il 95%, si
  estendono le regole (parole/prefissi) o si crea `data/basilicata/discipline.json`.

### Fase 2: frontend impegnative multi-regione (~1 sessione)

- Introduzione di `data/regioni.json` e del caricamento parametrico.
- Selettore regione in testata; titolo, disclaimer, placeholder, messaggi
  d'errore e testo di prenotazione presi dalla configurazione.
- Scheda prestazione e "copia per impegnativa" generiche sui `campi_codice`.
- Test manuale su Puglia: ogni funzione (ricerca, filtri, discipline,
  percorsi, strutture, copia) deve comportarsi come prima. Test su Basilicata
  con il catalogo generato.
- Nessun dato del paziente, nessuna chiamata di rete nuova: la privacy
  descritta in `termini.html` resta vera.

### Fase 3: dati curati Basilicata (~1 sessione, poi incrementale)

- `data/basilicata/sinonimi.json`: si parte dalle **stesse voci cliniche**
  della Puglia (sonno, cefalea, demenza, epilessia, SM, EEG, EMG, RM…) ma con i
  codici lucani cercati nel catalogo generato; dove il catalogo lucano non
  distingue la sottospecialità, la voce punta alla visita generica con una
  `nota` che lo spiega.
- `data/basilicata/percorsi.json`: solo i percorsi che hanno riscontro nel
  catalogo (es. RM encefalo + rachide per demielinizzanti). Il campo
  `meta.prenotazione` descrive il CUP lucano.
- `data/basilicata/strutture.json`: solo voce d'esempio finché non si hanno
  dati verificati; poi Neurologia AOR San Carlo, ambulatori ASP/ASM, con
  `verificato_il`.
- Ogni file passa dalla pipeline (codici inesistenti bloccano).

### Fase 4: SDO (~mezza sessione)

- `data/sdo_regioni.json` con Puglia e Basilicata; selettore e riquadro fonti
  in `sdo.html`; riga 174 non più hardcoded.
- Nessuna regola nuova senza documento. Nel README si dichiara esplicitamente
  che per la Basilicata non sono state reperite linee guida regionali di
  codifica e che fa fede l'azienda.

### Fase 5: integrazione nel sito e nell'app (~mezza sessione)

- `index.html`: due link ("… – Puglia", "… – Basilicata") nella sezione
  Strumenti amministrativi, e il link SDO invariato (lo strumento è uno).
- `sw.js`: aggiungere `data/regioni.json`, `data/basilicata/*.json`,
  `data/sdo_regioni.json` alla precache; `CACHE_NAME` a `v9`.
- `README.md`: sezione "Strumenti regionali" con la tabella fonte/atto/data per
  regione, come rigenerare ciascun catalogo, come aggiungere una regione.
- `termini.html`: la frase sugli strumenti interattivi cita anche gli
  strumenti amministrativi e che fanno fede i cataloghi regionali.
- `data/revisioni.json`: date aggiornate dal `git log`.
- Android: nessuna modifica, ma la release successiva (tag) va fatta dopo il
  merge così l'APK include i nuovi dati.

### Fase 6: verifica e rilascio

- Revisione a quattro occhi: un collega che lavora in Basilicata prova 10
  ricerche reali (prime visite, controlli, EEG, EMG, RM, polisonnografia) e
  confronta con il CUP. Si registra l'esito in `revisioni/` come fatto per la
  revisione della letteratura.
- Pull request con descrizione delle fonti usate, output della pipeline e
  checklist (sotto). Merge su `main`, poi tag per l'APK.

---

## 6. Regole di veridicità (non negoziabili)

1. Ogni codice nel JSON del catalogo proviene **solo** dall'estrazione
   automatica del documento ufficiale; mai inserito a mano.
2. I file curati possono contenere **solo** codici che esistono nel catalogo
   generato (la pipeline lo impone).
3. Ogni file dichiara in `meta`: fonte (URL o estremi dell'atto), data di
   generazione o `aggiornato_il`, numero di prestazioni; l'interfaccia li mostra.
4. Nessuna regola SDO, nota di prescrizione o informazione sul CUP viene
   scritta "a memoria": o c'è un documento citato, o si scrive "non verificato"
   e il frontend lo rende visibile.
5. Le verità note sono lette dal documento ufficiale da una persona e
   commentate nel codice con pagina/riga di provenienza.
6. Il disclaimer "strumento non ufficiale, fanno fede catalogo regionale e CUP"
   resta sempre visibile in entrambe le regioni.

---

## 7. Rischi e punti aperti

| Rischio | Impatto | Mitigazione |
|---|---|---|
| Il CUR Basilicata è disponibile solo come PDF con tabelle irregolari | Estrazione difficile, molte righe scartate | Chiedere alla Regione/azienda la versione tabellare; in alternativa report rigoroso e verità note abbondanti |
| Il catalogo lucano non distingue le sottospecialità neurologiche | Sinonimi e percorsi molto più poveri che in Puglia | Dirlo chiaramente nelle `note`; non inventare prestazioni |
| Due cataloghi in vigore (vecchio nomenclatore 2006/2017 e nuovo 2024) a seconda dell'azienda o della data | Codici "giusti" ma non prenotabili | Verificare la decorrenza nella DGR e la notizia "ASM dal 1° aprile"; mostrare la data di decorrenza nel meta |
| Nessuna linea guida SDO regionale | Tentazione di scrivere regole a memoria | Lasciare vuoto e indicare l'ufficio aziendale |
| Il refactor multi-regione rompe qualcosa per la Puglia | Regressione su uno strumento già in uso | JSON Puglia invariato; test manuale completo prima del merge; il default resta Puglia |
| Rete bloccata in questa sessione | Non posso verificare le fonti di persona | Fase 0 a carico tuo; i file entrano nel repo (solo i JSON) con `FONTE.md` |

---

## 8. Checklist di rilascio

- [ ] `pipeline/sorgenti/basilicata/FONTE.md` compilato (atto, URL, data, hash)
- [ ] `python pipeline/parse_catalogo.py` rigenera la Puglia senza differenze
- [ ] `python pipeline/parse_catalogo_basilicata.py` esce con codice 0, report letto
- [ ] Verità note Basilicata: almeno 3, con provenienza commentata
- [ ] Copertura discipline Basilicata riportata nel README
- [ ] Sinonimi/percorsi/strutture Basilicata validati dalla pipeline
- [ ] `impegnative.html`: Puglia identica a prima; Basilicata funzionante; selettore e URL `?regione=`
- [ ] `sdo.html`: disclaimer e fonti per regione; nessuna regola non documentata
- [ ] `index.html`, `sw.js` (v9), `README.md`, `termini.html`, `revisioni.json` aggiornati
- [ ] Revisione di un collega lucano registrata in `revisioni/`
- [ ] PR con fonti e output della pipeline; tag APK dopo il merge
