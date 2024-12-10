const pool = require('../config/database');

const getWishlistById = async (id, userId) => {
  try {
    const SQLQuery = 'SELECT * FROM wishlist WHERE id=? AND user_id=?';
    const [result] = await pool.execute(SQLQuery, [id, userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Wishlist not found');
    }

    return result[0];
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch wishlist');
  }
};

const getWishlistByUserId = async (userId) => {
  try {
    const SQLQuery = 'SELECT * FROM wishlist WHERE user_id=?';
    const [result] = await pool.execute(SQLQuery, [userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Wishlist by user not found');
    }

    return result;
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch wishlist by user');
  }
};

const createWishlist = async (userId, productId) => {
  try {
    const SQLQuery = `INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)`;
    const [result] = await pool.execute(SQLQuery, [userId, productId]);
    return { id: result.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create wishlist');
  }
};

const deleteWishlist = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM wishlist WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete wishlist');
  }
};

module.exports = {
  getWishlistById,
  getWishlistByUserId,
  createWishlist,
  deleteWishlist,
};
