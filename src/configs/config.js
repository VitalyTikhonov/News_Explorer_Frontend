const {
  NODE_ENV,
  PORT = 3001,
  API_URL = `http://localhost:${PORT}/`,
} = process.env;
const CONTENT_TYPE = 'application/json';

module.exports = {
  NODE_ENV,
  API_URL,
  CONTENT_TYPE,
};
