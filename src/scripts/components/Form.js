import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor({
    markup,
    createNode,
    formValidator,
    errMessageSelectorEnding,
    submitButtonTexts,
  }) {
    super({ markup, createNode });
    this._errMessageSelectorEnding = errMessageSelectorEnding;
    this._formValidator = formValidator;
    this._render = this._render.bind(this);
    this._formInputHandler = this._formInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._toggleButtonText = this._toggleButtonText.bind(this);
    // this._checkForm = this._checkForm.bind(this);
    this._formEventHandlerMap = [];
    this._submitButtonTexts = submitButtonTexts;
  }

  _toggleButtonText(normal) {
    if (normal) {
      this._submitButton.textContent = this._submitButtonDefaultText;
    } else {
      this._submitButton.textContent = this._submitButtonTexts.loading;
    }
  }

  _toggleButtonState() {
    if (this._form.checkValidity()) {
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.setAttribute('disabled', 'disabled');
    }
  }

  _updateErrorMessage(inputNode) {
    // console.log('_updateErrorMessage inputNode.validationMessage', inputNode.validationMessage);
    this._currentErrorMessageElement = this._form
      .querySelector(`#${inputNode.id}${this._errMessageSelectorEnding}`);
    this._currentErrorMessageElement.textContent = inputNode.validationMessage;
  }

  // resetError(errorMessageElement) {
  //   errorMessageElement.textContent = '';
  // }

  // clearMessages = () => {
  //   Array.from(this._messages).forEach(message => message.textContent = '');
  // }

  resetAllErrors(inputNodes) {
    inputNodes.forEach((field) => {
      this.resetError(field);
    });
  }

  _getFormFields() {
    this._inputNodes = this._fieldSelectors
      .map((selector) => this._form.querySelector(selector));
    this._inputNodes.forEach((node) => this._formEventHandlerMap.push(
      {
        domElement: node,
        event: 'input',
        handler: this._formInputHandler,
      },
    ));
  }

  // _checkForm() {
  //   this._inputNodes.forEach((node) => {
  //     this._formValidator.checkField(node);
  //     this._updateErrorMessage(node);
  //   });
  //   this._toggleButtonState(this._form.checkValidity());
  // }

  _formInputHandler(event) {
    const inputNode = event.target;
    this._formValidator.checkField(inputNode);
    this._updateErrorMessage(inputNode);
    this._toggleButtonState(this._form.checkValidity());
  }

  _getFieldValueMap() {
    const rawfieldValueMapMap = this._inputNodes.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
    // console.log('this._fieldValueMap', this._fieldValueMap);
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._getFieldValueMap();
    this._toggleButtonText(false);
  }

  _render() {
    this._create();
    this._form = this._component;
    this._getFormFields(); // Заранее создаем массив с полями формы
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._promptLink = this._form.querySelector(this._promptLinkSelector);
  }
}

export { Form as default };
