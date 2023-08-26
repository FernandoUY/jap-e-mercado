document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    document.getElementById("dropdown").innerHTML += `
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="/signout.html">Cerrar sesión</a></li>
    </ul>
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
