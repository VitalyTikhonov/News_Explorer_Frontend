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
    this._component = null;
    this._innerContainer = null;
  }

  static setHandlers(map) { // super.setHandlers
    map.forEach((combination) => {
      const {
        domElement,
        event,
        handler,
        useCapture = false,
      } = combination;
      domElement.addEventListener(event, handler, useCapture);
    });
  }

  static removeHandlers(map) { // super.removeHandlers
    map.forEach((combination) => {
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
    console.log('this', this);
    console.log('this._component', this._component);
    console.log('this._innerContainerSelector', this._innerContainerSelector);
    this._innerContainer = this._component.querySelector(this._innerContainerSelector);
    console.log('this._innerContainer', this._innerContainer);
    console.log('this._contents', this._contents);
    this._innerContainer.appendChild(this._contents);
  }

  _removeChild() {
    // console.log('this', this);
    // this._innerContainer.removeChild(this._contents);
    if (this._contents) {
      this._contents.remove();
      this._contents = null;
    }
  }

  _open() {
    this._parent.appendChild(this._component);
  }

  _dismiss() {
    this._component.remove();
  }

  /* multiple elements – remove and add one class */
  _moveClassBetweenElements() {
    // this._controlClassName = ;
    // this._elemsToRemoveClass = ;
    // this._elemsToAddClass = ;
    this._elemsToRemoveClass.forEach((element) => {
      element.classList.remove(this._controlClassName);
    });
    this._elemsToAddClass.forEach((element) => {
      element.classList.add(this._controlClassName);
    });
  }

  /* one element – remove and add multiple classes */
  _configureClassesOnElem() {
    // this._elemClassMap = [].push(
    //   {
    //     element: ,
    //     classToRemove: ,
    //     classToAdd: ,
    //   },
    // );
    this._elemClassMap.forEach((combination) => {
      combination.element.classList.remove(combination.classToRemove);
      combination.element.classList.add(combination.classToAdd);
    });
  }
}

export { BaseComponent as default };
