class BaseComponent {
  constructor() {
    this._domEventHandlerMap = [];
    this._contents = null;
    this._component = null;
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

  _create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._contents);
    this._component = element.firstElementChild;
    this._setHandlers();
  }

  _insertChild() {
    this._innerContainer = this._popup.querySelector(this._popupInnerContainerSelector);
    this._innerContainer.appendChild(this._contentsSource.create());
  }

  _open() {
    this._pageRoot.appendChild(this._popup);
  }
}

export { BaseComponent as default };
