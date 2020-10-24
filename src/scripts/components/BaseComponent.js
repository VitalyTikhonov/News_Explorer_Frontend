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
      const {
        domElement,
        event,
        handler,
        useCapture = false,
      } = combination;
      domElement.removeEventListener(event, handler, useCapture);
    });
  }
}

export { BaseComponent as default };
