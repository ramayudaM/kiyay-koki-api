const { sendError } = require('../utils/sendResponse');

const checkUserLevel = (requiredLevel) => {
  return (req, res, next) => {
    try {
      const userLevel = req.user.level;

      const levels = ['buyer', 'seller'];

      if (levels.indexOf(userLevel) < levels.indexOf(requiredLevel)) {
        throw new Error('ForbiddenError: Insufficient privileges');
      }

      next();
    } catch (error) {
      return sendError(res, error);
    }
  };
};

module.exports = checkUserLevel;
