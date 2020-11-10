const CACHE_NAME = "submission2";
const urlsToCache = [
   "/",
   "/index.html",
   "/manifest.json",
   "/nav.html",
   "/pages/about.html",
   "/pages/contact.html",
   "/pages/home.html",
   "/pages/random.html",
   "/pages/saved.html",
   "/assets/css/materialize.min.css",
   "/assets/css/custom.css",
   "/assets/img/favicon.ico",
   "/assets/img/icon.png",
   "/assets/js/api.js",
   "/assets/js/custom.js",
   "/assets/js/db.js",
   "/assets/js/idb.js",
   "/assets/js/main.js",
   "/assets/js/caches.js",
   "/assets/js/content.js",
   "/assets/js/materialize.min.js",
   "/assets/js/nav.js",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
   "/assets/img/192x192.png",
   "/assets/img/512x512.png"
];

// Menyimpan Aset ke Cache
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
         cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener("fetch", (event) => {
   const base_url = "https://api.football-data.org/";
   if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
         caches.open(CACHE_NAME).then((cache) => {
            return fetch(event.request).then((response) => {
               cache.put(event.request.url, response.clone());
               return response;
            })
         })
      );
   } else {
      event.respondWith(
         caches.match(event.request, {
            ignoreSearch: true
         }).then((response) => {
            return response || fetch(event.request);
         })
      )
   }
});

self.addEventListener("activate", event => {
   event.waitUntil(
      caches.keys().then(cacheNames => {
         return Promise.all(
            cacheNames.map(cacheName => {
               if (cacheName != CACHE_NAME) {
                  console.log("ServiceWorker: cache " + cacheName + " dihapus");
                  return caches.delete(cacheName)
               }
            })
         ).catch(error => {
            console.log(error);
         })
      })
   )
});

// event push
self.addEventListener('push', event => {
   let body;
   if (event.data) {
      body = event.data.text();
   } else {
      body = 'Push Message no payload';
   }
   let options = {
      body: body,
      icon: 'assets/img/icon.png',
      badge: 'assets/img/icon.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   };
   event.waitUntil(
      self.registration.showNotification('MPWA Submission2', options)
   );
});