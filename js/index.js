document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    document.getElementById("nav-links").innerHTML += `
    <li class="nav-item">
        <a class="nav-link" href="signout.html">Cerrar Sesión</a>
    </li>
    `;
  }
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
