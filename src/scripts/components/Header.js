import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(parentArgs, authButton, createPopup, generatePopupContents) {
    super(parentArgs);
    this._authButton = authButton;
    this._createPopup = createPopup;
    this._createSignupForm = generatePopupContents.createSignupForm;
    this._createLoginForm = generatePopupContents.createLoginForm;
    this._createActionMessage = generatePopupContents.createActionMessage;
    this._createAndOpenPopup = this._createAndOpenPopup.bind(this);
    this._formDismissalHandler = this._formDismissalHandler.bind(this);
  }

  _formDismissalHandler() {
    this._popup._dismiss();
  }

  _createAuthDialog() {
    // console.log('_createAuthDialog');
    this._formObj = this._createSignupForm();
    this._form = this._formObj.create();
    this._domEventHandlerMap.push(
      {
        domElement: this._form,
        event: 'formDismissal',
        handler: this._formDismissalHandler,
      },
    );
    this._setHandlers();
    return this._form;
  }

  _createAndOpenPopup() {
    // console.log('_createAndOpenPopup');
    this._popup = this._createPopup(this._createAuthDialog());
    this._popup.open();
  }

  render() {
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._createAndOpenPopup });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
