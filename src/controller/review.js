const ReviewModel = require('../models/review');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const getReviewByUserId = async (req, res) => {
  try {
    const userId = req.user.level === 'seller' ? req.body.userId : req.user.id;
    const result = await ReviewModel.getReviewByUserId(userId);
    sendSuccess(res, result, 'Review By User retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getReviewByProductId = async (req, res) => {
  try {
    const result = await ReviewModel.getReviewByProductId(req.body.productId);
    sendSuccess(res, result, 'Review By Product retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    if (![rating, comment, productId].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await ReviewModel.createReview(req.user.id, req.body);
    sendSuccess(res, { id }, 'Review created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (![rating, comment].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await ReviewModel.getReviewById(req.params.id, req.user.id);
    await ReviewModel.updateReview(req.params.id, req.body);
    sendSuccess(res, { id }, 'Review updated successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = await ReviewModel.getReviewById(req.params.id, req.user.id);
    await ReviewModel.deleteReview(id);
    sendSuccess(res, { id }, 'Shipping Address deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getReviewByUserId,
  getReviewByProductId,
  createReview,
  updateReview,
  deleteReview,
};
