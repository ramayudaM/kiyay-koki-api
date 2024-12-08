const crypto = require('crypto');
const SecurityModel = require('../models/security');
const { sendSuccess, sendError } = require('../utils/sendResponse');

const generateApiKey = async (req, res) => {
  try {
    const { apiName } = req.body;
    const { id } = req.user;

    if (!apiName) {
      throw new Error('ValidationError: Api name is required');
    }

    const apiKey = crypto.randomBytes(50).toString('base64').slice(0, 50);

    await SecurityModel.createApiKey(id, apiKey, apiName);

    sendSuccess(res, { apiKey }, 'API Key created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = { generateApiKey };
