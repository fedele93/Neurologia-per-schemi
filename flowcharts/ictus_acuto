# Schema Decisionale Ictus Acuto - Trattamenti di Rivascolarizzazione

Questo diagramma di flusso è pensato come strumento decisionale per il neurologo in pronto soccorso nella gestione dell'ictus acuto.

```mermaid
flowchart TD
    A[Paziente con sospetto ictus acuto] --> B[NCCT urgente<br/>Door-to-needle < 45-60 min]
    B --> C{Emorragia o ipodensità marcata<br/>alla NCCT?}
    
    C -->|Sì| D[❌ Controindicazione assoluta IVT<br/>Valutare solo EVT se indicata]
    C -->|No| E[📊 Valutazione clinica completa<br/>NIHSS - Età - mRS premorboso<br/>Glicemia - PA - Coagulazione]
    
    E --> F{⏰ Tempo dall'esordio<br/>dei sintomi?}
    
    F -->|< 4.5 ore| G[🎯 Finestra standard IVT<br/>Paziente non selezionato]
    F -->|4.5-24 ore| H[🧠 Imaging perfusionale obbligatorio<br/>TC Perfusion o RM DWI/PWI]
    F -->|Onset sconosciuto<br/>Wake-up stroke| I[🔍 Imaging per selezione<br/>DWI/FLAIR mismatch]
    
    G --> J{❓ Controindicazioni IVT?<br/>Click per dettagli}
    
    J -->|No| K[⚡ Preparazione immediata IVT<br/>PA < 185/105 mmHg<br/>Escludere stroke mimics<br/>Non attendere lab]
    J -->|Sì| L[🔄 EVT diretta se LVO<br/>Altrimenti terapia medica]
    
    K --> M{🧬 NIHSS ≥ 6 AND<br/>Sospetto clinico LVO?}
    
    M -->|Sì| N[💉 Inizio IVT immediato<br/>+ Angio-TC per EVT<br/>Approccio Bridging]
    M -->|No| O[💊 Solo IVT<br/>Tenecteplase 0.25 mg/kg bolo<br/>o Alteplase 0.9 mg/kg]
    
    N --> P{🩸 LVO confermata<br/>all'Angio-TC/CTA?}
    
    P -->|Sì| Q[🔧 IVT + EVT Bridging<br/>Target TICI 2b-3<br/>< 6h non selezionati]
    P -->|No| R[💊 Completare solo IVT]
    
    H --> S{🎪 Criteri imaging perfusionale<br/>Click per dettagli completi}
    
    S -->|✅ Criteri soddisfatti| T[💉 IVT 4.5-9h possibile<br/>EVT 6-24h se LVO<br/>Imaging-guided therapy]
    S -->|❌ Criteri non soddisfatti| U[🏥 Terapia medica conservativa<br/>Click per protocollo completo]
    
    I --> V{🔬 DWI+/FLAIR- mismatch<br/>presente?}
    
    V -->|Sì| W[💉 IVT possibile se<br/>altri criteri soddisfatti<br/>Trial WAKE-UP protocol]
    V -->|No| X[⚖️ Solo EVT se LVO presente<br/>Valutazione caso per caso]
    
    Q --> Y[📈 Monitoraggio intensivo post-EVT<br/>Click per protocollo dettagliato]
    R --> Z[📋 Monitoraggio standard post-IVT<br/>Click per linee guida complete]
    O --> Z
    W --> Z
    
    Z --> AA[💊 Antiaggregazione post-24h<br/>ASA 100mg se TC controllo negativa<br/>No DAPT post-trombolisi]
    Y --> AA
    
    L --> BB{🧠 Occlusione basilare<br/>NIHSS ≥ 10?}
    BB -->|Sì| CC[🔧 EVT < 24h possibile<br/>Anche senza imaging avanzato<br/>Raccomandazione forte ESO 2024]
    BB -->|No| DD{⚡ LVO territorio anteriore<br/>< 6 ore dall'esordio?}
    DD -->|Sì| EE[🔧 EVT diretta<br/>ASPECT ≥ 6 preferibile]
    DD -->|No| FF[🏥 Terapia medica conservativa<br/>Click per gestione completa]
    
    %% Definizione dei click events con informazioni dettagliate
    click J "javascript:alert('CONTROINDICAZIONI IVT:\n\n• Trauma cranico severo < 3 mesi (GCS < 8)\n• Precedente stroke < 3 mesi\n• Chirurgia intracranica < 3 mesi\n• ICH precedente o sospetta\n• Anticoagulanti: INR > 1.7, Xaban < 24h senza test\n• Piastrine < 100.000\n• Neoplasie GI sanguinanti\n• Dissezione aortica\n• IMA con ST-elevation < 7 giorni\n• PA > 185/110 non controllabile\n• Gravidanza (relativa)\n• Età < 16 anni')"
    
    click S "javascript:alert('CRITERI IMAGING PERFUSIONALE:\n\nDEFUSE-3 (TC Perfusion):\n• Core < 70 ml\n• Penombra/Core ratio > 1.8\n• Volume totale < 100 ml\n• NIHSS ≥ 6\n\nDAWN (RM Perfusion):\n• > 80 anni: core < 21 ml\n• < 80 anni + NIHSS > 10: core < 31 ml\n• < 80 anni + NIHSS > 20: core < 51 ml\n\nWAKE-UP:\n• DWI positivo\n• FLAIR negativo\n• Lesione < 1/3 territorio MCA')"
    
    click U "javascript:alert('TERAPIA MEDICA CONSERVATIVA:\n\n• ASA 100-325 mg/die dopo 24-48h\n• Statine ad alta intensità\n• Controllo PA: target < 140/90 (non < 130/80)\n• Controllo glicemico: evitare ipo/iperglicemia\n• Prevenzione TVP: mobilizzazione precoce\n• Gestione disfagia: valutazione logopedica\n• Monitoraggio complicanze: edema, crisi\n• Riabilitazione precoce entro 24-48h\n• Prevenzione secondaria: ricerca eziologica')"
    
    click Y "javascript:alert('MONITORAGGIO POST-EVT:\n\n• PA < 180/105 mmHg continua x 24h\n• NIHSS ogni 15 min x 1h, poi ogni 30 min x 6h\n• TC controllo immediata se peggioramento\n• Doppler transcranico per valutare pervietà\n• Monitoraggio sindrome riperfusione\n• Sorveglianza complicanze: vasospasmo, dissezione\n• Gestione antiaggregazione se stent posizionato\n• TC controllo routine a 24h')"
    
    click Z "javascript:alert('MONITORAGGIO POST-IVT:\n\n• PA < 180/105 mmHg x 24h\n• NIHSS ogni 15 min x 1h, poi ogni 30 min x 6h\n• Se NIHSS aumenta ≥ 4 punti: stop IVT + TC\n• Emocromo e coagulazione a 6h e 24h\n• TC controllo a 22-36h prima antiaggregazione\n• No punture arteriose/venose centrali x 24h\n• No anticoagulanti x 24h\n• Monitoraggio angioedema (ACE-inibitori)\n• Controllo fibrinogeno se < 1 g/L')"
    
    click FF "javascript:alert('TERAPIA MEDICA COMPLETA:\n\n• Antiaggregazione: ASA 100 mg + Clopidogrel 75 mg x 21-90 giorni\n• Anticoagulazione se FA: start dopo 3-14 giorni\n• Controllo fattori rischio:\n  - PA: target personalizzato\n  - LDL: < 55 mg/dL\n  - Diabete: HbA1c < 7%\n• Stile vita: dieta, attività fisica, no fumo\n• Riabilitazione multidisciplinare\n• Follow-up neurologico e cardiologico\n• Prevenzione complicanze: TVP, infezioni')"
    
    %% Stili ottimizzati per sfondo chiaro
    classDef urgente fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef terapia fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef valutazione fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100
    classDef decisione fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#0d47a1
    classDef controindicazione fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#880e4f
    classDef conservative fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    
    class A,B urgente
    class K,N,O,Q,T,W,EE,CC terapia
    class E,H,I,S,V valutazione
    class C,F,J,M,P,BB,DD decisione
    class D,X controindicazione
    class U,FF conservative

