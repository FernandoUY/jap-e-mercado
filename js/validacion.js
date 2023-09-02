document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    let usermail = localStorage.getItem("user");
    document.getElementById("dropdowna").innerText = usermail;
    document.getElementById("dropdown").innerHTML += `
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="signout.html">Cerrar sesión</a></li>
    </ul>
    `;
  }
});
