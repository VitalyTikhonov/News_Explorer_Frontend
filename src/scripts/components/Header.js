import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(authButton, createPopup, generatePopupContents) {
    super();
    this._authButton = authButton;
    this._createPopup = createPopup;
    this._generatePopupContents = generatePopupContents;
    this._createSignupForm = this._generatePopupContents.createSignupForm;
    this._createLoginForm = this._generatePopupContents.createLoginForm;
    this._createActionMessage = this._generatePopupContents.createActionMessage;
    this._createAndOpenPopup = this._createAndOpenPopup.bind(this);
  }

  _createAndOpenPopup() {
    this._popup = this._createPopup(this._createSignupForm());
    this._popup.open();
  }

  render() {
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._createAndOpenPopup });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
