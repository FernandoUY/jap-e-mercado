// Authorization middleware with jwt
const authorization = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    next();
  });
};

module.exports = authorization;
