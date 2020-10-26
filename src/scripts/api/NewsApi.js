class NewsApi {
  constructor(
    NEWSAPI_TOKEN,
    NEWSAPI_BASE_PATH,
    NEWSAPI_FLIGHT,
    NEWSAPI_PAGE_SIZE,
    dateMethods,
  ) {
    this._NEWSAPI_TOKEN = NEWSAPI_TOKEN;
    this._API_URL = NEWSAPI_BASE_PATH;
    this._NEWSAPI_FLIGHT = NEWSAPI_FLIGHT;
    this._NEWSAPI_PAGE_SIZE = NEWSAPI_PAGE_SIZE;
    this._formDate = dateMethods.formDate;
    this._getNDaysInThePastDate = dateMethods.getNDaysInThePastDate;
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
    const from = this._getNDaysInThePastDate(this._NEWSAPI_FLIGHT);
    const today = new Date();
    const to = this._formDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return fetch(
      `${this._API_URL}q=${searchTerm}&from=${from}&to=${to}&pageSize=${this._NEWSAPI_PAGE_SIZE}&apiKey=${this._NEWSAPI_TOKEN}`,
      {
        method: 'GET',
        // headers: { 'Content-Type': this._CONTENT_TYPE },
        // credentials: 'include',
        // body: JSON.stringify({
        //   email,
        //   password,
        // }),
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }
}

export { NewsApi as default };
