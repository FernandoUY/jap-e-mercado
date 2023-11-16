// Imports
const express = require("express");
const cors = require("cors");
const handleErrors = require("./middlewares/handleError");

// Express initialization
const app = express();
const port = 3000;

// Body parser
app.use(express.json());

// CORS
app.use(cors())

// Routes
app.use("/emercado-api", require("./routes/emercadoRoutes"));

// Error handler
app.use(handleErrors);

// Server listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
