# Revisione della letteratura e della qualità dei contenuti — 12 ottobre 2026

Sintesi della revisione completa di tutte le pagine del sito e dei tre mazzi di flashcard. Il dettaglio per pagina (correzioni prima/dopo con fonte, punti da verificare, note di qualità) è in `2026-10-12-dettaglio-revisori.md`.

## Metodo

- Nove revisioni indipendenti per area clinica, con lo stesso protocollo: lettura integrale di ogni file; elenco di ogni affermazione verificabile (dosi, soglie, criteri, trial); verifica contro la fonte primaria più recente (linee guida AHA/ASA, ESO, EAN, AAN, ILAE, MDS, NICE, ESC, ADA, schede tecniche EMA/AIFA, trial di riferimento); correzione in place solo degli errori di fatto, dei contenuti superati e dei problemi di usabilità; segnalazione separata di ciò che non è stato possibile verificare.
- Aree: cerebrovascolare; urgenze, epilessia e gestione internistica; disturbi cognitivi e del movimento; sistema nervoso periferico e neuromuscolare; motoneurone e strumenti; flashcard in quattro blocchi.
- Per le flashcard i revisori hanno prodotto patch per id, applicate con uno script e rivalidate (id unici, campi completi, mazzo caricabile).
- Verifiche tecniche su ogni pagina modificata: bilanciamento dei tag HTML; rendering headless a 400 px senza errori JavaScript, senza scroll orizzontale, con link all'indice presente e diagrammi Mermaid disegnati.
- Limite: la sandbox non raggiunge i siti esterni, quindi i link in uscita (Risorse, schede UILDM su Google Drive) non sono stati aperti direttamente.

## Numeri

| Oggetto | Rivisti | Corretti | Rimossi |
|---|---|---|---|
| Pagine di contenuto | 41 | 35 | 3 |
| Flashcard mazzo completo | 659 | 73 | 0 |
| Flashcard IV anno | 146 | 15 | 2 (doppioni) |
| Quiz a risposta multipla | 25 | 1 | 0 |

## Pagine rimosse e perché

- `Schemi1/f_100.html` (test di Farnsworth-Munsell 100 Hue, "alfa"). Un test di discriminazione cromatica su schermo non calibrato non ha validità clinica: gamma, gamut, luminosità e filtri del display cambiano i passi di tinta e i valori normativi non sono applicabili. Il calcolo era anche sbagliato (ordinamento perfetto dava punteggio 83, assi di confusione errati). Era l'unica voce della sezione "Demielinizzanti", rimossa anch'essa. Per la valutazione del colore in ambulatorio servono tavole fisiche (Ishihara, HRR, D-15).
- `Schemi1/plesso-radici.html` ("localizzazione plesso radice tipo 2"). Duplicava `neuroloc.html` con un motore inferiore (registrava solo i reperti patologici, un ramo logico era irraggiungibile). Si tiene `neuroloc.html`, che resta linkato come "Localizzazione plesso brachiale e radicolopatie".
- `Schemi1/crisi2025.html` (classificazione ILAE 2025). Pagina di 135 parole non linkata dall'indice, duplicato meno accurato delle 14 flashcard sulla stessa classificazione.

Le due pagine di reindirizzamento (`flashcardIIIanno.html`, `neurocards_canovacci.html`) restano: servono a chi ha vecchi segnalibri e importano il progresso nel mazzo completo.

## Giudizio per pagina

