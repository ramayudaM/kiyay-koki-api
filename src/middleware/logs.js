const logRequest = (req, res, next) => {
  console.log('Request PATH: ', req.path, '\nMethod: ', req.method, '\nStatusCode: ', res.statusCode, 'Req: ', req.body);
  next();
};

module.exports = logRequest;
