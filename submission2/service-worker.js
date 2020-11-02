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
   "/assets/js/materialize.min.js",
   "/assets/js/nav.js",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
   "/assets/img/icon192x192.svg",
   "/assets/img/icon512x512.svg"
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

// Menggunakan Aset dari Cache
self.addEventListener("fetch", function(event) {
   event.respondWith(
      caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
         if(response) {
            // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
         }

         /* console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
         ); */
         return fetch(event.request);
      })
   );
});

// Menghapus Cache Lama
self.addEventListener("activate", function(event) {
   event.waitUntil(
      caches.keys()
      .then(function(cacheNames) {
         return Promise.all(
            cacheNames.map(function(cacheName) {
               if(cacheName != CACHE_NAME) {
                  console.log("ServiceWorker: cache " + cacheName + " dihapus");
                  return caches.delete(cacheName);
               }
            })
         );
      })
   );
});

// get push notif
self.addEventListener('push', function (event) {
   var body;
   if (event.data) {
      body = event.data.text();
   } else {
      body = 'Push message no payload';
   }
   var options = {
      body: body,
      icon: './assets/img/icon.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   };
   event.waitUntil(
      self.registration.showNotification('Push Notification', options)
   );
});