| Pagina | Giudizio | Interventi principali |
|---|---|---|
| ictus_pocket_guide | corretta | core DAWN 31-51 mL (era 31-59); bolo alteplase 1 min; IMA <3 mesi; ICH post-trombolisi con crioprecipitato/fibrinogeno + acido tranexamico; tenecteplase come alternativa; large core, basilare, MeVO, finestre estese |
| flowcharts/ictus_acuto | corretta | PA pre-trombolisi <185/110 (era 105); ASPECTS ≥6 e 3-5 large core; DAPT; basilare ESO/ESMINT 2024; link all'indice |
| flowcharts/fa_anticoagulazione | corretta | dabigatran controindicato con CrCl <30 (era 15); criteri di riduzione dei DOAC da scheda tecnica; CHA₂DS₂-VA ESC 2024; timing post-ictus |
| neurosonologia | corretta | tabella intracranica etichettata "SONIA" ma con soglie TCCS slittate di una classe, ricostruita; "PASCAL score" inesistente sostituito con la classificazione reale; arteria ascellare >1,0 mm nella GCA; rimossi 3,3 MB di script Mermaid inutilizzato |
| gestione_ictus_emorragico | mantenuta | nessuna modifica |
| prevenzione_secondaria | mantenuta | DAPT per NIHSS ≤3 e ABCD2 ≥4; anticoagulazione 2-14 giorni; tunnel del PFO >10 mm (nelle slide di partenza era ">2 mm") |
| stato_epilettico | corretta | lorazepam fiala 4 mg/1 mL; seconda linea ESETT (levetiracetam 60 mg/kg max 4,5 g, valproato 40 mg/kg max 3 g, fenitoina 18-20 mg/kg); definizione di refrattario e super-refrattario; tempi ILAE 2015 |
| rachicentesi | corretta | DOAC sospesi 72 h (era 48), dabigatran per funzione renale, ticagrelor 5 giorni, prasugrel 7; ripresa DOAC ≥6 h; TC prima della puntura: crisi nell'ultima settimana, deficit focale, GCS, età >60; ago atraumatico; rimossi 2,7 MB di Mermaid inutilizzato |
| urgenze_neuromuscolari | mantenuta, da verificare | sigle esplicitate, riquadro "regole generali in PS"; i 13 link Google Drive vanno aperti e attribuiti dall'autore |
| ipertensione_e_frequenza | corretta | la pagina con gli errori più pericolosi: adrenalina 1 mg EV "per bradicardia" → infusione 2-10 µg/min; anafilassi 0,5 mg IM (non EV); dose pediatrica 10 µg/kg (era 10 volte maggiore); via endotracheale e compressione dei bulbi oculari eliminate; adenosina aggiunta; verapamil mai con β-bloccanti EV; digossina; dopamina 0,8 mg/mL; nicardipina, esmololo, target per condizione; target orali ESC 2024 |
| gestione_elettroliti | corretta | iponatremia: bolo NaCl 3% 150 mL in 20 min fino a 3 volte, limite 8 mEq/L/24 h, no tolvaptan con ipertonica, desmopressina se ipercorrezione; iperkaliemia: insulina 10 UI + 25 g glucosio (era 50), SZC/patiromer; ipokaliemia, magnesio, calcio con dosi e conversioni |
| emergenze_glicemia | corretta | consenso DKA 2024: criteri diagnostici, soglia K 3,5 per rinviare l'insulina, bicarbonato solo se pH <7,0, insulina 0,05 UI/kg/h sotto 250 mg/dL, criteri di risoluzione; eliminata la riga "KCl 60 mEq/L a 60 mEq/h"; riquadro ipoglicemia ADA 2025 |
| flowcharts/gestione_ospedaliera_glicemia | corretta | nodi allineati al 2024 (HCO₃ <18, osmolarità efficace, formula urea corretta); link all'indice |
| approccio_demenze | corretta | DSM-5: declino in ≥1 dominio (non "2 o più"); RM al posto di TC con contrasto; biomarcatori aggiornati; refuso "Passie" |
| criteri_demenze | mantenuta | nessun errore; integrati bvFTD/PPA, PSP 2017, CBD 2013, LATE |
| valutazione_neuropsicologica | corretta | sensibilità/specificità MMSE e MoCA con fonte; coefficienti italiani del MMSE per età e scolarità (cut-off 23,8); cut-off MoCA italiani; ADL, IADL, NPI; icona esterna sostituita |
| terapia_supporto_demenze | corretta | **da telefono la pagina era vuota**: una regola CSS nascondeva tutte le tabelle sotto 480 px; quetiapina 12,5-150 mg (era fino a 450); brexpiprazolo max 3 mg, non EMA; risperidone unico autorizzato EMA, max 6 settimane; escitalopram tolto per l'agitazione (S-CitAD negativo), citalopram max 20 mg; melatonina 10 mg tolta dalla prima linea; sezione inibitori delle colinesterasi e memantina con aggiustamenti renali |
| diagnosipd | corretta | criteri MDS 2015 riallineati al testo originale (esclusioni, red flag, criteri di supporto); scroll orizzontale eliminato |
| flowcharts/tremore | corretta | classificazione MDS 2018 (ET-plus, tremore funzionale, tremore di Holmes); posologie; DBS e ultrasuoni focalizzati |
| SARAscale | mantenuta | calcolo verificato (massimi 8/6/4/6/4/4/4/4, totale 40); "Linguaggio" → "Eloquio" |
| tabelle_eng_emg | corretta | rapporto palmo/polso nel tunnel carpale (era invertito); scheda criteri CIDP EAN/PNS 2021; fonti |
| tabella_innervazione_sciatico | corretta | 13 radici sbagliate (es. gastrocnemio L4-S3 → S1-S2, peroneo lungo → L5-S1, intrinseci del piede → S1-S2); rowspan che deformava la tabella; territorio cutaneo attribuito al tronco sciatico |
| radici_nervi_muscoli | corretta | "mano cadente" tolta dalla radicolopatia C7; segno di Hoffmann; flessore ulnare del carpo C8-T1 |
| flowcharts/neurolocator | corretta con riserva | il motore dava risultati assurdi (piede cadente → "nervo gluteo superiore 100%"): riscritto; resta uno strumento di orientamento grossolano, il valore sta nelle due pagine collegate |
| flowcharts/nervitab, testclinici | corrette | link all'indice rotti; regola L5 contro peroneo rovesciata; note su APB ed EPL |
| neuroloc | corretta | link all'indice, sottotitoli su telefono, sindrome dello stretto toracico, tempi di denervazione |
| dolore_neuropatico | corretta | pregabalin max 600 mg/die (era 600 mg due volte al giorno); amitriptilina in prima linea e tramadolo in seconda (NeuPSIG); NNT dei triciclici 3,6; linee guida citate inesistenti sostituite con quelle reali; lidocaina 5%; combinazioni |
| flowcharts/gestione_sla | corretta | criteri Gold Coast; edaravone con criteri corretti e stato regolatorio; tofersen rimborsato SSN dal 22/09/2026; tabella respiratoria coerente con il flowchart NIV; scialorrea, pseudobulbare, spasticità, crampi secondo EAN 2024 |
| flowcharts/gestione_sma | corretta | indicazioni e rimborsabilità dei tre farmaci (Zolgensma ≤13,5 kg, Itvisma, nusinersen alte dosi, risdiplam compresse); screening neonatale; SMA dell'adulto |
| flowcharts/alsfr-s | riscritta | gli item erano sbagliati (mancava "girarsi nel letto", igiene duplicata) e il pulsante non calcolava: ora 12 item fedeli all'originale, totale 0-48 e sottopunteggi, verificata |
| risorse | corretta | leggibile su telefono; link a un PDF di dubbia liceità sostituito con la pagina ufficiale; aggiunti MMSE, MoCA, ADL |
| strumenti/impegnative | mantenuta | funziona (ricerca "sonno", "emg", codici) |
| flashcard_completo, flashcardIVanno, quiz_ripasso | corrette | vedi sotto |

