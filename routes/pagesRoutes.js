const { logoutController } = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

__dirname = __dirname.replace("routes", "pages");

const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

routes.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

routes.get("/categories", (req, res) => {
  res.sendFile(__dirname + "/categories.html");
});

routes.get("/my-profile", (req, res) => {
  res.sendFile(__dirname + "/my-profile.html");
});

routes.get("/cart", authorization, (req, res) => {
  res.sendFile(__dirname + "/cart.html");
});

routes.get("/signout", logoutController);

routes.get("/products", (req, res) => {
  res.sendFile(__dirname + "/products.html");
});

routes.get("/product-info", (req, res) => {
  res.sendFile(__dirname + "/product-info.html");
});

routes.get("/sell", (req, res) => {
  res.sendFile(__dirname + "/sell.html");
});

module.exports = routes;
