const { checkApiKey } = require('../models/security');
const { sendError } = require('../utils/sendResponse');

const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      throw new Error('AuthorizationError: API Key is required');
    }

    const result = await checkApiKey(apiKey);

    if (!result) {
      throw new Error('ForbiddenError: Invalid API Key');
    }

    req.apiKey = result;
    next();
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = validateApiKey;
