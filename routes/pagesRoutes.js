const authorization = require("../middlewares/authorization");

const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.sendFile("D:/emercado-api/pages/index.html");
});

routes.get("/login", (req, res) => {
  res.sendFile("D:/emercado-api/pages/login.html");
});

routes.get("/categories", (req, res) => {
  res.sendFile("D:/emercado-api/pages/categories.html");
});

routes.get("/my-profile", (req, res) => {
  res.sendFile("D:/emercado-api/pages/my-profile.html");
});

routes.get("/cart", authorization, (req, res) => {
  res.sendFile("D:/emercado-api/pages/cart.html");
});

routes.get("/signout", (req, res) => {
  res.sendFile("D:/emercado-api/pages/signout.html");
});

routes.get("/products", (req, res) => {
  res.sendFile("D:/emercado-api/pages/products.html");
});

routes.get("/product-info", (req, res) => {
  res.sendFile("D:/emercado-api/pages/product-info.html");
});

routes.get("/sell", (req, res) => {
  res.sendFile("D:/emercado-api/pages/sell.html");
});

module.exports = routes;
