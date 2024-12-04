const parseJson = (data) => {
  return typeof data === 'string' ? JSON.parse(data) : data;
};

module.exports = parseJson;
