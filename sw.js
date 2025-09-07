const CACHE_NAME = 'ns-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './immagini/logo-192x192.png',
  './immagini/logo-512x512.png'  // Nessuna virgola qui!
];

// Installa e salva in cache le risorse
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste e servi i file dalla cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Elimina vecchie cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
