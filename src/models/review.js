const pool = require('../config/database');

const getReviewById = async (id, userId) => {
  try {
    const SQLQuery = 'SELECT * FROM review WHERE id=? AND user_id=?';
    const [result] = await pool.execute(SQLQuery, [id, userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Review not found');
    }

    return result[0];
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch review');
  }
};

const getReviewByUserId = async (userId) => {
  try {
    const SQLQuery = 'SELECT * FROM review WHERE user_id=?';
    const [result] = await pool.execute(SQLQuery, [userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Review by user not found');
    }

    return result;
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch review by user');
  }
};

const getReviewByProductId = async (productId) => {
  try {
    const SQLQuery = 'SELECT * FROM review WHERE product_id=?';
    const [result] = await pool.execute(SQLQuery, [productId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Review by product not found');
    }

    return result;
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch review by product');
  }
};

const createReview = async (userId, data) => {
  try {
    const { rating, comment, productId } = data;
    const SQLQuery = `INSERT INTO review (rating, comment, product_id, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(SQLQuery, [rating, comment, productId, userId]);
    return { id: result.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create review');
  }
};

const updateReview = async (id, data) => {
  try {
    const { rating, comment } = data;
    const SQLQuery = `UPDATE review SET rating=?, comment=? WHERE id=?`;
    await pool.execute(SQLQuery, [rating, comment, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to update review');
  }
};

const deleteReview = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM review WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete review');
  }
};

module.exports = {
  getReviewById,
  getReviewByUserId,
  getReviewByProductId,
  createReview,
  updateReview,
  deleteReview,
};
