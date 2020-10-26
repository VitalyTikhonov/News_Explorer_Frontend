import Form from './Form';

class NewsSearchForm extends Form {
  constructor(
    parentArgs,
    selector,
    fieldSelector,
    submitButtonSelector,
    genFormConfig,
    api,
  ) {
    super(parentArgs);
    // this._nameAttr = nameAttr;
    this._selector = selector;
    this._fieldSelector = fieldSelector;
    this._submitButtonSelector = submitButtonSelector;
    // this._submitButtonSelector = genFormConfig.submitButtonSelector;
    // this._genErrMessSelector = genFormConfig.genErrMessSelector;
    // this._promptLinkSelector = genFormConfig.promptLinkSelector;
    // this._signupFormNameAttr = genFormConfig.nameAttributes.signupFormNameAttr;
    // this._loginFormNameAttr = genFormConfig.nameAttributes.loginFormNameAttr;
    // this._signupSuccess = signupSuccess;
    this._api = api;
    this.create = this.create.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._requestFormChange = this._requestFormChange.bind(this);
    // this._getFieldValueMap = this._getFieldValueMap.bind(this);
  }

  _getFormFields() {
    this._inputElements = this._fieldSelector
      .map((selector) => this._formProper.querySelector(selector));
  }

  _getFieldValueMap() {
    const rawfieldValueMapMap = this._inputElements.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
    // console.log('this._fieldValueMap', this._fieldValueMap);
  }

  _dismiss(replacingNodeMarkup) {
    this._removeHandlers();
    // this._dismiss(); // Maximum call stack size exceeded???
    if (replacingNodeMarkup) {
      this._replacingNode = this._createNode(replacingNodeMarkup);
      this._replacingPromptLink = this._replacingNode.querySelector(this._promptLinkSelector);
      this._domEventHandlerMap.push(
        {
          domElement: this._replacingPromptLink,
          event: 'click',
          handler: this._requestFormChange,
        },
      );
      this._setHandlers();
    }
    const dismissalEvent = new CustomEvent(
      'dismissal',
      {
        detail: {
          replacingNode: this._replacingNode || null,
          promptLink: this._replacingPromptLink || null,
        },
      },
    );
    this._form.dispatchEvent(dismissalEvent);
  }

  _requestFormChange() {
    this._removeHandlers();
    const formChangeRequestEvent = new CustomEvent(
      'formChangeRequest',
      {
        detail: this._nameAttr,
      },
    );
    this._form.dispatchEvent(formChangeRequestEvent);
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    // this._getFieldValueMap();
    // this.toggleButtonText(false);
    this._api.getNews(this._field.value)
      .then((res) => {
        console.log('res\n', res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // .finally(() => {
    // this.toggleButtonText(true);
    // });
  }

  render() {
    // console.log('this._component', this._component);
    // this._form = this._component;
    this._formProper = document.querySelector(this._selector);
    this._field = this._formProper.querySelector(this._fieldSelector);
    // this._getFormFields(); // Заранее создаем массив с полями формы
    // this._generalErrorMessage = this._form.querySelector(this._genErrMessSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    // this._promptLink = this._form.querySelector(this._promptLinkSelector);
    this._domEventHandlerMap.push(
      {
        domElement: this._formProper,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
    this._setHandlers();
    // return this._form;
  }
}

export { NewsSearchForm as default };
