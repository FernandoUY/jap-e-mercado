const { loginController, getUserController } = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", loginController);

router.get("/getUser", getUserController)

module.exports = router;
