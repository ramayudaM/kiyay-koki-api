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

module.exports = {
  getUserByWA,
  createUser,
  createUserSeller,
};
