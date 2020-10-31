import BaseComponent from './BaseComponent';

class Article extends BaseComponent {
  constructor({
    articleBlockConf,
    createNode,
    content,
    mainApi,
    popup,
    keyword,
    // accessControl,
  }) {
    super({
      markup: articleBlockConf.articleBlockProper.article.markup.forMainPage,
      createNode,
    });
    /* selectors */
    this._titleSelector = articleBlockConf.articleBlockProper.article.selectors.title;
    this._dateSelector = articleBlockConf.articleBlockProper.article.selectors.date;
    this._descSelector = articleBlockConf.articleBlockProper.article.selectors.description;
    this._imageSelector = articleBlockConf.articleBlockProper.article.selectors.image;
    this._sourceSelector = articleBlockConf.articleBlockProper.article.selectors.source;
    this._originUrlSelector = articleBlockConf.articleBlockProper.article.selectors.originUrl;
    this._saveButtonSelector = articleBlockConf.articleBlockProper.article.saveButton.selector;
    this._unsavedButtonClass = articleBlockConf.articleBlockProper.article.saveButton.unsavedClass;
    this._savedButtonClass = articleBlockConf.articleBlockProper.article.saveButton.savedClass;
    /* data */
    this._defaultImageAddress = articleBlockConf.articleBlockProper.article.defaultImageAddress;
    this._keyword = keyword;
    this._titleData = content.title;
    this._descData = content.description;
    this._dateData = content.publishedAt;
    this._sourceData = content.source.name;
    this._originUrl = content.url;
    this._imageData = content.urlToImage !== null ? content.urlToImage : this._defaultImageAddress;
    /* other */
    this._mainApi = mainApi;
    this._popup = popup;
    this._save = this._save.bind(this);
    this._delete = this._delete.bind(this);
  }

  _save() {
    const articleData = {
      keyword: this._keyword,
      title: this._titleData,
      text: this._descData,
      date: this._dateData,
      source: this._sourceData,
      link: this._originUrl,
      image: this._imageData,
    };
    this._mainApi.saveArticle(articleData)
      .then((res) => {
        console.log(res);
        this._id = res._id;
        this._elemClassMap.push(
          {
            element: this._saveButtonElem,
            classToRemove: this._unsavedButtonClass,
            classToAdd: this._savedButtonClass,
          },
        );
        this._configureClassesOnElem();
        BaseComponent.removeHandlers(this._saveButtonHandlerMap);
        BaseComponent.setHandlers(this._deleteButtonHandlerMap);
      })
      .catch((err) => {
        this._popup.createErrorMessage(err.message);
      });
  }

  _delete() {
    this._mainApi.deleteArticle(this._id)
      .then((res) => {
        console.log(res);
        this._elemClassMap.push(
          {
            element: this._saveButtonElem,
            classToRemove: this._savedButtonClass,
            classToAdd: this._unsavedButtonClass,
          },
        );
        this._configureClassesOnElem();
        BaseComponent.removeHandlers(this._deleteButtonHandlerMap);
        BaseComponent.setHandlers(this._saveButtonHandlerMap);
      })
      .catch((err) => {
        this._popup.createErrorMessage(err.message);
      });
  }

  render() {
    // console.log('this._titleData', this._titleData);
    // console.log('this._dateData', this._dateData);
    // console.log('this._descData', this._descData);
    // console.log('this._imageData', this._imageData);
    this._create();
    this._titleElem = this._component.querySelector(this._titleSelector);
    this._dateElem = this._component.querySelector(this._dateSelector);
    this._descElem = this._component.querySelector(this._descSelector);
    this._imageElem = this._component.querySelector(this._imageSelector);
    this._sourceElem = this._component.querySelector(this._sourceSelector);
    this._originUrlElem = this._component.querySelector(this._originUrlSelector);
    this._titleElem.textContent = this._titleData;
    this._dateElem.textContent = new Date(this._dateData)
      .toLocaleDateString(
        'ru-RU',
        { year: 'numeric', month: 'long', day: 'numeric' },
      );
    this._descElem.textContent = this._descData;
    this._imageElem.setAttribute('src', this._imageData);
    this._originUrlElem.setAttribute('href', this._originUrl);
    this._sourceElem.textContent = this._sourceData;
    this._saveButtonElem = this._component.querySelector(this._saveButtonSelector);
    this._saveButtonHandlerMap = [{
      domElement: this._saveButtonElem,
      event: 'click',
      handler: this._save,
    }];
    this._deleteButtonHandlerMap = [{
      domElement: this._saveButtonElem,
      event: 'click',
      handler: this._delete,
    }];
    BaseComponent.setHandlers(this._saveButtonHandlerMap);
    return this._component;
  }
}

export { Article as default };
