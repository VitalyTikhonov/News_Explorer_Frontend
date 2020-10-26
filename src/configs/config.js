const PORT = 3001;
const API_URL = `http://localhost:${PORT}`;
const CONTENT_TYPE = 'application/json';
const NEWSAPI_TOKEN = '1eddf5972e104c1d8190b592dcac2fda';
const NEWSAPI_BASE_PATH = 'http://newsapi.org/v2/everything?';
const NEWSAPI_FLIGHT = 7;
const NEWSAPI_PAGE_SIZE = 10;

module.exports = {
  API_URL,
  CONTENT_TYPE,
  NEWSAPI_TOKEN,
  NEWSAPI_BASE_PATH,
  NEWSAPI_FLIGHT,
  NEWSAPI_PAGE_SIZE,
};
