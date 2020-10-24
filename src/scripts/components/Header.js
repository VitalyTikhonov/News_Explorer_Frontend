import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(authButton, renderFormPopup) {
    super();
    this._authButton = authButton;
    this._renderFormPopup = renderFormPopup;
  }

  render() {
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._renderFormPopup.open });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
