import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(
    parentArgs,
    mainApi,
    authButton,
    optionForAuthUsers,
    createPopup,
    // createNewsSearchFormObj,
  ) {
    super(parentArgs);
    this._mainApi = mainApi;
    this._authButton = authButton;
    this._optionForAuthUsers = optionForAuthUsers;
    this._createPopup = createPopup;
    // this._createNewsSearchFormObj = createNewsSearchFormObj;
    this._isLoggedIn = false;
    this._createAndOpenPopup = this._createAndOpenPopup.bind(this);
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

  _createAndOpenPopup() {
    // console.log('_createAndOpenPopup');
    this._popup = this._createPopup(this._checkUserStatus());
    this._popup.open();
  }

  render() {
    // this._checkUserStatus();
    // if (this._isLoggedIn = true) {

    // }
    // this._createNewsSearchFormObj();
    this._domEventHandlerMap.push({
      domElement: this._authButton,
      event: 'click',
      handler: this._createAndOpenPopup,
    });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
