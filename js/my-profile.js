
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  
  document.querySelector("#first-name").value = user?.firstName;
  document.querySelector("#second-name").value = user?.secondName;
  document.querySelector("#first-lastname").value = user?.firstLastname;
  document.querySelector("#second-lastname").value = user?.secondLastname;
  document.querySelector("#email").value = user?.email;
  document.querySelector("#phone").value = user?.phone;

});