class BaseComponent {
  constructor({
    parent,
    innerContainerSelector,
    markup,
    createNode,
  }) {
    this._parent = parent;
    this._innerContainerSelector = innerContainerSelector;
    this._markup = markup;
    this._createNode = createNode;
    /* inner */
    this._contents = null;
    this._domEventHandlerMap = [];
    this._component = null;
    this._innerContainer = null;
  }

  _setHandlers() {
    this._domEventHandlerMap.forEach((combination) => {
      const {
        domElement,
        event,
        handler,
        useCapture = false,
      } = combination;
      domElement.addEventListener(event, handler, useCapture);
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
    this._component = this._createNode(this._markup);
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

  /* multiple elements – REMOVE one class */
  _removeClassFromElems() {
    // this._elemsToRemoveClass = ;
    // this._controlClassName = ;
    this._elemsToRemoveClass.forEach((element) => {
      element.classList.remove(this._controlClassName);
    });
  }

  /* multiple elements – ADD one class */
  _addClassToElems() {
    // this._elemsToAddClass = ;
    // this._controlClassName = ;
    this._elemsToAddClass.forEach((element) => {
      element.classList.add(this._controlClassName);
    });
  }

  /* one element – remove and add multiple classes */
  _configureClasses() {
    // this._elemClassMap = [].push(
    //   {
    //     // element: ,
    //     classesToRemove: [

    //     ],
    //     classesToAdd: [

    //     ],
    //   },
    // );
    this._elemClassMap.forEach((combination) => {
      combination.classesToRemove.forEach((className) => {
        combination.element.classList.remove(className);
      });
      combination.classesToAdd.forEach((className) => {
        combination.element.classList.add(className);
      });
    });
  }
}

export { BaseComponent as default };
