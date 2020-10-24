import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(authButton, popup, createForm, signupFormMarkup) {
    super();
    this._authButton = authButton;
    this._popup = popup;
    this._createForm = createForm;
    this._signupFormMarkup = signupFormMarkup;
    this._form = undefined;
  }

  render() {
    this._form = this._createForm(this._signupFormMarkup); // перенести в метод состояния хедера
    console.log('typeof this._signupFormMarkup', typeof this._signupFormMarkup);
    console.log('this._signupFormMarkup', this._signupFormMarkup);
    this._popup.popupContents = this._form;
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._popup.open });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
