document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  console.log(response)
});
