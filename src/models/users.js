const pool = require('../config/database');

const getUserByWA = async (waNumber) => {
  try {
    const SQLQuery = 'SELECT * FROM user WHERE phone_number=?';
    const [user] = await pool.execute(SQLQuery, [waNumber]);

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    throw new Error('DatabaseError: Failed to fetch user');
  }
};

const getAllUser = async () => {
  try {
    const level = 'buyer';
    const SQLQuery = 'SELECT * FROM user WHERE level=?';
    const [user] = await pool.execute(SQLQuery, [level]);

    return user.length > 0 ? user : null;
  } catch (error) {
    throw new Error('DatabaseError: Failed to fetch user');
  }
};

const createUser = async (waNumber) => {
  try {
    const level = 'buyer';
    const SQLQuery = 'INSERT INTO user (phone_number, level) VALUES (?, ?)';
    const [userData] = await pool.execute(SQLQuery, [waNumber, level]);
    return { id: userData.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create user');
  }
};

const createUserSeller = async (waNumber) => {
  try {
    const level = 'seller';
    const SQLQuery = 'INSERT INTO user (phone_number, level) VALUES (?, ?)';
    const [userData] = await pool.execute(SQLQuery, [waNumber, level]);
    return { id: userData.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create user seller');
  }
};

const deleteUser = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM user WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete wishlist');
  }
};

module.exports = {
  getUserByWA,
  createUser,
  createUserSeller,
  getAllUser,
  deleteUser,
};
