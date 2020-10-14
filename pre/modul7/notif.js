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

// Menampilkan Notifikasi Berdasarkan Tag
function showNotifikasiTag() {
    const title1 = 'Notifikasi dengan Tag - 1';
    const options1 = {
        body: 'Anggota tag 1',
        tag: 'message-group-1'
    };
    // notifikasi kedua
    const title2 = 'Notifikasi dengan Tag - 2';
    const options2 = {
        body: 'Anggota tag 2',
        tag: 'message-group-2'
    };
    // notifikasi ketiga
    const title3 = 'Notifikasi dengan Tag - 3';
    const options3 = {
        body: 'Anggota tag 1',
        tag: 'message-group-1'
    };
    if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title1, options1);
            registration.showNotification(title2, options2);
            registration.showNotification(title3, options3);
        });
    } else {
    console.error('Fitur notifikasi tidak diijinkan.');
    }
}