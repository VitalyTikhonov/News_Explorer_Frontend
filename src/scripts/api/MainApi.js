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
    return Promise.reject(this._res);
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
        this._primaryResponseHandler();
      });
  }
}

export { MainApi as default };
