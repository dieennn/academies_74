if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("../../service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker Berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

// Slider
document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('body-content').setAttribute("style", "display: none;");
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        indicators: true,
        padding: 200,
        dist: -40,
        padding: 40,
        numVisible: 5
    });

    // tabs
    var elems2 = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elems2, {});

    
});