const CACHE_NAME = "intifada-reader-lite-v1";
const urlsToCache = ["/", "/index.html", "/js/main.js", "/img/logo.png", "/img/favicon.ico"];

self.addEventListener("install", function(event) {
    console.log("ServiceWorker: Menginstall..");

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("ServiceWorker: Membuka cache..");
            return cache.addAll(urlsToCache);
        })
    );
});

// Working Offline
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches.match(event.request, {cacheName:CACHE_NAME})
      .then(function(response) {
        console.log("ServiceWorker: Menarik data: ", event.request.url);
   
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
   
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function (response) {
            if (!response || response.status !== 200) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
  });

  // Menghapus Cache Lama
self.addEventListener('activate', function(event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});