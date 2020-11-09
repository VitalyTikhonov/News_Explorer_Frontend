import Form from './Form';

class NewsSearchForm extends Form {
  constructor({
    newsSearchFormConfig,
    api,
    articleBlock,
    popup,
    formValidator,
  }) {
    super({
      formValidator,
      errMessageSelectorEnding: newsSearchFormConfig.errMessageSelectorEnding,
      submitButtonTexts: newsSearchFormConfig.submitButtonTexts,
      submitButtonSelector: newsSearchFormConfig.submitButtonSelector,
    });
    this._selector = newsSearchFormConfig.selector;
    this._fieldSelector = newsSearchFormConfig.fieldSelector;
    // this._submitButtonSelector = newsSearchFormConfig.submitButtonSelector;
    this._api = api;
    this._articleBlock = articleBlock;
    this._popup = popup;
    /* inner */
    this.render = this.render.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _toggleInputsState(boolean) {
    if (boolean) {
      this._field.removeAttribute('disabled');
    } else {
      this._field.setAttribute('disabled', 'disabled');
    }
  }

  _formSubmitHandler(event) {
    super._formSubmitHandler(event);
    this._articleBlock.showPreloader();
    this._api.getNews(this._field.value)
      .then((res) => {
        console.log('res\n', res);
        if (res.totalResults === 0) {
          this._articleBlock.showNoNewsBumper();
          return;
        }
        res.keyword = this._field.value;
        this._articleBlock.renderArticles(res);
      })
      .catch((err) => {
        console.log(err);
        this._articleBlock.clearAllSection();
        this._popup.createErrorMessage(err.message);
      })
      .finally(() => {
        this._unBlockForm();
      });
  }

  _setFormFields() {
    this._field = this._form.querySelector(this._fieldSelector);
    this._formEventHandlerMap.push(
      {
        domElement: this._field,
        event: 'input',
        handler: this._formInputHandler,
      },
    );
  }

  render() {
    this._form = document.querySelector(this._selector); // prior to super.render
    super._render();
    this._setFormFields();
    this._formEventHandlerMap.push(
      {
        domElement: this._form,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    );
    Form.setHandlers(this._formEventHandlerMap);
  }
}

export { NewsSearchForm as default };
