import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(authButton, createPopup, generatePopupContents) {
    super();
    this._authButton = authButton;
    this._createPopup = createPopup;
    this._createSignupForm = generatePopupContents.createSignupForm;
    this._createLoginForm = generatePopupContents.createLoginForm;
    this._createActionMessage = generatePopupContents.createActionMessage;
  }

  render() {
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._popup.open });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
