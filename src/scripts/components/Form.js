import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor({
    markup,
    createNode,
    formValidator,
    errMessageSelectorEnding,
  }) {
    super({ markup, createNode });
    this._errMessageSelectorEnding = errMessageSelectorEnding;
    this._formValidator = formValidator;
    this._formInputHandler = this._formInputHandler.bind(this);
    this._formEventHandlerMap = [];
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
        // handler: this._formValidator.checkField,
      },
    ));
  }

  _formInputHandler(event) {
    const inputNode = event.target;
    this._currentErrorMessageElement = this._form.querySelector(`#${inputNode.id}${this._errMessageSelectorEnding}`);
    this._formValidator.checkField(inputNode);
    this._updateErrorMessage(inputNode);
    this._toggleButtonState(this._form.checkValidity());
  }

  _render() {
    this._create();
    // console.log('this._component', this._component);
    this._form = this._component;
    this._getFormFields(); // Заранее создаем массив с полями формы
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._promptLink = this._form.querySelector(this._promptLinkSelector);
    this._formEventHandlerMap.push(
      {
        domElement: this._form,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
      {
        domElement: this._form,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
  }
}

export { Form as default };
