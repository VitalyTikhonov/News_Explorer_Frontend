import Form from './Form';

class DialogForm extends Form {
  constructor({
    markup,
    createNode,
    nameAttr,
    fieldSelectors,
    errMessageSelectorEnding,
    genFormConfig,
    signupSuccess,
    accessControl,
    api,
    formValidator,
  }) {
    super({
      markup,
      createNode,
      formValidator,
      errMessageSelectorEnding,
    });
    this._nameAttr = nameAttr;
    this._fieldSelectors = fieldSelectors;
    this._submitButtonSelector = genFormConfig.submitButtonSelector;
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
    // this._getFieldValueMap = this._getFieldValueMap.bind(this);
  }

  _getFieldValueMap() {
    const rawfieldValueMapMap = this._inputElements.map((input) => [input.name, input.value]);
    this._fieldValueMap = Object.fromEntries(rawfieldValueMapMap);
    // console.log('this._fieldValueMap', this._fieldValueMap);
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
      // return this._api.signup(this._fieldValueMap)
        .then(() => {
          this._dismiss(this._signupSuccess);
        });
    }
    return this._accessControl.signin(this._fieldValueMap)
    // return this._api.signin(this._fieldValueMap)
      .then((res) => {
        console.log(res);
        this._dismiss();
      });
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._getFieldValueMap();
    // this.toggleButtonText(false);
    this._requestApi()
      .catch((err) => {
        console.log(err);
        this._generalErrorMessage.textContent = err.message;
      })
      .finally(() => {
        // this.toggleButtonText(true);
      });
  }

  render() {
    super._render();
    this._generalErrorMessage = this._form.querySelector(this._genErrMessSelector);
    this._formEventHandlerMap.push(
      {
        domElement: this._promptLink,
        event: 'click',
        handler: this._requestFormChange,
      },
    );
    Form.setHandlers(this._formEventHandlerMap);
    return this._form;
  }
}

export { DialogForm as default };
