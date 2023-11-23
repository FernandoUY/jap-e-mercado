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
app.use(require("./routes/pagesRoutes"));

app.use(require("./routes/authRoutes"));

// Error handler
app.use(handleErrors);

// Server listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
