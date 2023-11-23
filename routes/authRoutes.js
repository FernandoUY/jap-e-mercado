const { loginController } = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", loginController);

module.exports = router;
