const pool = require('../config/database');

const getCartById = async (id, userId) => {
  try {
    const SQLQuery = 'SELECT * FROM cart WHERE id=? AND user_id=?';
    const [result] = await pool.execute(SQLQuery, [id, userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Cart not found');
    }

    return result[0];
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch cart');
  }
};

const getCartByUserId = async (userId) => {
  try {
    const SQLQuery =
      'SELECT c.*, p.name AS product_name, p.price AS product_price, p.discount AS product_discount, pi.image_url AS product_image FROM cart AS c LEFT JOIN product AS p ON c.product_id = p.id LEFT JOIN (SELECT product_id, MIN(image_url) AS image_url FROM product_image GROUP BY product_id) AS pi ON p.id = pi.product_id WHERE c.user_id = ?';
    const [result] = await pool.execute(SQLQuery, [userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Cart by user not found');
    }

    return result;
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch cart by user');
  }
};

const createCart = async (userId, productId, amount) => {
  try {
    const SQLQuery = 'INSERT INTO cart (user_id, product_id, amount) VALUES (?, ?, ?)';
    const [result] = await pool.execute(SQLQuery, [userId, productId, amount]);
    return { id: result.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create cart');
  }
};

const updateCart = async (id, amount) => {
  try {
    const SQLQuery = 'UPDATE cart SET amount=? WHERE id=?';
    await pool.execute(SQLQuery, [amount, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to update cart');
  }
};

const deleteCart = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM cart WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete cart');
  }
};

const getCartByProduct = async (id, userId) => {
  try {
    const SQLQuery = 'SELECT * FROM cart WHERE product_id=? AND user_id=?';
    const [result] = await pool.execute(SQLQuery, [id, userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Cart not found');
    }

    return result[0];
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch cart');
  }
};

module.exports = {
  getCartById,
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
  getCartByProduct,
};
