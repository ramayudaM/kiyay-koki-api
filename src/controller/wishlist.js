const WishlistModel = require('../models/wishlist');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const getWishlistByUserId = async (req, res) => {
  try {
    const userId = req.user.level === 'seller' ? req.body.userId : req.user.id;
    const result = await WishlistModel.getWishlistByUserId(userId);
    sendSuccess(res, result, 'Wishlist By User retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createWishlist = async (req, res) => {
  try {
    if (![req.body.productId].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await WishlistModel.createWishlist(req.user.id, req.body.productId);
    sendSuccess(res, { id }, 'Wishlist created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = await WishlistModel.getWishlistById(req.params.id, req.user.id);
    await WishlistModel.deleteWishlist(id);
    sendSuccess(res, { id }, 'Wishlist deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getWishlistByUserId,
  createWishlist,
  deleteWishlist,
};
