class BaseComponent {
  constructor({
    globalEventHandlerMap,
    parent,
    innerContainerSelector,
    markup,
    createNode,
  }) {
    this._globalEventHandlerMap = globalEventHandlerMap;
    this._parent = parent;
    this._innerContainerSelector = innerContainerSelector;
    this._markup = markup;
    this._createNode = createNode;
    /* inner */
    this._contents = null;
    this._component = null;
    this._innerContainer = null;
    this._elemClassMap = [];
    this._allHandlersMap = [];
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

  // this._setHandlersAndAddToMap(localMap);
  // console.log('this._globalEventHandlerMap', this._globalEventHandlerMap);
  _setHandlersAndAddToMap(localMap) {
    console.log('localMap', localMap);
    console.log('localMap.value', localMap.value);
    this._globalEventHandlerMap[localMap.name] = localMap.value;
    BaseComponent.setHandlers(localMap.value);
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

  // this._removeHandlersFromMap();
  // console.log(this._allHandlersMap);
  _removeHandlersFromMap() {
    BaseComponent.removeHandlers(this._allHandlersMap);
  }

  // BaseComponent.enableButton(button);
  // BaseComponent.disableButton(button);
  static enableButton(button) {
    button.removeAttribute('disabled');
  }

  // static disableButton(button) {
  //   button.setAttribute('disabled', 'disabled');
  // }

  // static enableMultipleButtons(buttonArray) {
  //   buttonArray.forEach((button) => {
  //     this.enableButton(button);
  //   });
  // }

  // static disableMultipleButtons(buttonArray) {
  //   buttonArray.forEach((button) => {
  //     this.disableButton(button);
  //   });
  // }

  // BaseComponent.insertChild(container, child);
  static insertChild(container, child) {
    container.appendChild(child);
  }

  // BaseComponent.removeChild(node);
  static removeChild(childNode) {
    childNode.remove();
  }

  // BaseComponent.replaceChildWithNewlyCreated(parent, childNode, newChildMarkup);
  static replaceChildWithNewlyCreated(parent, childNode, newChildMarkup) {
    this.removeChild(childNode);
    const newTextNode = this.create(newChildMarkup);
    this.insertChild(parent, newTextNode);
  }

  // BaseComponent.removeChildren(node);
  static removeChildren(node) {
    // const { firstChild } = node; Так выносить нельзя! (ссылка за пределы цикла)
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  // BaseComponent.create(markup);
  static create(markup) {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup);
    return element.firstElementChild;
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
    if (this._contents) {
      this._contents.remove();
      this._contents = null;
    }
  }

  // _removeAllChildren() {
  //   const { firstChild } = this._innerContainer;
  //   while (firstChild) {
  //     this._innerContainer.removeChild(firstChild);
  //   }
  // }

  _open() {
    this._parent.appendChild(this._component);
  }

  _dismiss() {
    this._component.remove();
  }

  /* multiple elements – remove class from ones and add to the others */
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

  /* any elements – remove class if any, add class if any */
  _configureClassesOnElem() {
    // this._elemClassMap = [] задан в конструкторе BaseComponent
    // this._elemClassMap.push(
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
    this._elemClassMap = [];
  }
}

export { BaseComponent as default };
