var snapVersion = '7.3.0',
    cacheName = 'idiot-pwa';
var filesToCache = [
    "index.html",
    "lol.html",
    "spared.html",
    "js/main.js",
    "assets/message.css",
    "assets/spared.css",
    "message.html",
    "js/msg.js",
    "assets/video.css",
    "assets/youare.mp4"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    // @ts-ignore
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (evt) => {
    // @ts-ignore
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
    // @ts-ignore
    self.clients.claim();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    // @ts-ignore
    e.respondWith(
        caches.match(
            // @ts-ignore
            e.request,
            {'ignoreSearch': true}
        ).then(function(response) {
            // @ts-ignore
            return response || fetch(e.request);
        })
    );
});