function showNotifikasiSederhana() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function showNotifikasiRequireInteraction() {
    const title = 'Notifikasi yang meminta interaksi pengguna';
    const options = {
        requireInteraction: true,
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

// Menampilkan Notifikasi dengan Gambar Ikon
function showNotifikasiIkon() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan gambar ikon.',
        'icon': './icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

// Menampilkan Notifikasi dengan Gambar Badge
function showNotifikasiBadge() {
    const title = 'Notifikasi dengan Badge';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan gambar badge.',
        'badge': './icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

// Menampilkan Notifikasi dengan Actions
function showNotifikasiActions() {
    const title = 'Notifikasi dengan Actions';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan pilihan actions.',
        'actions': [
            {
                'action': 'yes-action',
                'title': 'Ya',
            },
            {
                'action': 'no-action',
                'title': 'Tidak',
            }
        ]
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}