## Flashcard: correzioni più rilevanti

- Accertamento di morte: pH <7,40 come da DM 2008, eccezione post-anossia, Doppler transcranico tra le metodiche di flusso.
- Normativa sulla guida nell'epilessia (DM 30/11/2010): crisi provocata caso per caso, prima crisi non provocata 6 mesi, epilessia 1 anno.
- Criteri di Salisburgo per lo stato non convulsivo: risposta solo EEG al farmaco = "possibile"; evoluzione spazio-temporale secondo ACNS.
- Seconda linea dello stato epilettico allineata a ESETT; tiamina 500 mg EV × 3 nel Wernicke.
- ILAE 2025: con coscienza non determinabile si usa il termine padre; "21 tipi" è il totale.
- Criteri CIDP EAN/PNS 2021: ipostenia **e** deficit sensitivo (non "e/o"); LETM ≥3 segmenti; McDonald 2024 completati; anti-IgLON5 con sensibilità siero/liquor corretta.
- MSA MDS 2022 (soglie ortostatiche), MBI secondo ISTAART, criteri Alzheimer's Association 2024 (non "NIA-AA").
- Farmaci non disponibili in UE segnalati come tali (amantadina ER, apomorfina sublinguale, trimetobenzamide); rasagilina 1 mg.
- Prevenzione secondaria: LDL <70 nella stenosi intracranica, stenting carotideo senza "stenosi intracraniche", DOAC controindicati nella sindrome da antifosfolipidi triplo-positiva, DOAC accettati nella trombosi venosa cerebrale.
- IV anno: date regolatorie 2025-2026 (Hopledo, tavapadon, efgartigimod, nipocalimab 75% negli adulti), criteri europei degli anti-amiloide (esclusione omozigoti APOE ε4), memantina ad affinità moderata; due doppioni eliminati (id 56 e 66, non riutilizzati).
- Correzione mia: clonidina "0,1 mg a settimana" (artefatto della slide) → 0,1 mg con titolazione settimanale, max 0,3 mg.

