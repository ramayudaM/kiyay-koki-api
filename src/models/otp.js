const pool = require('../config/database');

const createOtp = async (id, otpCode, expiration) => {
  try {
    const isVerified = 0;
    const SQLQuery =
      'INSERT INTO user_otp (otp_code, expiration_time, is_verified, user_id) VALUES (?, ?, ?, ?)';
    await pool.execute(SQLQuery, [otpCode, expiration, isVerified, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to create otp');
  }
};

const getValidOtp = async (id, otpCode) => {
  try {
    const isVerified = 0;
    const SQLQuery =
      'SELECT * FROM user_otp WHERE user_id=? AND otp_code=? AND expiration_time > NOW() AND is_verified=? ORDER BY expiration_time DESC LIMIT 1';
    const [otpData] = await pool.execute(SQLQuery, [id, otpCode, isVerified]);
    return otpData[0];
  } catch (error) {
    throw new Error('DatabaseError: Failed to get valid otp');
  }
};

const verifiedOtp = async (id, otpCode) => {
  try {
    const SQLQuery = `UPDATE user_otp SET is_verified=1 WHERE id=? AND otp_code=?`;
    await pool.execute(SQLQuery, [id, otpCode]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to verified otp');
  }
};

module.exports = {
  createOtp,
  getValidOtp,
  verifiedOtp,
};
