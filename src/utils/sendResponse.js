const sendResponse = (res, statusCode, success, message, error = null, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    error,
    data,
  });
};

const sendError = (res, error) => {
  // return sendResponse(res, 500, false, error, error.message);

  if (error.message.startsWith('DatabaseError')) {
    return sendResponse(res, 500, false, 'Internal Server Error: Database operation failed', error.message);
  }

  if (error.message.startsWith('AuthorizationError')) {
    return sendResponse(res, 401, false, 'Unauthorized: Authentication credentials invalid', error.message);
  }

  if (error.message === 'ForbiddenError') {
    return sendResponse(res, 403, false, 'Forbidden: Access denied', error.message);
  }

  if (error.message.startsWith('NotFoundError')) {
    return sendResponse(res, 404, false, 'Resource not found', error.message);
  }

  if (error.message.startsWith('ValidationError')) {
    return sendResponse(res, 400, false, 'Bad Request: Validation failed', error.message);
  }

  return sendResponse(res, 500, false, 'An unexpected error occurred', error.message);
};

const sendSuccess = (res, data, message = 'Operation successful') => {
  if (message.startsWith('Create')) {
    return sendResponse(res, 201, true, message, null, data);
  }

  return sendResponse(res, 200, true, message, null, data);
};

module.exports = { sendError, sendSuccess };
