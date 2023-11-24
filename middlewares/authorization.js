const jwt = require("jsonwebtoken");
const { customError } = require("../utils");

// Authorization middleware with jwt
const authorization = (req, res, next) => {
  try {
    const token = req.session.token;

    if (!token) {
      return res.redirect("/login");
    }

    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }

      req.user = decoded;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
