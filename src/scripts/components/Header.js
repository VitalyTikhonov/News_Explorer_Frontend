import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor({
    mainApi,
    pageConfig,
    popup,
  }) {
    super({});
    this._mainApi = mainApi;
    this._authButton = pageConfig.authButton;
    this._optionForAuthUsers = pageConfig.optionForAuthUsers;
    this._popup = popup;
    /* inner */
    this._isLoggedIn = false;
  }

  _checkUserStatus() {
    this._mainApi.authenticate()
      .then(() => {
        this._isLoggedIn = true;
        /* isLoggedIn — залогинен ли пользователь;
        userName */
      })
      .catch(() => {
        // console.log(err);
        this._isLoggedIn = false;
        // console.log(this._isLoggedIn);
      })
      .finally(() => this._isLoggedIn);
  }

  render() {
    this._domEventHandlerMap.push({
      domElement: this._authButton,
      event: 'click',
      handler: this._popup.open,
    });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
