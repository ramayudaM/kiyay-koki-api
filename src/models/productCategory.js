const pool = require('../config/database');

const getProductCategory = async (id, category) => {
  try {
    const SQLQuery = `SELECT * FROM ${category} WHERE product_id=?`;
    const [result] = await pool.execute(SQLQuery, [id]);
    return result[0];
  } catch (error) {
    throw new Error('DatabaseError: Failed to fetch product category');
  }
};

const createProductCategory = async (id, category, data) => {
  try {
    if (category === 'fish') {
      const { color, size, fish_type } = data;
      const SQLQuery = 'INSERT INTO fish (color, size, fish_type, product_id) VALUES (?, ?, ?, ?)';
      await pool.execute(SQLQuery, [color, size, fish_type, id]);
    }

    if (category === 'fish_food') {
      const { weight } = data;
      const SQLQuery = 'INSERT INTO fish_food (weight, product_id) VALUES (?, ?)';
      await pool.execute(SQLQuery, [weight, id]);
    }

    if (category === 'aquarium') {
      const { dimention } = data;
      const SQLQuery = 'INSERT INTO aquarium (dimention, product_id) VALUES (?, ?)';
      await pool.execute(SQLQuery, [dimention, id]);
    }
  } catch (error) {
    throw new Error('DatabaseError: Failed to create product category');
  }
};

const updateProductCategory = async (id, category, data) => {
  try {
    if (category === 'fish') {
      const { color, size, fish_type } = data;
      const SQLQuery = 'UPDATE fish SET color=?, size=?, fish_type=? WHERE product_id=?';
      await pool.execute(SQLQuery, [color, size, fish_type, id]);
    }

    if (category === 'fish_food') {
      const { weight } = data;
      const SQLQuery = 'UPDATE fish_food SET weight=? WHERE product_id=?';
      await pool.execute(SQLQuery, [weight, id]);
    }

    if (category === 'aquarium') {
      const { dimention } = data;
      const SQLQuery = `UPDATE aquarium SET dimention=? WHERE product_id=?`;
      await pool.execute(SQLQuery, [dimention, id]);
    }
  } catch (error) {
    throw new Error('DatabaseError: Failed to update product category');
  }
};

module.exports = {
  getProductCategory,
  createProductCategory,
  updateProductCategory,
};
