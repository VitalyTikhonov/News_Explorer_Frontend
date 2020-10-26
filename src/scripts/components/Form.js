import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(
    parentArgs,
    nameAttr,
    fieldSelectors,
    genFormConfig,
    signupSuccess,
    api,
  ) {
    super(parentArgs);
    this._nameAttr = nameAttr;
    this._fieldSelectors = fieldSelectors;
    this._submitButtonSelector = genFormConfig.submitButtonSelector;
    this._genErrMessSelector = genFormConfig.genErrMessSelector;
    this._promptLinkSelector = genFormConfig.promptLinkSelector;
    this._signupFormNameAttr = genFormConfig.nameAttributes.signupFormNameAttr;
    this._loginFormNameAttr = genFormConfig.nameAttributes.loginFormNameAttr;
    this._signupSuccess = signupSuccess;
    this._api = api;
    this.create = this.create.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._requestFormChange = this._requestFormChange.bind(this);
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

  _apiResponseProcessor() {
    if (this._nameAttr === this._signupFormNameAttr) {
      return this._api.signup(this._fieldValueMap)
        .then(() => {
          this._dismiss(this._signupSuccess);
        });
    }
    return this._api.signin(this._fieldValueMap)
      .then((res) => {
        console.log(res.message);
        this._dismiss();
      });
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._getFieldValueMap();
    // this.toggleButtonText(false);
    this._apiResponseProcessor()
      .catch((err) => {
        // console.log(err.message);
        this._generalErrorMessage.textContent = err.message;
      })
      .finally(() => {
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
    this._promptLink = this._form.querySelector(this._promptLinkSelector);
    this._domEventHandlerMap.push(
      {
        domElement: this._formProper,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
      {
        domElement: this._promptLink,
        event: 'click',
        handler: this._requestFormChange,
      },
    );
    this._setHandlers();
    return this._form;
  }
}

export { Form as default };
