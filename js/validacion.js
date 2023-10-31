document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    window.location = "login.html";
  } else {
    let userName = user.email.split("@")[0];

    document.getElementById("dropdown").innerHTML += `
    <a
      class="nav-link dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      ${userName}
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="signout.html">Cerrar sesión</a></li>
    </ul>
    `;
  }
});
