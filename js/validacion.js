document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    let usermail = localStorage.getItem("user");

    document.getElementById("dropdown").innerHTML += `
    <a
      class="nav-link dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      ${usermail}
    </a>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="signout.html">Cerrar sesión</a></li>
    </ul>
    `;
  }
});
