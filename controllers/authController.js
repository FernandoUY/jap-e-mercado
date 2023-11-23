const { login } = require("../models/authModel");
const jwt = require("jsonwebtoken");
const loginController = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = login(email, password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
};

module.exports = {
  loginController,
};
