class BaseComponent {
  /* Как вариант, такое переделать в статик с учетом этого: https://eslint.org/docs/rules/class-methods-use-this */
  // _setHandlers(domElement, event, handler) {
  //   domElement.addEventListener(event, handler);
  //   // Где будет привязка к this? Вероятно, в том классе, где будет объявляться сам метод.
  // }

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
