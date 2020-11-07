class FormValidator {
  constructor({ errorMessages }) {
    this._errorMessages = errorMessages;
    // this.checkField = this.checkField.bind(this);
  }

  checkField(inputNode) {
    if (inputNode.validity.valueMissing) {
      inputNode.setCustomValidity(this._errorMessages.empty);
    } else if (inputNode.validity.tooShort) {
      inputNode.setCustomValidity(this._errorMessages.tooShort(inputNode.getAttribute('minlength')));
    } else if (inputNode.validity.tooLong) {
      inputNode.setCustomValidity(this._errorMessages.tooLong(inputNode.getAttribute('maxlength')));
    } else if (inputNode.validity.typeMismatch) {
      inputNode.setCustomValidity(this._errorMessages.wrongType);
    } else {
      inputNode.setCustomValidity('');
    }
  }
}

export { FormValidator as default };
