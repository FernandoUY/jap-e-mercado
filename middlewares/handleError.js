// Handle errors middleware
const handleErrors = (err, req, res, next) => {
  if (err.message.includes("ENOENT")) {
    return res.status(404).json({ error: "Not found" });
  }
};

module.exports = handleErrors;