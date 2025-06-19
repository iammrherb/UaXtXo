const CACHE_NAME = 'portnox-tco-v1';
const urlsToCache = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/js/core/module-loader.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
