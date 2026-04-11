const CACHE_NAME = 'neurologia-schemi-v2'; // Cambia questa stringa ad ogni aggiornamento
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './immagini/logo-192x192.png',
  './immagini/logo-512x512.png'  // Nessuna virgola qui!
];

// Installa e salva in cache le risorse
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
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
