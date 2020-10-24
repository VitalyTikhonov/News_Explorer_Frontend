import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(formConfig, api) {
    super();
    this._markup = formConfig.markup;
    this._fieldSelectors = formConfig.fieldSelectors;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._api = api;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    // this._getFieldValueMap = this._getFieldValueMap.bind(this);
  }

  _getFormFields() {
    this._inputElements = this._fieldSelectors
      .map((selector) => this._form.querySelector(selector));
  }

  _getFieldValueMap() {
    const rawfieldValueMapMap = this._inputElements.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
    // console.log('this._fieldValueMap', this._fieldValueMap);
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._getFieldValueMap();
    // console.log('this._inputElements', this._inputElements);
    // console.log('this', this);
    // console.log('this._fieldValueMap', this._fieldValueMap);
    // this.toggleButtonText(false);
    this._api.signup(this._fieldValueMap)
      .then((res) => {
        console.log('res\n', res);
      })
      .catch((err) => {
        alert(`Произошла ошибка: ${err.status} ${err.statusText}`);
      })
      .finally(() => {
        // this.toggleButtonText(true);
      });
  }

  create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._markup);
    this._formOuterNode = element.firstElementChild;
    this._form = this._formOuterNode.querySelector('form');
    this._getFormFields(); // Заранее создаем массив с полями формы
    this._submitButton = this._formOuterNode.querySelector(this._submitButtonSelector);
    this._domEventHandlerMap.push(
      {
        domElement: this._form,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
    this._setHandlers();
    return this._formOuterNode;
  }
}

export { Form as default };
