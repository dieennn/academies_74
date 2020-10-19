const CACHE_NAME = "news-reader-indexeddb";
var urlsToCache = [
   "/",
   "/nav.html",
   "/index.html",
   "/article.html",
   "/pages/home.html",
   "/pages/about.html",
   "/pages/contact.html",
   "/css/materialize.min.css",
   "/js/materialize.min.js",
   "/js/nav.js",
   "/js/api.js",
   "/icon.png",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

// Menyimpan Aset ke Cache
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
         return cache.addAll(urlsToCache);
      })
   );
});

// Menggunakan Aset dari Cache
self.addEventListener("fetch", (event) => {
   const base_url = "https://aqueous-woodland-96253.herokuapp.com/";
   if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
         caches.open(CACHE_NAME).then( (cache) => {
            return fetch(event.request).then( (response) => {
               cache.put(event.request.url, response.clone());
               return response;
            })
         })
      );
   } else {
      event.respondWith(
         caches.match(event.request, { ignoreSearch: true }).then( (response) => {
            return response || fetch(event.request);
         })
      )
   }
});

// Menghapus Cache Lama
self.addEventListener("active", (event) => {
   event.waitUntil(
      caches.keys()
      .then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cacheName) => {
               if(cacheName != CACHE_NAME) {
                  console.log("ServiceWorker: cache " + cacheName + " dihapus");
                  return caches.delete(cacheName);
               }
            })
         );
      })
   );
});