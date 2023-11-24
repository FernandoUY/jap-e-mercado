document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault()
    
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

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    
    console.log(response)
    if (response.ok) {
      window.location.href = "/";
    } else {
      document.getElementById("error").style.display = "block";
    }

  });