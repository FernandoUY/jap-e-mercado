const random = () => {
  return Math.random().toString(36).substring(2);
};

const token = () => {
  return random() + random();
};

document.addEventListener("submit", function () {
  localStorage.setItem("token", token());
});
