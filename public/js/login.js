document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const userEmail = document.getElementById("emailInput").value;
    const userPassword = document.getElementById("passwordInput").value;

    const userDetails = {
      firstName: null,
      secondName: null,
      firstLastname: null,
      secondLastname: null,
      email: userEmail,
      phone: null,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  });
