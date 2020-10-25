class BaseComponent {
  // constructor(
  //   parent,
  //   innerContainerSelector,
  //   markup,
  //   contents,
  // ) {
  constructor({
    parent,
    innerContainerSelector,
    markup,
    contents,
  }) {
    this._parent = parent;
    this._innerContainerSelector = innerContainerSelector;
    this._markup = markup;
    this._contents = contents;
    /* внутренние */
    this._domEventHandlerMap = [];
    this._component = null;
    this._innerContainer = null;
    // this._close = this._close.bind(this);
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
    element.insertAdjacentHTML('afterbegin', this._markup);
    this._component = element.firstElementChild;
    // console.log('this._parent', this._parent);
    // console.log('this._markup', this._markup);
    // console.log('this._component', this._component);
    return this._component;
  }

  _insertChild() {
    this._innerContainer = this._component.querySelector(this._innerContainerSelector);
    this._innerContainer.appendChild(this._contents);
  }

  _removeChild() {
    this._innerContainer.removeChild(this._contents);
    // this._contents.remove();
  }

  _open() {
    this._parent.appendChild(this._component);
  }

  _dismiss() {
    this._removeHandlers();
    this._component.remove();
  }
}

export { BaseComponent as default };
