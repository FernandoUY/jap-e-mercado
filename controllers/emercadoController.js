const emercado = require("../models/emercadoModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await emercado.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const products = await emercado.getProductsByCategory(parseInt(categoryId));
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const getSellSuccessMsg = async (req, res, next) => {
  try {
    const successMsg = await emercado.getSellSuccessMsg();
    return res.json(successMsg);
  } catch (error) {
    next(error);
  }
};

const postCartArticles = async (req, res, next) => {
  const { userId } = req.params;
  const { articles } = req.body;
  try {
    const cart = await emercado.postCartArticles(parseInt(userId), articles);
    return res.json(cart);
  } catch (error) {
    next(error);
  }
}

const getBuySuccessMsg = async (req, res, next) => {
  try {
    const successMsg = await emercado.getBuySuccessMsg();
    return res.json(successMsg);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await emercado.getProductById(parseInt(productId));
    return res.json(product);
  } catch (error) {
    next(error);
  }
};

const getProductCommentsById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const comments = await emercado.getProductCommentsById(parseInt(productId));
    return res.json(comments);
  } catch (error) {
    next(error);
  }
};

const getUserCartByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await emercado.getUserCartByUserId(parseInt(userId));
    return res.json(cart);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getCategories,
  getProductsByCategory,
  getSellSuccessMsg,
  getBuySuccessMsg,
  getProductById,
  getProductCommentsById,
  getUserCartByUserId,
  postCartArticles,
};
