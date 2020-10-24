class MainApi {
  constructor({ baseUrl, authorization, contentType }) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
    this.contentType = contentType;
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

  signup(userEmail, userPassword, userName) {
    return fetch(
      `${this.baseUrl}/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': this.contentType },
        credentials: 'include',
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
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
