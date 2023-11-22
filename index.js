// Imports
const express = require("express");
const handleErrors = require("./middlewares/handleError");

// Express initialization
const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Url parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// API Routes
app.use("/emercado-api", require("./routes/emercadoRoutes"));

// Pages Routes
app.get("/", (req, res) => {
  res.sendFile("D:/emercado-api/pages/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile("D:/emercado-api/pages/login.html");
});

app.get("/categories", (req, res) => {
  res.sendFile("D:/emercado-api/pages/categories.html");
});

app.get("/my-profile", (req, res) => {
  res.sendFile("D:/emercado-api/pages/my-profile.html");
});

app.get("/cart", (req, res) => {
  res.sendFile("D:/emercado-api/pages/cart.html");
});

app.get("/signout", (req, res) => {
  res.sendFile("D:/emercado-api/pages/signout.html");
});

app.get("/products", (req, res) => {
  res.sendFile("D:/emercado-api/pages/products.html");
});

app.get("/product-info", (req, res) => {
  res.sendFile("D:/emercado-api/pages/product-info.html");
});

app.get("/sell", (req, res) => {
  res.sendFile("D:/emercado-api/pages/sell.html");
});

// Error handler
app.use(handleErrors);

// Server listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
