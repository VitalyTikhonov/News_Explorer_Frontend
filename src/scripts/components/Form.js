import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(
    parentArgs,
    fieldSelectors,
    submitButtonSelector,
    genErrMessSelector,
    api,
    formDismissalEvent,
    closeSignUpPopup,
  ) {
    super(parentArgs);
    this._fieldSelectors = fieldSelectors;
    this._submitButtonSelector = submitButtonSelector;
    this._genErrMessSelector = genErrMessSelector;
    this._api = api;
    this._formDismissalEvent = formDismissalEvent;
    this._closeSignUpPopup = closeSignUpPopup;
    this.create = this.create.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    // this._getFieldValueMap = this._getFieldValueMap.bind(this);
  }

  _getFormFields() {
    this._inputElements = this._fieldSelectors
      .map((selector) => this._formProper.querySelector(selector));
  }

  _getFieldValueMap() {
    const rawfieldValueMapMap = this._inputElements.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
    // console.log('this._fieldValueMap', this._fieldValueMap);
  }

  _dismiss() {
    this._removeHandlers();
    // this._dismiss(); // Maximum call stack size exceeded???
    this._form.dispatchEvent(this._formDismissalEvent);
  }

  // eslint-disable-next-line class-methods-use-this
  // _dismissalTemporaryHandler() {
  //   console.log('It works!');
  // }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._getFieldValueMap();
    // this.toggleButtonText(false);
    this._api.signup(this._fieldValueMap)
      .then((res) => {
        console.log(res);
        this._dismiss();
      })
      .catch((err) => {
        // console.log(err.message);
        this._generalErrorMessage.textContent = err.message;
      })
      .finally(() => {
        // this._closeSignUpPopup();
        // this.toggleButtonText(true);
      });
  }

  create() {
    this._create();
    // console.log('this._component', this._component);
    this._form = this._component;
    this._formProper = this._form.querySelector('form');
    this._getFormFields(); // Заранее создаем массив с полями формы
    this._generalErrorMessage = this._form.querySelector(this._genErrMessSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._domEventHandlerMap.push(
      {
        domElement: this._formProper,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
      // {
      //   domElement: this._form,
      //   event: 'formDismissal',
      //   handler: this._dismissalTemporaryHandler,
      // },
    );
    this._setHandlers();
    return this._form;
  }
}

export { Form as default };
