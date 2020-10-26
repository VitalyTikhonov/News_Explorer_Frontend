class MainApi {
  constructor(API_URL, CONTENT_TYPE) {
    this._API_URL = API_URL;
    this._CONTENT_TYPE = CONTENT_TYPE;
  }

  /*
  signup         регистрирует нового пользователя;
  signin         аутентифицирует пользователя на основе почты и пароля;
  getArticles        забирает все статьи;
  createArticle        создаёт статью;
  removeArticle        удаляет статью.
   */

  _primaryResponseHandler() {
    if (this._res.ok) {
      return this._res.json();
    }
    const json = this._res.json();
    return json
      .then(Promise.reject.bind(Promise));
  }

  signup({ email, password, name }) {
    return fetch(
      `${this._API_URL}/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }

  authenticate() {
    return fetch(
      `${this._API_URL}/users/me`,
      {
        method: 'GET',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }
}

export { MainApi as default };
