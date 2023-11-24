const { login } = require("../models/authModel");
const jwt = require("jsonwebtoken");
const { customError } = require("../utils");
const loginController = (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw customError("Email and password are required", 400);
    }

    const user = login(email, password);

    if (!user) {
      throw customError("Invalid email or password", 401);
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

    req.session.token = token;

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const logoutController = (req, res, next) => {
  try {
    req.session = null;
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

const getUserController = (req, res, next) => {
  try {
    const token = req.session.token;

    if (!token) {
      throw customError("Token not found", 401);
    }

    const decoded = jwt.verify(token, "secret");

    return res.status(200).json({ email: decoded.email });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
  logoutController,
  getUserController,
};
