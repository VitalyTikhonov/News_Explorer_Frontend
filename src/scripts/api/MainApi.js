class MainApi {
  constructor(API_URL, CONTENT_TYPE) {
    this._API_URL = API_URL;
    this._CONTENT_TYPE = CONTENT_TYPE;
    this.signout = this.signout.bind(this);
  }

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
        // credentials: 'include',
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

  signin({ email, password }) {
    return fetch(
      `${this._API_URL}/signin`,
      {
        method: 'POST',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }

  signout() {
    return fetch(
      `${this._API_URL}/signout`,
      {
        method: 'POST',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
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

  saveArticle(articleData) {
    return fetch(
      `${this._API_URL}/articles`,
      {
        method: 'POST',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
        body: JSON.stringify(articleData),
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }

  deleteArticle(articleId) {
    return fetch(
      `${this._API_URL}/articles/${articleId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': this._CONTENT_TYPE },
        credentials: 'include',
      },
    )
      .then((res) => {
        this._res = res;
        return this._primaryResponseHandler();
      });
  }

  getArticles() {
    return fetch(
      `${this._API_URL}/articles`,
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
