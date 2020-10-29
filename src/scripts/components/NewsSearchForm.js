import BaseComponent from './BaseComponent';

class NewsSearchForm extends BaseComponent {
  constructor({
    newsSearchFormConfig,
    api,
    articleBlock,
  }) {
    super({});
    this._selector = newsSearchFormConfig.selector;
    this._fieldSelector = newsSearchFormConfig.fieldSelector;
    this._submitButtonSelector = newsSearchFormConfig.submitButtonSelector;
    this._api = api;
    this._articleBlock = articleBlock;
    /* inner */
    this.render = this.render.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    this._articleBlock.showPreloader();
    // this.toggleButtonText(false);
    this._api.getNews(this._field.value)
      .then((res) => {
        console.log('res\n', res);
        if (res.totalResults === 0) {
          this._articleBlock.showNoNewsBumper();
          return;
        }
        this._articleBlock.renderArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    // this.toggleButtonText(true);
    // });
  }

  render() {
    this._formProper = document.querySelector(this._selector);
    this._field = this._formProper.querySelector(this._fieldSelector);
    this._submitButton = this._formProper.querySelector(this._submitButtonSelector);
    this._formEventHandlerMap = [
      {
        domElement: this._formProper,
        event: 'submit',
        handler: this._formSubmitHandler,
        useCapture: true,
      },
    ];
    BaseComponent.setHandlers(this._formEventHandlerMap);
  }
}

export { NewsSearchForm as default };
