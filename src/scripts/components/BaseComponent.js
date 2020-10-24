class BaseComponent {
  constructor() {
    this._domEventHandlerMap = [];
  }

  _setHandlers() {
    this._domEventHandlerMap.forEach((combination) => {
      const { domElement, event, handler } = combination;
      domElement.addEventListener(event, handler);
    });
  }

  _removeHandlers() {
    this._domEventHandlerMap.forEach((combination) => {
      const { domElement, event, handler } = combination;
      domElement.removeEventListener(event, handler);
    });
  }
}

export { BaseComponent as default };
