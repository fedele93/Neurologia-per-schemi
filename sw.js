// Neurologia-per-schemi service worker (v6).
//
// Strategia di caching — pensata per un sito di contenuti clinici dove la
// FRESCHEZZA viene prima dell'offline:
//
//   * HTML e JSON (dati): NETWORK-FIRST con fallback alla cache.
//     L'utente vede sempre l'ultima versione pubblicata; se è offline
//     (o la rete cade) recuperiamo l'ultima copia in cache. Così una
//     correzione a uno schema si vede subito, senza restare "bloccati"
//     sulla vecchia versione in cache.
//
//   * Asset statici (immagini, icone, font): CACHE-FIRST con aggiornamento
//     in background. Sono immutabili, quindi ha senso servirli dalla cache.
//
//   * Risorse cross-origin (es. Mermaid da CDN): NON gestite qui, passano
//     dirette alla rete. (Vedere issue #6: vendoring locale per l'offline.)
//
// PRECACHE: contiene solo la "shell" stabile del sito + i 5 file JSON del
// motore. NON elenca le singole pagine HTML degli schemi: quelle vengono
// cachate a runtime al primo accesso (vedi fetch handler). Quindi, quando
// aggiungi un nuovo schema HTML o un nuovo file in data/, NON devi più
// modificare questo elenco: funzionerà in offline dopo la prima visita.

const CACHE_NAME = 'neurologia-schemi-v7';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './immagini/logo-192x192.png',
  './immagini/logo-512x512.png',
  // Motore dati (stabile): cachati per il funzionamento offline dello strumento.
  './data/catalogo_puglia.json',
  './data/sinonimi.json',
  './data/strutture.json',
  './data/percorsi.json',
  './data/discipline.json',
  // Mermaid vendorizzato (prima da CDN): 3 versioni usate dai vari schemi,
  // così i diagrammi renderizzano anche offline e senza dipendere da jsdelivr/cdnjs.
  './vendor/mermaid/mermaid-10.min.js',
  './vendor/mermaid/mermaid-10.6.1.min.js',
  './vendor/mermaid/mermaid-11.min.js'
];

// Estensioni considerate "asset immutabili" -> cache-first.
function isStaticAsset(url) {
  return /\.(png|jpe?g|gif|ico|svg|woff2?|ttf|eot|css)$/i.test(url.pathname);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        PRECACHE.map((url) =>
          cache.add(url).catch(() => console.log('Precache saltata (non presente?):', url))
        )
      ))
  );
  self.skipWaiting(); // attiva subito la nuova versione
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))
      ))
      .then(() => self.clients.claim()) // prendi il controllo delle pagine aperte
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Gestiamo solo le richieste same-origin; le altre (es. CDN) passano.
  if (url.origin !== self.location.origin) return;

  // Asset statici: cache-first, poi rete (e aggiornamento in background).
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        });
      })
    );
    return;
  }

  // HTML e dati: NETWORK-FIRST, con fallback alla cache se offline.
  // Ogni risposta di rete valida aggiorna la cache (stale-while-revalidate
  // implicito), così la prossima visita offline userà la copia più recente.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match('./index.html'))
      )
  );
});
