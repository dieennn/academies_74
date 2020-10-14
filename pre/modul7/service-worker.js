// Menampilkan Notifikasi dengan Actions
self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
      // Penguna menyentuh area notifikasi diluar action
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes-action':
        console.log('Pengguna memilih action yes.');
        // buka tab baru
        clients.openWindow('https://google.com');
        break;
      case 'no-action':
        console.log('Pengguna memilih action no');
        break;
      default:
        console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
        break;
    }
  });