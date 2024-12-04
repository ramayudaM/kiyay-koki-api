const logRequest = (req, res, next) => {
  console.log(
    'Request PATH: ',
    req.path,
    '\nMethod: ',
    req.method,
    '\nStatusCode: ',
    res.statusCode
  );
  next();
};

module.exports = logRequest;
