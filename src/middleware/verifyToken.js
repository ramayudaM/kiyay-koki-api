const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/sendResponse');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('AuthorizationError: Authorization token is required');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) throw new Error('ForbiddenError: Invalid token');

      req.user = decoded;
      next();
    });
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = verifyToken;
