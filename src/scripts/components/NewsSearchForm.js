import BaseComponent from './BaseComponent';

class NewsSearchForm extends BaseComponent {
  constructor({
    newsSearchFormConfig,
    api,
  }) {
    super({});
    this._selector = newsSearchFormConfig.selector;
    this._fieldSelector = newsSearchFormConfig.fieldSelector;
    this._submitButtonSelector = newsSearchFormConfig.submitButtonSelector;
    this._api = api;
    /* inner */
    this.render = this.render.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._requestFormChange = this._requestFormChange.bind(this);
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
    this._formProper = document.querySelector(this._selector);
    this._field = this._formProper.querySelector(this._fieldSelector);
    this._submitButton = this._formProper.querySelector(this._submitButtonSelector);
    this._domEventHandlerMap.push(
      {
        domElement: this._formProper,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
    this._setHandlers();
  }
}

export { NewsSearchForm as default };
