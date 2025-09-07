const CACHE_NAME = 'ns-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './immagini/logo-192x192.png',
  './immagini/logo-512x512.png';

// Salva in cache le risorse al primo caricamento
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Servi i file dalla cache (se disponibili), altrimenti scaricali dalla rete
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Elimina vecchie cache quando aggiorni il Service Worker
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
