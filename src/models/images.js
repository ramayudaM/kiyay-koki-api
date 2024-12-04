const pool = require('../config/database');

const getImages = async (id) => {
  try {
    const SQLQuery = 'SELECT * FROM product_image WHERE product_id=?';
    const [result] = await pool.execute(SQLQuery, [id]);
    return result.length > 0 ? result : null;
  } catch (error) {
    throw new Error('DatabaseError: Failed to fetch images');
  }
};

const createImages = async (id, image) => {
  try {
    const SQLQuery = 'INSERT INTO product_image (image_url, product_id) VALUES (?, ?)';
    await pool.execute(SQLQuery, [image, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to create images');
  }
};

const updateImages = async (id, image) => {
  try {
    const SQLQuery = 'UPDATE product_image SET image_url=? WHERE id=?';
    await pool.execute(SQLQuery, [image, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to update images');
  }
};

const deleteImages = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM product_image WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete images');
  }
};

module.exports = { getImages, createImages, updateImages, deleteImages };
