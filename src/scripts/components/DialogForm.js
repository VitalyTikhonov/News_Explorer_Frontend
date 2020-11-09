import Form from './Form';

class DialogForm extends Form {
  constructor({
    markup,
    createNode,
    nameAttr,
    fieldSelectors,
    errMessageSelectorEnding,
    submitButtonTexts,
    genFormConfig,
    signupSuccess,
    accessControl,
    api,
    formValidator,
  }) {
    super({
      createNode,
      formValidator,
      errMessageSelectorEnding,
      submitButtonTexts,
      submitButtonSelector: genFormConfig.submitButtonSelector,
    });
    this._markup = markup;
    this._nameAttr = nameAttr;
    this._fieldSelectors = fieldSelectors;
    this._genErrMessSelector = genFormConfig.genErrMessSelector;
    this._promptLinkSelector = genFormConfig.promptLinkSelector;
    this._signupFormNameAttr = genFormConfig.nameAttributes.signupFormNameAttr;
    this._signupSuccess = signupSuccess;
    this._accessControl = accessControl;
    this._api = api;
    /* inner */
    this.render = this.render.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._requestFormChange = this._requestFormChange.bind(this);
  }

  _dismiss(replacingNodeMarkup) {
    Form.removeHandlers(this._formEventHandlerMap);
    // this._dismiss(); // Maximum call stack size exceeded???
    if (replacingNodeMarkup) {
      this._replacingNode = this._createNode(replacingNodeMarkup);
      this._replacingPromptLink = this._replacingNode.querySelector(this._promptLinkSelector);
      Form.setHandlers([
        {
          domElement: this._replacingPromptLink,
          event: 'click',
          handler: this._requestFormChange,
        },
      ]);
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
    Form.removeHandlers(this._formEventHandlerMap);
    const formChangeRequestEvent = new CustomEvent(
      'formChangeRequest',
      {
        detail: this._nameAttr,
      },
    );
    this._form.dispatchEvent(formChangeRequestEvent);
  }

  _requestApi() {
    if (this._nameAttr === this._signupFormNameAttr) {
      return this._api.signup(this._fieldValueMap)
        .then(() => {
          this._dismiss(this._signupSuccess);
        });
    }
    return this._accessControl.signin(this._fieldValueMap)
      .then((res) => {
        console.log(res);
        this._dismiss();
      });
  }

  _toggleInputsState(boolean) {
    if (boolean) {
      this._inputNodes.forEach((field) => field.removeAttribute('disabled'));
    } else {
      this._inputNodes.forEach((field) => field.setAttribute('disabled', 'disabled'));
    }
  }

  _setFieldValueMap() {
    const rawfieldValueMapMap = this._inputNodes.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
  }

  _formSubmitHandler(event) {
    super._formSubmitHandler(event);
    this._setFieldValueMap();
    this._requestApi()
      .catch((err) => {
        console.log(err);
        this._generalErrorMessage.textContent = err.message;
      })
      .finally(() => {
        this._unBlockForm();
      });
  }

  _setFormFields() {
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

  render() {
    this._form = Form.create(this._markup); // prior to super.render
    super._render();
    this._setFormFields(); // Заранее создаем массив с полями формы
    this._promptLink = this._form.querySelector(this._promptLinkSelector);
    this._generalErrorMessage = this._form.querySelector(this._genErrMessSelector);
    this._formEventHandlerMap.push(
      {
        domElement: this._promptLink,
        event: 'click',
        handler: this._requestFormChange,
      },
      {
        domElement: this._form,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
    Form.setHandlers(this._formEventHandlerMap);
    return this._form;
  }
}

export { DialogForm as default };
