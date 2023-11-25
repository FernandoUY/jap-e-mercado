const fs = require("fs/promises");

// Get all categories
const getCategories = async () => {
  const categories = await fs.readFile("./db/cats/cat.json", "utf-8");
  return JSON.parse(categories);
};

// Get products by category
const getProductsByCategory = async (categoryId) => {
  const products = await fs.readFile(
    `./db/cats_products/${categoryId}.json`,
    "utf-8"
  );

  return JSON.parse(products);
};

// Get success message for sell
const getSellSuccessMsg = async () => {
  const successMsg = await fs.readFile("./db/sell/publish.json", "utf-8");
  return JSON.parse(successMsg);
};

// Get success message for buy
const getBuySuccessMsg = async () => {
  const successMsg = await fs.readFile("./db/cart/buy.json", "utf-8");
  return JSON.parse(successMsg);
};

// Post new cart articles
const postCartArticles = async (userId, articles) => {
  const userCart = {
    user: userId,
    articles,
  }
  await fs.writeFile(
    `./db/user_cart/${userId}.json`,
    JSON.stringify(userCart)
  );
  return userCart;
}

// Get product by id
const getProductById = async (productId) => {
  const products = await fs.readFile(
    `./db/products/${productId}.json`,
    "utf-8"
  );
  return JSON.parse(products);
};

// Get product comments by id
const getProductCommentsById = async (productId) => {
  const comments = await fs.readFile(
    `./db/products_comments/${productId}.json`,
    "utf-8"
  );
  return JSON.parse(comments);
};

// Get user cart by user id
const getUserCartByUserId = async (userId) => {
  const cart = await fs.readFile(`./db/user_cart/${userId}.json`, "utf-8");
  return JSON.parse(cart);
};

module.exports = {
  getCategories,
  getProductsByCategory,
  getSellSuccessMsg,
  getBuySuccessMsg,
  getProductById,
  getProductCommentsById,
  getUserCartByUserId,
  postCartArticles
};
