const router = require("express").Router();
const {
  getCategories,
  getProductsByCategory,
  getSellSuccessMsg,
  getBuySuccessMsg,
  getProductById,
  getProductCommentsById,
  getUserCartByUserId,
  postCartArticles,
} = require("../controllers/emercadoController");

router.get("/cart", getBuySuccessMsg);
router.get("/cats", getCategories);
router.get("/cats_products/:categoryId", getProductsByCategory);
router.get("/products/:productId", getProductById);
router.get("/products_comments/:productId", getProductCommentsById);
router.get("/sell", getSellSuccessMsg);
router.get("/user_cart/:userId", getUserCartByUserId);
router.post("/user_cart/:userId", postCartArticles);
router.post("/buy", getBuySuccessMsg);

module.exports = router;