## Indice

- Rimosse le voci delle tre pagine eliminate e la sezione "Demielinizzanti" rimasta vuota.
- Aggiunte le pagine che erano raggiungibili solo da altre pagine: flowchart ictus acuto, scelta dell'anticoagulante nella FA, calcolatore ALSFRS-R, flowchart emergenze iperglicemiche.
- Testi dei link resi descrittivi ("Cosi_così", "tipo 1/tipo 2", "Ipertensione e frequenza", "discomatopsia").

## Da verificare dall'autore (non modificato)

1. I 13 link Google Drive di `urgenze_neuromuscolari.html`: aprirli, attribuirli (UILDM?) e valutare se ospitare i PDF nel repository; se non verificabili, la pagina andrebbe rimossa.
2. Quattro link esterni di `risorse.html` segnalati come sospetti (neuromag.it, stroke-manual.com, svaol.it, neuropod.it).
3. Serie di carte "da esame orale" (id 516-543 e 598-605 del mazzo completo): duplicano in forma discorsiva le carte brevi; decidere se tenerle come formato a parte.
4. Dati dei trial 2026 presi dalle lezioni (HOPE, CHAMPION-AF, STABLED, TAIL-SWITCH, TAPIS, pooled INTERACT) non verificabili dalla sandbox: confrontare con le pubblicazioni.
5. Voci regolatorie italiane: stato dell'edaravone in L. 648/96, Itvisma e nusinersen alte dosi in AIFA, pimavanserina EMA, disponibilità italiana di nicardipina EV e calcitonina, dettagli del Registro AIFA anti-CGRP 2025.
6. Soglie MMSE della Nota AIFA 85; galantamina con CrCl 9-59 su RCP; fasce di gravità della SARA (non appartengono alla scala originale).
7. Pagine con il link "Condividi su Mastodon" prima del DOCTYPE (quirks mode) e registrazione del service worker con percorso errato in alcune pagine: innocui, da sistemare in un intervento tecnico separato.
