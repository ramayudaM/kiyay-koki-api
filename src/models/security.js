const pool = require('../config/database');

const checkApiKey = async (apiKey) => {
  try {
    const SQLQuery = 'SELECT * FROM security WHERE api_key=?';
    const [result] = await pool.execute(SQLQuery, [apiKey]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error('DatabaseError: Failed to api key');
  }
};

const createApiKey = async (id, apiKey, apiName) => {
  try {
    const SQLQuery = 'INSERT INTO security (api_key, api_name, user_id) VALUES (?, ?, ?)';
    await pool.execute(SQLQuery, [apiKey, apiName, id]);
  } catch (error) {
    throw new Error('DatabaseError: Failed to api key');
  }
};

module.exports = { checkApiKey, createApiKey };
