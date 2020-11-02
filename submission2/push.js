/**
 * * npm install web-push --save
 * * run "node push.js"
 */
var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BFMlSAN5YITMydnnKfidQ8l9t-A-5iTwtysQ08Pb4OtgRoeYseq__EwhWu4nxaDEPTIOLiVB5odKKD1nuQHY0kQ",
   "privateKey": "juHYiW3jq4RPqHzP3InQW6XhRyY-9gAcHtg0XcwiyZo"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

let data = [
   {
      "endpoint": "https://fcm.googleapis.com/fcm/send/dy0r1crAg8c:APA91bG990zNE8BdtVhUZPlECNL9Lk-nFuUsuPS7OGNd8ebZgB_zIfcmcKN5mDX4g7JbWWblqwBR7aTRxk4uvs8JWzcVmjo91d9MgrhDUHmqqsyXJ5zNa0gVZK-J21Vppef00735WoyM",
      "keys": {
         "p256dh": "BHd1C4t6TiJIPaojsgppza/QgjSRzuja1PxMo9HLv+usbYEKvD72P2KjBS8EfuYMENxmeHXQC93npvbTjx2ZPDk=",
         "auth": "J0K850SYcQCVSczNYN94fA=="
      }
   },
   {
      // Chrome pc
      "endpoint": "https://fcm.googleapis.com/fcm/send/dHHYecR8Wog:APA91bHoZq8L8QQX1quZU-wkrCSMUipxcQHFoMTbM8ZYaBSu04tzFmgo6KObraoQRWrzreT16QdEQ6cvYGEPVLnWr0lQCw2awGoNAoK6Qn2hjwX8UH_YY-aG1Ez69Blzyop8mCsWc_yy",
      "keys": {
         "p256dh": "BB/tw5nlHpO9F5R5vs3GTxhxbF3aHl8H0LDwwaRFPE3wegvRwokyVFVKLLJRJgw41Q7HL1Mq0kB4mAeANijf8A=",
         "auth": "DqIox+bORC517OvUFIPbNQ=="
      }
   },
   {
      // FF
      "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABfh9ClNxeT4aWinNzSxAOcaVgcT2b-L8Ln4WxMVsnPurvm-L97TYqLlLPFvoLuu751hB6INatP-76NVztcFn_aKtPuYhnwjTaj05kA9mWvfPQ5OZ5Fvfi3qVXle0xdQOZcCbxClo7CylUqye4WaYPnoZ0WDu4dX6ohGmKUe91Tno17JDE",
      "keys": {
         "p256dh": "BMj184Sf7GvtxsXpgl0nTfY9nvLH3UZeSp9lINYCgL0mr1wGDoxYSlQo4fvW6Eu/e94VmCeWvkAoUNX8GbfDnEE=",
         "auth": "ZBRSYcp/omaSkhQ3fDbw+Q=="
      }
   }
];

var pushSubscription = {
   // Chrome android
   "endpoint": "https://fcm.googleapis.com/fcm/send/fktCHbIsqck:APA91bEJR3yQBF2hxlEDpuSBRIWeUd5Hc3YAvw5pxWVouWOWDEYW_KY_N_4spKY1mpPWkmGsKGMXSHr5peqJGkFCItaBddV0bnUma_51VSUFqPyLhZXfWt-5REfEZ2YdGHGr56iY6_ax",
   "keys": {
      "p256dh": "BPVta7lNmvlWJZyjUjh8LWNoTPStaDLh7pr4kVCSVrcKGivuwsHgQnEC0wnYbgWF2nHkBtfU0PFxl6moniwhuBE=",
      "auth": "dVzzmkrdVlfoVZX/smMxyw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '986915851506',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

// send all data
// data.map(dt => webPush.sendNotification(
//    dt,
//    payload,
//    options
// ))