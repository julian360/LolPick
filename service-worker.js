const CACHE_NAME = 'version-1.1.0';
const urlsToCache = [
  '/LolPick/index.html',
  '/LolPick/icons/Logo.png'
];

// Instalar el Service Worker y cachear los archivos principales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones y servir desde el caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la respuesta está en el caché, la retorna. Si no, busca en la red.
        return response || fetch(event.request);
      })
  );
});
