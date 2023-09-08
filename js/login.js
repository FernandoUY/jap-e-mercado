const random = () => {
  return Math.random().toString(36).substring(2);
};

const token = () => {
  return random() + random();
};

document.addEventListener("submit", function () {
  const emailValue = document.getElementById("emailInput").value //se obtiene el valor del email
  localStorage.setItem("token", token());
  localStorage.setItem("user", emailValue);
});


