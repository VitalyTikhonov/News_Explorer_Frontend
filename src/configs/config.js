const PORT = 3001;
const SUBPATH = process.env.NODE_ENV === 'development'
  ? ''
  : '/webdev/projects/news_explorer';
const DOMAIN = process.env.NODE_ENV === 'development'
  ? `http://localhost:${PORT}`
  : 'https://api.vitaliytikhonov.ru';
const API_URL = `${DOMAIN}${SUBPATH}`;
const CONTENT_TYPE = 'application/json';
const NEWSAPI_TOKEN = '1eddf5972e104c1d8190b592dcac2fda';
const NEWSAPI_URL = 'http://newsapi.org/v2/';
const NEWSAPI_YANDEX_PROXY_URL = 'https://nomoreparties.co/news/v2/';
const NEWSAPI_BASE_PATH = process.env.NODE_ENV === 'development'
  ? NEWSAPI_URL
  : NEWSAPI_YANDEX_PROXY_URL;
const NEWSAPI_PERIOD = 7;
const NEWSAPI_PAGE_SIZE = process.env.NODE_ENV === 'development'
  ? 70
  : 100;
const ARTICLE_PORTION_SIZE = 22;

export {
  API_URL,
  CONTENT_TYPE,
  NEWSAPI_TOKEN,
  NEWSAPI_BASE_PATH,
  NEWSAPI_PERIOD,
  NEWSAPI_PAGE_SIZE,
  ARTICLE_PORTION_SIZE,
};
