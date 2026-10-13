# Revisione della letteratura e della qualità — dettaglio per area (12 ottobre 2026)

Report dei nove revisori, uno per area. La sintesi e le decisioni sono in `2026-10-12-revisione-letteratura.md`.

---

# A. Cerebrovascolare

## Report revisione A — Area cerebrovascolare (ottobre 2026)

Revisore: neurologo vascolare (revisione editoriale e di letteratura). Branch `revisione-contenuti`, nessun commit.
Metodo: lettura integrale di ogni file; verifica di dosi, soglie, criteri e trial contro AHA/ASA 2026 (Guideline for the Early Management of Patients With Acute Ischemic Stroke, Stroke 2026, DOI 10.1161/STR.0000000000000513, verificata su PubMed), ESO 2021/2023, ESO/ESMINT 2024 (occlusione basilare, Eur Stroke J 2024, DOI 10.1177/23969873241257223, verificata su PubMed), schede tecniche EMA dei DOAC e di Metalyse, SRU 2003 / IAC 2021 (Gornik et al., Vasc Med 2021, DOI 10.1177/1358863X211011253, verificata su PubMed), SONIA, Baumgartner, Kent (PASCAL). Controlli tecnici su tutte e sei le pagine: bilanciamento tag HTML (script del BRIEF: nessun tag aperto, nessun errore), Playwright headless 400×900 (nessun `pageerror`, `scrollWidth` = 400 su tutte, Mermaid renderizzato in entrambe le flowchart: 1 SVG, nessun nodo di errore). L'unico messaggio di console è il caricamento fallito dell'icona GitHub esterna (flaticon), dovuto alla rete della sandbox, presente in tutte le pagine del sito.

---

