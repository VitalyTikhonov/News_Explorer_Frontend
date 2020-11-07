class FormValidator {
  constructor() {
    this.errorMessages = {
      empty: 'Это обязательное поле',
      wronglength: 'Должно быть от 2 до 30 символов',
      wrongUrl: 'Здесь должна быть ссылка',
    };
  }

  setError(inputElement, errorMessageElement) {
    errorMessageElement.textContent = inputElement.validationMessage;
  }

  resetError(errorMessageElement) {
    errorMessageElement.textContent = '';
  }

  resetAllErrors(inputElements) {
    inputElements.forEach((field) => {
      this.resetError(field);
    });
  }

  isFieldMissingValue(inputElement) {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(this.errorMessages.empty);
      return true;
    }
    inputElement.setCustomValidity('');
    return false;
  }

  isWrongCharNumber(inputElement) {
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(this.errorMessages.wronglength);
      return true;
    }
    inputElement.setCustomValidity('');
    return false;
  }

  isNotUrl(inputElement) {
    if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity(this.errorMessages.wrongUrl);
      return true;
    }
    inputElement.setCustomValidity('');
    return false;
  }

  checkField(inputElement) {
    if (inputElement.type !== 'submit' && inputElement.type !== 'button') {
      if (this.isFieldMissingValue(inputElement)) {
        return false;
      } if (this.isNotUrl(inputElement)) {
        return false;
      } if (this.isWrongCharNumber(inputElement)) {
        return false;
      }
      return true;
    }
  }

  manageErrorMessage(inputElement, errorMessageElement) {
    if (this.checkField(inputElement)) {
      this.resetError(errorMessageElement);
    } else {
      this.setError(inputElement, errorMessageElement);
    }
  }

  checkForm(inputElements) {
    const valid = inputElements.every((field) => this.checkField(field));
    return valid;
  }
}

export { FormValidator as default };
