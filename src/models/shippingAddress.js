const pool = require('../config/database');

const getShippingAddressByUserId = async (userId) => {
  try {
    console.log(userId);

    const SQLQuery = 'SELECT * FROM shipping_address WHERE user_id=?';
    const [result] = await pool.execute(SQLQuery, [userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Shipping Address User not found');
    }

    return result;
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch shipping address by user id');
  }
};

const getShippingAddressById = async (id, userId) => {
  try {
    const SQLQuery = 'SELECT * FROM shipping_address WHERE id=? AND user_id=?';
    const [result] = await pool.execute(SQLQuery, [id, userId]);

    if (result.length === 0) {
      throw new Error('NotFoundError: Shipping Address not found');
    }

    return result[0];
  } catch (error) {
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch shipping address by id');
  }
};

const createShippingAddress = async (data) => {
  try {
    const { fullName, address, phoneNumber, province, city, subdistrict, postalCode, userId } = data;
    const SQLQuery = `INSERT INTO shipping_address (full_name, address, phone_number, province, city, subdistrict, postal_code, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(SQLQuery, [fullName, address, phoneNumber, province, city, subdistrict, postalCode, userId]);
    return { id: result.insertId };
  } catch (error) {
    throw new Error('DatabaseError: Failed to create shipping address');
  }
};

const updateShippingAddress = async (id, data) => {
  try {
    const { fullName, address, phoneNumber, province, city, subdistrict, postalCode } = data;
    const SQLQuery = `UPDATE shipping_address SET full_name=?, address=?, phone_number=?, province=?, city=?, subdistrict=?, postal_code=? WHERE id=?`;
    await pool.execute(SQLQuery, [fullName, address, phoneNumber, province, city, subdistrict, postalCode, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to update shipping address');
  }
};

const deleteShippingAddress = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM shipping_address WHERE id=?';
    await pool.execute(SQLQuery, [id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to delete shipping address');
  }
};

module.exports = {
  getShippingAddressById,
  getShippingAddressByUserId,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
