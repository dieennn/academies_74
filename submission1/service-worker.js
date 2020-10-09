const CACHE_NAME = "submission1";
const urlsToCache = [
   "/",
   "/index.html",
   "/manifest.json",
   "/nav.html",
   "/pages/home.html",
   "/pages/project.html",
   "/pages/about.html",
   "/pages/contact.html",
   "/css/materialize.min.css",
   "/js/materialize.min.js",
   "/js/nav.js",
   "./images/favicon.ico",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
   "./images/1.png",
   "./images/2.jpg",
   "./images/3.png",
   "./icon192x192.svg",
   "./icon512x512.svg"
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
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
         }

         console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
         );
         return fetch(event.request);
      })
   );
});

// Menghapus Cache Lama
self.addEventListener("active", function(event) {
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