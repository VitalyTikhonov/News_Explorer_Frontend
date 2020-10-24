import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(markup, api) {
    super();
    this._markup = markup;
    this._api = api;
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    // this.toggleButtonText(false);
    this._processForm(this._formOuterNode)
      .then(() => {
        this._formOuterNode.reset();
      })
      .catch((err) => {
        alert(`Произошла ошибка: ${err.status} ${err.statusText}`);
      })
      .finally(() => {
        // this.toggleButtonText(true);
      });
  }

  _getFormFields() {
    this._inputElements = Array.from(this._form.elements)
      .filter((inputElement) => inputElement.type !== 'submit' && inputElement.type !== 'button');
    // console.log('this._inputElements', this._inputElements);
    console.log('this._form.elements', this._form.elements);
    // console.log('Array.isArray(this._form.elements)', Array.isArray(this._form.elements));
    /* итерироваться, вероятно reduce */
  }

  create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._markup);
    this._formOuterNode = element.firstElementChild;
    this._form = this._formOuterNode.querySelector('form');
    this._getFormFields();
    // this._domEventHandlerMap.push(
    //   {
    //     domElement: ,
    //     event: 'click',
    //     handler: ,
    //   },
    // );
    // this._setHandlers();
    return this._formOuterNode;
  }
}

export { Form as default };
