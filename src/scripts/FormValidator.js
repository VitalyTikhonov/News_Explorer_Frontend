class FormValidator {
  constructor({ errorMessages, getAsNumberAndLastDigit }) {
    this._errorMessages = errorMessages;
    this._getAsNumberAndLastDigit = getAsNumberAndLastDigit;
    // this.checkField = this.checkField.bind(this);
  }

  checkField(inputNode) {
    if (inputNode.validity.valueMissing) {
      inputNode.setCustomValidity(this._errorMessages.empty);
    } else if (inputNode.validity.tooShort) {
      const lengthValue = inputNode.getAttribute('minlength');
      const lengthValueProcessed = this._getAsNumberAndLastDigit(lengthValue);
      inputNode.setCustomValidity(this._errorMessages.tooShort(lengthValueProcessed));
    } else if (inputNode.validity.tooLong) {
      const lengthValue = inputNode.getAttribute('maxlength');
      const lengthValueProcessed = this._getAsNumberAndLastDigit(lengthValue);
      inputNode.setCustomValidity(this._errorMessages.tooLong(lengthValueProcessed));
    } else if (inputNode.validity.typeMismatch) {
      inputNode.setCustomValidity(this._errorMessages.wrongType);
    } else {
      inputNode.setCustomValidity('');
    }
  }
}

export { FormValidator as default };
