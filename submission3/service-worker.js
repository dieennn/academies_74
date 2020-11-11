importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
   console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
   [
      {url: '/nav.html', revision: '1'},
      {url: '/index.html', revision: '1'},
      {url: '/manifest.json', revision: '1'},
      {url: '/nav.html', revision: '1'},
      {url: '/pages/about.html', revision: '1'},
      {url: '/pages/contact.html', revision: '1'},
      {url: '/pages/home.html', revision: '1'},
      {url: '/pages/random.html', revision: '1'},
      {url: '/pages/saved.html', revision: '1'},
      {url: '/assets/css/materialize.min.css', revision: '1'},
      {url: '/assets/css/custom.css', revision: '1'},
      {url: '/assets/img/favicon.ico', revision: '1'},
      {url: '/assets/img/icon.png', revision: '1'},
      {url: '/assets/img/192x192.png', revision: '1'},
      {url: '/assets/img/512x512.png', revision: '1'},
      {url: '/assets/js/api.js', revision: '1'},
      {url: '/assets/js/custom.js', revision: '1'},
      {url: '/assets/js/db.js', revision: '1'},
      {url: '/assets/js/idb.js', revision: '1'},
      {url: '/assets/js/main.js', revision: '1'},
      {url: '/assets/js/caches.js', revision: '1'},
      {url: '/assets/js/content.js', revision: '1'},
      {url: '/assets/js/materialize.min.js', revision: '1'},
      {url: '/assets/js/nav.js', revision: '1'},
      {url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' }
   ], {
      ignoreUrlParametersMatching : [/.*/] 
   }
);

workbox.routing.registerRoute(
   new RegExp('/assets/css/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'styles'
      })
);

workbox.routing.registerRoute(
   new RegExp('/assets/js/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'javascript'
      })
);

workbox.routing.registerRoute(
   /\.(?:png|gif|jpg|jpeg|svg)$/,
   workbox.strategies.staleWhileRevalidate({
      plugins: [
         new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60
         }),
     ],
   })
);

workbox.routing.registerRoute(
   new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'pages'
      })
);

workbox.routing.registerRoute(
   new RegExp('https://api.football-data.org/v2/'),
   workbox.strategies.staleWhileRevalidate({
      cacheName: 'submission3', 
      plugins: [
         new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
         }),
         new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
         }),
      ]
   })
);

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
      self.registration.showNotification('MPWA Submission3', options)
   );
});

// Open app when click notification
self.addEventListener('notificationclick', event => {
   const rootUrl = new URL('/', location).href;
   event.notification.close();
   event.waitUntil(
     clients.matchAll().then(matchedClients => {
       for (let client of matchedClients) {
         if (client.url === rootUrl) {
           return client.focus();
         }
       }
       return clients.openWindow("/");
     })
   );
});