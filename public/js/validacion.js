document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/getUser");

  if (!res.ok) {
    document.getElementById("nav-links").innerHTML += `
    <a class="nav-link" href="/login">Iniciar sesión</a>
    `;
  } else {
    const user = await res.json();

    document.getElementById("dropdown").innerHTML += `
    <a
      class="nav-link dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      ${user.email.split("@")[0]}
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="/my-profile">Mi perfil</a></li>
      <li><a class="dropdown-item" href="/cart">Mi carrito</a></li>
      <li><a class="dropdown-item" href="/signout">Cerrar sesión</a></li>
    </ul>
    `;
  }
});
