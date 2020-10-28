class NewsApi {
  constructor(
    NEWSAPI_TOKEN,
    NEWSAPI_BASE_PATH,
    NEWSAPI_PERIOD,
    NEWSAPI_PAGE_SIZE,
    formatDate,
    getPeriodStartDate,
  ) {
    this._NEWSAPI_TOKEN = NEWSAPI_TOKEN;
    this._API_URL = NEWSAPI_BASE_PATH;
    this._NEWSAPI_PERIOD = NEWSAPI_PERIOD;
    this._NEWSAPI_PAGE_SIZE = NEWSAPI_PAGE_SIZE;
    this._formatDate = formatDate;
    this._getPeriodStartDate = getPeriodStartDate;
  }

  _primaryResponseHandler() {
    if (this._res.ok) {
      return this._res.json();
    }
    const json = this._res.json();
    return json
      .then(Promise.reject.bind(Promise));
  }

  getNews(searchTerm) {
    const from = this._formatDate(this._getPeriodStartDate(this._NEWSAPI_PERIOD));
    const to = this._formatDate(new Date());
    return fetch(
      `${this._API_URL}top-headlines?q=${searchTerm}&from=${from}&to=${to}&country=ru&pageSize=${this._NEWSAPI_PAGE_SIZE}&apiKey=${this._NEWSAPI_TOKEN}`,
      {
        method: 'GET',
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }
}

export { NewsApi as default };
