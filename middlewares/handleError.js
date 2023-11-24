// Handle errors middleware
const handleErrors = (err, req, res, next) => {
  return res.status(err.status).json({ error: err.message });
};

module.exports = handleErrors;
