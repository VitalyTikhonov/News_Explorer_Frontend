import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(parentArgs, api, authButton, optionForAuthUsers, createPopup) {
    super(parentArgs);
    this._api = api;
    this._authButton = authButton;
    this._optionForAuthUsers = optionForAuthUsers;
    this._createPopup = createPopup;
    this._isLoggedIn = false;
    this._createAndOpenPopup = this._createAndOpenPopup.bind(this);
  }

  _checkUserStatus() {
    this._api.authenticate()
      .then((res) => {
        this._isLoggedIn = true;
        /* isLoggedIn — залогинен ли пользователь;
        userName */
      })
      .catch((err) => {
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
