//Todos los elementos input
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("userDetails"))
  let email = document.getElementById("email")

  email.setAttribute("value", `${user.email}`)

  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          getUserDetails()
        }

        form.classList.add('was-validated')
      }, false)
    })
});


function getUserDetails(){
  let name = document.getElementById("first-name")
  let secondName = document.getElementById("second-name")
  let lastname = document.getElementById("first-lastname")
  let secondLastname = document.getElementById("second-lastname")
  let phone = document.getElementById("phone")
  let email = document.getElementById("email")
  

  const userDetails = {
    firstName: name.value,
    secondName: secondName.value,
    firstLastname: lastname.value,
    secondLastname: secondLastname.value,
    email: email.value,
    phone: phone.value,
  };

  localStorage.setItem("userDetails", JSON.stringify(userDetails));

}


