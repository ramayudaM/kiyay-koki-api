const ShippingAddressModel = require('../models/shippingAddress');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const sellerGetShippingAddress = async (req, res) => {
  try {
    const result = await ShippingAddressModel.getShippingAddressByUserId(req.body.userId);
    sendSuccess(res, result, 'Shipping Address retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getShippingAddressByUserId = async (req, res) => {
  try {
    const result = await ShippingAddressModel.getShippingAddressByUserId(req.user.id);
    sendSuccess(res, result, 'Shipping Address retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getShippingAddressById = async (req, res) => {
  try {
    const userId = req.user.level === 'seller' ? req.body.userId : req.user.id;
    const result = await ShippingAddressModel.getShippingAddressById(req.params.id, userId);
    sendSuccess(res, result, 'Shipping Address retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createShippingAddress = async (req, res) => {
  try {
    const { fullName, address, phoneNumber, province, city, subdistrict, postalCode, userId } = req.body;

    if (![fullName, address, phoneNumber, province, city, subdistrict, postalCode, userId].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await ShippingAddressModel.createShippingAddress(req.body);
    sendSuccess(res, { id }, 'Shipping Address created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const updateShippingAddress = async (req, res) => {
  try {
    const { fullName, address, phoneNumber, province, city, subdistrict, postalCode } = req.body;

    if (![fullName, address, phoneNumber, province, city, subdistrict, postalCode].every(Boolean)) {
      throw new Error('ValidationError: Missing required fields');
    }

    const { id } = await ShippingAddressModel.getShippingAddressById(req.params.id, req.user.id);
    await ShippingAddressModel.updateShippingAddress(id, req.body);
    sendSuccess(res, { id }, 'Shipping Address updated successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = await ShippingAddressModel.getShippingAddressById(req.params.id, req.user.id);

    await ShippingAddressModel.deleteShippingAddress(id);

    sendSuccess(res, { id }, 'Shipping Address deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  sellerGetShippingAddress,
  getShippingAddressById,
  getShippingAddressByUserId,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
