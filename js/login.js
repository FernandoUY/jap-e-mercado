const random = () => {
  return Math.random().toString(36).substring(2);
};

const token = () => {
  return random() + random();
};

document.addEventListener("submit", function () {
  const emailInp = document.getElementById("emailInput").value; //se obtiene el valor del email
  const user = {
    firstName: null,
    secondName: null,
    firstLastname: null,
    secondLastname: null,
    email: emailInp,
    phone: null,
    token: token(),
  };

  localStorage.setItem("user", JSON.stringify(user));
});
