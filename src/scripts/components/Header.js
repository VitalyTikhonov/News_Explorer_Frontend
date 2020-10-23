import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(authButton, popup) {
    super();
    this._authButton = authButton;
    this._popup = popup;
  }

  render() {
    this._domEventHandlerMap.push({ domElement: this._authButton, event: 'click', handler: this._popup.open });
    /* здесь логику состояния хедера */
    this._setHandlers();
  }
}

export { Header as default };
