const CACHE_NAME = 'neurologia-schemi-v5'; // Cambia questa stringa ad ogni aggiornamento
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './immagini/logo-192x192.png',
  './immagini/logo-512x512.png',
  './strumenti/impegnative.html',
  './data/catalogo_puglia.json',
  './data/sinonimi.json',
  './data/strutture.json',
  './data/percorsi.json',
  './data/discipline.json'  // Nessuna virgola qui!
];

// Installa e salva in cache le risorse.
// Nota: si usa cache.add() file per file (e non cache.addAll) perché
// addAll fallisce IN BLOCCO se anche un solo file non esiste: ad esempio
// data/catalogo_puglia.json compare solo dopo la prima esecuzione del
// parser, e non deve impedire la cache di tutto il resto del sito.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          urlsToCache.map((url) =>
            cache.add(url).catch(() => {
              console.log('Risorsa non pre-cachata (non ancora presente?):', url);
            })
          )
        );
      })
  );
  self.skipWaiting(); // Forza l’attivazione immediata del nuovo service worker
});

// Attiva il service worker e rimuovi cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Prende il controllo delle pagine aperte
});

// Intercetta le richieste e servi la cache o la rete
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Serve dalla cache
        }
        return fetch(event.request); // Altrimenti vai in rete
      })
  );
});
