const CartModel = require('../models/cart');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.level === 'seller' ? req.body.userId : req.user.id;
    const result = await CartModel.getCartByUserId(userId);
    sendSuccess(res, result, 'Cart By User retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createCart = async (req, res) => {
  try {
    const { productId, amount } = req.body;

    if (![productId, amount].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await CartModel.createCart(req.user.id, productId, amount);
    sendSuccess(res, { id }, 'Cart created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const updateCart = async (req, res) => {
  try {
    const { amount } = req.body;

    if (![amount].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await CartModel.getCartById(req.params.id, req.user.id);
    await CartModel.updateCart(req.params.id, amount);
    sendSuccess(res, { id }, 'Cart updated successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = await CartModel.getCartById(req.params.id, req.user.id);
    await CartModel.deleteCart(id);
    sendSuccess(res, { id }, 'Cart deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
};
