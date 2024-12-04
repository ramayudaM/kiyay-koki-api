const pool = require('../config/database');

const getVideo = async (id) => {
  try {
    const SQLQuery = 'SELECT * FROM product_video WHERE product_id=?';
    const [result] = await pool.execute(SQLQuery, [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error('DatabaseError: Failed to fetch video');
  }
};

const createVideo = async (id, video) => {
  try {
    const SQLQuery = 'INSERT INTO product_video (video_url, product_id) VALUES (?, ?)';
    await pool.execute(SQLQuery, [video, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to create video');
  }
};

const updateVideo = async (id, video) => {
  try {
    const SQLQuery = 'UPDATE product_video SET video_url=? WHERE id=?';
    await pool.execute(SQLQuery, [video, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to update video');
  }
};

const deleteVideo = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM product_video WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete video');
  }
};

module.exports = { getVideo, createVideo, updateVideo, deleteVideo };