### Schemi1/ictus_pocket_guide.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- DAWN, gruppo <80 anni con NIHSS ≥20: "core 31-59 ml" → "core 31-51 ml" (DAWN, NEJM 2018: gruppo C 31-<51 mL). Aggiunta la finestra 6-24h all'intestazione.
- Alteplase: "10% bolo 2 min" → "10% bolo in 1 min" (AHA/ASA 2019/2026).
- Controindicazione "STEMI <7 giorni" (criterio non esistente nelle linee guida) → "IMA <3 mesi (relativa: IVT ragionevole se NSTEMI o STEMI inferiore)" (AHA/ASA 2019/2026).
- Gestione dell'ICH sintomatica post-IVT: "PCC-4F 25-50 UI/kg + acido tranexamico" → crioprecipitato 10 U (o fibrinogeno 2-4 g) se fibrinogeno <150-200 mg/dl + acido tranexamico 1 g in 10 min; PCC-4F solo se in AVK; piastrine se <100k (AHA/ASA 2019 tab. 10, 2026). Coerentemente aggiornata la riga "Gestione ICH" nella sezione complicanze.
- "Sindrome da riperfusione: PA target <120/80 (labetalolo)" → evitare target intensivi dopo ricanalizzazione (PAS <120-140 dannosa: ENCHANTED2/MT Lancet 2022, OPTIMAL-BP JAMA 2023, BEST-II JAMA 2023); mantenere PAS <180 evitando ipotensione.
- Xaban e IVT: "iXa <30 ng/ml + antiXa <0,5 + PT <1,4" (parametri ridondanti/non standard) → "ultima dose >48h con funzione renale normale, o anti-Xa calibrato per il farmaco <30-50 ng/ml" (ESO 2021 IVT). Aggiunta nota sui dati osservazionali (Meinel et al., JAMA Neurol 2023) con la precisazione che l'IVT entro 48h da DOAC resta off-label.
- Tenecteplase: "preferita" → "alternativa raccomandata all'alteplase entro 4,5h (ESO 2023, AHA/ASA 2026; indicazione EMA 2025 per Metalyse 25 mg)"; bolo "in 5-10 secondi"; esplicitato che la dose 0,40 mg/kg non è approvata. Tabella peso/dose verificata contro la scheda tecnica EMA (15/17,5/20/22,5/25 mg): corretta.
- Link "Gestione ictus emorragico": da URL assoluto github.io a link relativo `gestione_ictus_emorragico.html` (funziona anche offline nell'app Android).

#### Miglioramenti applicati
- Trombectomia: aggiunti ASPECTS ≥6 come criterio standard e il beneficio per ASPECTS 3-5 (SELECT2, ANGEL-ASPECT NEJM 2023; RESCUE-Japan LIMIT NEJM 2022; TENSION Lancet 2023); nota che l'IVT non va omessa nei candidati a EVT (bridging); basilare: NIHSS ≥10 con ATTENTION (<12h) e BAOCHE (6-24h), citata ESO/ESMINT 2024; MR CLEAN-LATE (selezione su collaterali 6-24h).
- MeVO: aggiunto che l'EVT non è di routine (ESCAPE-MeVO e DISTAL, NEJM 2025: nessun beneficio), IVT se eleggibile.
- Trombolisi oltre 4,5h: EXTEND (alteplase) e TNK solo con LVO + mismatch se EVT non disponibile (TRACE-III 2024; TIMELESS neutro).
- Monitoraggio PA post-IVT completato con lo schema 15 min × 2h, 30 min × 6h, ogni ora × 16h.
- Controindicazioni: aggiunta emorragia GI/urinaria <21 giorni.
- Aggiunto riquadro fonti in calce (stile della pagina) con linee guida e trial citati.

#### Da verificare (non modificato)
- "Riocclusione (18%)" dopo IVT — stima plausibile ma senza fonte univoca (dati 14-34% a seconda delle serie) — Alexandrov, Stroke 2002; Seners, JNNP 2015.
- Iperglicemia: "Rivaluta IVT se glicemia <350" — soglia da protocollo locale; le linee guida parlano solo di >400 mg/dL come controindicazione relativa — AHA/ASA 2026.
- "Emorragiche (6-7%)" come frequenza complessiva: coerente con NINDS (6,4% sICH), ma con la definizione ECASS/SITS la sICH è 2-3% — specificare la definizione se si vuole.
- Soglie pressorie pre-IVT (<185/110) e post-IVT/EVT (<180/105 per 24h): verificate e attuali (AHA/ASA 2019/2026; ESO 2021 PA).

#### Note di qualità
- Pagina densa ma leggibile su 400 px; i tab funzionano; le tabelle entrano nello schermo. Le CSS della classe `.contatti` non esistono (come nelle altre pagine): innocuo.

---

### flowcharts/ictus_acuto.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Nodo K: "PA <185/105 mmHg" → "PA <185/110 mmHg" (soglia pre-trombolisi; AHA/ASA 2019/2026).
- Nodo G (finestra standard IVT): "≥16 anni, ASPECT ≥7" → "≥18 anni, no ipodensità estesa >1/3 ACM" (l'ASPECTS non è un criterio di eleggibilità all'IVT; età ≥18 nelle linee guida).
- Note cliniche: "ASPECT ≥7 ideale" → "ASPECTS ≥6 criterio standard per EVT; 3-5 con beneficio dimostrato (SELECT2, ANGEL-ASPECT, RESCUE-Japan LIMIT, TENSION)".
- "Tenecteplase preferita per maggior efficacia e sicurezza" → alternativa raccomandata, non inferiore, più pratica (ESO 2023, AHA/ASA 2026, EMA 2025).
- Basilare: la "raccomandazione forte ESO 2024" è stata ricondotta alla fonte reale (linea guida ESO/ESMINT 2024 sull'occlusione basilare, basata su ATTENTION e BAOCHE) sia nel nodo CC sia nelle note.
- Nodo AA "No DAPT post-trombolisi" → "DAPT post-IVT non standard: CHANCE, POINT, THALES escludevano IVT".
- Nodo FF "Antiaggregazione duale iniziale" → "DAPT 21 gg se NIHSS ≤3-5 o TIA ad alto rischio (CHANCE, POINT, THALES)".
- Nodo S: aggiunti finestra e mismatch ≥15 ml per DEFUSE-3, 6-24h per DAWN.
- Nodo O: dosi massime (TNK 25 mg, alteplase 90 mg).

#### Miglioramenti applicati
- Nodo R: "Valutare MeVO" → "MeVO: EVT non di routine (ESCAPE-MeVO, DISTAL 2025)"; nota clinica dedicata ai MeVO.
- Nota clinica sulle soglie pressorie pre/post IVT e sul non abbassare in modo intensivo dopo ricanalizzazione.
- Aggiunto il link "Torna all'indice principale" (mancava: c'era solo il ritorno alla guida).
- Riferimenti aggiornati (AHA/ASA 2026, ESO 2021/2023, ESO/ESMINT 2019/2024; elenco trial completo) e data "Ottobre 2026".
- Il diagramma Mermaid è stato verificato dopo le modifiche: rende correttamente (1 SVG, nessun errore di parsing); nei nodi ho evitato parentesi tonde, che Mermaid interpreta come sintassi di forma.

#### Da verificare (non modificato)
- "Door-to-needle <45-60 min, door-to-groin <90 min": target organizzativi ragionevoli ma non uniformi tra le fonti (AHA: DTN ≤60 min nel ≥50% e ≤45 min nel ≥50% come obiettivo secondario) — AHA/ASA 2026, Target: Stroke III.
- "Lab a 6h e 24h" post-IVT: pratica locale, non prescritta dalle linee guida.

#### Note di qualità
- La libreria Mermaid è locale (`vendor/mermaid/mermaid-10.min.js`, 3,3 MB): funziona offline ma pesa; accettabile per l'app.

---

### flowcharts/fa_anticoagulazione.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- "Tutti i DOAC controindicati se CrCl <15": in Europa il **dabigatran è controindicato con CrCl <30 mL/min** (RCP Pradaxa) — corretto nel riquadro di avvertenza e nel nodo del dabigatran.
- "Edoxaban controindicato se CrCl >95" → non è una controindicazione in scheda EMA (uso solo dopo attenta valutazione; FDA: non usare) — riformulato.
- Dabigatran, criteri di riduzione: "età ≥80 o alto rischio emorragico" → obbligatoria se ≥80 anni o verapamil; da considerare se 75-79 anni, CrCl 30-50, gastrite/esofagite/reflusso, alto rischio emorragico (RCP EMA).
- Rivaroxaban: riduzione a 15 mg se CrCl 15-49 (non 15-50) mL/min (RCP Xarelto).
- Apixaban: aggiunto il criterio "CrCl 15-29 mL/min da sola" oltre alla regola 2 su 3 (età ≥80, peso ≤60 kg, creatinina ≥1,5 mg/dL) (RCP Eliquis).
- Edoxaban: "P-gp inibitori" specificati (ciclosporina, dronedarone, eritromicina, ketoconazolo) (RCP Lixiana).
- "Storia di sanguinamento GI: dabigatran 110 mg" → apixaban (o dabigatran 110 mg), con avvertenza che dabigatran 150, rivaroxaban ed edoxaban 60 danno più sanguinamenti GI (RE-LY, ROCKET-AF, ENGAGE AF; EHRA 2021).
- Ramo "dabigatran" del diagramma: rimosso "precedente ICH" come criterio di scelta (nessuna evidenza a favore; dopo ICH si preferisce di norma apixaban) → sostituito con "CrCl >50, no dispepsia/reflusso"; reversal: aggiunti andexanet/PCC per gli anti-Xa.

#### Miglioramenti applicati
- Nota ESC 2024: CHA₂DS₂-VA (senza sesso), ≥2 anticoagulare, 1 considerare; HAS-BLED per correggere i fattori modificabili; dopo ictus/TIA il punteggio è comunque ≥2.
- Riquadro breve sul timing dell'avvio del DOAC dopo ictus (TIMING, ELAN, OPTIMAS, CATALYST 2025), con rimando alla pagina di prevenzione secondaria.
- Aggiunto il link "Torna all'indice principale"; riferimenti aggiornati (ACC/AHA 2023, ESC 2024, EHRA 2021, RCP EMA; trial registrativi) e data "Ottobre 2026".
- Diagramma Mermaid verificato dopo le modifiche: rende correttamente.

#### Da verificare (non modificato)
- Disponibilità commerciale di andexanet alfa in Italia/UE nel 2026 (vicende regolatorie recenti): ho scritto "disponibilità limitata" — AIFA/EMA.
- Il diagramma mantiene le soglie CHA₂DS₂-VASc sesso-specifiche (ACC/AHA 2023); con ESC 2024 lo schema cambierebbe in CHA₂DS₂-VA: scelta editoriale da fare dall'autore.

#### Note di qualità
- La tabella CHA₂DS₂-VASc e quella dei dosaggi sono entro 400 px; funzione di evidenziazione righe OK.

---

### Schemi1/neurosonologia.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Tabella "Stenosi intracraniche – Criteri SONIA": i valori erano in realtà le soglie TCCS di Baumgartner (PSV) **spostate di una classe** (la colonna "≥50%" riportava le soglie per stenosi <50%, la colonna "≥70%" quelle per ≥50%), con rischio di sovrastima; SONIA usa invece MFV al TCD. Tabella ricostruita con colonne separate: TCD MFV ≥50% (SONIA, Feldmann Neurology 2007: MCA ≥100, sifone ≥90, VA ≥80, BA ≥80), TCD MCA ≥70% (Zhao, Stroke 2011: MFV ≥120, PSV ≥180, ratio ≥3), TCCS PSV <50% e ≥50% (Baumgartner, Stroke 1999: MCA 155/220, ACA 120/155, PCA 100/145, VA 90/120, BA 100/140). Titolo e voci di indice aggiornati (anchor invariata).
- Classificazione **PASCAL**: la pagina descriveva un inesistente "PFO Anatomical Score" a punti (tunnel, valvola di Eustachio, rete di Chiari) con stratificazione 0-2/3-4/≥5. Sostituita con la classificazione PASCAL reale (Kent et al., JAMA 2021): RoPE <7/≥7 × presenza di ASA o shunt ampio → improbabile / possibile / probabile, con l'entità del beneficio della chiusura e la raccomandazione ESO 2024. Ora coerente con la pagina di prevenzione secondaria, che usa i gradi PASCAL.
- Arterite a cellule giganti: spessore ascellare ">0,7 mm" → ">1,0 mm" (temporale >0,42 mm) (OMERACT/EULAR 2018-2023).
- Sviri ratio: tabella e indice erano in contraddizione (normale <2,5 vs patologico >2,5); allineati a Sviri 2006: >2,0 vasospasmo, >2,5 restringimento >25%, >3,0 restringimento >50%, con MFV BA >85.
- Riferimenti: "SRU Consensus 2023" → SRU 2003 (Grant et al., Radiology 2003) + IAC 2021; aggiunte le fonti per le stenosi intracraniche, Mannheim, vasospasmo, PASCAL/ESO 2024; "ESVS 2023" specificata (Naylor, EJVES 2023); data aggiornata.
- Rimossi lo `<script>` Mermaid (3,3 MB) e la chiamata `mermaid.initialize`: la pagina non contiene alcun diagramma e il caricamento era inutile su telefono. Verificato con Playwright che non compaiono errori JS dopo la rimozione.

#### Miglioramenti applicati
- Nota sotto la tabella ICA: criteri SRU 2003 (gradi NASCET), parametri primari PSV e ratio; proposta IAC 2021 (PSV ≥180 cm/s per ≥50%, specificità maggiore; ≥230 + EDV ≥100 per ≥70%); conferma con angio-TC/RM se parametri discordanti o stenosi/occlusione controlaterale.
- Formula TAMMV: precisato che è la media temporale dell'inviluppo di velocità massima calcolata dall'apparecchio (la formula a tre termini è solo una stima).

#### Da verificare (non modificato)
- Formula "Czosnyka: ICP = 4,47 × PI + 12,68" — non ho trovato riscontro certo di questa regressione attribuita a Czosnyka (Bellner 2004 è corretta) — verificare la fonte o rimuovere.
- Succlavia: soglie PSV >180 (>50%) e >250 (>70%) e "tardus-parvus" per >70% — criteri non standardizzati in letteratura — verificare (es. criteri di Mousa/Yurdakul).
- Lindegaard: gradazione 3-4 / 4-6 / >6 e MFV 120-150/150-200/>200 — varianti diverse in letteratura (3-6 lieve-moderato) — accettabile, segnalato.
- ONSD ≥5,0 mm come soglia adulti: le soglie variano 5,0-5,7 mm a seconda delle serie.
- "Trombo fluttuante: anticoagulazione terapeutica (ESVS 2023)" — ESVS 2023 ammette anticoagulazione o DAPT e rivascolarizzazione precoce in casi selezionati.
- Sezione anemia falciforme: diverse voci (soglia trasfusionale in gravidanza TAMMV >185, "idrossiurea ↓10-20%", "febbre ↑10%/°C") sono plausibili ma non rintracciabili in STOP/STOP2/ASH 2020: verificare o attenuare.

#### Note di qualità
- Pagina molto lunga (18 sezioni collassabili) ma ben navigabile; tutte le tabelle sono in `.table-container` scrollabile; nessuno scroll orizzontale a 400 px. La sezione sull'anemia falciforme è marginale per il pubblico (neurologia dell'adulto) ma non dannosa.

---

### Schemi1/gestione_ictus_emorragico.html
Giudizio: MANTIENI (solo controllo di coerenza; nessuna modifica)

#### Correzioni applicate
- Nessuna.

#### Miglioramenti applicati
- Nessuno.

#### Da verificare (non modificato)
- Intestazione "ESO bundle 2023" vs fonti "Eur Stroke J 2024;9:295-302": il consensus è online dicembre 2023, a stampa 2024; armonizzare a piacere.
- Mannitolo: "0,5 g/kg (es. 100 mL di soluzione al 18% × 6/die)": 100 mL al 18% = 18 g, cioè ~0,25 g/kg per 70 kg; l'esempio non coincide con la dose per kg — protocollo locale da chiarire.
- "Analisi pooled INTERACT1-4 + ATACH-2 (Int J Stroke 2026)": fonte recente non verificabile da me.
- Trasfusione piastrinica "fino a <75.000 se prognosi buona": soglia da lezione, non da linea guida.

#### Note di qualità
- Coerenza interna buona: dosi andexanet (bolo/infusione/flaconi) coerenti con la scheda tecnica; tabella low/high dose corretta; idarucizumab, PCC, vitamina K, protamina corretti; criteri ENRICH/SWITCH/CLEAR III e ICH score corretti; soglie pressorie (PAS <140, evitare <110 e cali >70-90 mmHg) coerenti con ESO/EANS 2025 e bundle. Nessun errore evidente. HTML bilanciato, nessuno scroll orizzontale.

---

### Schemi1/prevenzione_secondaria.html
Giudizio: MANTIENI (dopo tre correzioni puntuali di coerenza)

#### Correzioni applicate
- DAPT breve: "ictus minore (NIHSS <5) o TIA ad alto rischio (ABCD2 >4)" → "NIHSS ≤3 con clopidogrel (CHANCE/POINT), ≤5 con ticagrelor (THALES); ABCD2 ≥4" (AHA/ASA 2021; i trial citati).
- Timing dell'anticoagulazione: la frase diceva "tra 2 e 14 giorni (AHA/ASA: tra 4 e 14 giorni 2a, B-NR)", contraddicendosi; AHA/ASA 2021 raccomanda 2-14 giorni (2a, B-NR); l'HR 0,53 per 4-14 vs <4 giorni è un dato osservazionale: riformulato.
- PFO, caratteristiche che orientano alla chiusura: "tunnel lungo (>2 mm)" → ">10 mm" (coerente con la pagina di neurosonologia e con la letteratura).

#### Miglioramenti applicati
- Nessuno (pagina aggiornata il mese scorso, non riscritta).

#### Da verificare (non modificato)
- Fonti 2026 (TAPIS Lancet 2026, CHAMPION-AF NEJM 2026, STABLED e HOPE JAMA Neurol 2026, ISPS25, pooled Int J Stroke 2026): non verificabili da me; i numeri riportati sono internamente coerenti.
- "D-dimero ≥2,5 mg/dL" (unità insolita: di norma µg/mL FEU o ng/mL) — verificare unità nella fonte ISPS25.
- "Prima linea ACE-inibitore o sartano; seconda linea calcio-antagonista o tiazidico": AHA/ASA 2021 pone tiazidici, ACE-i e sartani sullo stesso piano.
- Carico di clopidogrel 300 mg (CHANCE) vs 600 mg (POINT): entrambi accettabili, specificare se si vuole.

#### Note di qualità
- Pagina estesa e coerente con l'ictus pocket guide sulle soglie pressorie (<180/105 post-rivascolarizzazione). HTML bilanciato, nessuno scroll orizzontale, link alla flowchart FA funzionante.

---

### Sintesi
Le quattro pagine da revisionare erano nel complesso aggiornate al 2024 ma contenevano alcuni errori di fatto rilevanti per l'uso clinico: core DAWN 31-59 invece di 31-51 ml, PA pre-IVT <185/105 invece di <185/110, "STEMI <7 giorni" come controindicazione, PCC come trattamento dell'ICH da trombolisi, target <120/80 dopo riperfusione, dabigatran dichiarato utilizzabile fino a CrCl 15 (in UE è controindicato <30), criteri intracranici etichettati "SONIA" ma in realtà soglie TCCS spostate di una classe, e una classificazione "PASCAL" inventata. Tutto è stato corretto in place mantenendo struttura e stile, con aggiunta dei trial 2022-2025 richiesti (large core, basilare, MeVO, DAPT breve, TNK) e di riquadri/riferimenti aggiornati a AHA/ASA 2026 ed ESO/ESMINT 2024. Le due pagine di solo controllo (ICH e prevenzione secondaria) sono coerenti e di buona qualità; nella seconda ho corretto tre incongruenze puntuali. Entrambe le flowchart Mermaid rendono correttamente dopo le modifiche; nessuna pagina ha scroll orizzontale a 400 px né errori JS.

File modificati: Schemi1/ictus_pocket_guide.html, flowcharts/ictus_acuto.html, flowcharts/fa_anticoagulazione.html, Schemi1/neurosonologia.html, Schemi1/prevenzione_secondaria.html (Schemi1/gestione_ictus_emorragico.html: letto, nessuna modifica).

---

# B. Urgenze, epilessia, gestione internistica

## Report revisione B — Urgenze neurologiche, epilessia e medicina d'urgenza

Revisore: neurologo (urgenze/epilessia), revisione editoriale e di letteratura. Data: ottobre 2026. Branch `revisione-contenuti`, nessun commit.
Metodo: lettura integrale di ogni file, elenco delle affermazioni verificabili, confronto con le fonti primarie (ILAE 2015/2025, AES 2016, ESETT 2019, LICE 2020, ASRA 2018, ESAIC/ESRA 2022, EHRA 2021, IDSA 2004/ESCMID 2016, ESC 2019-2024, ERC 2021, ESC Council on Hypertension 2019, AHA/ASA 2019-2022, ESO 2021, ERBP/ESE 2014, UKKA 2023, Endocrine Society 2023, consenso ADA/EASD/JBDS/AACE/DTS 2024, ADA 2025). Verifiche dirette eseguite in sessione: abstract ILAE 2025 (PubMed, doi 10.1111/epi.18338: 4 classi, 21 tipi, coscienza, mioclono negativo); scheda Tavor 4 mg/ml; intervalli ESAIC 2022/ASRA 2018 per DOAC e P2Y12; criteri diagnostici e di risoluzione del consenso DKA 2024; UKKA 2023 (insulina 10 UI + 25 g glucosio, SZC 10 g x3, calcio gluconato 30 ml in 10 min); poster ERC 2021 bradicardia. La rete del sandbox non consente di aprire PDF esterni né Google Drive: dove non ho potuto leggere il testo integrale l'ho indicato in "Da verificare".

Nota trasversale (non modificata, fuori mandato): quattro pagine (stato_epilettico, crisi2025, ipertensione_e_frequenza, emergenze_glicemia) hanno un link "Share on Mastodon" **prima** del `<!DOCTYPE html>`: è un pattern di sito (presente anche altrove), funziona ma manda il documento in quirks mode. Da sistemare a livello globale, non pagina per pagina. Analogamente, `rachicentesi.html` ed `emergenze_glicemia.html` registrano `sw.js` con percorso relativo (`Schemi1/sw.js` non esiste; l'errore è intercettato dal `.catch`), e `ipertensione_e_frequenza.html` usa `/sw.js` assoluto che su GitHub Pages punta fuori dal repository: innocuo, ma inutile.

---

### Schemi1/stato_epilettico.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Lorazepam: "1-2 fiale da 2 mg/ml" → fiala da **4 mg/1 ml** (Tavor, unico lorazepam iniettabile in Italia; conservazione in frigo, diluizione 1:1); badge "x1" (ambiguo, contraddetto dal testo "ripetibile") → "ripetibile x1"; velocità 2 mg/min (AES 2016, LICE 2020).
- Diazepam: badge "x1" → "ripetibile x1", aggiunta velocità max 5 mg/min, microclisma rettale 10 mg, nota sulla breve durata d'azione (AES 2016).
- Midazolam: via "IM/EV" → "IM/buccale" (la dose 10 mg >40 kg / 5 mg 13-40 kg è quella IM di RAMPART, NEJM 2012); tabella pesi corretta ("40 kg: 10 mg" era al limite della fascia 13-40 kg → 5 mg).
- Levetiracetam: "40-60 mg/kg" → **60 mg/kg max 4,5 g** (ESETT, NEJM 2019; LICE 30-60); "controindicazione: insufficienza renale grave" → non è una controindicazione, ridurre solo il mantenimento.
- Valproato: dose ESETT **40 mg/kg max 3 g** evidenziata; controindicazioni completate (pancreatite, POLG/mitocondriopatie, difetti del ciclo dell'urea, interazione con carbapenemi).
- Fenitoina: "15-18 mg/kg + 5" → **18-20 mg/kg (max ~1500 mg) + 5-10 mg/kg** (AES 2016, LICE 2020; fosfenitoina 20 mg PE/kg di ESETT indicata come non in commercio in Italia); rimossa la dicitura errata "12-29 fiale da 50 mg/ml" (la fiala italiana è 250 mg/5 ml = 50 mg/ml); aggiunti filtro in linea, 25 mg/min in anziani/cardiopatici, "purple glove"; tabella pesi ricalcolata.
- Fenobarbital: "10-15 mg/kg" → **15-20 mg/kg** (AES 2016 livello B: 15 mg/kg; LICE 15-20); velocità 50-100 mg/min; tabella pesi ricalcolata.
- Lacosamide: infusione 15 min; nota che non è stata testata in ESETT (uso off-label, evidenza osservazionale).
- "SE REFRATTARIO (>30 min): UTI + ICU…" → definizione corretta (persistenza dopo BDZ + un farmaco di 2ª linea, non un criterio temporale; "UTI + ICU" era una ripetizione) con dosi degli anestetici (midazolam, propofol con limite PRIS, ketamina, tiopentale), obiettivo EEG 24-48 h, e definizione di **super-refrattario** (≥24 h di anestesia), con rinvio a NORSE/FIRES.
- Riquadro finale: aggiunti **t2 ILAE 2015** (TC 30 min, focale 60 min, assenze sconosciuto) accanto ai t1, EEG se non recupero di coscienza (SE non convulsivo), e riquadro fonti (Trinka 2015, Glauser 2016, Kapur/ESETT 2019, Minicucci/LICE 2020, Silbergleit/RAMPART 2012).
- Fase 0: dosi di tiamina (100 mg) e glucosio; esami da inviare. Intestazione: aggiunto "ESETT 2019 · ILAE 2015".
- HTML: rimosso un `</div>` in eccesso dopo il blocco contatti (errore pre-esistente segnalato dallo script di bilanciamento).

#### Miglioramenti applicati
- Nota ESETT (tre farmaci equivalenti, ~47% di successo) nell'intestazione della fase 2.

#### Da verificare (non modificato)
- Finestre temporali "Fase 1 5-10 min / Fase 2 10-30 min": LICE 2020 e AES 2016 (5-20 / 20-40 min) differiscono leggermente; ho lasciato quelle della pagina. Fonte: Minicucci et al., Epilepsy Behav 2020, fig. 1.
- Dosi di ketamina (1-3 mg/kg poi 1-10 mg/kg/h) e propofol (2-10 mg/kg/h): intervalli ampi derivati da revisioni (Rossetti/Lowenstein; NCS 2012); verificare contro il protocollo locale di terapia intensiva.
- Fenobarbital fiale 200 mg/1 ml (Luminale): confermare la presentazione effettivamente disponibile in farmacia ospedaliera (esistono anche 100 mg/2 ml e 50 mg/ml).

#### Note di qualità
- Pagina compatta e utilizzabile da telefono (scrollWidth 400 a 400 px, nessun errore JS). Il link "Share on Mastodon" prima del DOCTYPE è da spostare (vedi nota trasversale).

---

### Schemi1/crisi2025.html
Giudizio: CANDIDATA ALLA RIMOZIONE (duplicato: le flashcard `flashcard_completo.html` coprono la classificazione ILAE 2025 con 10+ schede più dettagliate e più corrette; la pagina non è linkata dall'indice ma solo da `data/revisioni.json`). Se si decide di tenerla, le correzioni sotto la rendono fedele al documento ILAE.

#### Correzioni applicate (confronto con Beniczky et al., Epilepsia 2025;66:1804-23, abstract verificato su PubMed)
- "Crisi Generalizzate (21 tipi)" → i **21 tipi sono il totale della classificazione estesa** (4 classi), non le sole generalizzate.
- Gruppi delle generalizzate corretti: Assenze (tipica, atipica, mioclonica, con mioclonia palpebrale); Tonico-cloniche generalizzate (tonico-clonica, **mioclonico-tonico-clonica**, assenza evolvente in tonico-clonica — la pagina scriveva "Mioclonico-Tonica, Assenza-Tonica", nomi inesistenti); Altre generalizzate (mioclonica, mioclonica negativa, clonica, tonica, atonica, mioclonico-atonica, spasmi).
- Aggiunta la regola "coscienza non determinabile → termine madre (crisi focale)", la focale evolvente in tonico-clonica bilaterale, la definizione operativa di coscienza (consapevolezza **o** reattività compromesse) e il passaggio da "a esordio focale" a "crisi focale".
- Novità 2025 completate (dicotomia con/senza manifestazioni osservabili al posto di motoria/non motoria; traducibilità).
- Aggiunto riquadro fonte con DOI e rimando interno alle flashcard.

#### Da verificare (non modificato)
- Nulla di clinico; se la pagina viene mantenuta, va linkata dall'indice (o rimossa da `revisioni.json`): decisione dell'autore.

#### Note di qualità
- CSS duplicata per `.back-link` (innocua). Nessun JS oltre l'e-mail mascherata; nessun errore.

---

### Schemi1/rachicentesi.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Soglia piastrinica: "<40 ×10⁹/L" → "<40-50 ×10⁹/L" con esplicitazione delle fonti (BSH 2016: 40; ASRA/ESAIC e la maggior parte dei protocolli: 50).
- INR: ">1,5" → ">1,4-1,5" (ESAIC 2022: INR ≤1,4 per la puntura neurassiale) + aPTT e anticoagulanti non sospesi.
- Controindicazione da ipertensione endocranica precisata (effetto massa/shift/obliterazione cisterne; l'ipertensione intracranica idiopatica **non** è controindicazione); aggiunti ascesso epidurale e lesione compressiva sovrastante.
- Criteri per la TC pre-rachicentesi: "crisi nelle ore precedenti" → **crisi di nuova insorgenza nell'ultima settimana** (IDSA 2004); aggiunti **deficit neurologico focale**, GCS <10-12, età >60; aggiunta la nota che la TC non deve ritardare emocolture, desametasone e antibiotico (IDSA 2004, ESCMID 2016).
- Sezione antitrombotici riscritta sui numeri di ASRA 2018 / ESAIC-ESRA 2022: DOAC a dose terapeutica **72 h** (non 48 h) e dabigatran 72/96/120 h per CrCl ≥80/50-79/30-49; dosi profilattiche ESAIC (24/36/48 h); P2Y12: clopidogrel 5-7 gg, **ticagrelor 5 gg, prasugrel 7 gg**; aspirina continuata; ripresa DOAC **≥6 h** dopo puntura atraumatica (24 h se ematica) invece di "24-72 h"; aggiunta **tabella scrollabile completa** (ENF, EBPM profilattica/terapeutica, fondaparinux, AVK, DOAC, antiaggreganti, trombolisi) usando il `.table-container` già previsto dal CSS ma mai usato; aggiunta gestione dell'urgenza non differibile (reversal, sorveglianza per ematoma spinale).
- Aggiunto riquadro fonti (ASRA 2018, ESAIC/ESRA 2022, EHRA 2021, IDSA 2004, ESCMID 2016, Nath 2018/AAN 2018, BSH 2016).

#### Miglioramenti applicati
- **Ago atraumatico** 20-22 G (meta-analisi Nath, Lancet 2018; posizione AAN 2018), orientamento del bisello, reinserimento del mandrino, inutilità del riposo a letto: elementi essenziali che mancavano.
- **Pressione di apertura**: valori di riferimento (10-20, fino a 25 cmH₂O; >25 patologico; <6 ipotensione liquorale) e modalità di misura.
- Rimosso lo script `mermaid-10.min.js` (~2,7 MB) caricato senza alcun diagramma in pagina: tempo di caricamento inutile da telefono.

#### Da verificare (non modificato)
- Intervalli ESAIC 2022 per rivaroxaban/apixaban/edoxaban a dose terapeutica: ho usato 72 h (coincidente con ASRA 2018; la ricerca ha confermato 72 h per dabigatran alta dose e i valori "low dose" 24/36/48 h); confrontare con la tabella 2 di Kietaibl et al., Eur J Anaesthesiol 2022;39:100-132.
- Trombolisi: "evitare puntura per 48 h" (ASRA 2018) e "evitare trombolisi per 10 giorni dopo puntura ematica": il secondo è un criterio relativo delle schede dell'alteplase; da confermare sulla scheda tecnica.
- Il paragrafo finale originale ("si suggerisce di approfondire le evidenze… stent recente") è un residuo di prompt/AI: l'ho lasciato ma andrebbe riformulato o tolto dall'autore.

#### Note di qualità
- Buona struttura, ora anche con tabella responsive; nessun errore JS a 400 px.

---

### Schemi1/urgenze_neuromuscolari.html
Giudizio: MANTIENI DOPO LE CORREZIONI (condizionato: se i 13 link Google Drive non vengono verificati/attribuiti o i PDF non vengono ospitati nel repository, è CANDIDATA ALLA RIMOZIONE: una pagina di soli link esterni, con acronimi non spiegati e senza fonte, non funziona offline nell'app e non è attribuibile).

#### Correzioni applicate
- Le 13 voci erano solo sigle (SMA1… MM): esplicitate (es. "DMC – Distrofie muscolari congenite", "MMG – Miastenia gravis", "MM – Miopatie metaboliche e mitocondriali").
- Aggiunta una breve introduzione che dichiara che si tratta di PDF esterni su Google Drive, non disponibili offline.

#### Miglioramenti applicati
- Aggiunto un riquadro essenziale "Regole generali in Pronto Soccorso" (insufficienza respiratoria ipercapnica e NIV, no O₂ ad alto flusso senza ventilazione; succinilcolina/alogenati nelle distrofinopatie; sensibilità a sedativi e aritmie nella DM1; cardiomiopatia; farmaci da evitare in miastenia e trattamento della crisi; digiuno nelle miopatie metaboliche; disfagia) con fonti (Sanders 2016/2021, Birnkrant 2018, Ashizawa 2018, Racca 2020).

#### Da verificare (non modificato)
- **I 13 link Google Drive non sono raggiungibili dal sandbox** (DNS bloccato): non ho potuto verificare che esistano, che siano pubblici né che siano le schede UILDM ipotizzate. L'autore deve aprirli uno per uno, indicare l'autore/ente dei PDF (licenza!) e preferibilmente copiarli in `assets/` per l'uso offline.
- "MM" potrebbe anche significare "malattie mitocondriali" o "miopatie miofibrillari": l'etichetta che ho scelto va confermata aprendo il PDF.

#### Note di qualità
- La pagina ora ha un contenuto minimo autonomo; resta debole senza attribuzione delle schede.

---

### Schemi1/ipertensione_e_frequenza.html
Giudizio: MANTIENI DOPO LE CORREZIONI (era la pagina con più errori potenzialmente pericolosi; priva di fonti)

#### Correzioni applicate
- **Adrenalina**: "bradicardia severa: 1 mg EV ogni 3-5 min" → nel paziente con polso solo infusione 2-10 µg/min (ERC 2021); 1 mg EV/IO ogni 3-5 min riservato all'arresto; **via endotracheale rimossa** (non più raccomandata). "Anafilassi: 0,5 mg EV ogni 3-5 min / IM 1 mg ogni 10 min" → **0,5 mg IM** nella coscia ripetibile ogni 5 min, EV solo da esperti con boli da 20-50 µg (ERC 2021/EAACI); "pediatrico 0,1 mg/kg" (10 volte la dose) → **10 µg/kg** EV/IO nell'arresto e dosi IM per età nell'anafilassi.
- **Compressione dei bulbi oculari** eliminata come manovra (rischio retinico, assente nelle ESC 2019): segnalata come non raccomandata. Massaggio carotideo: durata 5-10 s, controindicazioni (soffio, TIA/ictus <3 mesi), corretto l'uso ("migliore in tachicardie sinusali" era errato). Valsalva modificata descritta secondo REVERT (Lancet 2015).
- **Adenosina** mancava del tutto: aggiunta (6→12→18 mg, ESC 2019) con controindicazioni e cautele.
- Verapamil: "NON associare mai con amiodarone" → il divieto reale è con i **β-bloccanti EV**; cautela con amiodarone/digossina; dose orale massima 240 → **480 mg/die**. "FE <35%" → HFrEF.
- β-bloccanti: "Asma e BPCO" → la BPCO non controindica i β1-selettivi (ESC 2024). Metoprololo: ripetizione ogni 5 (non 10) min.
- Digossina: "indicazione: shock cardiogeno" rimossa; "mai in bolo puro: rischio ipertensione" → diluire e infondere in ≥5-20 min; mantenimento "0,125-0,5 mg" → **0,0625-0,25 mg/die**; "dose orale = ⅓ di quella EV" (errato: biodisponibilità ~70%, la dose EV è 2/3-3/4 di quella orale) corretto; carico orale rapido in dosi frazionate; interazioni (amiodarone, verapamil).
- Amiodarone: carico 300 mg in 20-60 min (non 20); **controindicato nella FA pre-eccitata/WPW**; "rischio stroke se trombi" → regola ESC 2024 (FA >48 h: niente cardioversione senza 3 settimane di anticoagulazione o ETE, anticoagulare ≥4 settimane dopo); effetti collaterali completati.
- Bisoprololo: "7,25 mg" → 7,5 mg; interazione con clonidina riformulata (rebound ipertensivo alla sospensione della clonidina, non "↓inotropismo").
- Bradiaritmie: "trattare se FC <40" → **trattare se sintomatica/instabile** (ERC 2021); atropina inefficace nei trapiantati e nei blocchi infranodali; aggiunte seconda linea (isoprenalina 5 µg/min, adrenalina 2-10 µg/min, pacing transcutaneo, glucagone, aminofillina).
- Isoprenalina: "indicazione: arresto cardiaco" e boli IM/SC "1/10-5 fiale dopo 4 h" (privi di senso) rimossi; infusione 2-10 µg/min con calcolo in ml/h corretto per le fiale da 0,2 mg.
- Dopamina: "concentrazione 0,8 µg/ml" → **0,8 mg/ml** (errore di unità di 1000 volte; le velocità in ml/h erano comunque giuste).
- Crisi ipertensiva: labetalolo con dose cumulativa max 300 mg e infusione 0,5-2 mg/min; urapidil: "max 100 mg/24 h" (inesistente in scheda tecnica) rimosso, bolo 12,5-25 mg ripetibile e infusione 5-40 mg/h; clevidipina con titolazione ogni 90 s e limite 72 h; **aggiunte nicardipina** (prima scelta ESC Council 2019 in ictus/emorragia/encefalopatia) ed **esmololo** (dissezione); aggiunto riquadro **target pressori per condizione** (ESC Council 2019, ESC 2024, AHA/ASA 2019 e 2022, ESO 2021): ictus ischemico 185/110 e 180/105, emorragia cerebrale PAS 130-140 evitando <130, dissezione PAS <120 e FC <60, SCA/edema polmonare <140, eclampsia <160/105, feocromocitoma.
- Nitroglicerina: velocità ricalcolate per la diluizione dichiarata (2 fl da 5 mg in 250 ml = 0,04 mg/ml: 0,5 mg/h = 12,5 ml/h, non 10; 3 mg/h = 75 ml/h, non 60) e range 5-200 µg/min; controindicazioni essenziali aggiunte (PDE5-inibitori, infarto del ventricolo destro, stenosi aortica), "ictus acuto" riformulato come cautela.
- Terapia orale: target "PAS 120-140, PAD 70-80" e soglia ">130/85" → **ESC 2024**: 120-129 mmHg se tollerata (70-79), soglia 140/90, "PA elevata" 130-139/80-89 trattata se rischio alto dopo 3 mesi; step 1 come combinazione a basse dosi in singola compressa; step 3 spironolattone 25-50 mg; β-bloccanti a ogni step se indicazione.
- Diuretici per eGFR: "30-45: passare all'ansa" → tiazido-simili ancora efficaci; clortalidone efficace fino a eGFR 15 (CLICK, NEJM 2021).
- Gravidanza: nitroglicerina tolta dai "sicuri", aggiunta idralazina EV, soglie ESC 2024 (140/90), atenololo tra i farmaci da evitare.
- **Nifedipina sublinguale** "10 mg ripetibile" → sconsigliata (ESC 2018/2024, ESC Council 2019) con alternative orali; furosemide 20 mg "per la crisi" → solo se sovraccarico.
- Aggiunto riquadro fonti (ESC SVT 2019, ESC FA 2024, ERC 2021 adulti e pediatrico, REVERT, ESC 2024 ipertensione, ESC Council 2019, AHA/ASA 2019/2022, ESO 2021, CLICK, schede AIFA) con avvertenza sulle diluizioni.

#### Da verificare (non modificato)
- Clonidina EV: dose giornaliera massima (la pagina indicava 600 µg/24 h, che non ho potuto confermare sulla scheda Catapresan): ho lasciato il bolo e scritto "da verificare sulla scheda tecnica".
- Efedrina: presentazioni "25 mg/1 ml" e "30 mg/10 ml" e schema a boli di 3-6 mg: coerente con la pratica anestesiologica, ma le confezioni disponibili variano; verificare sul prontuario locale.
- Nicardipina EV: disponibilità commerciale in Italia (AIFA) non confermata in sessione; la dose (5 → 15 mg/h) è quella ESC/SmPC.
- Metoprololo infusione "1 fiala in 95 ml, 1-50 ml/h" e verapamil "10 fiale in 230 ml": schemi di reparto non da linea guida; lasciati (aritmeticamente coerenti).
- Dopamina: il consenso attuale preferisce la noradrenalina nello shock (nota aggiunta); l'uso nella bradicardia resta in ERC 2021.

#### Note di qualità
- Pagina lunga ma navigabile (barra sticky); a 400 px nessuno scroll orizzontale né errori JS. È uno "schema di reparto" con molti ml/h: ho aggiunto l'avvertenza di verificare sempre la concentrazione del preparato.

---

### Schemi1/gestione_elettroliti.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- **Mancava il link "Torna all'indice"**: aggiunto (con CSS minimo) insieme a un riquadro fonti.
- **Zoom bloccato** (viewport `user-scalable=no` + script `gesturestart`): rimossi; con testo a 0,7 rem è un problema di accessibilità reale da telefono. Meta description "in oncologia" corretta.
- Ipercalcemia: titolo "Ca >12" → ipercalcemia = Ca corretto >10,5 (grave >14); cause non oncologiche aggiunte (iperparatiroidismo primitivo, farmaci); reidratazione 200-300 ml/h iniziali (Endocrine Society 2023), zoledronato con limiti renali, calcitonina 4-8 UI/kg e tachifilassi, corticosteroidi solo in linfoma/mieloma/granulomatosi, denosumab se refrattario o insufficienza renale, emodialisi.
- Ipocalcemia: dosi EV completate (10-20 ml di gluconato in 10-20 min, poi infusione 0,5-1,5 mg/kg/h di Ca elementare, calcitriolo); "CVC preferibile" → vena periferica accettabile per il gluconato, CVC obbligatorio per il cloruro; aggiunta la **correzione del magnesio** (ipocalcemia refrattaria) e la cautela in digitalizzati.
- Iponatremia: "NaCl 3% 1,2 ml/kg" → bolo **150 ml (o 2 ml/kg) in 20 min, ripetibile fino a 3 volte, obiettivo +5 mEq/L nella prima ora** (ERBP/ESE 2014); "moderata: NaCl 3% + tolvaptan" → bolo singolo + terapia causale, **mai tolvaptan con l'ipertonica**; lieve: trattamento secondo volemia; limite 8 mEq/L/24 h mantenuto con obiettivo 4-6 e deroga a 10 se basso rischio; controlli ogni 1-2 h durante i boli; **desmopressina 2 µg + G5% se ipercorrezione**; tolvaptan 15 mg con titolazione ≥24 h, senza restrizione idrica il primo giorno, max 30 giorni; aggiunto "nessun diuretico recente" ai criteri SIAD. Preparazione della 3% verificata (400 ml SF + 10 fiale 11,7% = 3,06%).
- Ipomagnesemia: soglia "<1,5" → <1,7 mg/dL (grave <1,2) con tabella coerente; **conversione 1 g MgSO₄ = 4 mmol = 8 mEq** e presentazioni; emergenza "Mg 8 mmol" esplicitata come 2 g; antidoto "Ca-gluconato 100-200 mg" → 10 ml di gluconato 10% (1 g); riduzione in insufficienza renale; cause completate (IPP, cisplatino, cetuximab).
- Ipernatremia: "0,5 mOsm/L/h" → **0,5 mEq/L/h**; "cronica >48 h" → include durata ignota; nota sulla sicurezza della correzione più rapida nell'adulto (Chauhan, CJASN 2019) mantenendo il limite prudenziale; formula con fattore per l'anziano e perdite in corso.
- Ipokaliemia: velocità "10 mEq/h" → 10 in periferica, 20 (eccezionalmente 40) solo via CVC con ECG; **diluire in SF, non in glucosata**; ECG se <2,5 o digitalizzati.
- Iperkaliemia: classi di gravità UKKA (moderata 6,0-6,4, grave ≥6,5 o ECG); calcio gluconato **30 ml in 10 min** (UKKA 2023) o 10 ml ripetibili, solo se ECG alterato; "glucosio 50% 100 ml + insulina 10 U" (50 g di glucosio) → **insulina 10 UI + 25 g glucosio** con G10% 50 ml/h × 5 h se glicemia <126 e glicemia oraria per 6 h; "Kayexalate 15 g ×4" come prima scelta → **sodio zirconio ciclosilicato 10 g ×3 per 72 h o patiromer**, polistirene come seconda scelta; bicarbonato solo se acidosi e mai da solo; dialisi se refrattaria/anuria; cause (farmaci, rabdomiolisi, pseudoiperkaliemia) e sospensione dei farmaci.

#### Miglioramenti applicati
- Riquadro fonti (ERBP/ESE 2014, Verbalis 2013, SfE 2022, Adrogué & Madias 2000, Chauhan 2019, UKKA 2023, Endocrine Society 2023, ESE 2015, Kardalas 2018).

#### Da verificare (non modificato)
- Dosi orali di magnesio e potassio (40-100 mEq/die di K; 240-1000 mg di Mg elementare): intervalli da revisioni, dipendono dal sale disponibile; adattare al prontuario.
- Non esiste (alla data della revisione, per quanto ho potuto verificare) un aggiornamento ufficiale 2025 della linea guida ERBP/ESE sull'iponatremia: se dovesse uscire, ricontrollare limiti di correzione e boli.
- Calcitonina: in Italia la disponibilità del preparato iniettabile è discontinua; verificare.

#### Note di qualità
- Testo molto piccolo (0,7-0,75 rem) ma ora zoomabile. Nessuno scroll orizzontale a 400 px.

---

### Schemi1/emergenze_glicemia.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate (allineamento al consenso ADA/EASD/JBDS/AACE/DTS 2024 — Umpierrez et al., Diabetes Care 2024;47:1257)
- Aggiunto riquadro **criteri diagnostici 2024** che mancava: DKA = glicemia **≥200 mg/dl o diabete noto** (non più >250) + β-OHB ≥3 mmol/L + pH <7,30 **e/o** HCO₃⁻ **<18** (gap anionico non più obbligatorio), con classi di gravità (lieve pH 7,25-7,30/HCO₃ ≥15; moderata 7,00-7,24; severa <7,00/HCO₃ <10/β-OHB >6) e criteri HHS (osmolalità efficace >300, chetoni <3, pH ≥7,3); DKA euglicemica da SGLT2-inibitori tra i fattori precipitanti.
- Potassio: "ipopotassiemia nel 98%" → deficit corporeo totale 3-5 mEq/kg; tabella: soglia per rinviare l'insulina **3,5** (non 3,0/3,3), KCl 20-30 mEq/L con target 4-5, reintegro 10-20 mEq/h; **eliminata la riga "KCl 60 mEq/L a 60 mEq/h"** (velocità pericolosa, incoerente anche con il limite 0,5 mmol/kg/h dichiarato subito sotto); limite 20 mEq/h in periferica senza ECG.
- Bicarbonato: "pH <6,9 mEq/L" (unità errata) → considerare solo se **pH <7,0** (consenso 2024; ADA precedente 6,9), 100 mmol + 20 mEq KCl in 2 h.
- Insulina EV: nessun bolo di routine; glicemia in calo 50-75 mg/dl/h; a glicemia <250 ridurre a **0,05 UI/kg/h (non 0,02)** + glucosata, mantenendo 150-200; basale precoce 0,15-0,3 UI/kg entro 12 h; nello HHS 0,05 UI/kg/h solo quando la glicemia non scende più con i liquidi.
- Insulina SC: criteri "pH >7,25, HCO₃ >18" → HCO₃ ≥15, no gravidanza/insufficienza d'organo; schema 2024 (0,1 UI/kg/h o 0,15-0,2 UI/kg/2 h; dimezzare sotto 250 mg/dl).
- Fluidi: SF **o soluzione bilanciata** (consenso 2024), 500-1000 ml/h nelle prime 2-4 h; scelta successiva sul sodio corretto (formula); glucosata quando <250; tabella oraria con buco "ore 4-9 → ore 14-19" corretta (ore 10-24) e volumi coerenti; deficit idrico 100 ml/kg (DKA) e 100-200 ml/kg (HHS).
- Monitoraggio: pH venoso (non arterioso), bicarbonati ≥18, potassio 4-5, β-OHB in calo ≥0,5 mmol/L/h.
- **Criteri di risoluzione**: "HCO₃ >15, osmolarità <320" → DKA: β-OHB <0,6 **e** (pH ≥7,30 **o** HCO₃ ≥18); HHS: osmolalità <300, glicemia <250, diuresi >0,5 ml/kg/h, coscienza recuperata; esplicitato che la normoglicemia da sola non basta.
- Transizione: dose totale 0,5-0,6 UI/kg/die nell'insulino-naïve (0,3-0,5 se fragile), basale 2 h prima dello stop; overlap 1-2 h confermato.
- Fonti aggiornate (consenso 2024 con citazione completa, ADA 2025, JBDS 2023/2022); rimossa la dicitura "protocollo validato per uso in PS" (non verificabile) sostituita da "strumento didattico".
- HTML: rimosso un `</div>` in eccesso dopo il blocco contatti (pre-esistente).

#### Miglioramenti applicati
- Riquadro breve **Ipoglicemia** (livelli ADA 2025, 15-20 g per os, 15-25 g EV o glucagone 1 mg IM/3 mg nasale, G10% nelle forme da sulfaniluree, tiamina nel malnutrito), poiché il titolo dell'incarico e l'uso in neurologia lo richiedono e mancava del tutto.

#### Da verificare (non modificato)
- Marche di insulina e nota "Humalog 200 non usare": lasciate (corrette: le penne U200 non vanno usate per l'infusione).
- Il riferimento JAMD 2020 (protocollo AMD) è rimasto come fonte storica: alcune soglie originali (pH 6,9, K 3,3) sono state superate dal consenso 2024; l'autore potrebbe voler segnalare esplicitamente la discrepanza.
- `mermaid.initialize` viene eseguito in questa pagina pur non essendoci diagrammi (lo script da 2,7 MB è caricato in testa): non l'ho rimosso perché la pagina ha un handler di errore che vi fa riferimento; valutare di toglierlo.

#### Note di qualità
- Pagina lunga ma ben navigabile da telefono; nessun errore JS (solo il font Google non raggiungibile offline).

---

### flowcharts/gestione_ospedaliera_glicemia.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Nodi del diagramma allineati al consenso 2024: glicemia ≥200 o diabete noto; pH venoso <7,30 e/o HCO₃ <18 (era "<15"); gravità; HHS con osmolalità efficace >300 (totale >320), chetoni <3; step 1 con cristalloide isotonico 500-1000 ml/h per 2-4 h e K⁺ prima dell'insulina; trattamento C con insulina 0,1 UI/kg/h se K ≥3,5 (e SC nella lieve); trattamento D con 0,05 UI/kg/h e limite di riduzione osmolare; **criteri di uscita** corretti (β-OHB <0,6 + pH ≥7,3 o HCO₃ ≥18; HHS osmolalità <300).
- Lista "criteri differenziali": "pH arterioso" → venoso; HCO₃ <18; **formula dell'osmolalità** corretta (la pagina sommava "urea/2,8": il divisore 2,8 vale per il BUN, per l'urea in mg/dl è 6; indicata l'osmolalità efficace 2×Na + glicemia/18 che è il criterio 2024); edema cerebrale.
- **Mancava il link all'indice principale** (c'era solo "torna al protocollo"): aggiunto. Viewport `user-scalable=no` rimosso (zoom indispensabile su un diagramma).
- Fonti e data di aggiornamento corrette (consenso 2024, ADA 2025, JBDS).

#### Da verificare (non modificato)
- Il diagramma Mermaid viene renderizzato (verificato con Playwright: 1 SVG) ma a 400 px il testo è piccolo; l'alternativa testuale è nella pagina del protocollo.

#### Note di qualità
- Nessun errore JS; scrollWidth 400 a 400 px. Il font Google esterno non è disponibile offline (fallback di sistema, innocuo).

---

### Sintesi
Otto file revisionati, tutti mantenuti dopo le correzioni tranne `crisi2025.html`, che è un duplicato meno accurato delle flashcard e non è linkata dall'indice (candidata alla rimozione; comunque corretta). Le correzioni più rilevanti per la sicurezza sono nella pagina cardiologica (adrenalina nel paziente con polso e nell'anafilassi, dose pediatrica 10 volte troppo alta, compressione oculare, nifedipina sublinguale, unità della dopamina, digossina) e nelle pagine metaboliche (riga KCl 60 mEq/h e glucosio 50 g nelle urgenze glicemiche/iperkaliemia, boli di NaCl 3%, tolvaptan con ipertonica). Stato epilettico, rachicentesi e glicemia sono stati allineati rispettivamente a ESETT/LICE/ILAE 2015, ASRA 2018/ESAIC 2022/IDSA e al consenso DKA 2024; ovunque è stato aggiunto un riquadro fonti e, dove mancava, il link all'indice. Restano da verificare dall'autore i 13 link Google Drive della pagina neuromuscolare (non raggiungibili dal sandbox) e alcune presentazioni farmaceutiche locali. Tutte le pagine passano il controllo HTML (due `</div>` in eccesso pre-esistenti rimossi) e il test Playwright a 400 px senza errori né scroll orizzontale.

File modificati: Schemi1/stato_epilettico.html, Schemi1/crisi2025.html, Schemi1/rachicentesi.html, Schemi1/urgenze_neuromuscolari.html, Schemi1/ipertensione_e_frequenza.html, Schemi1/gestione_elettroliti.html, Schemi1/emergenze_glicemia.html, flowcharts/gestione_ospedaliera_glicemia.html

---

# C. Disturbi cognitivi e del movimento

## Report revisione C — disturbi cognitivi e del movimento

Revisore: neurologo (disturbi cognitivi e del movimento), revisione editoriale e di letteratura. Data: 12 ottobre 2026. Branch `revisione-contenuti`, nessun commit.
Metodo: lettura integrale di ogni file, verifica delle affermazioni contro le fonti primarie; citazioni aggiunte verificate su PubMed (PMID/DOI riportati). Dopo le modifiche: controllo del bilanciamento dei tag (script del BRIEF) e test Playwright headless (Chromium, viewport 400×900: nessun `pageerror`, `scrollWidth` = 400, link all'indice presente) su tutte e sette le pagine.

---

### Schemi1/approccio_demenze.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Definizione: "compromissione di 2 o più domini cognitivi" presentata come definizione unica → distinta la definizione classica di demenza (≥ 2 domini) dal DSM-5/DSM-5-TR, in cui il disturbo neurocognitivo maggiore richiede un declino significativo in **≥ 1 dominio** (attenzione complessa, funzioni esecutive, apprendimento e memoria, linguaggio, percettivo-motorio, cognizione sociale) che interferisce con l'indipendenza; il disturbo neurocognitivo lieve (≈ MCI) conserva l'indipendenza (APA, DSM-5-TR 2022).
- "Passie" → "Prassie" (refuso).
- "Attenzione preservata (assenza di encefalopatia)" → esplicitato il criterio DSM-5 "il deficit non deve comparire esclusivamente in corso di delirium".
- Neuroimmagini: "CT cranio con m.d.c., SPECT, PET, spettroscopia" → RM encefalo (o TC senza m.d.c. se la RM non è eseguibile) in tutti; FDG-PET/SPECT nei casi dubbi; DaT-SPECT e MIBG per la DLB; PET amiloide o liquor per la patologia AD; PET tau e p-tau217 plasmatico in via di introduzione nei centri specialistici (NIA-AA 2011; Alzheimer's Association 2024-2025; McKeith 2017). La TC con mezzo di contrasto non è l'esame di prima scelta nel work-up delle demenze.
- Tabella AD: "CSF ↓ Ab, ↑ tau" → "↓ Aβ42 (Aβ42/40), ↑ p-tau e t-tau"; aggiunte le varianti atipiche (logopenica, PCA, frontale).
- Tabella DLB: "atrofia lobo parietale posteriore" (non è un reperto caratteristico) → relativa conservazione dell'ippocampo, ↓ DaT-SPECT, ↓ MIBG, ipometabolismo occipitale (cingulate island sign), REM senza atonia alla PSG (McKeith 2017).
- Tabella CJD: aggiunti RT-QuIC e 14-3-3 liquorali e i complessi periodici all'EEG (Hermann et al., Lancet Neurol 2021).
#### Miglioramenti applicati
- Laboratorio: aggiunti calcio, glicemia, folati; precisato il contenuto della puntura lombare (biomarcatori AD, RT-QuIC, encefaliti autoimmuni).
- Test standardizzati: rimando alle pagine `valutazione_neuropsicologica.html` (cut-off corretti) e `criteri_demenze.html` (criteri eziologici); aggiunti ADL/IADL e NPI; aggiunta la depressione nella DD.
- Aggiunto riquadro "Fonti principali" in calce (DSM-5-TR 2022, McKhann 2011, Jack 2024, McKeith 2017, Rascovsky 2011, Gorno-Tempini 2011, Hermann 2021).
#### Da verificare (non modificato)
- "AD 60-80% delle demenze in Europa": stima corrente e accettabile, ma dipende dalla fonte (Alzheimer Europe / WHO); nessuna modifica.
- Lo script registra `sw.js` con percorso relativo a `Schemi1/` dove il file non esiste (il service worker è in radice): comportamento comune a tutte le pagine del sito, non toccato perché riguarda il template comune.
#### Note di qualità
- Pagina sintetica e utile come inquadramento; ora coerente con `criteri_demenze.html`. Tabelle con contenitore scrollabile, nessuno scroll orizzontale a 400 px.

---

### Schemi1/criteri_demenze.html
Giudizio: MANTIENI (con piccole integrazioni)

#### Correzioni applicate
- Nessun errore di fatto rilevato nelle sezioni AD 2024 (Core 1/Core 2, soglia ≥ 90%, profilo A−T+ = PART, stadi biologici A-D, stadi clinici 0-6), biomarcatori plasmatici 2025 (triage sens ≥ 90%/spec ≥ 75%; conferma ≥ 90%/≥ 90%), IWG 2021, McKeith 2017 (4 core, 3 biomarcatori indicativi, regole probabile/possibile), DLB prodromica 2020, VASCOG/VICCCS-2: controllati e confermati.
- Riga "Fattori di rischio modificabili": "elenco aggiornato dalla Lancet Commission 2024" → precisato "14 fattori (ai 12 del 2020 si aggiungono colesterolo LDL elevato e perdita visiva non trattata)" (Livingston 2024).
#### Miglioramenti applicati
- Sezione 6 (FTD): la tabella elencava solo i livelli diagnostici; aggiunti i 6 criteri bvFTD di Rascovsky 2011 e le regole possibile (≥ 3/6) / probabile (+ declino funzionale + imaging) / definita (patologia o mutazione C9orf72/GRN/MAPT); per la PPA aggiunti i criteri generali di Mesulam e le caratteristiche centrali delle tre varianti con sede dell'atrofia e la patologia sottostante (lvPPA ≈ AD). Mantenuta la "nota di verifica" dell'autore.
- Sezione 9: il mandato citava PSP MDS 2017, CBD Armstrong 2013 e LATE, che nella pagina erano assenti; aggiunte tre voci sintetiche (domini O/P/A/C e livelli 1-3 della PSP con i fenotipi; fenotipi e livelli probabile/possibile della CBD; LATE 2019 con stadi 1-3 e criteri clinici 2025 di Wolk et al., probabile/possibile). Titolo della sezione e intro aggiornati; bibliografia integrata con Höglinger 2017 (PMID 28467028), Armstrong 2013 (PMID 23359374), Nelson 2019 (PMID 31039256), Wolk 2025 (doi 10.1002/alz.14202, PMID 39807681, abstract letto su PubMed); rinumerata la lista "non verificate" (start 16).
- Intro: aggiunta la data della revisione editoriale.
#### Da verificare (non modificato)
- Autori "Palmqvist S, Whitson HE, Allen LA" della linea guida 2025 e il dettaglio "65-79 partecipanti, 6 round" di VICCCS-2: non ricontrollati sul testo (la pagina dichiara l'abstract letto dall'autore).
- Il contenuto di PSP/CBD aggiunto deriva da conoscenza consolidata dei criteri originali (citazioni verificate su PubMed, testo non riletto): coerente con la politica di etichettatura della pagina, che lo dichiara.
#### Note di qualità
- Pagina molto curata, con fonti e livello di verifica dichiarato per ogni sezione. Accordion e diagrammi Mermaid funzionano offline; nessun errore JS; nessuno scroll orizzontale.

---

### Schemi1/valutazione_neuropsicologica.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- MMSE "Disturbo maggiore: sensibilità 70%, specificità 90%" (senza fonte) → 81% / 89% (meta-analisi di 102 studi, Tsoi KK et al., JAMA Intern Med 2015;175:1450, doi 10.1001/jamainternmed.2015.2152). I valori per l'MCI (18% / 100%) sono quelli di Nasreddine 2005 al cut-off 26 e sono stati mantenuti con la fonte.
- MoCA "MCI: specificità 90%" → **87%** (Nasreddine ZS et al., J Am Geriatr Soc 2005;53:695, doi 10.1111/j.1532-5415.2005.53221.x); aggiunti i valori pooled di Tsoi 2015 per l'MCI (89% / 75%).
- Link esterno a un'icona GitHub su flaticon.com (risorsa non disponibile offline, errore in console) → SVG inline come nelle altre pagine.
#### Miglioramenti applicati
- Aggiunta la tabella dei coefficienti di correzione MMSE per età (65-89) e scolarità (Magni E et al., Eur J Neurol 1996;3:198-202, doi 10.1111/j.1468-1331.1996.tb00423.x) con cut-off 23,8, e la nota che il grezzo sottostima/sovrastima i deficit per scolarità.
- MoCA: aggiunti i cut-off italiani corretti (15,5 Santangelo 2015, Neurol Sci 36:585, doi 10.1007/s10072-014-1995-y; 17,54 Conti 2015, Neurol Sci 36:209, doi 10.1007/s10072-014-1921-3; norme aggiornate Aiello 2022, Aging Clin Exp Res 34:375, doi 10.1007/s40520-021-01943-7; nel PD non demente corretto < 19, D'Iorio 2023) con l'avvertenza che il cut-off originale 26 sovrastima i deficit in Italia.
- ADL/IADL: specificati gli item (Katz 6, Lawton-Brody 8; 0-5 per gli uomini nella versione originale) e il ruolo nella distinzione MCI/demenza.
- Aggiunta una scheda NPI (12 domini, frequenza × gravità, 0-144, distress del caregiver, NPI-Q) con rimando alla pagina di terapia; aggiunto nel confronto il rimando alla valutazione neuropsicologica estesa.
- Aggiunto riquadro "Fonti" con tutte le citazioni; contenitore scrollabile per la nuova tabella.
#### Da verificare (non modificato)
- Il valore 17,54 di Conti 2015 non compare nell'abstract (che rimanda alle griglie dell'articolo): è il valore riportato comunemente; controllare sul testo.
- I PDF collegati (ADL_IADL.pdf, MMSE.pdf, MoCA_Italian.pdf) esistono nella cartella `pdf/`; non ne ho verificato il contenuto né i diritti di distribuzione del MoCA (il MoCA è coperto da copyright e richiede certificazione dal 2019).
#### Note di qualità
- Pagina ora utilizzabile anche senza aprire i PDF (cut-off e coefficienti a portata di mano). Layout a schede, leggibile a 400 px.

---

### Schemi1/terapia_supporto_demenze.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- **Bug di usabilità grave**: a larghezza ≤ 480 px (tutti i telefoni in verticale) una regola CSS nascondeva (`display:none`) tutte e quattro le tabelle dei farmaci, rimandando a una "versione accordion" mai implementata: la pagina risultava vuota da telefono. Rimossa la regola; le tabelle scorrono in orizzontale (verificato con Playwright a 400 px: le tabelle ora sono `display:block` con altezza > 0).
- Mancava il link "Torna all'indice principale": aggiunto.
- Escitalopram "5 → 10-20 mg/die" per "agitazione non psicotica" → 5 → 10 mg/die (dose massima oltre i 65 anni, RCP AIFA/EMA per il QTc); indicazione per l'agitazione rimossa: il trial di fase 3 S-CitAD (Rajji TK et al., Nat Med 2025;31:1586, doi 10.1038/s41591-025-03569-y) non ha mostrato efficacia e ha rilevato ritardi di conduzione cardiaca.
- Citalopram mancava: aggiunto (CitAD, Porsteinsson AP et al., JAMA 2014, PMID 24549548: efficace a 30 mg ma con ↑ QTc e peggioramento cognitivo; in pratica max 20 mg/die oltre i 65 anni, ECG).
- Mirtazapina: aggiunto che non è efficace per l'agitazione in AD (SYMBAD, Banerjee S et al., Lancet 2021, PMID 34688369); dose massima e iponatriemia.
- Bupropione "75 → 150 mg/die" → 150 mg/die RP (max 300), controindicazioni (epilessia, disturbi alimentari).
- Black box: "1,5-1,7×" → 1,6-1,7× (FDA 2005/2008), aggiunti eventi cerebrovascolari, durata (rivalutazione entro 6-12 settimane) e l'ipersensibilità ai neurolettici nella DLB/PDD.
- Quetiapina "25 → 50-450 mg/die" e "rischio parkinsonismo nullo" → 12,5-25 → 50-150 mg/die (raramente > 200), rischio basso ma non nullo, evidenza di efficacia debole; aggiunta la clozapina (6,25-50 mg, emocromo) come farmaco con le evidenze migliori nella psicosi di PD.
- Risperidone "0.25 mg → 0.5-1 mg x2" → 0,25 mg ×2 → 0,5 mg ×2 (max 1 mg ×2), **max 6 settimane**, indicazione autorizzata EMA/AIFA = aggressività persistente nell'AD moderata-grave con rischio di danno (RCP).
- Brexpiprazolo "0.25-0.5 mg → max 4 mg" → 0,5 → 1 → 2 mg (giorni 1/8/15), **max 3 mg/die** per questa indicazione (FDA, Rexulti PI 2023; Lee D et al., JAMA Neurol 2023, PMID 37930669); precisato che non è autorizzato da EMA/AIFA per l'agitazione nell'AD e che l'effetto è modesto (≈ 5 punti CMAI).
- Aripiprazolo: dose target 10 mg (max 15), off-label in EU.
- Metilfenidato "5 mg mattina" → 5 mg ×2 → 10 mg ×2 (20 mg/die, trial ADMET 2, Mintzer J et al., JAMA Neurol 2021;78:1324, PMID 34570180), monitoraggio PA/peso.
- Insonnia "1ª linea: melatonina 10 mg" → 1ª linea non farmacologica; trazodone 25-50 mg; melatonina 2 mg RP con evidenza debole (NICE NG97 2018 raccomanda di non offrirla nell'AD); aggiunta la gestione dell'RBD (melatonina 3-12 mg o clonazepam 0,25-0,5 mg).
- Guida rapida: apatia "1ª linea bupropione/vortioxetina" → 1ª linea ChE-I e attività strutturate, metilfenidato 10 mg ×2 come farmaco con evidenza; psicosi in LBD/PD: prima ridurre dopaminergici e ottimizzare ChE-I; "mai aloperidolo"; FTD: evitare ChE-I.
- Benzodiazepine, gabapentin: aggiunti i rischi (cadute, delirium; riduzione renale per gabapentin).
#### Miglioramenti applicati
- Aggiunta la sezione 3 "Terapia specifica: ChE-I e memantina" (richiesta dal mandato, assente nella pagina) con tabella: donepezil 5 → 10 mg; rivastigmina orale 1,5 ×2 → 6 ×2 e cerotto 4,6 → 9,5 → 13,3 mg/24 h; galantamina 8 → 16 → 24 mg RP con CrCl < 9 controindicata e max 16 mg in epatopatia moderata; memantina 5 → 20 mg con **CrCl 30-49: 10 mg/die (→ 20 se tollerata dopo ≥ 7 giorni), CrCl 5-29: 10 mg/die** (RCP EMA/AIFA); effetti di classe, ECG basale, Nota AIFA 85, ruolo dei ChE-I nella DLB/PDD e inefficacia nella FTD.
- Trazodone: aggiunto l'uso nella FTD fino a 150-300 mg (Lebert 2004).
- Aggiunti il riquadro "Fonti principali" e le voci di navigazione per le nuove sezioni; icona GitHub esterna (flaticon) sostituita con SVG inline.
#### Da verificare (non modificato)
- Nota AIFA 85: non ho riportato le soglie MMSE della Nota (versione in vigore), da controllare sul testo AIFA prima di aggiungerle.
- Galantamina: per CrCl 9-59 ho indicato "nessun aggiustamento in EU (USA max 16 mg)" secondo RCP EMA e label FDA; verificare sull'RCP AIFA corrente.
- Pimavanserina (psicosi di PD, solo USA) e destrometorfano-bupropione non inseriti: non autorizzati in EU.
- Tabella "Pattern NPS per demenza": contenuto generico (fonte non indicata), non modificato.
#### Note di qualità
- Numerazione delle sezioni ora 1-4 con le tabelle farmaci tra la 3 e la 4; mobile-nav aggiornata. Pagina ricca ma da usare con cautela: molte indicazioni restano off-label e lo dice.

---

### Schemi1/diagnosipd.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Verificata la fedeltà a Postuma RB et al., Mov Disord 2015;30:1591 (PMID 26474316): le liste erano complete nel numero (9 criteri di esclusione, 10 red flag, 4 criteri di supporto) ma con omissioni nel contenuto, ora integrate:
  - esclusione 1: elencati i segni oculomotori cerebellari (nistagmo evocato dallo sguardo, macro square wave jerks, saccadi ipermetriche);
  - esclusione 5: aggiunti i **deplettori di dopamina**;
  - esclusione 6: "600 mg/die" → "≥ 600 mg/die", "risposta osservabile";
  - esclusione 7: aggiunte **aprassia ideomotoria** di un arto e **afasia progressiva**; "sensoriale" → "sensitiva";
  - esclusione 9: aggiunta la clausola "o giudizio dell'esperto che una sindrome alternativa sia più probabile";
  - red flag 3, 4, 8, 9, 10: definizioni operative complete (disfonia/disartria incomprensibile o disfagia con SNG/PEG; stridore diurno/notturno; elenco delle caratteristiche non motorie; esclusione di lieve asimmetria dei riflessi e Babinski isolato; simmetria sia riferita sia obiettiva);
  - red flag 5: "insufficienza autonomica precoce" → **entro 5 anni**, con la definizione di ipotensione ortostatica (≥ 30/15 mmHg entro 3 min) e di disturbo urinario;
  - criterio di supporto 1: aggiunta la definizione completa (ritorno quasi alla normalità, > 30% MDS-UPDRS III, wearing-off prevedibile); criterio 4: "test accessori positivi" → perdita olfattiva oppure denervazione simpatica cardiaca alla MIBG (gli unici due ammessi).
- Obiettivi di accuratezza: "≥ 90% / ≥ 80% casi veri di MP" → "specificità ≥ 90%" e "sensibilità e specificità entrambe ≥ 80%" (come nel testo originale).
- Scroll orizzontale a 400 px (scrollWidth 455): tabella senza contenitore e `box-sizing` assente → aggiunti `* {box-sizing: border-box}`, contenitore `.table-container` e `overflow-x` per il diagramma Mermaid; ora 400.
- HTML: `<ul>` dentro `<p>` (non valido) → `<div>`; rimosso un `</div>` in eccesso pre-esistente nel footer (ora tag bilanciati); rimosso il secondo script duplicato che sovrascriveva il link mailto con testo semplice.
#### Miglioramenti applicati
- Nota che la **demenza non è più criterio di esclusione** (abolita la regola di 1 anno) e che le classificazioni biologiche 2024 (NSD-ISS, SynNeurGe) sono per la ricerca.
- Riquadro "Fonti" (Postuma 2015; criteri prodromici Berg 2015/Heinzel 2019; Simuni e Höglinger, Lancet Neurol 2024; link al PDF MDS-UPDRS italiano già presente nel sito).
#### Da verificare (non modificato)
- Il diagramma di flusso resta una semplificazione corretta delle regole (BR ≤ CS con BR ≤ 2): verificato a mano con i casi 0 BR/0 CS (probabile), 2 BR/1 CS (insufficiente), 3 BR (esclusa probabile).
#### Note di qualità
- Pagina ora fedele al documento originale e leggibile da telefono.

---

### flowcharts/tremore.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Terminologia MDS 2018 (Bhatia KP et al., Mov Disord 2018;33:75, PMID 29193359): "tremore psicogenico" → **tremore funzionale**; "rubral tremor" → **tremore di Holmes** (riposo + posturale + intenzionale, < 5 Hz, lesione mesencefalo/talamo/vie cerebellari, spesso a distanza dalla lesione).
- Criteri ET: riportata la definizione MDS 2018 completa (tremore d'azione bilaterale degli arti superiori, ≥ 3 anni, con/senza altre sedi, assenza di distonia/atassia/parkinsonismo) e aggiunto **ET-plus** (marcia in tandem compromessa, posture distoniche dubbie, lieve deficit di memoria, tremore a riposo lieve) e le esclusioni (tremore focale isolato, ortostatico > 12 Hz, compito-specifico, esordio improvviso).
- "Familiarità 70%" → 50-70%; "età media d'insorgenza 35 anni" rimossa perché incoerente con la distribuzione bimodale descritta nella stessa riga; "20% componente a riposo" → 10-20% nelle forme avanzate (ET-plus).
- Farmaci: propranololo "40 mg bid → 320" → 10-20 mg ×2-3 → 60-320 mg/die (usuale 120-240) con controindicazioni; primidone con la reazione acuta alla prima dose e dose efficace usuale ≤ 250 mg; topiramato come 2ª linea con dose 100-200 mg/die (max 400); gabapentin retrocesso a evidenza debole con dose 1200-1800 mg; aggiunta la tossina botulinica per tremore cefalico/vocale; "Sonnoelenza" → "Sonnolenza" (AAN 2011, Zesiewicz, PMID 22013182; MDS 2019, Ferreira, PMID 31046186).
- "Prognosi benigna… 50% risponde" → lentamente progressiva, 30-50% non risponde adeguatamente alla terapia orale.
#### Miglioramenti applicati
- Definizione: aggiunti i due assi della classificazione MDS 2018 e la distinzione isolato/combinato.
- Studi diagnostici: revisione dei farmaci tremorigeni, Wilson solo < 40-50 anni, RM nei casi indicati, DaT-SPECT nel dubbio parkinsonismo, EMG/accelerometria, FMR1 per FXTAS.
- Diagramma: aggiunto il tremore ortostatico primario (13-18 Hz).
- Gestione: DBS del VIM (bilaterale possibile) e talamotomia MRgFUS/HIFU unilaterale con eventuale seconda procedura controlaterale a distanza (Elias WJ et al., NEJM 2016;375:730, PMID 27557301).
- DD ampliata (cerebellare, ortostatico, fisiologico esaltato; FXTAS con segno del peduncolo cerebellare medio) e riquadro "Fonti".
#### Da verificare (non modificato)
- Prevalenza ET "≈ 4-5% oltre i 65 anni" inserita da me come stima corrente (Louis & Ferreira 2010); se si preferisce evitare numeri epidemiologici si può togliere.
- La frase "picco precoce < 40 e tardivo > 60 anni" è stata mantenuta dall'originale.
#### Note di qualità
- Il diagramma Mermaid ha etichette lunghe: su telefono resta leggibile ma compresso; non ho cambiato la grafica. Nessuno scroll orizzontale, nessun errore JS.

---

### Schemi1/SARAscale.html
Giudizio: MANTIENI

#### Correzioni applicate
- Verifica degli 8 item contro Schmitz-Hübsch T et al., Neurology 2006;66:1717 (PMID 16769946): andatura 0-8, postura 0-6, seduta 0-4, eloquio 0-6, inseguimento del dito 0-4, naso-dito 0-4, movimenti alternati 0-4, tallone-tibia 0-4 (item 5-8 come media destra/sinistra); totale massimo 40. Testi delle opzioni fedeli all'originale. **JavaScript corretto**: con Playwright headless ho impostato tutti i valori massimi (totale 40,0; 8/8 sezioni), una combinazione mista (atteso 15,5 = 3+2+1+2+1,5+1,5+2,5+2; ottenuto 15,5), il salvataggio in localStorage dopo ricarica (15,5) e il reset (0,0); nessun errore di pagina.
- "Disturbi del linguaggio" → "Eloquio (Speech)": l'item valuta la disartria, non il linguaggio; etichette aggiornate.
- Item 3: "nessuna difficoltà nel sedersi" → "nello stare seduto" (l'item valuta il mantenimento della posizione seduta).
- Rimosso un `</div>` in eccesso pre-esistente nel footer (tag ora bilanciati).
#### Miglioramenti applicati
- Istruzioni degli item 1, 5, 6, 8 completate con i dettagli del protocollo originale (10 passi in tandem; 5 movimenti a 30 cm e 1 ogni 2 s al 50% della portata, media degli ultimi 3; naso-dito al 90% della portata; tallone-tibia da supino senza vedere le gambe, 3 cicli).
- Interpretazione: aggiunta la nota che le fasce di gravità (0-3, 4-9, 10-19, ≥ 20) sono **solo orientative** e non fanno parte della scala originale, che non definisce cut-off; aggiunto il riquadro "Fonti" con il link al PDF originale già presente nel sito (`pdf/sara.pdf`).
#### Da verificare (non modificato)
- Le fasce di gravità non hanno una fonte primaria: si può valutare di rimuoverle; nei controlli sani della validazione il punteggio è di norma molto basso, ma non ho riportato numeri.
- La traduzione italiana non è quella ufficiale validata; indicato nel riquadro fonti.
#### Note di qualità
- Calcolatore solido, con progress bar, stampa e salvataggio locale; funziona offline. Lo script contiene codice inutilizzato (`adjustMobileViewport`, `scrollToNextSection`) e un handler `gesturestart` che blocca lo zoom su iOS: non toccato (fuori dal mandato di contenuto, ma segnalato per l'accessibilità).

---

### Sintesi
Sette pagine riviste, nessuna candidata alla rimozione. Gli interventi più rilevanti: (1) `terapia_supporto_demenze.html` era **invisibile da telefono** (tabelle nascoste da una regola CSS) e conteneva dosi errate o superate (quetiapina fino a 450 mg, brexpiprazolo max 4 mg, melatonina 10 mg in prima linea, escitalopram per l'agitazione), ora corrette con i trial 2014-2025 e le RCP; aggiunta la sezione su ChE-I e memantina con gli aggiustamenti renali; (2) `diagnosipd.html` è stato riallineato parola per parola ai criteri MDS 2015 e reso leggibile a 400 px; (3) `valutazione_neuropsicologica.html` ha ora i cut-off italiani corretti per età e scolarità (MMSE 23,8 con coefficienti di Magni; MoCA 15,5/17,54) e dati di accuratezza con fonte; (4) `tremore.html` è allineato alla classificazione MDS 2018 (ET-plus, tremore funzionale, tremore di Holmes) con posologie e opzioni chirurgiche aggiornate; (5) `approccio_demenze.html` distingue correttamente DSM-5 (≥ 1 dominio) dalla definizione classica e indica RM, non TC con contrasto; (6) `criteri_demenze.html` era già corretto e ora include bvFTD/PPA in dettaglio, PSP, CBD e LATE; (7) il calcolatore SARA è esatto (verificato con Playwright). Tutte le pagine passano il controllo dei tag e il test Playwright (nessun errore, nessuno scroll orizzontale a 400 px, link all'indice presente); tutte hanno un riquadro fonti.

---

# D. Sistema nervoso periferico e neuromuscolare

## Report revisione D — Sistema nervoso periferico (neurofisiologia, anatomia radici/nervi, localizzazione, dolore neuropatico)

Branch `revisione-contenuti`, nessun commit. Data di riferimento: ottobre 2026.
Metodo: lettura integrale di ogni file; verifica contro Preston & Shapiro (4ª ed. 2021), Gray's Anatomy (42ª ed.), Kendall, linee guida EAN/PNS 2021 (CIDP), NeuPSIG 2015 (Finnerup, Lancet Neurol) e aggiornamento NeuPSIG 2025 (Soliman et al., Lancet Neurol 2025;24:413-428, verificato su PubMed, DOI 10.1016/S1474-4422(25)00068-7), NICE CG173, EFNS 2010, EAN 2019 (nevralgia del trigemino), ASCO 2020 (CIPN), RCP AIFA/EMA.
Controlli tecnici dopo le modifiche: bilanciamento tag HTML (script della BRIEF) → tutti i 9 file `unclosed [] err []`; Playwright headless, viewport 400×900 → nessun `pageerror` in nessuna pagina, `document.documentElement.scrollWidth` = 400 in tutte (le tabelle larghe scorrono dentro il proprio contenitore).

---

### Schemi1/tabelle_eng_emg.html
Giudizio: MANTIENI DOPO LE CORREZIONI

Nota preliminare: l'incarico descriveva la pagina come contenente anche "criteri di demielinizzazione EFNS/PNS 2021 per CIDP" e "pattern EMG": nel file non c'erano né gli uni né gli altri (solo valori normali di conduzione, studi di confronto, blink reflex, frenico, durata MUAP, ecografia, valori pediatrici). Ho aggiunto una scheda compatta con i criteri motori EAN/PNS 2021 (vedi Miglioramenti); non ho aggiunto una sezione sui pattern EMG (sarebbe una sezione nuova e lunga).

#### Correzioni applicate
- Blocco di conduzione al tunnel carpale: "Motorio **polso/palmo** APB: >1.2 | Sensitivo polso/palmo D2: >1.6" → "rapporto di ampiezza **palmo/polso** (stimolo al palmo ÷ stimolo al polso): motorio APB >1.2, sensitivo D2 >1.6". Il rapporto era invertito: con il blocco l'ampiezza è maggiore stimolando a valle (palmo) (Preston & Shapiro 2021, cap. STC).
- Tabella ecografia pediatrica: celle "( )" (DS vuota) → "(n.d.)" per chiarezza.
- Nervo frenico: nota "valori medi, usare ref. specifici" → "valori medi ± DS, variabili tra laboratori: usare riferimenti locali".

#### Miglioramenti applicati
- Nuova scheda (categoria "Studi speciali") **"CIDP – criteri motori EAN/PNS 2021"**: latenza distale ≥150% ULN, VdC ≤70% LLN, latenza F ≥120% ULN (≥150% se CMAP <80% LLN), assenza di F in 2 nervi (CMAP ≥20% LLN + ≥1 altro parametro), blocco di conduzione ≥30% (CMAP distale ≥20% LLN, escluso il tibiale; 2 nervi o 1 + altro parametro), dispersione temporale >30%, durata del CMAP distale (mediano ≥6.6 / ulnare ≥6.7 / peroneo ≥7.6 / tibiale ≥8.8 ms con filtro 2 Hz; valori per 20 Hz); categorie CIDP vs CIDP possibile (abolite definita/probabile), requisito sensitivo in ≥2 nervi, sural sparing, esclusione del mediano al polso se STC (Van den Bergh et al., Eur J Neurol / JPNS 2021).
- Aggiunto riquadro **Fonti** in calce (Preston & Shapiro 2021; Parano 1993 per i valori pediatrici — i numeri in tabella coincidono con la tabella originale; Cartwright 2008 per la CSA ecografica — i cutoff 13.0/8.6/13.3/80.6/17.8/55.9/8.9 mm² coincidono; Buchthal per la durata MUAP; EAN/PNS 2021).

#### Da verificare (non modificato)
- Nervo frenico "Ampiezza 1.0 ± 0.3 mV": Preston & Shapiro riportano ~0.66 ± 0.2 mV (latenza 6.5 ± 0.8 ms coincide). Fonte da controllare: Preston & Shapiro 2021, tabella frenico; Chen et al. 1995.
- Tabella durata MUAP per età (Buchthal): i range riportati (es. bicipite 20-29 aa 7.7-10.7 ms) non li ho potuti confrontare riga per riga con la tabella originale; da controllare su Buchthal & Rosenfalck o sulla tabella di Preston & Shapiro.
- Valori pediatrici di CSA ecografica (0-3 / 4-6 / 7-11 / 12-16 anni): fonte non indicata nel file e non ricostruita con certezza (Cartwright 2009? Zaidman 2009?); il disclaimer già invita a non usarli come cutoff.

#### Note di qualità
- Valori motori/sensitivi di arto superiore e inferiore, studi di confronto per STC (≥0.4 ms misto palmare, ≥0.5 ms lombricale-interosseo, D4, D1), misto palmare, onde F, riflesso H, facciale e blink reflex (R1 ≤13 / R2i ≤41 / R2c ≤44 ms; Δ ≤1.2 / 5 / 7 ms) coincidono con Preston & Shapiro.
- Usabilità su telefono già buona (griglia responsive, prima colonna sticky nelle tabelle scorrevoli, avviso "scorri la tabella").
- Il pulsante "Pediatrico" filtra correttamente; la nuova scheda CIDP compare sotto "Studi speciali".

---

### Schemi1/tabella_innervazione_sciatico.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate (radici: prima → dopo; riferimento Gray's 42ª ed., Preston & Shapiro 2021, Kendall)
- Bicipite femorale capo lungo: L4-S3 → **L5-S2** (divisione tibiale).
- Grande adduttore (porzione posteriore): L5-S1 → **L4 (L2-L4)**; precisato che il resto del muscolo è otturatorio L2-L4.
- Gastrocnemio: L4-S3 → **S1-S2** (errore grossolano: era la radice dell'intero nervo).
- Popliteo: L4-L5 → **L4-S1**.
- Plantare: L5-S1 → **S1-S2**.
- Abduttore dell'alluce: L4-S1 → **S1-S2 (L5)**.
- Flessore breve dell'alluce: L5-S1 → **S1-S2**.
- Flessore breve delle dita: L4-L5 → **S1-S2**.
- 1° lombricale: L5-S1 → **S1-S2**.
- Abduttore del 5° dito: S1-S3 → **S1-S2**.
- Flessore breve del 5° dito: S2-S3 → **S1-S2**.
- Peroneo lungo: L4-S1 → **L5-S1**.
- Estensore breve delle dita: S1-S2 → **L5-S1** (muscolo L5-S1, Preston & Shapiro).
- 1° e 2° interosseo dorsale "via peroneo profondo": aggiunto "contributo variabile; innervazione principale dal n. plantare laterale".
- `rowspan="12"` della divisione peroneale → **10** (erano 10 righe: la tabella era malformata e il raggruppamento sfalsato).
- Tabella cutanea, riga "Nervo Sciatico (tronco) L4-S3 — faccia posteriore coscia tramite rami cutanei diretti" → **N. cutaneo posteriore della coscia (S1-S3)**, con nota che il tronco sciatico non dà rami cutanei nella coscia (errore anatomico).
- Cutaneo: surale L5-S2 → **S1-S2** (2 righe); peroneo superficiale L4-S1 → **L5-S1**; peroneo profondo L4-L5 → **L5**; plantare laterale S1-S3 → **S1-S2**.
- "Numero di fibre ~31.000 (60% motorie, 40% sensitive)" e "70% fibre tibiali / 30% peroneali": numeri non documentabili → sostituiti con formulazioni qualitative (componente tibiale più voluminosa; componente peroneale più vulnerabile, quadro che simula una neuropatia peroneale).
- Intestazione "Segno Patognomonico" → "Segno caratteristico" (nessuno dei segni elencati è patognomonico); L5 "Riflesso: nessuno specifico" → "nessuno affidabile (ischiocrurali mediali)".

#### Miglioramenti applicati
- Riquadro Fonti in calce (Gray's, Preston & Shapiro, Kendall) con avvertenza sulla variabilità di un livello.

#### Da verificare (non modificato)
- Tibiale posteriore "L4-L5": Gray's L4-L5, Preston & Shapiro L5-S1; lasciato (L5 è compreso in entrambi). Flessore lungo delle dita "S1-S2" e flessore lungo dell'alluce "L5-S1": varianti accettabili (Gray's S2-S3, P&S L5-S2).
- "Diametro 15-20 mm", "lunghezza ~40 cm", "VdC 50-60 m/s", "alta biforcazione 15%": ordini di grandezza plausibili ma senza fonte; da verificare su Gray's / studi anatomici (la biforcazione alta è riportata nel 10-15%).

#### Note di qualità
- Ottima resa su telefono (tabelle "a schede" con data-label); lo script gestisce i rowspan, quindi la correzione del rowspan era necessaria anche per la vista mobile.
- Dermatomi e test per radice corretti.

---

### Schemi1/radici_nervi_muscoli.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate (prima → dopo)
- Radicolopatia C7, "Segno clinico tipico: **Segno della mano cadente**" → "Deficit estensione gomito, ipoestesia 3° dito (la mano cadente è del n. radiale)"; muscoli: "Tricipite" → "Tricipite (+ estensori polso/dita, FRC)". La mano cadente è un segno di neuropatia radiale, non di radicolopatia C7.
- Segno di Hoffmann: esecuzione "Flessione passiva falange media" → "Scatto in flessione (flick) della falange distale del 3° dito"; positività "Flessione pollice/indice" → "Flessione-adduzione del pollice e flessione dell'indice".
- Flessore ulnare del carpo: radici C8-T1 → **C8 (C7-T1)** (Preston & Shapiro; Kendall C7-T1); azione "Flessione polso" → "Flessione polso (deviazione ulnare)".
- Tunnel cubitale, deficit "Perdita adduzione dita" → "Deficit abduzione/adduzione dita (interossei), segno di Froment".
- Lasègue: "Dolore sciatico <60°" → "Dolore irradiato sotto il ginocchio tra 30° e 70°".
- Nota "Solo due riflessi testabili nell'arto inferiore" → "Due riflessi di uso routinario… il riflesso degli ischiocrurali mediali (L5) e l'adduttorio (L2-L4) sono accessori".

#### Miglioramenti applicati
- Riquadro Fonti in calce (Preston & Shapiro, Kendall, Gray's, Devillé 2000 per Lasègue, Wainner 2003 per Spurling, MRC).

#### Da verificare (non modificato)
- Sensibilità/specificità: Spurling 50%/95%, Lasègue 91%/26%, Lasègue crociato 29%/88% — coerenti con Devillé 2000 e Wainner 2003 (Spurling sens. 30-60%); lasciati.
- Flessore profondo delle dita "C8-T1": per la porzione mediana (dita 2-3) la radice prevalente è C7-C8; semplificazione accettabile.

#### Note di qualità
- Tutte le altre righe muscolo/nervo/radice verificate e corrette (deltoide C5-6, bicipite C5-6, tricipite C7, brachioradiale C5-6, ECR C6-7, FCR C6-7, APB T1(C8), FDI C8-T1; ileopsoas L2-3, quadricipite L3-4, adduttori L2-4, TA L4-5, ELA L5, gastrocnemio S1, gluteo medio L4-S1, bicipite femorale L5-S2, abduttore alluce S1).
- Scale (MRC, ASIA, mRS, EDSS, NIHSS 0-42) corrette.

---

### flowcharts/neurolocator.html (pagina principale "Cosi_così")
Giudizio: MANTIENI DOPO LE CORREZIONI, con riserva (vedi Note di qualità). Se non si vuole mantenere il localizzatore, le due pagine collegate (nervitab, testclinici) vanno comunque tenute e linkate dall'indice.

#### Correzioni applicate
- **Algoritmo di confronto riscritto** (funzione `calculateMatches`). Prima: ogni lesione (radice, nervo o plesso) veniva confrontata solo per *radice*, usando `detail.includes(root)`: una selezione "piede cadente + ipoestesia dorso del piede" dava al primo posto "N. gluteo superiore 100%", "N. sciatico 100%", "N. tibiale 100%" (verificato con Playwright), cioè risultati clinicamente assurdi; la percentuale era normalizzata con un fattore arbitrario (×1.5). Ora: le radicolopatie si confrontano per radice; i nervi periferici per territorio sensitivo (nome del nervo nel dettaglio della voce), per muscoli/movimenti (tabella `motorKeywords`) e per nervo del riflesso; i plessi per radici sensitive, muscoli e riflessi; la percentuale = quota dei deficit selezionati compatibili con la lesione (ordinamento: nervo > radice > plesso a parità). Verifiche: piede cadente + dorso piede → sciatico, peroneo comune, peroneo profondo, radicolopatia L5, plesso sacrale (100%), poi peroneo superficiale 50%; APB/opponente + ipoestesia 2°-3° dito → "N. Mediano (polso - STC) 100%"; quadricipite + rotuleo + gamba mediale → femorale / L4 / plesso lombare 100%.
- Rimossa la voce motoria errata "N. Radiale (polso)" (al polso il radiale ha solo il ramo sensitivo; i muscoli elencati erano quelli del NIP, già presente come voce separata).
- "Supinazione: C6 / N. radiale" → "C6 / N. muscolocutaneo (bicipite) – radiale (supinatore)".
- Riflesso tricipitale "C7-C8" → "C7 (C6-C8)" (anche nel database e nella voce selezionabile).
- Testo dello stato vuoto "Clicca sulla mappa o seleziona dalla lista" → "Seleziona i deficit dall'elenco: la mappa corporea è solo illustrativa" (la mappa SVG non è mai stata collegata alle selezioni: il codice dice "For now, just visual feedback").
- Aggiunto il link "← Indice" (../index.html), prima assente.

#### Miglioramenti applicati
- Pannello Info: citazioni complete (Lee, McPhee, Stringer, Clin Anat 2008; Sonoo, JNNP 2023; Preston & Shapiro 2021) e spiegazione di che cosa significa la percentuale (quota di deficit compatibili, non probabilità diagnostica).

#### Da verificare (non modificato)
- Miotomi "secondo Sonoo 2023": il database è in realtà la mappa classica (C5 anche brachioradiale, T1 anche flessore superficiale delle dita e FLP). Non modificato: innocuo per l'uso, ma la citazione è generosa.
- Dermatomo S1 include "pianta del piede" e "tallone": accettabile (Lee 2008), con sovrapposizione L5/S1.

#### Note di qualità
- Dopo la riscrittura lo strumento dà risultati sensati nei casi provati, ma resta un orientamento grossolano: territori sensitivi dei nervi ridotti a un nome, nessuna gestione dei "normali" (un deficit non selezionato non è un deficit assente), nessuna distinzione destra/sinistra, mappa corporea decorativa. Il valore reale della triade sta nell'**Atlante nervi** e nei **Test clinici**; il localizzatore può restare come pagina di ingresso purché l'indice non lo presenti come strumento diagnostico. Alternativa: rimuovere il localizzatore e linkare direttamente nervitab/testclinici (e neuroloc per plesso/radici).
- Link reciproci tra le tre pagine: funzionanti (relativi, stessa cartella).

---

### flowcharts/nervitab.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Link "index.html" del logo → "../index.html" (puntava a flowcharts/index.html, inesistente: link rotto); aggiunto "← Indice" nella barra di navigazione.
- Nervo peroneo comune, DD: "Radicolopatia L5 (**ma risparmia eversione**)" → "Radicolopatia L5 (coinvolge anche inversione del piede – tibiale posteriore – e abduzione dell'anca – gluteo medio –, risparmiate nella neuropatia peroneale; SAP peroneo superficiale normale)". L'affermazione era rovesciata: i peronei sono L5-S1 e l'eversione è spesso deficitaria nella radicolopatia L5; i discriminanti sono inversione e abduzione dell'anca (Preston & Shapiro 2021).
- Quadro clinico peroneo comune: aggiunto "inversione conservata".

#### Miglioramenti applicati
- Riga Fonti in calce (Preston & Shapiro; Stewart, Focal Peripheral Neuropathies; Gray's).

#### Da verificare (non modificato)
- Nervo tibiale: territorio sensitivo "Polpaccio post. (surale)": il surale è misto tibiale/peroneo; accettabile.
- Plesso sacrale "Tronco lombosacrale (L4-L5) + S1-S3": corretto (S4 per il pudendo omesso, trascurabile).

#### Note di qualità
- Contenuto anatomico (18 schede: decorso, muscoli, territori, siti di intrappolamento, clinica, DD) accurato; ricerca e filtri funzionanti; nessun errore JS; nessuno scroll orizzontale a 400 px.

---

### flowcharts/testclinici.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Link "index.html" → "../index.html" (rotto) e "← Indice" nella navigazione.
- Test di opposizione (APB): nota "Ultimo muscolo colpito nella STC" → "Deficit motorio tardivo nella STC (dopo i sintomi sensitivi); APB è il muscolo tenare da testare" (l'APB è il muscolo *principale* colpito, non l'ultimo).
- Test EPL: "EPL è il più ulnare del radiale" (frase senza senso anatomico) → "EPL è tra i muscoli più distali innervati dal NIP: spesso l'ultimo a recuperare".
- Froment: "Patognomonico" → "Molto suggestivo di deficit ulnare (adduttore del pollice)".
- Riferimento rapido: tricipitale "C7-C8" → "C7 (C6-C8)".

#### Miglioramenti applicati
- Riga Fonti (Preston & Shapiro; MacDermid 2004 per i test di STC; Durkan 1991; Wainner 2003; Devillé 2000; Majlesi 2008 per lo slump; Fishman 2002 per il FAIR) con avvertenza sulla variabilità di sensibilità/specificità.

#### Da verificare (non modificato)
- Phalen "sens 67-83%, spec 40-98%", Durkan "87%/90%", Tinel "50-60%", test di flessione del gomito "75%", slump "84%": in linea con la letteratura citata; da controllare solo se si vogliono valori puntuali.

#### Note di qualità
- 34 test corretti nella descrizione; tabelle scorrevoli dentro il contenitore su schermo stretto; nessun errore JS.

---

### Schemi1/neuroloc.html ("tipo 1")
Giudizio: MANTIENI DOPO LE CORREZIONI — è la versione da tenere (vedi confronto sotto).

#### Correzioni applicate
- Aggiunto link "← Indice" (../index.html), prima assente.
- `.trow-sub`: tolto `white-space:nowrap` + ellissi: su telefono il sottotitolo (radici · corda · nervo · azione) veniva troncato (Playwright: elemento largo 420 px su viewport 400); ora va a capo.
- "Tibiale anteriore: ~30 gg per denervare da radice L5" → "nei muscoli distali della gamba la denervazione da radice L5 compare dopo ~3–4 settimane" (formulazione standard: paraspinali 7-10 gg, prossimali 2-3 sett., distali 3-5 sett.).
- Pattern TOS neurogeno: aggiunto "il SAP del n. cutaneo mediale dell'avambraccio (T1) ridotto/assente è il reperto più sensibile" (Preston & Shapiro; Gilliatt-Sumner hand).

#### Miglioramenti applicati
- Riquadro Fonti (Preston & Shapiro 2021; Ferrante, Muscle Nerve 2004; Wilbourn, Neurol Clin 2007; Kori, Neurology 1981).

#### Da verificare (non modificato)
- "Plessopatia post-attinica: coinvolgimento prevalente del tronco superiore; neoplastica: tronco inferiore" (Kori 1981): regola classica, in parte ridimensionata da casistiche più recenti; mantenuta come regola didattica.
- Ileo-psoas "L1–L3 · N. femorale": lo psoas riceve rami diretti da L1-L3, l'iliaco dal femorale; semplificazione accettabile.

#### Note di qualità
- Logica topografica corretta e ben spiegata (sentinelle bicipite/tricipite/FDI; sovraspinato per tronchi vs corde; deltoide per tronco superiore vs corda laterale; ECD per tronco inferiore vs corda mediale; TFL/gluteo medio per L5 vs peroneo; gluteo massimo per S1 vs sciatico; adduttori per L4 vs femorale; SAP per pre/post-gangliare; paraspinali).
- Il sistema **N/P a tre stati** è il punto di forza: distingue "testato normale" da "non testato" e suggerisce il prossimo muscolo da esaminare ("Prossimo passo"). JS senza errori; funzionale a 400 px.

---

### Schemi1/plesso-radici.html ("tipo 2")
Giudizio: CANDIDATA ALLA RIMOZIONE (duplicato di neuroloc.html, con motore inferiore). Corretta comunque nel frattempo.

#### Correzioni applicate
- Aggiunto link "← Indice", prima assente.
- **Bug del motore clinico**: il ramo "Tricipite + FDI (tronchi medio+inferiore / corde posteriore+mediale)" era irraggiungibile (preceduto da `else if (fdi && !bicipite)` che catturava ogni caso con FDI), e nel ramo FDI la corda mediale compariva solo se anche il tricipite era normale: selezionando FDI + tricipite la pagina **non dava alcun risultato** (verificato con Playwright). Ora il caso è gestito dentro il ramo FDI (corda mediale/tronco inferiore + combinazione medio+inferiore o posteriore+mediale secondo il deltoide), come in neuroloc.html.
- "Tibiale anteriore distale ~30 cm dalla radice → ~30 giorni per denervare" → "~3–4 settimane".
- Pattern TOS: aggiunto il SAP del cutaneo mediale dell'avambraccio.

#### Miglioramenti applicati
- Riga Fonti nel tab Confronto.

#### Da verificare (non modificato)
- Come per neuroloc.html (stesso contenuto anatomico, corretto).

#### Note di qualità — confronto tipo 1 vs tipo 2
- Le due pagine implementano **la stessa logica dallo stesso documento** (stessi muscoli, stesse regole, testi quasi identici). Differenze: neuroloc (tipo 1) ha toggle N/P a tre stati, suggerimenti "prossimo passo", pattern speciali più completi (incluso Parsonage-Turner), organizzazione per regione; plesso-radici (tipo 2) ha un tab "Confronto" clinica↔neurofisiologia ma registra solo i reperti patologici (non distingue "normale" da "non testato": per il ragionamento topografico è un limite sostanziale) e aveva il bug sopra descritto.
- **Raccomandazione: tenere Schemi1/neuroloc.html, rimuovere Schemi1/plesso-radici.html** (o, se si vuole conservare il tab Confronto, portarlo dentro neuroloc). Nell'indice le due voci "tipo 1 / tipo 2" vanno unificate.

---

### Schemi1/dolore_neuropatico.html
Giudizio: MANTIENI DOPO LE CORREZIONI (la pagina conteneva diversi errori di dose e di gerarchia terapeutica, ora corretti)

#### Correzioni applicate (prima → dopo; fonte)
- **Pregabalin, dose massima**: tabella "Max (se necessario) 600 mg 2x/die" (= 1200 mg/die) → "300 mg 2x/die (600 mg/die = dose massima)"; titolazione riallineata all'RCP (75 mg bid 3-7 gg → 150 mg bid → eventualmente 300 mg bid dopo altri 7 gg; anziani 25-50 mg bid). Aggiustamento renale "GFR 30-60: -50%, <30: -75%" → range RCP (CrCl 30-60: 75-300 mg/die; 15-30: 25-150; <15: 25-75; dose supplementare post-dialisi), sospensione graduale, avvertenze (RCP Lyrica, EMA/AIFA).
- **Gerarchia NeuPSIG**: amitriptilina era in "seconda linea" e il tramadolo in "terza linea" → **amitriptilina (TCA) spostata in prima linea** (raccomandazione forte NeuPSIG 2015 e 2025; prima scelta NICE CG173); **tramadolo in seconda linea** (NeuPSIG 2015; nel 2025 gli oppioidi tutti in terza linea, segnalato); **terza linea** nuova: oppioidi forti, tossina botulinica A, rTMS (Finnerup 2015; Soliman 2025).
- **Amitriptilina, dose**: "10-25 mg sera → 75-150 mg sera" → "10-25 mg la sera, +10-25 mg ogni 3-7 gg fino a 50-75 mg (max 150; NICE fino a 75)", con ECG se >40 anni/cardiopatia, controindicazioni e cautela >65 anni (RCP; NICE).
- **NNT**: "Amitriptilina 6.8" → TCA **3.6** (Finnerup 2015; abstract verificato su PubMed, DOI 10.1016/S1474-4422(14)70251-0); aggiunta colonna NeuPSIG 2025 con NNT (NNH): TCA 4.6 (17), SNRI 7.4 (14), α2δ 8.9 (26), oppioidi 5.9 (15), capsaicina 8% 13.2, lidocaina 5% 14.5, BTX-A 2.7 (Soliman 2025). Rimossa la colonna "Riduzione 50%: 30-45% pazienti" (percentuali non riferibili a una fonte). Duloxetina 6.4, gabapentin 7.2, pregabalin 7.7 confermati.
- **Duloxetina, controindicazioni**: "IMAO, epatopatia severa, glaucoma" → RCP: IMAO, epatopatia, insufficienza renale severa (CrCl <30), ipertensione non controllata, inibitori potenti CYP1A2; glaucoma ad angolo chiuso come cautela; non sospendere bruscamente.
- **Neuropatia diabetica, prevalenza** "60-90% dei diabetici" → "polineuropatia ~50%; dolorosa 20-25%" (Pop-Busui et al., ADA 2017).
- **CIPN**: "Prevenzione durante chemio" → "Nessun farmaco raccomandato per la prevenzione; duloxetina unico con evidenza moderata" (ASCO 2020, Loprinzi).
- **Nevralgia del trigemino**: aggiunta oxcarbazepina come alternativa di prima linea e range di dose (CBZ 200-1200, OXC 300-1800 mg/die), RM per escludere forme secondarie (EAN 2019, Bendtsen).
- **Capsaicina 8%**: "patch 30-60 min ogni 90 giorni, indicazioni NPE/HIV" → dettagli RCP (cerotto 179 mg, 30 min piedi / 60 min altre sedi, fino a 4 cerotti, ≥90 gg), indicazione anche per la neuropatia diabetica dei piedi.
- **Effetti collaterali**: "Edemi: diuretici, switch a SNRI" → "ridurre la dose o cambiare classe; i diuretici non sono utili".
- **Combinazioni**: "Gabapentin + Amitriptilina 1800 mg + 75 mg" → Gabapentin + Nortriptilina (Gilron 2009, Lancet) e Gabapentin + Morfina (Gilron 2005, NEJM); Pregabalin + Duloxetina: dosi del COMBO-DN (150 mg bid + 60 mg) invece di "300 mg bid + 60 mg".
- **Riferimenti**: "IASP 2024", "EFNS/EAN 2023", "NICE 2023" (documenti inesistenti o con date errate) → NeuPSIG 2015 + aggiornamento 2025 (con gerarchia corretta), EFNS 2010 (Attal) ed EAN 2019 (trigemino), NICE CG173 (2013, agg. 2020) con le sue raccomandazioni effettive (scelta fra amitriptilina/duloxetina/gabapentin/pregabalin; tramadolo solo come salvataggio; capsaicina crema per dolore localizzato; non iniziare oppioidi forti ecc. senza specialista).
- Flowchart: seconda linea "Amitriptilina / Capsaicina / Lidocaina" → "Capsaicina 8% / Lidocaina 5% / Tramadolo"; prima linea esplicita TCA-SNRI-gabapentinoidi; terza linea "Oppioidi forti - BTX-A - rTMS"; trigemino con oxcarbazepina; dolore lieve "Gabapentin 300 mg/die" → "monoterapia di prima linea a bassa dose". Il diagramma Mermaid è stato ricontrollato con Playwright (renderizza, nessun errore di sintassi).
- Punti chiave: prima linea aggiornata (TCA, SNRI, gabapentinoidi; lidocaina topica nel fragile con dolore localizzato).
- Service worker: `register('sw.js')` puntava a Schemi1/sw.js, inesistente (il file è nella radice) → `'../sw.js'`.

#### Miglioramenti applicati
- Nuova card **Lidocaina 5% cerotto** (700 mg, fino a 3 cerotti, 12 h on/12 h off, valutazione a 2-4 settimane; indicazione AIFA NPE; opzione da considerare per prima nell'anziano/fragile con dolore localizzato): il farmaco era citato nel flowchart ma non aveva una scheda posologica.
- Card gabapentin: aggiunti schema RCP rapido (300 → 600 → 900 mg nei primi 3 giorni, poi +300 mg/die ogni 2-3 gg fino a 1800-3600) e **aggiustamento renale** (CrCl 50-79: 600-1800; 30-49: 300-900; 15-29: 150-600; <15: 150-300 mg/die), prima assente; lo schema lento in tabella è stato mantenuto come schema per anziani/fragili.

#### Da verificare (non modificato)
- Soglie painDETECT (≤12 / 13-18 / ≥19) e DN4 ≥4: corrette (Freynhagen 2006; Bouhassira 2005).
- Flowchart "Risposta 4-6 settimane; efficace ≥30%, parziale 15-29%, inefficace <15%": soglie IMMPACT per 30%/50%; la soglia 15% è una scelta dell'autore, lasciata.
- "Nevralgia post-erpetica = dolore >3 mesi": definizione comune (≥90 giorni); alcune fonti usano >1 mese.
- La pagina non tratta venlafaxina (prima linea NeuPSIG tra gli SNRI) né il dolore neuropatico centrale: non aggiunti per non allungare.

#### Note di qualità
- Impaginazione già adatta al telefono (tabelle in `.table-container`); link all'indice presente (sopra e sotto).

---

### Sintesi
Nove pagine lette integralmente e corrette in place. Gli errori più rilevanti erano: nel dolore neuropatico la dose massima di pregabalin raddoppiata (600 mg bid), amitriptilina relegata a seconda linea e tramadolo a terza con NNT dei TCA sbagliato, riferimenti a linee guida inesistenti ("IASP 2024", "EFNS/EAN 2023", "NICE 2023"); nella tabella dello sciatico una decina di radici errate (gastrocnemio "L4-S3", bicipite femorale "L4-S3", intrinseci del piede L4-L5…), un rowspan sbagliato che deformava la tabella e un territorio cutaneo attribuito al tronco sciatico; nel radici-nervi-muscoli la "mano cadente" attribuita a C7 e l'Hoffmann descritto male; nell'atlante nervi la regola L5-vs-peroneo rovesciata ("L5 risparmia l'eversione"); link rotti a `index.html` in nervitab/testclinici e link all'indice mancanti in neurolocator, neuroloc e plesso-radici; il localizzatore (neurolocator) produceva risultati assurdi per un difetto del motore, ora riscritto; plesso-radici aveva un ramo logico irraggiungibile (FDI + tricipite senza risultato). I valori normali ENG/EMG e i criteri clinici dei test erano in gran parte corretti; ho aggiunto una scheda con i criteri elettrodiagnostici EAN/PNS 2021 e un riquadro fonti in tutte le pagine che ne erano prive. Raccomandazioni per l'indice: tenere neuroloc.html ("tipo 1") e rimuovere plesso-radici.html ("tipo 2", duplicato); mantenere la triade neurolocator/nervitab/testclinici solo presentando il localizzatore come orientamento, oppure linkare direttamente atlante e test clinici.

File modificati: Schemi1/tabelle_eng_emg.html, Schemi1/tabella_innervazione_sciatico.html, Schemi1/radici_nervi_muscoli.html, flowcharts/neurolocator.html, flowcharts/nervitab.html, flowcharts/testclinici.html, Schemi1/neuroloc.html, Schemi1/plesso-radici.html, Schemi1/dolore_neuropatico.html (`git diff --stat` sui nove file: 9 files changed, 318 insertions(+), 215 deletions(-)).

---

# E. Motoneurone, strumenti e pagine varie

## Report revisione E – Motoneurone e pagine varie

Revisore: neurologo (malattie del motoneurone) – revisione editoriale e di letteratura, ottobre 2026.
Branch: `revisione-contenuti`. Nessun commit, nessun push. `index.html` solo letto.

Metodo: lettura integrale di ogni file; verifica delle affermazioni cliniche contro EAN 2024 (Van Damme et al., Eur J Neurol 2024;31:e16264, testo integrale letto da PMC), Canada 2020 (Shoesmith, CMAJ), NICE NG42, criteri Gold Coast (Shefner, Clin Neurophysiol 2020;131:1975), RCP EMA e determine AIFA (Qalsody PRES/1253/2026; Evrysdi 190/2025 e PRES/1271/2026; Zolgensma 277/2021), approvazioni EC 2026 (nusinersen alte dosi, Itvisma), standard of care SMA 2018 (Mercuri/Finkel). Test tecnici: script di bilanciamento tag (tutti i file: `unclosed [] err []`), Playwright headless 400×900 su http-server locale (nessun `pageerror`, `scrollWidth` 400 su tutte le pagine dopo le correzioni, diagrammi Mermaid renderizzati: 2 in SLA, 3 in SMA).

Nota sulla verifica dei link esterni: dalla sandbox `curl -sI` attraverso il proxy riceve `403` al CONNECT per **tutti** gli host esterni (policy di egress, non un problema dei siti) e WebFetch fallisce in DNS (`ENOTFOUND`). I link sono stati quindi valutati indirettamente con la ricerca web (vedi risorse.html). Da riverificare con un browser normale.

---

### flowcharts/gestione_sla.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Titolo "Linee Guida EAN 2024 / Canada 2020" → "EAN 2024 · Canada 2020 · NICE NG42 · criteri Gold Coast 2020" (fonti effettivamente usate).
- `<h2>Valutazione clinica: ALSFRS-R</h2>` orfano, fuori da ogni sezione e senza contenuto → nuova sezione "0. Diagnosi e valutazione" con criteri **Gold Coast 2020** (3 criteri; EMG equivalente a segni di 2° motoneurone; 4 regioni), ALSFRS-R con **link al calcolatore** `alsfr-s.html`, test genetico da offrire a tutti (SOD1, C9orf72…), screening cognitivo ECAS (EAN 2024: ~50% deficit, ~10% FTD).
- Edaravone, criteri canadesi: "FVC >80%, ALSFRS-R >2" → "CVF ≥80%, punteggio ≥2 in **ogni item** ALSFRS-R, durata ≤2 anni, SLA definita/probabile" (criteri dello studio MCI186-19; il testo precedente era privo di senso perché ALSFRS-R va 0–48). Aggiunto: EAN 2024 non raccomanda né ev né orale fuori da trial (– –); EMA: domanda ritirata 2019; Italia: Radicut ev tramite L. 648/96 (Det. AIFA 2017, ampliata 2018), schema 60 mg/die.
- Tofersen: box generico → prima linea nella SLA-SOD1 (EAN 2024 ++), 100 mg IT, 3 carichi a 14 gg poi ogni 28 gg, EMA 2024, **rimborsato SSN dal 22/09/2026 (Det. AIFA PRES/1253/2026, GU n. 219)**, eventi avversi gravi (mielite/radicolite, papilledema/ipertensione endocranica, meningite asettica) (RCP Qalsody; VALOR, NEJM 2022).
- Tabella respiratoria: "CVF <50% → valutare NIV" era in contraddizione con il diagramma NIV sottostante (<80% / <65%) → "CVF <80% con sintomi; <50% (NICE) o <65% (Canada) anche se asintomatico"; aggiunte righe SpO₂ notturna (<90% per ≥5% del tempo) e soglia PCF <270 (tosse assistita) oltre a <160 (inefficace); pCO₂ 45 mmHg = 6 kPa; nota su inaffidabilità di CVF/MIP nei bulbari (NICE NG42, Canada 2020).
- Riluzolo: monitoraggio generico → ALT mensile per 3 mesi, poi ogni 3 mesi nel 1° anno; sospendere se ALT >5× ULN; emocromo se febbre (RCP Rilutek); EAN: ridurre la dose prima di sospendere.
- Scialorrea: "Laroxyl gtt" e "Amitriptilina" erano elencati come due farmaci distinti (sono lo stesso principio attivo) → una sola voce con conversione gtt↔mg (Laroxyl 40 mg/ml: 1 gtt = 2 mg), più la scaletta EAN 2024: anticolinergici 1ª linea, DMQ, **tossina botulinica** salivare (incobotulinumtoxinA 100 U ha indicazione per la scialorrea cronica), radioterapia, chirurgia non suggerita.
- Sindrome pseudobulbare: DMQ era l'unica opzione → prima SSRI/triciclici (EAN 2024 +), DMQ con la precisazione che **Nuedexta non è in commercio in UE/Italia (AIC ritirata 2016)**; insonnia e depressione secondo EAN 2024 (mirtazapina/quetiapina, ipnotici; psicoterapia/SSRI).
- Spasticità: markup non valido (`<subsection>`, `<section>` annidata con `<h2>`) → `div.section`/`div.subsection` con `<h3>` come la voce Tizanidina; tizanidina: aggiunti max 36 mg/die ed **epatotossicità con ALT basale e mensile per 4 mesi** (RCP Sirdalud); aggiunti approccio non farmacologico, baclofene intratecale e tossina botulinica focale (EAN 2024).
- Crampi: elenco scarno → EAN 2024 (+): mexiletina 150 mg ×2-3, ranolazina, chinino solfato, carbamazepina, gabapentin, pregabalin, baclofene; chinino 100-200 mg/die con ECG prima/dopo (EAN ++) e nota che in Italia esiste solo come galenico; mexiletina: ECG basale.
- Dolore/altro: aggiunti valutazione attiva, cause, infiltrazioni steroidee, stipsi, laringospasmo, TVP (EAN 2024, consenso).
- Cure palliative: aggiunta pianificazione condivisa delle cure e DAT (L. 219/2017).
- Fonti in calce: da "EAN 2024, Canada 2020" a riquadro completo con citazioni (EAN 2024, CMAJ 2020, NICE NG42, Gold Coast 2020, VALOR 2022, LIPCAL-ALS 2020, RCP Qalsody, Det. AIFA).

#### Miglioramenti applicati
- Nutrizione: "Discutere precoce (CVF ~50%)" reso esplicito (proporre la gastrostomia prima che CVF scenda sotto 50%; con CVF <50% RIG o PEG con NIV); dieta "preferibilmente ipercarboidrati" → ipercalorica, ipercarboidrata ben tollerata (Wills 2014) o iperlipidica nei progressori rapidi (LIPCAL-ALS 2020); parenterale se gastrostomia non fattibile (EAN 2024).
- NIV: nodo Mermaid "Entro 4 settimane" → "Avviare entro 4 settimane"; aggiunta la raccomandazione EAN di offrire la NIV anche ai bulbari e di discutere per tempo la ventilazione invasiva.

#### Da verificare (non modificato)
- Stato attuale di Radicut (edaravone ev) nell'elenco L. 648/96 e dell'edaravone orale in UE (nessun parere CHMP trovato): controllare elenco 648 AIFA aggiornato.
- Classe di rimborsabilità e prezzo di Qalsody nella Det. PRES/1253/2026 (non letta nel testo integrale; data di efficacia 22/09/2026 confermata da comunicato AIFA).
- Soglia canadese "CVF <65% asintomatico" nel diagramma NIV: presente nel file originale e coerente con Shoesmith 2020 per quanto ricordo; da ricontrollare sul testo CMAJ (tabella NIV).
- Edaravone, schema 648: "60 mg/die ev per 14 gg, poi cicli 10/14 gg" riportato dalla scheda Radicut; verificare la dicitura esatta della determina.

#### Note di qualità
- Pagina ora coerente al suo interno (tabella e flowchart NIV concordano). I diagrammi Mermaid caricano dal vendor locale, nessun errore JS, nessuno scroll orizzontale a 400 px.
- Il diagramma nutrizionale resta semplificato (perdita di peso >5-10%, BMI <18,5, rischio aspirazione); accettabile per un pocket.

---

### flowcharts/gestione_sma.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Titolo "Linee Guida 2007-2018" → "Standard of care SMA 2018 (Mercuri/Finkel) · schede EMA/AIFA agg. 2026".
- Tabella di classificazione: aggiunti tipo 0, sottotipi 3a/3b, esordio tipo 2 "6-18 mesi", età tipo 4 (>18-30 anni), colonna copie SMN2 tipiche; nota che la sopravvivenza indicata è la **storia naturale pre-terapie** e che oggi il paziente si descrive per copie SMN2, età al trattamento e stato funzionale (Mercuri 2022, Nat Rev Dis Primers).
- **Zolgensma**: "Peso <13,5 kg" presentato come indicazione → distinto tra indicazione EMA (SMA tipo 1 **oppure** ≤3 copie SMN2, tabella posologica fino a 21 kg) e **rimborsabilità AIFA ≤13,5 kg (Det. 277/2021)**; aggiunti dose (1,1×10¹⁴ vg/kg), anticorpi anti-AAV9, prednisolone, monitoraggio epatico/piastrine/troponina (RCP Zolgensma). Aggiunto **Itvisma** (onasemnogene intratecale, dose fissa, ≥2 anni), approvato dalla Commissione Europea il 2/7/2026 (studio STEER).
- **Nusinersen**: mantenuto lo schema 12 mg (0, 14, 28, 63 gg, poi ogni 4 mesi); aggiunto il **regime ad alte dosi DEVOTE approvato dalla Commissione Europea nel gennaio 2026** (2×50 mg a 14 gg, poi 28 mg ogni 4 mesi; transizione dal 12 mg con 1 dose da 50 mg), monitoraggio piastrine/coagulazione/proteinuria, accesso guidato nelle scoliosi.
- **Risdiplam**: indicazione aggiornata a EMA/AIFA Det. 190/2025 (tipo 1-3 o 1-4 copie SMN2), estensione sotto i 2 mesi (coerente con la tabella posologica già presente che include <2 mesi 0,15 mg/kg), **compresse 5 mg (rimborsate AIFA dal 30/9/2026, Det. PRES/1271/2026)**, avvertenze su teratogenicità/fertilità. Tabella: "> 2 anni" → "≥ 2 anni", ">20 kg" → "≥20 kg" (coerente con RCP).
- Cure palliative: "Narcotici nebulizzati" (anglicismo) → "Oppioidi (anche nebulizzati)"; "Supporto lutto e bereavement" → "Supporto al lutto".
- Diagramma scoliosi: nodo "Rx" ambiguo → "Rx ogni 6 mesi".
- Aggiunto riquadro fonti (Mercuri 2018 parte 1, Finkel 2018 parte 2, Mercuri 2022, RCP EMA, Det. AIFA, Glascock 2020 per lo screening, Hagenacker 2020 per l'adulto).

#### Miglioramenti applicati
- Diagnosi: aggiunto lo **screening neonatale** (programmi regionali, Puglia inclusa; inserimento nei LEA annunciato nel 2025) e la regola del trattamento presintomatico con 2-3 copie SMN2 (NURTURE, SPR1NT, RAINBOWFISH; consenso Glascock 2020).
- Terapie: nota introduttiva (iniziare il prima possibile, registro AIFA) e breve paragrafo **SMA dell'adulto** (nusinersen e risdiplam rimborsati, aspettativa = stabilizzazione, rivalutare a 12-14 mesi), dato che il sito si rivolge a neurologi dell'adulto.
- Follow-up: aggiunte le scale (CHOP-INTEND, HINE-2, HFMSE, RULM, 6MWT) richieste dai registri AIFA.

#### Da verificare (non modificato)
- Stato AIFA di Itvisma (approvazione EC 2/7/2026; rimborsabilità italiana non trovata) e del regime nusinersen ad alte dosi (approvazione EC 12/1/2026; rimborsabilità AIFA non trovata): scritto esplicitamente "da verificare" nel file.
- Risdiplam <2 mesi: la Det. AIFA 190/2025 descrive l'indicazione per tipo/copie senza limite di età; l'estensione EMA ai <2 mesi è ricordata ma non riletta nell'RCP aggiornato.
- Screening neonatale SMA nei LEA: annunciato (ottobre 2025), non ho trovato il decreto in Gazzetta: verificare la data di effettiva entrata in vigore.
- Zolgensma: eventuale estensione AIFA oltre 13,5 kg dopo il 2025 non trovata; nel file resta 13,5 kg.

#### Note di qualità
- Pagina prevalentemente pediatrica (deriva dagli SoC 2018): per il pubblico del sito il paragrafo sull'adulto era indispensabile. I tre diagrammi Mermaid renderizzano; nessun errore JS; nessuno scroll orizzontale. La tabella di classificazione ha ora 5 colonne ma resta nel contenitore a 400 px (testo 0,85em).

---

### flowcharts/alsfr-s.html
Giudizio: MANTIENI DOPO LE CORREZIONI (riscritta nella sostanza: gli item erano sbagliati e il calcolo non esisteva)

#### Correzioni applicate
- **Item errati**: il file aveva "6. Igiene personale" e "7. Vestizione e igiene" (duplicato) e **mancava l'item 7 "Girarsi nel letto e sistemare le coperte"**; mancava la variante **5b (con gastrostomia)**. Ora i 12 item corrispondono alla scala originale (Cedarbaum 1999): 1 linguaggio, 2 salivazione, 3 deglutizione, 4 scrittura, 5a/5b, 6 vestirsi e igiene, 7 girarsi nel letto, 8 camminare, 9 scale, 10 dispnea, 11 ortopnea, 12 insufficienza respiratoria.
- **Descrittori dei punteggi** riscritti sui descrittori originali (prima erano parafrasi imprecise: es. "1 - Indispensabile l'aiuto" per il linguaggio, "2 - Difficoltà con liquidi" per la deglutizione, "2 - Necessita 2 cuscini" per l'ortopnea, che nella scala originale è punteggio 3 "non più di 2 cuscini").
- **Calcolo**: il pulsante "Invia" non aveva alcun handler (il form ricaricava la pagina con i parametri in query string e non mostrava nulla). Aggiunto JS: totale 0-48 e 4 sotto-punteggi (bulbare, motricità fine, grossolana, respiratorio, 12 ciascuno), aggiornati a ogni cambio e al click; item 5 commutabile 5a/5b con radio. Verificato con Playwright: tutti 4 → 48, tutti 0 → 0, tutti 2 → 24; toggle 5a/5b funzionante (5a=0 → 44; passando a 5b=2 → 46; il submit non ricarica la pagina); nessun `pageerror`.
- Usabilità: mancavano `meta viewport` e link di ritorno; la pagina aveva scroll orizzontale a 400 px (`scrollWidth` 468 per padding 2em + margini) → aggiunti viewport, `box-sizing`, padding 1em, select a larghezza piena; `scrollWidth` ora 400. Aggiunti link "← Gestione SLA" e "Torna all'indice principale".
- Aggiunto riquadro fonti (Cedarbaum 1999; Kimura 2006 per ΔFS; EAN 2024) con nota che la traduzione è a scopo pratico e per studi va usata la versione italiana validata.

#### Miglioramenti applicati
- Nota interpretativa: ΔFS = (48 − punteggio)/mesi dall'esordio, <0,5 lenta, 0,5-1 intermedia, >1 rapida (Kimura 2006); avvertenza che il totale non va letto da solo.

#### Da verificare (non modificato)
- Formulazione italiana ufficiale degli item: esistono traduzioni validate (es. versione ALSFRS-R italiana usata nei registri); la mia è una traduzione fedele dell'originale inglese, non la versione validata.

#### Note di qualità
- **Vale la pena linkarla**: ora è linkata da `gestione_sla.html` (sezione 0). Suggerisco di aggiungerla anche in `index.html` sotto "Motoneurone" ("Calcolatore ALSFRS-R") perché è uno strumento d'uso quotidiano in ambulatorio SLA.
- Lo stile della pagina è diverso dal resto dei flowchart (sfondo chiaro, 600 px): lasciato, con piccoli ritocchi coerenti con i colori del sito.

---

### Schemi1/f_100.html
Giudizio: CANDIDATA ALLA RIMOZIONE (strumento che non ha senso clinico sul mezzo; se si vuole tenere, solo come demo didattica con il disclaimer ora aggiunto e spostata fuori da "Demielinizzanti")

#### Valutazione clinica onesta
- Il FM-100 misura la discriminazione di tinta con 85 tappi Munsell fisici osservati sotto illuminante standard (C/D65 ~6700 K, luminanza controllata). Su uno smartphone/monitor non calibrato gamma, gamut, luminosità, filtri "luce blu"/night mode e angolo di visione cambiano i passi di tinta in modo non prevedibile: i valori normativi per età (Verriest 1982; Kinnear & Sahraie 2002) e le classi di Farnsworth non sono applicabili. Il risultato non è interpretabile né confrontabile nel tempo.
- Il menu "Illuminante" (D65/D50/A/F2) non fa nulla: è solo un campo del referto, ma suggerisce una standardizzazione che non c'è.
- Usabilità su telefono: a 400 px i 21 tappi sono cerchi da 36 px da trascinare in riga (drag & drop + touch personalizzato); operazione lunga e imprecisa; il test completo richiede 84 trascinamenti su 4 vassoi. Il font è caricato da Google Fonts (dipendenza esterna, fallisce offline nell'app: nessun errore bloccante, ma incoerente con la scelta di vendorizzare Mermaid).
- Per la valutazione del colore in neurite ottica/SM in ambulatorio servono Ishihara/HRR o D-15 fisici; nei trial il FM-100 fisico. Il nome in indice "Valutazione discomatopsia (alfa)" contiene anche un refuso ("discromatopsia").

#### Correzioni applicate (bug reali, perché la pagina resti almeno coerente finché esiste)
- **Punteggio errato**: con i vassoi in ordine perfetto il TES risultava **83** (non 0) e l'asse "Protan" veniva sempre segnalato, perché la distanza fra il tappo 1 e il riferimento 85 era calcolata in linea retta (84) invece che sul cerchio delle tinte (1). Introdotta la distanza circolare `min(|a−b|, 85−|a−b|)`. Verificato con Playwright: ordine perfetto → TES 0, "Normal"; scambio di due tappi adiacenti → TES 3.
- **Tappi di riferimento duplicati**: il riferimento finale di ciascun vassoio coincideva con un tappo mobile dello stesso vassoio (21, 42, 63), per cui l'ultimo tappo non poteva mai avere errore corretto. I riferimenti sono ora i tappi adiacenti esterni (85|1-21|22, 21|22-42|43, 42|43-63|64, 63|64-84|85); i colori di riferimento già presenti nel file corrispondevano esattamente a questi tappi (es. `#d1c11b` = tappo 22), quindi solo gli id erano sbagliati.
- **Assi di confusione sbagliati**: protan 70-84+1-10, deutan 25-45, tritan 46-70 (archi unipolari) → assi **bipolari** di Farnsworth: protan 62-70 e 17-24, deutan 56-61 e 12-16, tritan 46-52 e 2-6.
- Sottotitolo "Test di discriminazione cromatica per la valutazione clinica" → "Simulazione didattica … (versione alfa)"; aggiunto riquadro "Limiti: non è uno strumento diagnostico" con le ragioni sopra; aggiunto riquadro fonti (Farnsworth 1957; Kinnear & Sahraie 2002; Vingrys & King-Smith 1988) e link "Torna all'indice principale" (mancava).

#### Da verificare (non modificato)
- Il TES è calcolato sui soli 84 tappi mobili (lo standard somma gli 85 incluso il tappo 85 e i tappi pilota fissi); differenza trascurabile e irrilevante vista la non validità su schermo.
- I codici RGB dei tappi sono un'approssimazione (dichiarata nel sorgente) e non derivano da una conversione Munsell→sRGB documentata.

#### Note di qualità
- Dopo le correzioni: nessun `pageerror`, `scrollWidth` 400, pulsante Reset con `confirm()` funzionante. Resta una pagina da 1.660 righe (59 KB) per uno strumento senza valore clinico: il mio parere è di toglierla dall'indice o spostarla in "Flashcard e altro" come curiosità didattica.

---

### Schemi1/risorse.html
Giudizio: MANTIENI DOPO LE CORREZIONI

#### Correzioni applicate
- Mancavano `<meta charset="UTF-8">` e `lang="it"` (rischio di accenti illeggibili quando la pagina è aperta da file:// o nella WebView) → aggiunti; `<title>` generico "Neurologia per schemi" → "Risorse – Neurologia per schemi".
- `manifest.json` e `favicon.ico` erano referenziati con percorso relativo alla cartella `Schemi1/` (file inesistenti lì) → `../manifest.json`, `../favicon.ico`.
- Un `</div>` di troppo in fondo (lo script di bilanciamento lo segnalava come errore) → rimosso; ora `unclosed [] err []`.
- **Scroll orizzontale** a 400 px (`scrollWidth` 653) causato dai nomi file lunghi usati come testo dei link (es. `Aggiornamento_Comunicazione_Tecnico_Scientifica_AISM_INPS_Sclerosi_Multipla.pdf`) → testi dei link riscritti in italiano leggibile ("Sclerosi multipla – comunicazione tecnico-scientifica AISM/INPS…", "MDS-UPDRS – versione italiana ufficiale", ecc.) e `overflow-wrap: anywhere` sul body; `scrollWidth` ora 400.
- Link "EON periferico" puntava a una copia PDF del libro Elsevier *Aids to the Examination of the Peripheral Nervous System* ospitata su un sito terzo (khorasanneurology.com): quasi certamente non autorizzata (opera a pagamento, 6ª ed. 2022) e non raggiungibile dalla sandbox → sostituito con la pagina UKRI/MRC che distribuisce legittimamente l'edizione storica ad accesso libero (`https://www.ukri.org/publications/aids-to-the-examination-of-the-peripheral-nervous-system/`), con testo esplicativo. Se l'autore preferisce, può togliere del tutto la voce.
- "ICH-3" → "ICHD-3" (nome corretto della classificazione).

#### Miglioramenti applicati
- Aggiunti i tre PDF già presenti in `pdf/` ma non linkati da questa pagina: `MMSE.pdf`, `MoCA_Italian.pdf`, `ADL_IADL.pdf`.
- Sottotitoli brevi per le due sezioni (PDF offline vs. siti esterni che richiedono connessione).
- Testi dei link on-line più descrittivi (EpiPick con riferimento Epilepsia 2020; Neuromuscular Disease Center WashU; Learning EEG; Neuropod).

#### Verifica dei link esterni (limitata: curl bloccato dal proxy con 403, DNS non risolto per WebFetch)
- `epipick.org` – esistenza confermata da fonti indipendenti (CURE Epilepsy, pubblicazioni 2020-2022); pertinente.
- `neuromuscular.wustl.edu` – risorsa storica e stabile; pertinente.
- `www.learningeeg.com` – pagina "about" indicizzata; pertinente.
- `neuropod.it` – il podcast Neuropod (SIN) esiste (137 episodi, ultimo luglio 2025 nei tracker); il dominio `.it` non è stato confermato: **da verificare**.
- `neuromag.it` – nessun riscontro nella ricerca web (la rivista SIN Giovani potrebbe aver cambiato nome/dominio): **sospetto morto, da verificare**. Nota: è l'unico link in `http://` non sicuro.
- `www.stroke-manual.com` – nessun riscontro nella ricerca web: **da verificare**.
- `svaol.it/aol/goe.php?id=452A3A18` – pagina con id di una piattaforma di streaming congressuale: tipicamente scade; nessun riscontro: **probabilmente morto, da verificare** e in caso sostituire con la pagina congressi di neuro.it.
- Immagine CC `i.creativecommons.org/...88x31.png` – non raggiungibile dalla sandbox (stesso blocco); nell'app offline comunque non si carica: si potrebbe vendorizzare come già fatto per Mermaid (vale per tutte le pagine, non modificato).

#### Note di qualità
- Tutti i 18 PDF locali esistono in `pdf/`. La pagina conserva il blocco "Share on Mastodon" prima del DOCTYPE, presente identico in altre 4 pagine del sito: lasciato per coerenza, ma andrebbe spostato dentro `<body>` (markup prima del DOCTYPE forza quirks mode in alcuni browser).

---

### strumenti/impegnative.html
Giudizio: MANTIENI

#### Correzioni applicate
- Solo il commento del sorgente "carica i 3 JSON" → "carica i 5 JSON (catalogo + 4 opzionali)" (il codice ne carica cinque). Nessuna modifica funzionale. Dati JSON non toccati.

#### Verifiche eseguite (Playwright, 400×900, http-server)
- Caricamento: nessun `pageerror`, nessuna richiesta fallita; testata "Catalogo generato il 2026-10-01 (4074 prestazioni) · sinonimi al 2026-08-10 · strutture al 2026-08-10 · percorsi al 2026-08-10".
- Ricerca "sonno" → "1 percorsi e 7 prestazioni trovate", prima scheda il percorso "Prima valutazione disturbi del sonno (OSAS, insonnia, ipersonnia)"; "emg" → 10 prestazioni, prima "ELETTROMIOGRAFIA SEMPLICE [EMG]"; "OSAS" → 1 percorso + 1 prestazione; "89.13" → 1 percorso + 7 prestazioni. `scrollWidth` 400 in tutti i casi.
- Comportamento con `file://` gestito con messaggio esplicativo; copia negli appunti con fallback.

#### Da verificare (non modificato)
- `strutture.json` contiene una sola voce (segnaposto `esempio: true`, quindi non mostrata): la sezione "Dove eseguirla" mostra sempre "Nessuna struttura ancora censita"; è una scelta dichiarata, ma per l'utente è una promessa vuota finché non si popola.
- Il badge tipo usa `ETICHETTE_TIPO[p.tipo]` senza fallback: se una prestazione avesse un `tipo` non previsto comparirebbe "undefined" (oggi non succede: 4074 prestazioni caricate senza anomalie visibili).

#### Note di qualità
- Pagina ben scritta, mobile-first, commentata; coerente con il resto del sito. Dati aggiornati al catalogo 2026-10-01.

---

### index.html (solo lettura, non modificato)
#### Testi dei link poco chiari
- "Guida localizzazione lesioni periferica (Cosi_così)" – la parentesi è un giudizio dell'autore con underscore: sostituire con un titolo neutro (es. "Localizzatore di lesioni periferiche – flowchart") o togliere la parentesi.
- "Valutazione discomatopsia (alfa)" – refuso ("discromatopsia") e, per quanto detto sopra, la pagina non andrebbe presentata come valutazione clinica né sotto "Demielinizzanti"; se resta: "Simulazione FM-100 Hue (demo didattica)" in "Flashcard e altro".
- " localizzazione plesso radice (tipo 1)" / "localizzazione plesso radice (tipo 2)" – iniziale minuscola, spazio iniziale, "tipo 1/tipo 2" non dice la differenza: usare due titoli descrittivi (es. "Plessi e radici – schema tabellare" / "Plessi e radici – mappa interattiva") dopo aver guardato le due pagine.
- "Ipertensione e frequenza" – ambiguo (frequenza cardiaca? delle crisi?): "Gestione di pressione arteriosa e frequenza cardiaca in acuto" o simile.
- "Urgenze nelle malattie neuromuscolari UILDM" – la sigla alla fine sembra parte del titolo: "Urgenze nelle malattie neuromuscolari (schede UILDM)".
- "Flashcard completo" → "Flashcard – raccolta completa"; "Risorse varie" → "Risorse e PDF scaricabili".
- "Criteri diagnostici aggiornati (2017-2025)" – andrà aggiornato se la pagina viene estesa al 2026.

#### Pagine non linkate che meriterebbero un link
- `flowcharts/alsfr-s.html` → sotto "Motoneurone": "Calcolatore ALSFRS-R" (ora funzionante; linkato anche da gestione_sla).
- `Schemi1/crisi2025.html` → sotto "Urgenze Neurologiche" o in una nuova sezione "Epilessia" (oggi l'epilessia non ha una sezione: stato epilettico è sotto Urgenze, EpiPick sta in Risorse).
- `flowcharts/fa_anticoagulazione.html` → sotto "Cerebrovascolare": "Scelta dell'anticoagulante nella FA dopo ictus" (oggi raggiungibile solo da prevenzione_secondaria).
- `flowcharts/ictus_acuto.html` → sotto "Urgenze Neurologiche" accanto a "Gestione ictus ischemico" ("Flowchart ictus acuto").
- `flowcharts/gestione_ospedaliera_glicemia.html` → sotto "Gestione internistica" accanto a "Gestione glicemia".
- Altre pagine orfane viste nel repository e non menzionate nell'incarico: `Schemi1/flashcardIIIanno.html`, `Schemi1/neurocards_canovacci.html`, `flowcharts/nervitab.html`, `flowcharts/testclinici.html` – valutare se linkarle o rimuoverle.
- Nota tecnica: `data/revisioni.json` contiene già le chiavi di queste pagine, quindi i badge "agg." funzionerebbero subito.

#### Ordine e nomi delle sezioni
- "Schemi per:" come primo `<h1>` seguito dal campo filtro è un residuo: il filtro ha già un placeholder; si può togliere o trasformare in sottotitolo.
- Le sezioni usano tutte `<h1>`: per il filtro JS va bene, ma semanticamente dovrebbero essere `<h2>` sotto un unico `<h1>` "Neurologia per schemi".
- Ordine suggerito, per percorso clinico: Urgenze → Cerebrovascolare → Epilessia (nuova: stato epilettico, crisi2025) → Demenze → Disturbi del movimento → Periferico e neuromuscolare (unire "Periferico" e "Urgenze neuromuscolari UILDM"?) → Motoneurone (SLA, SMA, ALSFRS-R) → Demielinizzanti (oggi contiene solo f_100: senza una pagina vera sulla SM la sezione è vuota di contenuto clinico; i PDF AISM/INPS e NMOSD in Risorse potrebbero essere richiamati qui) → Gestione internistica → Strumenti amministrativi → Flashcard, quiz e risorse.
- "Rachicentesi" sta sotto Urgenze: è più un tema procedurale/generale; una sezione "Procedure e semeiotica" (rachicentesi, neurosonologia, tabelle ENG/EMG, test clinici) sarebbe più chiara.
- Il widget Liberapay carica uno script esterno (`liberapay.com/.../giving.js`): unica dipendenza esterna rimasta nell'home oltre all'immagine CC.

---

### Sintesi

File modificati: flowcharts/gestione_sla.html, flowcharts/gestione_sma.html, flowcharts/alsfr-s.html, Schemi1/f_100.html, Schemi1/risorse.html, strumenti/impegnative.html (solo un commento). Non modificati: index.html, data/*.json, README.md.

---

# F1. Flashcard: emergenze e cerebrovascolare

## Report revisione flashcard — blocco F1 (emergenze neurologiche e cerebrovascolare)

File: `/home/user/Neurologia-per-schemi/Schemi1/flashcard_completo.html` (array `flashcardsData`).
Patch prodotte: `patches_F1.json` (22 oggetti, tutti `update`, nessun `delete`; JSON validato con `python3 -I -c "import json..."`).
Nota tecnica: i marcatori `**grassetto**` presenti in alcune risposte sono resi dall'engine (`flashcards-engine.js`, funzione `toHtml`), quindi non sono un problema di formato.

### Carte lette per categoria (290 totali, lette integralmente)
| Categoria | Carte | Patch |
|---|---|---|
| Accertamento di Morte | 10 | 3 (6, 9, 11) |
| Sindrome di Bernard-Horner | 4 | 0 |
| Crisi Colinergica | 6 | 0 |
| Sindrome Serotoninergica | 5 | 0 |
| Sindrome Maligna da Neurolettici | 8 | 0 |
| Encefalopatia di Wernicke | 6 | 2 (73, 77) |
| Mielinolisi Pontina | 7 | 1 (47) |
| Ipotensione Endocranica Spontanea | 6 | 0 |
| Pseudotumor Cerebri | 9 | 1 (66) |
| Para-Tetraplegie Acute | 11 | 0 |
| Debolezza Acquisita in Terapia Intensiva | 4 | 0 |
| Classificazioni dell'Ictus (TOAST e Bamford) | 11 | 1 (311) |
| Trattamento Acuto Ictus Ischemico | 10 | 1 (329) |
| Infarto Cerebrale Maligno | 5 | 2 (260, 262) |
| Ictus Circolo Posteriore | 6 | 0 |
| Prevenzione Secondaria Ictus | 41 | 3 (319, 320, 639) |
| Prevenzione Secondaria: Eziologia (ISPS25) e Fattori di Rischio | 26 | 0 |
| Ictus Cardioembolico | 24 | 2 (270, 272) |
| Ictus Criptogenico, ESUS e PFO | 13 | 1 (307) |
| Cause Rare di Ictus: Arteriopatie | 15 | 2 (523, 525) |
| Cause Rare di Ictus: Genetiche e Altre | 13 | 2 (294, 297) |
| Ictus Pediatrico | 6 | 0 |
| Emorragia Cerebrale: Clinica e Diagnosi | 10 | 0 |
| Emorragia Cerebrale: Gestione | 11 | 0 |
| Angiopatia Cerebrale Amiloide (CAA) | 13 | 0 |
| Trombosi Venosa Cerebrale (CVST) | 10 | 1 (385) |

Le carte con id ≥ 606 (lezione 2026) sono state controllate solo per errori evidenti: una sola patch (639, incoerenza di soglie con la carta 315); gli altri dubbi sono nell'elenco "da verificare".

### I 10 errori più rilevanti (prima → dopo)
1. **id 320 – stenosi intracranica sintomatica**: "LDL <54 mg/dL, PA <130/80" → "PAS <140 mmHg (SAMMPRIS), LDL <70 mg/dL (ideale <55), DAPT 90 giorni poi SAPT; stenting non indicato in prima linea" (SAMMPRIS 2011; AHA/ASA 2021; ESO 2022).
2. **id 319 – indicazioni al CAS**: "stenosi alte o intracraniche" → rimossa l'indicazione intracranica (SAMMPRIS/VISSIT: terapia medica superiore allo stenting); aggiunta l'equivalenza CEA/CAS sotto i 70 anni e l'elenco corretto delle condizioni ad alto rischio chirurgico (ESO 2021; AHA/ASA 2021).
3. **id 307 – chiusura del PFO**: "raccomandata se PASCAL probabile, può essere considerata se possibile" → "raccomandata (forte) se PASCAL probabile o possibile; non indicata se improbabile salvo casi selezionati" (ESO 2024); eliminata la contraddizione con la carta 645.
4. **id 294 – APS e DOAC**: "controindicato Rivaroxaban" → controindicazione estesa a tutta la classe dei DOAC nei triplo-positivi (TRAPS; avviso EMA/PRAC 2019; EULAR 2019), con gestione della recidiva in range INR.
5. **id 311 – fonti cardioemboliche TOAST ad alto rischio**: elenco con protesi biologica, scompenso FE<30%, endocardite reumatica (fonti a rischio medio o non previste) → elenco fedele a TOAST (protesi meccanica, stenosi mitralica con FA, FA, trombo atriale/ventricolare, malattia del nodo del seno, IMA <4 settimane, cardiomiopatia dilatativa, segmento acinetico, mixoma, endocardite infettiva) + esempi di rischio medio (Adams 1993).
6. **id 77 – trattamento di Wernicke**: "Tiamina EV o IM, prima del glucosio" senza dose → "500 mg EV x3/die per 2-3 giorni (EFNS: ≥200 mg x3/die), poi 250 mg/die, prima del glucosio; correggere il magnesio" (EFNS 2010; RCP 2001).
7. **id 262 – edema nell'infarto maligno**: "Mannitolo… Furosemide 40 mg può essere associata" → terapia osmotica solo al deterioramento clinico come ponte alla craniectomia, salina ipertonica con target Na, corticosteroidi e diuretici dell'ansa NON indicati (AHA/ASA 2014/2019; ESO 2021).
8. **id 66 – cefalea nello pseudotumor**: "tipicamente non associata a nausea/vomito" → fenotipo spesso simil-emicranico (circa 50%) con nausea, fotofobia, dolore retro-oculare, oscuramenti visivi transitori, acufene pulsante (IIHTT, Friedman 2017; consensus Mollan 2018).
9. **id 329 – controindicazioni assolute alla IVT**: elenco misto con "a meno di eccezioni" e controindicazioni dichiarate relative → elenco ordinato di assolute (ICH, sanguinamento attivo, dissezione aortica/endocardite, coagulopatia con soglie, DOAC <48 h, ipodensità >1/3 ACM, chirurgia/trauma recenti) e di relative (ictus/trauma cranico <3 mesi, crisi, glicemia, gravidanza, microbleeds >10) (ESO 2021; AHA/ASA 2019).
10. **id 6, 9, 11 – accertamento di morte (DM 11/04/2008)**: pH "≤ 7,40" → "< 7,40" (testo di legge); aggiunta l'eccezione alle 24 ore post-anossia se è dimostrata l'assenza di flusso; tra le metodiche di flusso aggiunto il Doppler transcranico e precisati i casi previsti dal decreto.

Altre correzioni/aggiornamenti: id 260 (volumi DWI >82 mL a 6 h, >145 mL a 14 h, non 16 h); id 270 (criteri Duke-ISCVID 2023/ESC 2023); id 272 (DOAC come alternativa ragionevole nel trombo ventricolare sinistro, AHA/ASA 2021); id 297 (definizione ISSHP/ACOG di preeclampsia senza obbligo di proteinuria); id 385 (DOAC accettati nella CVST, RE-SPECT CVT/ACTION-CVT, AHA/ASA 2024); id 47 (RM può essere negativa nei primi giorni nella mielinolisi); id 73 (formulazione incoerente della definizione di Wernicke); id 525 (GCA: ecografia con segno dell'alone come primo esame EULAR 2023, tocilizumab); id 639 (soglie ABCD2 ≥4 / NIHSS ≤3-5 coerenti con la carta 315); id 523 (domanda identica alla 285, riformulata).

### Da verificare (non patchato)
- **Serie "orale" id 516-543** ("Mi illustri…", "Mi parli…"): ripetono il contenuto delle carte brevi delle stesse categorie (516 ↔ 264-267; 517 ↔ 309-313; 519 ↔ 268; 520 ↔ 274-278; 521 ↔ 303-308; 523 ↔ 285; 524 ↔ 286; 526 ↔ 281; 528 ↔ 287-288; 529 ↔ 292-294; 537 ↔ 208-210; 541 ↔ 195). Sembrano una serie voluta (preparazione all'esame orale); decidere se mantenerle come categoria/tag separato ("Domande d'esame") o eliminarle come doppioni. Non ho eliminato nulla.
- **id 621** (lezione 2026): "clonidina 0,1 mg a settimana (max 0,3 mg)" è una posologia non plausibile (clonidina si dà 0,1 mg x2-3/die con titolazione settimanale); verificare sulla fonte della lezione (ACOG/ISSHP, scheda tecnica).
- **id 644** (lezione 2026): "tunnel lungo (>2 mm)" — il tunnel lungo è in genere definito ≥8-10 mm; i 2 mm si riferiscono di solito all'ampiezza del PFO. Verificare sulla fonte (ESO 2024 / PASCAL).
- **id 619, 665, 666, 684** (lezione 2026): citano trial HOPE (JAMA Neurol 2026), CHAMPION-AF (NEJM 2026), STABLED (JAMA Neurol 2026), TAIL-SWITCH; i numeri non sono verificabili da parte mia con certezza: controllare contro le pubblicazioni originali.
- **id 634**: "trial di esito cardiovascolare per inclisiran in corso" — verificare se ORION-4/VICTORION-2 PREVENT sono stati pubblicati (atteso 2026).
- **id 327**: la raccomandazione ESO 2023 su tenecteplase 0,25 mg/kg è un "suggerimento" (debole) per la IVT <4,5 h in generale e più forte nei pazienti con LVO candidati a trombectomia; verificare eventuale aggiornamento AHA/ASA 2025-2026 sulla preferenza TNK vs alteplase.
- **id 326**: aggiungere eventualmente la selezione basata sui collaterali (MR CLEAN-LATE) per la finestra 6-24 h, oggi accettata da ESO/ESMINT; non modificato perché il contenuto attuale è corretto.
- **id 322**: soglia di flusso della penombra "12-18 mL/100 g/min": molte fonti riportano 10-20; valore didattico accettabile.
- **id 56**: capacità vitale residua per livello ("C3/C6") — i valori sono quelli classici ma la notazione andrebbe resa "C3-C6"; non modificato (stile).
- **id 70-71**: soglia pediatrica 28 cmH2O — corretta secondo Friedman 2013 (25 cmH2O se bambino non sedato e non obeso); si potrebbe aggiungere la precisazione.
- **id 269**: "INR 2,0-3,0 per valvola aortica" — ESC 2021 usa target INR per trombogenicità della protesi (2,5 per bileaflet aortica senza fattori di rischio): coerente, ma la formulazione potrebbe essere allineata a ESC 2021/ACC-AHA 2020.
- **id 530**: "RM senza contrasto per evitare radiazioni" — in gravidanza la TC cranio con schermatura è accettabile e non va ritardata in urgenza; la frase potrebbe suggerire il contrario. Non modificato (card lunga, concetto marginale).
- **id 316**: la "regola 1-3-6-12" è ormai superata dai trial ELAN/OPTIMAS/TIMING e dalla meta-analisi CATALYST (2025) riportati nelle carte 675-677: valutare se semplificare la carta 316 per non mandare messaggi doppi.
- **id 212**: "una singola crisi entro 24 h richiede solo terapia a breve termine" — AHA/ASA 2022 lascia alla valutazione clinica; formulazione accettabile ma un po' categorica.

### Note di qualità
- Nessun errore di coerenza domanda-risposta grave, a parte 329 (chiesta "assolute", risposta mista) e 73 (definizione circolare), entrambe patchate.
- Le categorie "Prevenzione Secondaria Ictus" (41 carte) e "Prevenzione Secondaria: Eziologia (ISPS25)" (26) sono molto dense di numeri (OR/HR di meta-analisi): utili per lo specializzando ma difficilmente memorizzabili come flashcard; valutare una difficoltà 3 per le carte 640-684 (quasi tutte etichettate difficulty 2).
- Normativa italiana sull'accertamento di morte: l'impianto (legge 578/1993, DM 11/04/2008, osservazione 6 ore, collegio a tre, EEG 30 min, flusso nei casi previsti) è corretto; le patch sono precisazioni testuali.

### Sintesi
Lette 290 carte in 26 categorie; 22 patch (tutte "update", 0 "delete"). Gli errori di sostanza riguardano soprattutto la prevenzione secondaria (target LDL/PA nella stenosi intracranica, indicazioni allo stenting, PASCAL/ESO 2024, DOAC nella APS, fonti TOAST), la terapia dell'edema maligno e la dose di tiamina; la normativa sull'accertamento di morte e i capitoli di emergenza (serotoninergica, SMN, colinergica, Horner, SIH, mielopatie, ICUAW) erano sostanzialmente corretti. La principale questione editoriale, non risolta dalle patch, è la serie di carte "da esame orale" (516-543) che duplica in forma discorsiva le carte brevi.
File modificati: nessuno (solo `scratchpad/review/patches_F1.json` e questo report).

---

# F2. Flashcard: epilessia, demenze, parkinsonismi

## Report F2 — flashcard_completo.html (epilessia, demenze, parkinsonismi)

File esaminato: /home/user/Neurologia-per-schemi/Schemi1/flashcard_completo.html (array `flashcardsData`, 659 carte totali, id univoci).
Nessun file del repository è stato modificato. Le correzioni sono in `patches_F2.json` (28 oggetti, tutti `update`, JSON validato; tutti gli id esistono e appartengono alle categorie assegnate).

### Carte lette per categoria (totale 212)

| Categoria | Carte | Patch |
|---|---|---|
| Crisi ed Epilessia | 6 | 2 (234, 236) |
| Classificazione ILAE 2025 delle Crisi | 14 | 1 (547) |
| Semeiologia delle Crisi | 13 | 1 (462) |
| Epilessia del Lobo Temporale | 13 | 1 (456) |
| Epilessie Generalizzate Idiopatiche | 15 | 0 |
| Terapia delle IGE | 6 | 1 (570) |
| Stato Epilettico | 8 | 1 (250) |
| Stato Epilettico Non Convulsivo | 7 | 3 (243, 244, 245) |
| Malattia di Alzheimer e Varianti | 16 | 5 (87, 88, 89, 90, 159) |
| Terapia Alzheimer | 6 | 1 (150) |
| Sintomi Neuropsichiatrici (NPS) nella Demenza | 13 | 3 (143, 146, 153) |
| Demenza Fronto-Temporale (FTD) | 12 | 0 |
| Demenza a Corpi di Lewy (LBD) | 10 | 1 (118) |
| Demenza Vascolare (VD) | 7 | 2 (168, 172) |
| Malattie da Prioni | 12 | 1 (41) |
| Alfa Sinucleinopatie Prodromiche | 4 | 0 |
| Malattia di Parkinson – Diagnosi e Clinica | 10 | 0 |
| Malattia di Parkinson – Terapia | 17 | 4 (586, 587, 592, 595) |
| Atrofia Multisistemica | 7 | 1 (95) |
| PSP e CBD | 9 | 0 |

Nessuna carta eliminata: non ho trovato duplicati veri nella stessa categoria (vedi "Sovrapposizioni").

### I 10 errori più rilevanti (prima → dopo)

1. **id 236 – Guida e crisi (normativa italiana)**. Prima: "crisi sintomatica acuta: stop 6 mesi; epilessia: 12 mesi". Dopo: crisi provocata → idoneità caso per caso con parere neurologico; prima crisi non provocata → 6 mesi; epilessia → 1 anno libero da crisi (gruppo 1), nessuna limitazione dopo 10 anni senza crisi e terapia; sospensione terapia su consiglio medico → 6 mesi di astensione; gruppo 2 molto più restrittivo (DM 30/11/2010, All. III).
2. **id 245 – Criteri di Salisburgo, risposta al farmaco EV**. Prima: "la presenza di una delle due [risposta clinica o EEG] conferma NCSE". Dopo: miglioramento EEG + clinico → NCSE confermato; miglioramento solo EEG → NCSE "possibile" (Leitinger, Lancet Neurol 2016).
3. **id 244 – Criteri di Salisburgo, evoluzione spazio-temporale**. Prima: "frequenza PIÙ morfologia OPPURE frequenza PIÙ localizzazione". Dopo: definizione ACNS adottata da Salisburgo: ≥2 cambiamenti sequenziali inequivocabili in frequenza, morfologia O sede (soglie ≥0,5 Hz, nuova morfologia, ≥2 elettrodi, persistenza ≥3 cicli); la sola fluttuazione = NCSE possibile.
4. **id 547 – Coscienza nella classificazione ILAE 2025**. Prima: "Se in dubbio → coscienza compromessa". Dopo: se lo stato di coscienza non è determinabile la crisi è classificata con il termine padre (crisi focale / a origine sconosciuta) senza specificare la coscienza (Beniczky et al., Epilepsia 2025, doi 10.1111/epi.18338: "If the state of consciousness is undetermined, the seizure is classified under the parent term").
5. **id 143 – Mild Behavioral Impairment**. Prima: "disturbi neuropsichiatrici lievi che determinano una riduzione delle IADL". Dopo: criteri ISTAART 2016: esordio ≥50 anni, durata ≥6 mesi, 5 domini, soggetti senza demenza con autonomia funzionale sostanzialmente conservata (al più minima compromissione IADL), non spiegati da disturbo psichiatrico primario; MBI-C.
6. **id 250 – Seconda linea nello stato epilettico**. Prima: fenitoina 15-18 mg/kg, valproato 20-40, LEV 40-60, senza massimali. Dopo: dosi ESETT 2019 (LEV 60 mg/kg max 4500; VPA 40 mg/kg max 3000; fenitoina/fosfenitoina 20 mg/kg) con pari efficacia ~45-47%; lacosamide 200-400 mg alternativa con evidenze minori; fenobarbital 15-20 mg/kg.
7. **id 88 e 90 – "NIA-AA 2024"**. Prima: criteri 2024 attribuiti a NIA-AA. Dopo: criteri dell'Alzheimer's Association Workgroup 2024 (Jack et al.); precisato che un Core 1 positivo è sufficiente per la diagnosi biologica; aggiunti gli stadi clinici 0-6 nella 90.
8. **id 95 – MSA MDS 2022**. Prima: residuo ">100 ml", ipotensione ortostatica ">20/10 in 3'". Dopo: residuo ≥100 mL, OH neurogena ≥20/10 mmHg entro 3 min (stabilita) o entro 10 min (probabile); prerequisito "sporadica"; nella forma probabile il parkinsonismo può essere anche responsivo alla L-dopa.
9. **id 595 – Terapie di salvataggio nel Parkinson**. Prima: premedicazione con "trimetobenzamide o domperidone", apomorfina sublinguale "non sempre disponibile". Dopo: in UE domperidone (trimetobenzamide solo USA); apomorfina sublinguale non autorizzata in UE; levodopa inalata autorizzata EMA 2019; evitare metoclopramide e ondansetron con apomorfina. Analoghe: **id 592** amantadina ER 274 mg (Gocovri) solo USA, in Italia solo IR 100 mg; **id 587** rasagilina 1 mg/die (0,5 mg non è dose EMA).
10. **id 168 – Demenza vascolare**. Prima: domanda su "demenza vascolare sottocorticale multi-infartuale" (due entità fuse). Dopo: demenza vascolare sottocorticale ischemica da malattia dei piccoli vasi, distinta dalla multi-infartuale e da infarto strategico (VICCCS-2 2018). Collegata: **id 172** CADASIL, età media del primo ictus ~45-50 anni (non 30-45).

Altre correzioni minori: 234 (≥60%, criterio della sindrome, epilessia "risolta"), 462 (durata assenze 3-20 s, coerente con 563), 456 (SANAD II: lamotrigina prima scelta nell'epilessia focale), 570 (SANAD II: valproato superiore a LEV nelle IGE; lamotrigina può peggiorare le mioclonie; gabapentin/pregabalin da evitare), 243 (scariche >2,5 Hz solo per pazienti senza encefalopatia epilettica nota), 87 (domanda coerente con i sintomi neocorticali), 89 (cingolo posteriore/precuneo), 159 (nome corretto "Atrofia Corticale Posteriore"), 150 (anglicismo e lista effetti collaterali AChEI), 146 (risperidone unico autorizzato in UE, max 6 settimane; brexpiprazolo solo FDA; avvertenza di classe), 153 (brexpiprazolo 2-3 mg/die), 118 (memantina: evidenze limitate ma possibile beneficio, McKeith 2017), 41 (cortical ribbon = corteccia; 14-3-3 poco specifica; RT-QuIC nei criteri CDC 2018/europei 2021), 586 (soglia <60 anni per i dopamino-agonisti, AAN 2021; LEAP/PD MED).

Verificato con RegulatoryCore/EMA: Leqembi (lecanemab) autorizzato 15/04/2025 e Kisunla (donanemab) 24/09/2025, entrambi limitati a non portatori o eterozigoti ApoE ε4: le carte 155 e 157 sono corrette e non sono state toccate.

### Da verificare (non patchato)

- **id 575 (SUDEP nelle IGE)**: "tassi simili tra epilessia focale e IGE" e il "paradosso dei pazienti controllati" (meccanismo speculativo). Controllare Harden et al., AAN/AES SUDEP guideline 2017; Sveinsson et al., Neurology 2020.
- **id 548 (manifestazioni osservabili ILAE 2025)**: inclusione dei "fenomeni afasici" e "autonomici visibili" tra le manifestazioni osservabili; verificare l'elenco esatto in Beniczky 2025 (basic classification).
- **id 549/551/552/554**: dettagli descrittivi (es. "durata totale più prolungata" per le crisi assenza → tonico-cloniche; "frequenza ancora in studio" per il mioclono negativo) sono elaborazioni non presenti nel position paper.
- **id 240 (NCSE: durata >10-15 min)**: compatibile con T1 di Trinka 2015 (focali con compromissione della coscienza 10 min; assenze 10-15 min); fonte da esplicitare.
- **id 245**: le "5 prove" cliniche non sono riportate testualmente in Leitinger 2016; mantenute come esempio. Verificare su Leitinger et al., Epilepsy Behav 2015.
- **id 564 (JAE)**: "CTCG in >90%" — Hirsch 2022 parla di "maggioranza"; alcune serie 80%.
- **id 561/563 (CAE)**: "87%" di assenze indotte dall'iperventilazione: cifra del position paper ILAE 2022 (da fonte secondaria), accettabile.
- **id 586**: "ICD 50% a 5 anni" — Corvol 2018: 46%; scritto "~45-50%".
- **id 593 (ECG con amantadina, QTc >420 ms)**: coerente con la scheda tecnica europea dell'amantadina (PK-Merz/Mantadan), non con linee guida MDS/AAN; eventualmente citare la scheda tecnica.
- **id 155/118/119**: stato AIFA (rimborsabilità lecanemab/donanemab, pimavanserina non in UE) da ricontrollare periodicamente.
- **id 164**: lvPPA–AD "circa 70%": serie 70-86%; accettabile. **id 107**: FTLD-tau 40-45%, FET/FUS 5-10%; accettabile. **id 37**: forme acquisite oggi <1%.
- **id 109 (FTD senza DMT)**: corretto a oggi (latozinemab per GRN-FTD ha fallito l'endpoint primario nel 2024).

### Sovrapposizioni (non duplicati, segnalate al coordinatore)

- 230 vs 544 e 231 vs 547 (classi ILAE 2025 e coscienza): stessa informazione a due livelli di dettaglio.
- 585 vs 594 (dieta e levodopa) e 588 vs 589 (stimolazione continua / wearing off): forte sovrapposizione.
- 561 vs 563 (CAE e iperventilazione, 87%) ripetono la stessa cifra.
- 146 vs 153 (brexpiprazolo) e 147 vs 145 (SSRI e apatia): ridondanza parziale.
- Formattazione: le carte 544-597 (serie "estese") usano `**grassetto**` markdown ed emoji (552: 🆕) a differenza del resto del mazzo; nelle patch ho mantenuto lo stile preesistente della singola carta.

### Sintesi

Lette 212 carte in 20 categorie; prodotte 28 patch (tutte aggiornamenti, nessuna cancellazione). Il blocco epilessia è nel complesso aggiornato a ILAE 2017/2022/2025, ma conteneva errori sui criteri di Salisburgo (2 carte), sulla normativa italiana per la guida, sulle dosi di seconda linea nello SE (non allineate a ESETT) e un principio inventato sulla coscienza nella classificazione 2025. Il blocco demenze era in buone condizioni; gli errori principali riguardavano la definizione di MBI, l'attribuzione "NIA-AA" dei criteri AA 2024 e precisazioni regolatorie (risperidone, brexpiprazolo). Nel blocco parkinsonismi i criteri MDS-PD 2015, MSA 2022 e PSP 2017 sono riportati correttamente; le correzioni riguardano farmaci/dosi non disponibili in UE (amantadina ER, apomorfina sublinguale, trimetobenzamide, rasagilina 0,5 mg) e le soglie numeriche dei criteri MSA.

File modificati: nessuno nel repository. Output: `scratchpad/review/patches_F2.json`, `scratchpad/review/report_F2_flashcard.md`.

---

# F3. Flashcard: immunologia, neuromuscolare, cefalee

## Report F3 — flashcard_completo.html (blocco neuroimmunologia, neuromuscolare, cefalee)

File: /home/user/Neurologia-per-schemi/Schemi1/flashcard_completo.html (array `flashcardsData`, righe 4535–5667).
Nessun file del repository è stato modificato: le correzioni sono in `patches_F3.json` (23 patch, tutte `update`, nessuna `delete`).

### Carte lette per categoria (164 totali)

| Categoria | Carte | Patch |
|---|---|---|
| Sclerosi Multipla (SM) | 9 | 4 (183, 184, 188, 189) |
| Neurite Ottica, NMOSD e MOGAD | 10 | 2 (176, 191) |
| Encefaliti Autoimmuni | 23 | 4 (431, 437, 440, 598) |
| Malattia Anti-IgLON5 | 7 | 4 (425, 426, 429, 604) |
| Sindromi Paraneoplastiche e da Immunoterapia | 10 | 0 |
| Sindrome di Guillain-Barré (GBS) | 12 | 1 (347) |
| CIDP | 8 | 2 (338, 342) |
| Neuropatie Paraproteinemiche | 9 | 0 |
| Miastenia Gravis (MG) | 14 | 1 (363) |
| Paralisi Periodiche | 9 | 1 (403) |
| CANVAS | 4 | 0 |
| Sindromi da Intrappolamento | 12 | 0 |
| Emicrania | 15 | 2 (482, 485) |
| Nevralgia Trigeminale | 9 | 0 |
| Cefalee Autonomiche Trigeminali (TACs) | 13 | 2 (497, 507) |
| Categorie successive alle TACs | 0 (l'array termina con le TACs) | — |

Giudizio complessivo: MANTIENI DOPO LE CORREZIONI. Il mazzo è di buona qualità; gli errori sono per lo più aggiornamenti regolatori (2024-2025), soglie numeriche e due inversioni di dati nella sezione IgLON5. Nessun duplicato vero: le carte lunghe "canovaccio" (id 598-605) ripetono contenuti delle carte brevi della stessa categoria, ma sono un formato diverso (risposta orale d'esame) importato intenzionalmente dal mazzo "Canovacci" (vedi `mergeDecks`), quindi non le ho eliminate.

### I 10 errori più rilevanti (prima → dopo)

1. **CIDP tipica (id 338)** — "ipostenia … E/O coinvolgimento sensitivo" → "ipostenia prossimale E distale … E coinvolgimento sensitivo di ≥2 arti; areflessia in tutti gli arti". Nei criteri EAN/PNS 2021 la componente sensitiva è obbligatoria, non alternativa (Van den Bergh 2021).
2. **IgLON5, sensibilità anticorpale (id 426 e 604)** — "siero 95%, liquor 100%" e "quasi sempre nel liquor, spesso nel siero" → siero positivo praticamente sempre, liquor negativo in una minoranza (Gaig 2017: 14/16 positivi in entrambi, 2 solo nel siero). Dato invertito.
3. **IgLON5, morte improvvisa (id 429)** — "nel 34% dei casi" → "circa un terzo dei decessi riportati" (revisione sistematica Howischer 2025: 32,8% dei decessi con causa nota). La carta confondeva quota dei decessi con quota dei pazienti.
4. **LETM nella NMOSD (id 191)** — "più di 3 segmenti vertebrali" → "≥3 segmenti vertebrali contigui" (criteri IPND 2015).
5. **McDonald 2024 (id 184, 188, 189)** — "la DIT può essere sostituita dalla positività liquorale; CVS e PRL supportano nei casi dubbi" → regola completa: ≥4/5 sedi senza altri requisiti; 2-3 sedi + uno tra DIT RM, liquor (BO o kFLC) o CVS 'Select 6'/≥1 PRL; 1 sede richiede DIT/liquor + CVS/PRL; criteri unificati per la PPMS (≥12 mesi di progressione, ≥2 lesioni midollari sufficienti per la DIS); cautela >50 anni (Montalban, Lancet Neurol 2025).
6. **Encefalite limbica definita (id 431)** — "PET-FDG: iper o ipometabolismo" → ipermetabolismo temporale mediale; aggiunti i criteri mancanti (pleiocitosi >5 cellule o EEG temporale, esordio <3 mesi) senza i quali la carta induceva a diagnosticare con la sola RM (Graus 2016).
7. **Terapie MG (id 363)** — nipocalimab "approvato FDA 2025" → approvato anche dalla Commissione Europea (1 dicembre 2025) per gMG anti-AChR+/anti-MuSK+ dai 12 anni; aggiunti tacrolimus e metotrexato.
8. **Terapie CIDP (id 342)** — efgartigimod "FDA 2024" → anche Commissione Europea, giugno 2025 (variazione Vyvgart, trial ADHERE).
9. **Gepanti/ditani (id 482) e indicazione anti-CGRP (id 485)** — elenco "USA-centrico" (ubrogepant, zavegepant) e indicazione vaga ("2 o 3 classi a seconda delle linee guida") → stato EMA/AIFA (rimegepant e atogepant rimborsati; ubrogepant/zavegepant non disponibili in Italia; lasmiditan EMA 2022) e criteri AIFA vigenti (≥8 giorni/mese, MIDAS ≥11, fallimento di ≥3 classi; modifiche 2025: switch, associazione con onabotulinumtoxinA, rivalutazione semestrale) con posizione EHF 2022.
10. **Frequenza degli attacchi in cluster ed emicrania parossistica (id 497, 507)** — "1-8 attacchi/die" → "da 1 ogni due giorni a 8/die"; "≥5 attacchi/die" → ">5/die per più della metà del tempo" + criterio obbligatorio della risposta all'indometacina (ICHD-3).

Altre correzioni minori: refuso "Uthoff" → "Uhthoff" (183); "canali LGI1" → proteine del complesso VGKC (598); NOIA = ischemia della testa del nervo ottico, forma arteritica = arterite a cellule giganti (176); PERM associata soprattutto ad anti-GlyR (440); anti-GAD paraneoplastica >60 anni e con anticorpi coesistenti (437); nadir GBS entro 2 settimane nella maggioranza, ≤4 per definizione (347); trigger delle paralisi periodiche (403); disturbo del sonno IgLON5 "83%" → esordio nel ~36%, presente in tutti nel decorso (425).

### Da verificare (non patchato)

- **id 603 (encefaliti virali)** è classificata in "Encefaliti Autoimmuni": contenuto corretto ma categoria impropria; non esiste una categoria infettivologica nel mazzo. Decidere se creare una categoria "Encefaliti infettive" o lasciarla come diagnosi differenziale.
- **id 376 (neuropatia nella Waldenström)**: "più frequentemente assonale" — confermato da una scoping review 2026 (fenotipo più frequente sensitivo assonale; demielinizzante 8-37,5% nelle coorti non selezionate), ma le serie neurologiche selezionate riportano prevalenza di forme anti-MAG. Lasciata com'è; eventualmente aggiungere "nelle casistiche non selezionate".
- **id 513 (PEX nella GBS)**: "4-6 cicli a giorni alterni" — la linea guida EAN/PNS 2023 indica 4-5 scambi in 1-2 settimane (2 nelle forme lievi). Differenza marginale, non corretta.
- **id 501 (verapamil)**: "fino a 960 mg/die o più" — dose massima usuale 960 mg; "o più" è prassi di centri specialistici, non da linea guida. Da valutare se togliere "o più".
- **id 486 (NT "classica (Tipo 1)")**: la dicitura "Tipo 1" è della classificazione di Burchiel, non ICHD-3 (che distingue "puramente parossistica" e "con dolore continuo concomitante"). Non modificata per non alterare la domanda.
- **id 436/219/601, 222/602, 214/598, 221/599, 424/604**: sovrapposizioni tra carte brevi e "canovacci"; non duplicati in senso stretto. Se il coordinatore preferisce un mazzo senza ridondanze, le carte 598-605 sono candidabili a una categoria separata ("Canovacci d'esame").
- **id 408 (diclorfenamide)**: approvata FDA, non in commercio in Italia (uso off-label/importazione). Non segnalato nella carta.
- **id 184/188 (OCT, soglie)**: le soglie inter-occhio pRNFL ≥6 µm e GCIPL ≥4 µm inserite nella patch provengono da una review secondaria dei McDonald 2024; confrontare con il testo originale (Montalban et al., Lancet Neurol 2025, tabella sul nervo ottico) prima dell'applicazione.
- **id 485 (criteri AIFA)**: i dettagli delle modifiche 2025 (switch, associazione con tossina botulinica, rivalutazione a 6 mesi) sono tratti dal comunicato AIFA del 23/04/2025; verificare la scheda di eleggibilità vigente nel Registro.
- **id 482 (lasmiditan)**: approvazione EMA 2022 (Rayvow) riportata a memoria; lo stato di rimborsabilità AIFA non è stato verificato e non è citato nella patch.

### Fonti principali consultate

McDonald 2024 (Montalban et al., Lancet Neurol 2025; review Biomedicines 2025, DOI 10.3390/biomedicines13112590); IPND 2015 (Wingerchuk, Neurology); MOGAD 2023 (Banwell, Lancet Neurol); Graus 2016 (Lancet Neurol); PNS-Care 2021 (Graus, Neurol Neuroimmunol Neuroinflamm); Gaig 2017 (Neurology, DOI 10.1212/WNL.0000000000003887); Howischer 2025 (Brain Sci, DOI 10.3390/brainsci15090921); EAN/PNS GBS 2023 (van Doorn); EAN/PNS CIDP 2021 (Van den Bergh); EMA EPAR Vyvgart (variazione CIDP, giugno 2025) e Imaavy (dicembre 2025); AIFA Registri anti-CGRP (modifica 23/04/2025), Determina Vydura 2025, Registro Aquipta 2024; ICHD-3 (Cephalalgia 2018); EHF 2022 (Sacco, J Headache Pain); Aagaard 2026 (Eur J Haematol, DOI 10.1111/ejh.70316).

### Sintesi

164 carte lette in 15 categorie; 23 patch (tutte aggiornamenti, nessuna eliminazione). Gli errori sostanziali riguardano i criteri CIDP tipica (E/O → E), due dati invertiti/impropri nella sezione IgLON5, la soglia LETM, la PET nella encefalite limbica e l'incompletezza dei McDonald 2024; il resto sono aggiornamenti regolatori 2024-2025 (efgartigimod-CIDP e nipocalimab in UE, gepanti e anti-CGRP in Italia) e allineamenti a ICHD-3. Le carte "canovaccio" sono ridondanti ma volutamente presenti; segnalata la collocazione impropria della carta sulle encefaliti virali.

File modificati: nessuno (output in scratchpad/review/patches_F3.json e report_F3_flashcard.md).

---

# F4. Flashcard IV anno e quiz

## Report F4 — Schemi1/flashcardIVanno.html e Schemi1/quiz_ripasso.html

Revisione aggiornata a ottobre 2026. Nessun file del repository è stato modificato: le correzioni sono nei file `patches_F4_IVanno.json` (17 patch) e `patches_F4_quiz.json` (1 patch) in questa cartella, entrambi validati con `python3 -I -c "import json,...`.

### Schemi1/flashcardIVanno.html
Giudizio: MANTIENI DOPO LE CORREZIONI

Carte lette: 146/146 (id 1-146). Verificate una per una contro MDS evidence-based review 2018/2019, criteri MDS 2015 e MSA 2022, RCP EMA (levodopa/carbidopa/entacapone, opicapone, safinamide, Xadago, Ebixa, Leqembi, Kisunla, Rystiggo, Imaavy, Vyvgart), comunicati AIFA (26 giugno 2026), FDA Drug Safety Communication 20 marzo 2026, trial CLARITY-AD, TRAILBLAZER-ALZ 2, ADVANCE-1, ACCORD-1/2, VIVACITY-MG3, MGTX, ESO/EANS 2025 ICH, ANNEXA-I, ENRICH, SWITCH, Ren et al. Int J Stroke 2026. Le carte ICH (115-146) sono state controllate solo per errori evidenti: non ne ho trovati (ICH score, soglie radiologiche, reversal, criteri chirurgici e bundle coerenti con ESO/EANS 2025 e AHA/ASA 2022).

Patch: 17 (15 update, 2 delete).

#### I 10 errori/aggiornamenti più rilevanti (prima → dopo)
1. **id 24 (IPX203/Hopledo)** — "approvata dalla Commissione Europea nel settembre 2026" → parere CHMP positivo giugno 2026, autorizzazione CE **agosto 2026**, lancio Zambon da ottobre 2026 (EMA, comunicati Zambon/Amneal).
2. **id 109 (nipocalimab)** — "riduzione delle IgG totali di circa il 69%" → circa **75% negli adulti** (VIVACITY-MG3); il 69% è il dato pediatrico di Vibrance-MG. Aggiunta approvazione CE 1 dicembre 2025 e schema EV ogni 2 settimane.
3. **id 108 (FcRn anti-MuSK)** — "Rozanolixizumab e nipocalimab" → aggiunto che a **maggio 2026 la FDA ha esteso efgartigimod** (ADAPT SERON) a tutte le forme dell'adulto incluse anti-MuSK, anti-LRP4 e triplo-sieronegative; in UE resta anti-AChR.
4. **id 26 (tavapadon)** — solo meccanismo → aggiunta **approvazione FDA 28 settembre 2026 (Juvmo)** in monoterapia e add-on, non autorizzato in UE.
5. **id 3 (prima linea nel giovane)** — "dopamino-agonista o MAO-B, data l'età giovane" → la scelta per sintomi lievi comprende anche levodopa a bassa dose e si basa su impatto funzionale e preferenze, non sull'età (LEAP, PD MED, NICE NG71); mantenuti i due rischi da documentare per l'agonista.
6. **id 76 (ARIA e APOE)** — "omozigosi… esclude il trattamento in alcune indicazioni europee" → l'indicazione UE di **entrambi** gli anticorpi esclude gli omozigoti ε4; negli USA sono inclusi con boxed warning; aggiunte le percentuali di ARIA-E per genotipo (CLARITY-AD).
7. **id 72 (criteri di inclusione anti-amiloide)** — elenco generico → aggiunti i criteri operativi delle RCP UE: esclusione omozigoti ε4, RM senza >4 microemorragie/siderosi/macroemorragia, assenza di anticoagulazione, MMSE indicativo 22-30.
8. **id 20 (safinamide)** — "può ridurre le discinesie" → non le peggiora; effetto antidiscinetico diretto solo da analisi post hoc, giudicato non dimostrato dalla MDS.
9. **id 53 (memantina)** — "antagonista non competitivo a bassa affinità" → antagonista uncompetitive, voltaggio-dipendente, ad **affinità moderata** (RCP Ebixa).
10. **id 56 e id 66 (duplicati)** — eliminate: 56 ripete la 42 (obiettivo realistico della terapia sintomatica), 66 ripete la 79 (posizione AIFA marzo/giugno 2026 su lecanemab e donanemab, già completa nella 79).

Altre patch minori: id 9 (soglia MDS ≥600 mg/die e MSA ≥1000 mg/die), id 25 (data 20 marzo 2026 e prodotti coinvolti nel warning FDA B6, contenuto confermato), id 36 (restrizioni EMA sul domperidone), id 75 (finestra ARIA per farmaco e calendario RM), id 90 (ACCORD-1 e ACCORD-2 entrambi citati), id 129 (fonte Ren et al. 2026; i valori 20%/30% sono confermati).

#### Verificato e confermato corretto (nessuna patch)
- id 25: FDA Drug Safety Communication del 20 marzo 2026 su carbidopa/levodopa e deficit di B6 (14 casi, tutti >1000 mg/die, 2 decessi).
- id 66/79: AIFA, non ammissione alla rimborsabilità di lecanemab e donanemab (marzo 2026) confermata dalla CSE nella seduta 15-19 giugno 2026 (comunicato 26 giugno 2026): differenza vs placebo -0,5 (lecanemab) e -0,69 (donanemab) punti CDR-SB, sotto la minima differenza clinicamente rilevante.
- id 88: Auvelity (destrometorfano/bupropione) approvato dalla FDA il 30 aprile 2026 per l'agitazione nella demenza di Alzheimer (PDUFA rispettata).
- id 89: in ADVANCE-1 AXS-05 è risultato superiore sia al placebo (p=0,010) sia al bupropione in monoterapia.
- id 90: HR 0,276 e 8,4% vs 28,6% sono i dati di ACCORD-2.
- id 123: ICH score e mortalità a 30 giorni (Hemphill 2001) corretti.
- id 133: criteri ANNEXA-I (ultima dose ≤15 h, GCS ≥7, volume <60 mL), dosi e risultato (più eventi trombotici, nessuna differenza funzionale) corretti.
- id 140: SWITCH (mRS 5-6: 44% vs 58%, non significativo) corretto.

#### Da verificare (non modificato)
- id 31: pimavanserina "non autorizzata in Europa" — vero a oggi, ma lo stato della domanda EMA di Acadia (ritirata/mai depositata) andrebbe confermato sul sito EMA.
- id 93: "sospensione da tentare entro circa 4 mesi" deriva dalla linea guida APA 2016; verificare se la nuova linea guida APA/IPA 2024-2026 ha cambiato il termine.
- id 97: posizione di brexpiprazolo/AXS-05 "prima degli antipsicotici atipici" è una proposta di consenso, non ancora in una linea guida europea; verificare eventuale aggiornamento EAN/IPA.
- id 98: target di prednisone "≤5-10 mg/die" — il consenso MGFA 2016/2020 parla di MM-or-better con effetti avversi CTCAE ≤grado 1; il valore numerico varia tra fonti (≤5 vs ≤7,5 mg).
- id 106: tempistica "almeno 2 settimane" vale per eculizumab/ravulizumab/zilucoplan (RCP); confermare per i nuovi inibitori del complemento eventualmente autorizzati dopo giugno 2026.
- id 121: percentuali di resa dell'angio-TC (47%, 28%, 25%...) provengono da Delgado Almandoz 2009 (secondary ICH score); controllare che i numeri citati siano quelli della pubblicazione originale.
- id 124: cut-off di TC perfusione (CBV <1,4 mL/100 g; CBF <20 mL/100 g/min) e aOR 1,04 per mL di edema: fonte non identificata con certezza, verificare prima dell'esame.
- id 127-128: la lettura della raccomandazione ESO/EANS 2025 sul target PAS <140 (consenso di esperti vs evidenza bassa per 150-220) è coerente con la linea guida, ma la formulazione "15/15" andrebbe controllata sul testo (Tabella delle raccomandazioni).
- id 139: ENRICH/ESO-EANS "mRS pre-morboso <2" e "entro 24-48 ore": verificare i criteri esatti riportati nella linea guida (ENRICH arruolava entro 24 h, età 18-80, GCS 5-14, 30-80 mL).
- id 145: EBPM profilattica "dalla terza giornata (24-72 ore)": ESO 2025 e AHA 2022 danno 24-48 h con ematoma stabile; la formulazione è compatibile ma andrebbe allineata a una sola fonte.

#### Note di qualità
- Stile e lunghezza delle carte omogenei; la categoria "Malattia di Alzheimer - trattamento" si sovrappone in parte a "terapie anti-amiloide" (id 58-59, 66-67 vs 68-81): oltre alle due eliminazioni, si potrebbe spostare 67 (classe C(nn)) nella categoria anti-amiloide.
- Carte 42/56 e 66/79 erano duplicati; nessun altro duplicato trovato.
- Le carte ICH 115-146 sono dense ma corrette; eventualmente dividere 143 (ipertensione endocranica) in due carte per usabilità da telefono.

### Schemi1/quiz_ripasso.html
Giudizio: MANTIENI (una sola patch migliorativa)

Carte lette: 25/25 (id 1-9, 15-30; la numerazione salta 10-14, già così nel file). Per ogni carta ho controllato che `correct` punti all'opzione giusta e che la spiegazione sia coerente: tutti i 25 indici sono corretti (tofersen→SOD1; riluzolo; red flag linfoma; citofluorimetria liquorale; steroidi e biopsia; esordio subacuto PSP-like; EBV; MRS lipidi/lattato; SAP-E 10% non 20%; emicrania prima causa <50 anni; BoNT-A fibre C; 39 siti=195 UI; fornice; ANT/SANTE; STN fuori dal circuito di Papez; RBD core DLB 2017; esordio psichiatrico prodromico; RBD predittore H&Y 3; body-first enterico; disautonomia; SNpc + Lewy; αSyn-SAA; Siderowf 2023 87,7%/96,3%; NSD-ISS vs SynNeurGe).

Patch: 1.
- id 16 (risposta parziale a BoNT-A come predittore di risposta agli anti-CGRP): indice `correct` invariato (0), ma la spiegazione presentava come consolidato un dato osservazionale e discordante; aggiunta una riga sul livello di evidenza (EHF 2022 non lo usa come criterio di selezione).

#### Da verificare (non modificato)
- id 2: "linee guida EAN 2024/EFNS" — la linea guida EAN sulla SLA (van Es et al.) è del 2024; verificare la dicitura dei criteri AIFA per edaravone (progressione ≥2 punti ALSFRS-R, esordio <2 anni, FVC ≥80%).
- id 20: "approvazione CE 2010 e FDA 2018" per ANT-DBS — date corrette per Medtronic; percentuale di riduzione delle crisi a 5-7 anni (69-75%) da confermare su Salanova 2015/2021.
- id 24: i predittori di progressione a H&Y 3 citati (PPMI, Oxford Discovery, Cambridge) sono corretti come messaggio; il distrattore "parkinsonismo asimmetrico" è debole perché l'asimmetria è la norma.

#### Note di qualità
- Nessun errore di indice; numerazione non continua (manca 10-14) ma non crea problemi al motore.
- Le spiegazioni usano `**grassetto**` markdown: verificare che il motore condiviso lo renderizzi (fuori ambito di questa revisione).

### Sintesi
Il mazzo del IV anno è di buona qualità e già aggiornato al 2026 su molti punti (warning FDA B6, AIFA giugno 2026, Auvelity, ESO/EANS 2025). Le correzioni necessarie riguardano soprattutto date e stati regolatori recenti (Hopledo agosto e non settembre 2026, tavapadon approvato FDA settembre 2026, efgartigimod esteso a MuSK/sieronegativi da FDA maggio 2026, nipocalimab 75% e non 69% negli adulti), la precisazione dei criteri europei per gli anti-amiloide (esclusione omozigoti APOE ε4) e due duplicati da eliminare. Il quiz è corretto in tutti gli indici e richiede solo una precisazione sul livello di evidenza. Le carte ICH non presentano errori evidenti.

File modificati: nessuno (output: patches_F4_IVanno.json, patches_F4_quiz.json, report_F4_IVanno_quiz.md in scratchpad/review).

---

# Appendice. Elenco delle patch applicate alle flashcard

| Mazzo | id | Azione | Motivo | Fonte |
|---|---|---|---|---|
| flashcard_completo | 6 | update | Il DM 11/04/2008 richiede pH 'minore di 7,40' (non ≤); precisata la modalità (ossigenazione apnoica) e la condizione di partenza. | DM Salute 11 aprile 2008, allegato 1 (accertamento di morte encefalica) |
| flashcard_completo | 9 | update | Mancava l'eccezione prevista dal DM 2008: il periodo di 24 ore non si applica se è già stata dimostrata l'assenza di flusso ematico encefalico. | DM Salute 11 aprile 2008, art. 2 comma 2 |
| flashcard_completo | 11 | update | Tra le metodiche previste dal DM 2008 mancava il Doppler transcranico; i casi previsti erano riportati in modo incompleto (anche 'bambini < 1 anno' va riferito al periodo di osservazione: nei primi 12 mesi il flusso è sempre richiesto). | DM Salute 11 aprile 2008, art. 2 comma 2 e allegato 1 |
| flashcard_completo | 47 | update | Aggiunta un'informazione clinicamente essenziale: la RM può essere negativa nei primi giorni (le lesioni compaiono anche dopo 1-2 settimane), quindi una RM precoce normale non esclude la diagnosi. | Lambeck J et al., Dtsch Arztebl Int 2019 (review ODS); Singh TD et al., Eur J Neurol 2014 |
| flashcard_completo | 66 | update | L'affermazione 'tipicamente non associata a nausea/vomito' è errata: nella casistica IIHTT la cefalea aveva fenotipo emicranico in circa metà dei casi, con nausea e fotofobia frequenti. | Friedman DI et al., Headache 2017 (IIH Treatment Trial, headache profile); Mollan SP et al., J Neurol Neurosurg Psychiatry 2018 (consensus IIH) |
| flashcard_completo | 73 | update | Formulazione incoerente ('sindrome caratterizzata da deficit di tiamina'): il deficit è la causa, non la caratteristica. Precisato anche il carattere di emergenza. | Galvin R et al., EFNS guidelines Eur J Neurol 2010; Sechi G, Serra A, Lancet Neurol 2007 |
| flashcard_completo | 77 | update | Mancavano dose e via: le dosi orali o 'standard' (100 mg) sono insufficienti; la raccomandazione è tiamina EV ad alte dosi (EFNS: 200 mg x3/die; RCP/pratica corrente 500 mg x3/die per 2-3 giorni). | Galvin R et al., EFNS guidelines Eur J Neurol 2010; Royal College of Physicians 2001; Thomson AD et al., Alcohol Alcohol 2002 |
| flashcard_completo | 260 | update | Soglie volumetriche imprecise: i cut-off di letteratura sono DWI >82 mL entro 6 ore (Thomalla 2010) e >145 mL entro 14 ore (Oppenheim 2000), non 16 ore. | Oppenheim C et al., Stroke 2000; Thomalla G et al., Ann Neurol 2010; Wijdicks EF et al., AHA/ASA Statement Stroke 2014 |
| flashcard_completo | 262 | update | Furosemide non ha evidenza nell'edema ischemico e non è raccomandata dalle linee guida; mancavano l'indicazione (solo al deterioramento clinico, non in profilassi) e la non indicazione dei corticosteroidi. | Wijdicks EF et al., AHA/ASA Statement Stroke 2014; Powers WJ et al., AHA/ASA Guidelines Stroke 2019; van der Worp HB et al., ESO guideline Eur Stroke J 2021 |
| flashcard_completo | 270 | update | Aggiornamento: i criteri di Duke sono stati rivisti (Duke-ISCVID 2023), con nuovi criteri di imaging (PET/TC con FDG, TC cardiaca) e microbiologici. | Fowler VG et al., Clin Infect Dis 2023 (Duke-ISCVID criteria); Delgado V et al., ESC Guidelines Endocarditis Eur Heart J 2023 |
| flashcard_completo | 272 | update | Mancava l'alternativa con DOAC, oggi considerata ragionevole dalle linee guida AHA/ASA per il trombo ventricolare sinistro; precisata la durata. | Kleindorfer DO et al., AHA/ASA Guideline Stroke 2021 (sez. 4.1.4); Alcalai R et al., Eur Heart J CVP 2022 (No-LVT trial) |
| flashcard_completo | 294 | update | La controindicazione ai DOAC nella APS triplo-positiva vale per tutta la classe (avviso EMA/PRAC 2019 su rivaroxaban, apixaban, edoxaban e dabigatran), non solo per rivaroxaban; aggiunta l'opzione ASA per i profili a basso rischio e la terapia della recidiva. | Tektonidou MG et al., EULAR recommendations Ann Rheum Dis 2019; EMA/PRAC 2019; Kleindorfer DO et al., AHA/ASA Guideline Stroke 2021 |
| flashcard_completo | 297 | update | Definizione superata: la preeclampsia non richiede più la proteinuria se è presente altra disfunzione d'organo materna (ISSHP 2018, ACOG 2020). | Brown MA et al., ISSHP classification Hypertension 2018; ACOG Practice Bulletin 222, 2020 |
| flashcard_completo | 307 | update | Non allineata alle linee guida ESO 2024 (e in contraddizione con la carta 645): la chiusura è raccomandata sia per PASCAL 'probabile' sia per 'possibile'; per 'improbabile' si suggerisce di non chiudere salvo casi selezionati. | Kent DM et al., JAMA 2021 (PASCAL); Giacalone G et al., ESO guideline on PFO closure Eur Stroke J 2024 |
| flashcard_completo | 311 | update | L'elenco non corrispondeva alle fonti TOAST ad alto rischio: la protesi biologica, lo scompenso cardiaco, l'endocardite non batterica e il flutter sono fonti a rischio medio; mancavano stenosi mitralica con FA, malattia del nodo del seno e segmento ventricolare acinetico. | Adams HP et al., Stroke 1993 (TOAST classification) |
| flashcard_completo | 319 | update | 'Stenosi intracraniche' non è un'indicazione allo stenting (SAMMPRIS/VISSIT: lo stenting intracranico è inferiore alla terapia medica); aggiunta l'equivalenza CEA/CAS sotto i 70 anni. | Bonati LH et al., ESO guideline on carotid stenosis Eur Stroke J 2021; Kleindorfer DO et al., AHA/ASA Guideline Stroke 2021; Chimowitz MI et al., NEJM 2011 (SAMMPRIS) |
| flashcard_completo | 320 | update | Target LDL errato (<54): SAMMPRIS e AHA/ASA 2021 indicano LDL <70 mg/dL (ESO/ESC per rischio molto alto <55); per la PA il target specifico nella stenosi intracranica è PAS <140 mmHg. | Chimowitz MI et al., NEJM 2011 (SAMMPRIS); Kleindorfer DO et al., AHA/ASA Guideline Stroke 2021; Psychogios M et al., ESO guideline on intracranial atherosclerosis Eur Stroke J 2022 |
| flashcard_completo | 329 | update | La domanda chiede controindicazioni ASSOLUTE ma la risposta mescolava relative e assolute con formule vaghe ('a meno di eccezioni'); riordinata secondo ESO 2021/AHA 2019. | Berge E et al., ESO guideline on IVT Eur Stroke J 2021; Powers WJ et al., AHA/ASA Guidelines Stroke 2019 |
| flashcard_completo | 385 | update | Aggiornamento: i DOAC sono oggi un'opzione accettata dopo la fase acuta (RE-SPECT CVT con dabigatran, ACTION-CVT; AHA/ASA 2024), e l'eparina non va sospesa in presenza di emorragia venosa. | Ferro JM et al., ESO guideline CVT Eur J Neurol 2017; Ferro JM et al., JAMA Neurol 2019 (RE-SPECT CVT); Saposnik G et al., AHA/ASA Scientific Statement Stroke 2024 |
| flashcard_completo | 523 | update | Domanda identica a quella della carta 285 (doppione): riformulata nello stile 'orale' delle altre carte della serie 516-543, mantenendo il testo discorsivo. | — |
| flashcard_completo | 525 | update | Aggiornamento diagnostico/terapeutico dell'arterite a cellule giganti: EULAR 2023 raccomanda l'ecografia dell'arteria temporale (segno dell'alone) come primo esame, con biopsia se l'imaging non è conclusivo; tocilizumab è indicato per il risparmio steroideo. | Dejaco C et al., EULAR recommendations for imaging in LVV Ann Rheum Dis 2023; Hellmich B et al., EULAR recommendations for management of LVV Ann Rheum Dis 2020 (update 2023) |
| flashcard_completo | 639 | update | Incoerenza con la carta 315 e con le fonti: la soglia per il TIA ad alto rischio è ABCD2 ≥4 (non >4) e per l'ictus minore NIHSS ≤5 (INSPIRES) o ≤3 (CHANCE/POINT). | Wang Y et al., NEJM 2023 (INSPIRES); Kleindorfer DO et al., AHA/ASA Guideline Stroke 2021 |
| flashcard_completo | 234 | update | Soglia di rischio di recidiva espressa come '>60%': la definizione ILAE 2014 usa 'almeno il 60%' (≥60%); precisato anche il riferimento al rischio delle due crisi non provocate. | Fisher et al., ILAE official report: a practical clinical definition of epilepsy, Epilepsia 2014 |
| flashcard_completo | 236 | update | Contenuto errato rispetto alla normativa italiana: dopo una crisi provocata (sintomatica acuta) l'idoneità è valutata caso per caso; i 6 mesi riguardano la prima crisi non provocata; per l'epilessia è richiesto 1 anno libero da crisi (gruppo 1) e 6 mesi di astensione dopo la sospensione della terapia su consiglio medico. | DM 30 novembre 2010 (recepimento Direttiva 2009/113/CE), Allegato III, punto F; raccomandazioni LICE |
| flashcard_completo | 547 | update | Il principio finale 'Se in dubbio → coscienza compromessa' non esiste nella classificazione ILAE 2025: il position paper stabilisce che se lo stato di coscienza non è determinabile la crisi è classificata con il termine 'padre' (crisi focale / crisi a origine sconosciuta), senza specificare la coscienza. | Beniczky et al., Updated classification of epileptic seizures: ILAE position paper, Epilepsia 2025 (doi 10.1111/epi.18338) |
| flashcard_completo | 462 | update | Durata indicata (5-40 s) incoerente con la carta 563 della stessa raccolta (3-20 s) e con la descrizione ILAE delle assenze tipiche (in genere <20 s). | Hirsch et al., ILAE definition of the IGE syndromes, Epilepsia 2022; Beniczky et al., ILAE 2025 |
| flashcard_completo | 456 | update | Risposta troppo scarna e non aggiornata: SANAD II (2021) ha mostrato la superiorità della lamotrigina su levetiracetam e zonisamide nell'epilessia focale; mancano oxcarbazepina/lacosamide come alternative e la nota per le donne in età fertile. | Marson et al., SANAD II, Lancet 2021; NICE NG217 2022 |
| flashcard_completo | 570 | update | Aggiornamento: il valproato è risultato superiore al levetiracetam nelle epilessie generalizzate (SANAD II 2021); la lamotrigina può peggiorare le mioclonie nella JME; precisata l'indicazione EMA del levetiracetam nelle IGE (add-on) e aggiunti gabapentin/pregabalin tra i farmaci da evitare. | Marson et al., SANAD II, Lancet 2021; Hirsch et al., ILAE 2022; schede tecniche EMA (levetiracetam, perampanel, valproato) |
| flashcard_completo | 250 | update | Dosi non allineate alle evidenze attuali: il trial ESETT (2019) ha dimostrato pari efficacia (~45-47%) di levetiracetam 60 mg/kg, fosfenitoina 20 mg PE/kg e valproato 40 mg/kg; la fenitoina 15-18 mg/kg è sottodosata; mancano i massimali e la nota sulla lacosamide (evidenze inferiori). | Kapur et al., ESETT, NEJM 2019; Glauser et al., AES guideline, Epilepsy Currents 2016; LICE 2023 |
| flashcard_completo | 243 | update | Precisazione: il criterio delle scariche >2,5 Hz vale per i pazienti senza encefalopatia epilettica nota; nei pazienti con encefalopatia epilettica serve un aumento di prominenza/frequenza rispetto al basale con cambiamento clinico osservabile. | Leitinger et al., Salzburg consensus criteria, Lancet Neurol 2016; Leitinger et al., Epilepsy Behav 2015 |
| flashcard_completo | 244 | update | Definizione dell'evoluzione spazio-temporale non corretta: i criteri di Salisburgo adottano la definizione ACNS, cioè almeno 2 cambiamenti sequenziali inequivocabili in frequenza, morfologia O sede (non obbligatoriamente frequenza + morfologia/sede). | Leitinger et al., Lancet Neurol 2016 (appendix); Hirsch et al., ACNS Standardized Critical Care EEG Terminology 2012/2021 |
| flashcard_completo | 245 | update | Conclusione errata: per i criteri di Salisburgo la risposta al farmaco EV conferma l'NCSE solo se vi è miglioramento EEG E clinico; il miglioramento solo EEG (senza miglioramento clinico) configura un NCSE 'possibile'. | Leitinger et al., Salzburg consensus criteria, Lancet Neurol 2016 |
| flashcard_completo | 87 | update | Incoerenza domanda-risposta: i sintomi elencati (disfunzione esecutiva, disinibizione, alterazioni del giudizio) riflettono la diffusione della patologia alle aree neocorticali fronto-temporo-parietali, non il solo coinvolgimento entorinale-limbico. | Braak & Braak 1991; Jack et al., Alzheimer's Association Workgroup 2024 |
| flashcard_completo | 88 | update | Denominazione errata: i criteri 2024 sono dell'Alzheimer's Association Workgroup (Jack et al. 2024), non 'NIA-AA 2024'; precisato il significato dei Core 1 (sufficienti per la diagnosi biologica) e dei Core 2. | Jack et al., Revised criteria for diagnosis and staging of Alzheimer's disease: Alzheimer's Association Workgroup, Alzheimer's Dement 2024 |
| flashcard_completo | 90 | update | Denominazione errata ('NIA-AA 2024' → criteri Alzheimer's Association 2024); aggiunto il contesto degli stadi clinici 0-6 per chiarezza. | Jack et al., Alzheimer's Association Workgroup, Alzheimer's Dement 2024 |
| flashcard_completo | 89 | update | Incompleto: il pattern tipico dell'AD comprende anche il cingolo posteriore/precuneo, spesso le prime regioni coinvolte; precisate le aree risparmiate. | Minoshima et al., Ann Neurol 1997; EANM/EAN guidance FDG-PET nelle demenze 2018 |
| flashcard_completo | 159 | update | Denominazione errata nella domanda ('variante Posteriore Corticale Atrofica'): la variante si chiama Atrofia Corticale Posteriore (PCA); precisato il pattern. | Crutch et al., Consensus classification of PCA, Alzheimer's Dement 2017 |
| flashcard_completo | 150 | update | Anglicismo ('dizziness') e lista incompleta: mancano sincope/blocchi di conduzione, crampi, calo ponderale, e la nota sulla minore tossicità GI del cerotto di rivastigmina. | Schede tecniche EMA/AIFA donepezil, rivastigmina, galantamina; NICE NG97 2018 |
| flashcard_completo | 143 | update | Definizione errata: il MBI (criteri ISTAART 2016) richiede per definizione autonomia funzionale sostanzialmente conservata (al più minima compromissione delle IADL); una riduzione delle IADL orienta verso la demenza. Mancano i criteri di età e durata. | Ismail et al., ISTAART-AA research diagnostic criteria for MBI, Alzheimer's Dement 2016 |
| flashcard_completo | 146 | update | Precisazioni regolatorie: il risperidone è l'unico antipsicotico autorizzato in UE per la demenza (aggressività persistente nell'AD moderata-severa, max 6 settimane); il brexpiprazolo è approvato solo da FDA; aggiunta l'avvertenza di classe su mortalità/ictus. | Schede tecniche EMA/AIFA risperidone; FDA label Rexulti 2023; APA practice guideline 2016; EMA/AIFA avvertenze antipsicotici nella demenza |
| flashcard_completo | 153 | update | Dose incompleta: il brexpiprazolo è approvato FDA per l'agitazione nell'AD alla dose di 2-3 mg/die (titolazione da 0,5 mg). | FDA label Rexulti, maggio 2023; Lee et al., JAMA Neurol 2023 |
| flashcard_completo | 118 | update | Affermazione sulla memantina troppo netta: i criteri McKeith 2017 la indicano come opzione con evidenze limitate ma possibile beneficio modesto (impressione clinica globale) in DLB/PDD, da considerare se intolleranza agli AChEI. | McKeith et al., DLB Consortium criteria, Neurology 2017; Emre et al., Lancet Neurol 2010; Taylor et al., Lancet Neurol 2020 |
| flashcard_completo | 168 | update | Domanda incoerente: 'sottocorticale multi-infartuale' mescola due entità distinte (demenza multi-infartuale da grandi vasi vs demenza vascolare sottocorticale ischemica da malattia dei piccoli vasi); la risposta descrive quest'ultima. | Skrobot et al., VICCCS-2 classification of vascular cognitive impairment, Alzheimer's Dement 2018 |
| flashcard_completo | 172 | update | Età degli eventi ischemici imprecisa: nella CADASIL l'età media al primo TIA/ictus è ~45-50 anni (range 20-70), non 30-45. | Chabriat et al., Lancet Neurol 2009; Di Donato et al., BMC Med 2017 |
| flashcard_completo | 41 | update | Imprecisioni: il 'cortical ribbon sign' riguarda la corteccia (l'iperintensità dei nuclei della base è un reperto distinto); la 14-3-3 ha specificità limitata; aggiornamento sul ruolo centrale della RT-QuIC nei criteri CDC 2018 ed europei 2021. | CDC diagnostic criteria for CJD 2018; Hermann et al., Lancet Neurol 2021; Zerr et al., Brain 2009 |
| flashcard_completo | 586 | update | Soglia di età non coerente con le linee guida: AAN 2021 individua i pazienti <60 anni come quelli in cui si possono considerare i dopamino-agonisti per il maggior rischio di discinesie; la levodopa resta la prima scelta per la maggior parte dei pazienti (LEAP, PD MED). | Pringsheim et al., AAN practice guideline on dopaminergic therapy for early PD, Neurology 2021; Verschuur et al., LEAP, NEJM 2019 |
| flashcard_completo | 587 | update | Dosi non corrette per l'UE: la rasagilina è autorizzata a 1 mg/die (0,5 mg non è una dose EMA); selegilina 5-10 mg/die. | Schede tecniche EMA/AIFA rasagilina, selegilina, safinamide; AAN 2021 |
| flashcard_completo | 592 | update | L'amantadina a rilascio prolungato 274 mg (Gocovri) è approvata solo negli USA e non è disponibile in UE/Italia (dove si usa l'amantadina IR 100 mg); precisato che il protocollo ECG deriva dalla scheda tecnica europea del farmaco. | Scheda tecnica amantadina (PK-Merz/Mantadan); FDA label Gocovri 2017; Pahwa et al., JAMA Neurol 2017; MDS evidence-based review 2018 |
| flashcard_completo | 595 | update | Farmaci non disponibili in UE indicati come standard: la trimetobenzamide non esiste in Europa (si usa il domperidone); l'apomorfina sublinguale (Kynmobi) non è autorizzata in UE; levodopa inalata (Inbrija) autorizzata EMA 2019 con disponibilità variabile. | Schede tecniche EMA apomorfina (APO-go), Inbrija; MDS evidence-based review 2018; EMA domperidone 2014 |
| flashcard_completo | 95 | update | Soglie imprecise: nei criteri MDS 2022 il residuo post-minzionale è ≥100 mL e l'ipotensione ortostatica neurogena ≥20/10 mmHg entro 3 min (clinicamente stabilita) o entro 10 min (clinicamente probabile); precisato il prerequisito 'sporadico' e il parkinsonismo nella forma probabile. | Wenning et al., MDS criteria for the diagnosis of MSA, Mov Disord 2022 |
| flashcard_completo | 183 | update | Refuso: 'Uthoff' invece di 'Uhthoff' (Wilhelm Uhthoff). | Terminologia standard, Thompson et al. Lancet Neurol 2018 |
| flashcard_completo | 184 | update | La risposta citava solo il liquor come sostituto della DIT: mancavano la regola delle ≥4 sedi (nessun altro requisito), CVS/PRL come sostituti e le modalità di documentazione del nervo ottico (OCT/PEV con soglie). | Montalban et al., McDonald 2024 revisions, Lancet Neurol 2025; review Biomedicines 2025 |
| flashcard_completo | 188 | update | Parte McDonald 2024 incompleta e imprecisa ('CVS e PRL possono supportare la diagnosi nei casi dubbi'): nei criteri 2024 CVS (Select 6) e PRL sostituiscono formalmente la DIT; mancava la regola delle ≥4 sedi e la cautela negli over 50. | Montalban et al., McDonald 2024 revisions, Lancet Neurol 2025 |
| flashcard_completo | 189 | update | La nota sui McDonald 2024 era generica; i criteri 2024 aboliscono i criteri separati per la PPMS (criteri unificati, con l'eccezione delle ≥2 lesioni midollari sufficienti per la DIS). | Montalban et al., McDonald 2024 revisions, Lancet Neurol 2025 |
| flashcard_completo | 176 | update | Imprecisione: 'infarto delle arterie ciliari' (è l'ischemia della testa del nervo ottico nel territorio delle ciliari posteriori brevi); il LES non è una causa tipica di forma arteritica; mancavano gli elementi clinici distintivi (indolore, altitudinale, urgenza della forma arteritica). | Biousse & Newman, NEJM 2015; Hayreh, Prog Retin Eye Res 2009 |
| flashcard_completo | 191 | update | Soglia errata: 'più di 3 segmenti' invece di '≥3 segmenti vertebrali contigui' (criteri IPND 2015). | Wingerchuk et al., Neurology 2015 (criteri IPND); Banwell et al., Lancet Neurol 2023 (MOGAD) |
| flashcard_completo | 598 | update | Errore di fatto: 'i canali LGI1' — LGI1 è una proteina secreta del complesso VGKC, non un canale; corretto in 'proteine del complesso dei canali del potassio voltaggio-dipendenti (LGI1, CASPR2)'. | Graus et al., Lancet Neurol 2016; Dalmau & Graus, NEJM 2018 |
| flashcard_completo | 431 | update | Imprecisione: i criteri di Graus indicano l'ipermetabolismo (non 'iper o ipo') temporale mediale alla PET-FDG; aggiunti gli altri criteri richiesti per la forma definita, altrimenti la carta è fuorviante. | Graus et al., Lancet Neurol 2016 |
| flashcard_completo | 440 | update | L'associazione anticorpale era presentata come equivalente tra GlyR e DPPX: la PERM è tipicamente associata ad anti-GlyR; anti-DPPX dà più spesso un quadro con diarrea/calo ponderale e ipereccitabilità (PERM-like); aggiunto anti-GAD65. | Carvajal-González et al., Brain 2014; Dalmau, Graus 'Autoimmune Encephalitis and Related Disorders' 2022 |
| flashcard_completo | 437 | update | Soglia di età aggiornata (>60 anni nelle casistiche di riferimento) e aggiunti gli altri fattori che orientano verso una forma paraneoplastica. | Ariño et al., JAMA Neurol 2015; Graus et al., Nat Rev Neurol 2020 |
| flashcard_completo | 425 | update | La percentuale '83%' non trova riscontro nella casistica di riferimento: in Gaig 2017 il disturbo del sonno è sintomo d'esordio nel 36% ma compare in tutti i pazienti nel decorso; aggiunto il fenotipo simil-PSP. | Gaig et al., Neurology 2017 |
| flashcard_completo | 426 | update | Percentuali invertite rispetto ai dati: nella casistica di Gaig 2017 il siero è positivo nel 100% e il liquor nell'87,5% (2/16 negativi), non 'siero 95% / liquor 100%'. | Gaig et al., Neurology 2017 |
| flashcard_completo | 604 | update | Affermazione invertita: 'quasi sempre presenti nel liquor e spesso anche nel siero' — è il siero a essere positivo praticamente sempre, il liquor può essere negativo in una minoranza (Gaig 2017). | Gaig et al., Neurology 2017 |
| flashcard_completo | 429 | update | Il dato 'morte improvvisa nel 34% dei casi' è impreciso: la revisione sistematica sulle cause di morte riporta la morte improvvisa in circa un terzo dei decessi (32,8%), non dei pazienti. | Howischer et al., Brain Sci 2025 (revisione sistematica cause di morte); Gaig et al., Neurology 2017 |
| flashcard_completo | 347 | update | '2-4 settimane' è impreciso: il nadir è entro 2 settimane nella maggioranza dei casi e per definizione entro 4 settimane. | EAN/PNS guideline GBS, van Doorn et al., Eur J Neurol/JPNS 2023; Leonhard et al., Nat Rev Neurol 2019 |
| flashcard_completo | 338 | update | Errore di criterio: nella CIDP tipica il coinvolgimento sensitivo è richiesto in aggiunta ('E'), non in alternativa ('E/O') all'ipostenia; l'areflessia è richiesta in tutti gli arti. | Van den Bergh et al., EAN/PNS guideline CIDP, Eur J Neurol/JPNS 2021 |
| flashcard_completo | 342 | update | Aggiornamento regolatorio: efgartigimod è approvato anche in UE per la CIDP (CE 19 giugno 2025), non solo FDA; precisata la finestra di induzione IVIG (2-5 giorni). | EMA, Vyvgart EPAR variazione II/0020, giugno 2025; ADHERE, Allen et al., Lancet Neurol 2024; EAN/PNS 2021 |
| flashcard_completo | 363 | update | Aggiornamento: nipocalimab è approvato anche in UE (CE 1 dicembre 2025) per gMG anti-AChR+/anti-MuSK+ dai 12 anni; aggiunti tacrolimus e metotrexato tra gli steroid-sparing. | EMA, Imaavy EPAR 2025; Vivacity-MG3, Antozzi et al., Lancet Neurol 2025; International Consensus Guidance MG, Narayanaswami et al., Neurology 2021 |
| flashcard_completo | 403 | update | Imprecisione sui trigger: nella forma iperkaliemica l'attacco è scatenato dal riposo dopo esercizio (non dall'esercizio in sé), dal digiuno, dal freddo e dai cibi ricchi di potassio; aggiunta la miotonia come elemento distintivo. | Statland et al., Muscle Nerve 2018 (review paralisi periodiche); Fontaine, Handb Clin Neurol 2018 |
| flashcard_completo | 482 | update | Per il pubblico italiano mancava lo stato regolatorio: ubrogepant e zavegepant non sono disponibili in Italia; rimegepant e atogepant sono approvati EMA e rimborsati AIFA. | AIFA, Determina Vydura 2025 e Registro Aquipta 2024; EMA EPAR Vydura 2022, Aquipta 2023, Rayvow 2022 |
| flashcard_completo | 485 | update | Risposta generica ('almeno due o tre classi a seconda delle linee guida'): precisati i criteri AIFA vigenti (≥8 giorni/mese, MIDAS ≥11, fallimento di ≥3 classi) e la posizione EHF 2022. | AIFA, Registri Aimovig/Ajovy/Emgality/Vyepti, modifica 23/04/2025; Sacco et al., EHF guideline, J Headache Pain 2022 |
| flashcard_completo | 497 | update | Frequenza non conforme a ICHD-3 ('1-8 attacchi al giorno' invece di 'da 1 ogni due giorni a 8 al giorno'); aggiunta la distinzione episodica/cronica (remissione ≥3 mesi). | ICHD-3, Cephalalgia 2018 |
| flashcard_completo | 507 | update | Frequenza non conforme a ICHD-3 ('≥5' invece di '>5 al giorno per più della metà del tempo'); mancava il criterio obbligatorio della risposta all'indometacina. | ICHD-3, Cephalalgia 2018 |
| flashcardIVanno | 3 | update | La scelta della prima linea in base all'età è un paradigma superato: LEAP e PD MED mostrano che la levodopa a bassa dose è un'opzione legittima anche nel giovane con sintomi lievi; la risposta la escludeva. | LEAP (NEJM 2019); PD MED (Lancet 2014); NICE NG71 2017; MDS evidence-based review 2018 |
| flashcardIVanno | 9 | update | Aggiunta la soglia formale dei criteri MDS (assenza di risposta a levodopa ≥600 mg/die = criterio di esclusione assoluto) e dei criteri MSA, altrimenti i 1200 mg dello scenario sembrano la soglia. | Postuma et al., MDS clinical diagnostic criteria for PD, Mov Disord 2015; Wenning et al., MDS criteria for MSA, Mov Disord 2022 |
| flashcardIVanno | 20 | update | L'effetto antidiscinetico della safinamide non è confermato: la MDS la giudica 'efficace' per le fluttuazioni ma con prove insufficienti per le discinesie; la frase 'può ridurre' era troppo ottimistica. | MDS evidence-based review 2018 (Fox et al., Mov Disord 2018); RCP Xadago (EMA); studi 016/SETTLE |
| flashcardIVanno | 24 | update | Data sbagliata: il parere positivo del CHMP è del giugno 2026 e la decisione della Commissione Europea è dell'agosto 2026, non settembre. | EMA, CHMP opinion Hopledo 25-26 giugno 2026; comunicato Zambon/Amneal di approvazione CE, agosto 2026; RISE-PD (Hauser et al., JAMA Neurol 2023) |
| flashcardIVanno | 25 | update | Precisata la data (Drug Safety Communication del 20 marzo 2026) e i prodotti coinvolti; contenuto confermato. | FDA Drug Safety Communication, 20 marzo 2026, 'FDA requiring warning about vitamin B6 deficiency and associated seizures' per i prodotti contenenti carbidopa/levodopa |
| flashcardIVanno | 26 | update | Aggiornato lo stato regolatorio: tavapadon approvato dalla FDA il 28 settembre 2026 (Juvmo); la carta non lo riportava. | FDA approval tavapadon (Juvmo, AbbVie), 28 settembre 2026; programma TEMPO-1/2/3 (Lancet Neurol/JAMA Neurol 2025) |
| flashcardIVanno | 36 | update | Aggiunta la restrizione EMA sul domperidone (dose e durata), rilevante per la prescrizione in Italia. | EMA/PRAC 2014, restrizioni domperidone; MDS evidence-based review NMS 2019 |
| flashcardIVanno | 53 | update | La memantina è un antagonista NMDA non competitivo (uncompetitive) voltaggio-dipendente ad affinità moderata, non 'bassa'. | RCP Ebixa (EMA); Reisberg et al., NEJM 2003 |
| flashcardIVanno | 56 | delete | Duplicato della carta 42 (stesso obiettivo realistico della terapia sintomatica e stessa motivazione comunicativa). | - |
| flashcardIVanno | 66 | delete | Duplicato della carta 79, che copre la stessa posizione AIFA (marzo 2026, conferma CSE 15-19 giugno 2026, motivazioni) insieme allo stato regolatorio europeo e alla classe C(nn). | Comunicato AIFA 26 giugno 2026 ('Anti beta-amiloide: la CSE conferma la non rimborsabilità') |
| flashcardIVanno | 72 | update | Mancavano i criteri specifici delle indicazioni europee: esclusione degli omozigoti APOE ε4 (entrambi i farmaci), RM basale senza >4 microemorragie/siderosi/macroemorragia, assenza di anticoagulazione. | RCP Leqembi (decisione CE aprile 2025) e RCP Kisunla (decisione CE settembre 2025); appropriate use recommendations Cummings 2023/Rabinovici 2025 |
| flashcardIVanno | 75 | update | Aggiunti i dati specifici per farmaco (finestra di comparsa, percentuali sintomatiche) e il calendario RM che ne deriva: utili per l'esame orale e per il monitoraggio. | CLARITY-AD (van Dyck, NEJM 2023); TRAILBLAZER-ALZ 2 (Sims, JAMA 2023); RCP Leqembi e Kisunla (EMA) |
| flashcardIVanno | 76 | update | 'Alcune indicazioni europee' era vago: l'indicazione UE di entrambi gli anticorpi esclude gli omozigoti ε4; negli USA sono inclusi con boxed warning. | RCP Leqembi e Kisunla (EMA 2025); FDA labels Leqembi/Kisunla (boxed warning ARIA) |
| flashcardIVanno | 90 | update | I numeri riportati sono quelli di ACCORD-2; aggiunti quelli di ACCORD-1 per coerenza con la domanda al plurale. | Axsome: ACCORD-1 (2022, HR 0,275; 7,5% vs 25,9%) e ACCORD-2 (2025, HR 0,276; 8,4% vs 28,6%); FDA approval Auvelity per agitazione nella demenza di Alzheimer, 30 aprile 2026 |
| flashcardIVanno | 108 | update | Aggiornamento: a maggio 2026 la FDA ha esteso efgartigimod a tutte le forme dell'adulto (anti-MuSK, anti-LRP4, triplo-sieronegative, studio ADAPT SERON); nipocalimab è approvato anche in UE (dicembre 2025). | FDA approval Rystiggo 2023 / EC gennaio 2024; FDA Imaavy 30 aprile 2025 / EC 1 dicembre 2025; FDA Vyvgart label expansion 8 maggio 2026 (ADAPT SERON) |
| flashcardIVanno | 109 | update | Il 69% è la riduzione delle IgG totali dello studio pediatrico Vibrance-MG; in VIVACITY-MG3 (adulti) la riduzione delle IgG è circa 75%. Aggiunta l'approvazione UE. | J&J press release 30 aprile 2025 (FDA) e 1 dicembre 2025 (CE); Antozzi et al., VIVACITY-MG3, Lancet Neurol 2025 |
| flashcardIVanno | 129 | update | Contenuto verificato e corretto; aggiunta la citazione della fonte (pubblicata nel 2026). | Ren X, ..., Anderson CS, Wang X. Int J Stroke 2026 (pooled INTERACT1-4 + ATACH-II, n=11.283) |
| quiz_ripasso | 16 | update | La spiegazione presentava come consolidato un dato osservazionale e discordante tra coorti; aggiunta la precisazione sul livello di evidenza senza cambiare la risposta corretta. | Butera C et al., Cephalalgia Reports 2024; Sacco S et al., EHF guideline on anti-CGRP mAbs, J Headache Pain 2022 |
