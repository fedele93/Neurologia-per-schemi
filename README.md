Creative Commons Attribuzione - Non commerciale - Condividi allo stesso modo 4.0 Internazionale (CC BY-NC-SA 4.0)

Questo lavoro è concesso in licenza sotto la licenza Creative Commons Attribuzione - Non commerciale - Condividi allo stesso modo 4.0 Internazionale.

Tu sei libero di:
- Condividere — riprodurre, distribuire, comunicare al pubblico, esporre in pubblico, rappresentare, eseguire e recitare questo materiale con qualsiasi mezzo e formato.
- Modificare — remixare, trasformare il materiale e basarti su di esso per le tue opere.
  alle seguenti condizioni:
  - Attribuzione — Devi riconoscere una menzione di paternità adeguata, fornire un link alla licenza e indicare se sono state effettuate modifiche.
  - Non commerciale — Non puoi usare il materiale per scopi commerciali.
  - Condividi allo stesso modo — Se remixi, trasformi il materiale o ti basi su di esso, devi distribuire i tuoi contributi con la stessa licenza del materiale originario.

Autore: Fedele Luisi
Data: 22/08/2025
Coautore: Domenico Mezzapesa
Data: 19/09/2025

Testo completo della licenza:
https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.it

## Licenza
⚠️ **Importante**: A partire dal 22/08/2025, tutti i contenuti di questo repository sono distribuiti sotto licenza **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it)**.

- Puoi **condividere e modificare** i materiali **solo per scopi non commerciali**.
- Devi **citare l’autore originale** (Fedele Luisi) e **il coautore** e **condividere eventuali modifiche con la stessa licenza**.
- I contenuti pubblicati prima del 22/08/2025 sono retroattivamente coperti da questa licenza.

[![Licenza Creative Commons](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## Strumento "Impegnative e codici prestazioni – Puglia"

`strumenti/impegnative.html` cerca nel Catalogo Regionale delle Prestazioni di
Specialistica Ambulatoriale (Regione Puglia) la dicitura esatta e i codici da
usare sull'impegnativa (es. "sonno" → PRIMA VISITA NEUROLOGICA - DISTURBI DEL
SONNO, cod. 89.13.00.04 / 10244). È uno strumento **non ufficiale**: fanno
sempre fede il catalogo regionale e il CUP.

### Rigenerare il catalogo quando la Regione lo aggiorna

```
pip install -r pipeline/requirements.txt
python pipeline/parse_catalogo.py
```

Lo script scarica il PDF ufficiale (o usa `pipeline/catalogo.pdf` se il
download fallisce: in quel caso scaricalo a mano e salvalo lì), estrae le
prestazioni, esegue le validazioni (univocità dei codici e test di verità
nota) e solo se tutto passa scrive `data/catalogo_puglia.json`. Le righe
scartate finiscono in `pipeline/report_parsing.txt`: va controllato dopo ogni
run. Ricordati di committare il JSON rigenerato perché GitHub Pages serve i
file dal repository.

### Aggiungere sinonimi

In `data/sinonimi.json` ogni voce mappa una lista di `termini` clinici su una
lista di `codici` regionali alfanumerici (campo `nota` opzionale, mostrato
nella scheda). Regola: inserire solo codici presenti in
`data/catalogo_puglia.json` — il parser li verifica a ogni esecuzione e
segnala quelli inesistenti. Le voci con `codici` vuoto sono promemoria da
completare e non compaiono nella ricerca.

### Aggiungere strutture ("dove eseguirla")

In `data/strutture.json` copia la voce d'esempio, **togli** il campo
`"esempio": true` (le voci d'esempio non vengono mostrate), compila presidio,
`asl`, `citta`, `prenotazione` e la data in `verificato_il`, ed elenca in
`codici` le prestazioni offerte. Aggiorna `meta.aggiornato_il`.

