const CACHE = 'geometry-v1.2';
const ASSETS = [
  '/geometry-builder/',
  '/geometry-builder/index.html',
  '/geometry-builder/manifest.json',
  '/geometry-builder/icon-192.png',
  '/geometry-builder/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
