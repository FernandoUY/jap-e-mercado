document.addEventListener("DOMContentLoaded", function () {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (!userDetails) {
    window.location = "/login";
  } else {
    let userName = userDetails.email.split("@")[0];

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
      <li><a class="dropdown-item" href="/my-profile">Mi perfil</a></li>
      <li><a class="dropdown-item" href="/cart">Mi carrito</a></li>
      <li><a class="dropdown-item" href="/signout">Cerrar sesión</a></li>
    </ul>
    `;
  }
});
