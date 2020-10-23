class BaseComponent {
  /* Как вариант, такое переделать в статик с учетом этого: https://eslint.org/docs/rules/class-methods-use-this */
  // _setHandlers(domElement, event, handler) {
  //   domElement.addEventListener(event, handler);
  //   // Где будет привязка к this? Вероятно, в том классе, где будет объявляться сам метод.
  // }

  constructor(domEventHandlerCombs) {
    this._domEventHandlerCombs = domEventHandlerCombs; // на вход – массив
  }

  _setHandlers() {
    this._domEventHandlerCombs.forEach((combination) => {
      const { domElement, event, handler } = combination;
      domElement.addEventListener(event, handler);
      // Где будет привязка к this? Вероятно, в том классе, где будет объявляться сам метод.
    });
  }

  _removeHandlers() {
    this._domEventHandlerCombs.forEach((combination) => {
      const { domElement, event, handler } = combination;
      domElement.removeEventListener(event, handler);
      // Где будет привязка к this? Вероятно, в том классе, где будет объявляться сам метод.
    });
  }
}

export { BaseComponent as default };
