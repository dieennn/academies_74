document.addEventListener("DOMContentLoaded", () => {
   let elems = document.querySelectorAll(".sidenav");
   M.Sidenav.init(elems);
   loadNav();

   // Load page content
   let page = window.location.hash.substr(1);
   if (page == "") page = "home";
   loadPage(page);
});

let loadNav = () => {
   let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
   xhr.open("GET", "nav.html", true);
   xhr.onreadystatechange = () => {
      if (xhr.readyState > 3 && xhr.status === 200) {
         document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
            elm.innerHTML = xhr.responseText;
         });

         document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
            elm.addEventListener("click", (event) => {
               let sidenav = document.querySelector(".sidenav");
               M.Sidenav.getInstance(sidenav).close()

               page = event.target.getAttribute("href").substr(1);
               loadPage(page);
            });
         });
      }
   };
   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
   xhr.send();

   return xhr;
}

let loadPage = (page) => {
   let xhttp = new XMLHttpRequest();
   xhttp.open("GET", "pages/" + page + ".html", true);
   xhttp.onreadystatechange = async function() {
      if(this.readyState === 4) {
         let content = document.querySelector("#body-content");
         if(this.status === 200) {
            content.innerHTML = xhttp.responseText;
         } else if(this.status === 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
         } else {
            content.innerHTML = "<p>Ups... Halaman tidak dapat diakses.</p>"
         }
      }
   };
   xhttp.send();
}