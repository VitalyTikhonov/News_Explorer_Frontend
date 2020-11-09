import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor({
    markup,
    createNode,
    formValidator,
    errMessageSelectorEnding,
    submitButtonTexts,
    submitButtonSelector,
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
    this._submitButtonSelector = submitButtonSelector;
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
    this._currentErrorMessageElement = this._form
      .querySelector(`#${inputNode.id}${this._errMessageSelectorEnding}`);
    this._currentErrorMessageElement.textContent = inputNode.validationMessage;
  }

  _formInputHandler(event) {
    const inputNode = event.target;
    this._formValidator.checkField(inputNode);
    this._updateErrorMessage(inputNode);
    this._toggleButtonState(this._form.checkValidity());
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._toggleButtonText(false);
    // form blocking!!!
  }

  _render() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButtonDefaultText = this._submitButton.textContent;
  }
}

export { Form as default };
