const UserModel = require('../models/users');
const OtpModel = require('../models/otp');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/generateOtp');
const { sendOtpToWhatsApp } = require('../controller/whatsapp');
const { getFormattedDate } = require('../utils/dateHelper');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const requestOtp = async (req, res) => {
  try {
    const { waNumber } = req.body;

    if (!waNumber) {
      throw new Error('ValidationError: WhatsApp number is required');
    }

    let user = await UserModel.getUserByWA(waNumber);

    if (!user) {
      const { id } = await UserModel.createUser(waNumber);
      user = { id };
    }

    const otpCode = generateOtp();
    const expiration = getFormattedDate(2);
    await OtpModel.createOtp(user.id, otpCode, expiration);

    await sendOtpToWhatsApp(waNumber, otpCode);

    sendSuccess(res, { id: user.id, waNumber }, 'OTP sent successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { id, waNumber, otpCode } = req.body;

    if (!otpCode) {
      throw new Error('ValidationError: OTP number is required');
    }

    if (!waNumber) {
      throw new Error('ValidationError: WhatsApp number is required');
    }

    const user = await UserModel.getUserByWA(waNumber);
    const otp = await OtpModel.getValidOtp(id, otpCode);
    const role = user.level;

    if (!otp) {
      throw new Error('ValidationError: Invalid Or Expired OTP');
    }

    await OtpModel.verifiedOtp(otp.id, otpCode);

    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' });
    sendSuccess(res, { token, role }, 'OTP verified successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createUserSeller = async (req, res) => {
  try {
    const { waNumber } = req.body;

    if (!waNumber) {
      throw new Error('ValidationError: WhatsApp number is required');
    }

    const { id } = await UserModel.createUserSeller(waNumber);

    sendSuccess(res, { id }, 'New seller created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserModel.getAllUser();

    sendSuccess(res, result, 'New seller created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = await UserModel.deleteUser(req.params.id);
    sendSuccess(res, { id }, 'User deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
  createUserSeller,
  getAllUser,
  deleteUser,
};
