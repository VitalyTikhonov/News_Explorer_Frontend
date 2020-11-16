import BaseComponent from './BaseComponent';

class Article extends BaseComponent {
  constructor({
    pageName,
    indexPageName,
    savedNewsPageName,
    markup,
    articleBlockConf,
    createNode,
    content,
    mainApi,
    popup,
    keyword,
    savedNewsIntro,
  }) {
    super({
      markup,
      createNode,
      pageName,
      indexPageName,
      savedNewsPageName,
    });
    /* selectors */
    this._titleSelector = articleBlockConf.articleBlockProper.article.selectors.title;
    this._dateSelector = articleBlockConf.articleBlockProper.article.selectors.date;
    this._descSelector = articleBlockConf.articleBlockProper.article.selectors.description;
    this._imageSelector = articleBlockConf.articleBlockProper.article.selectors.image;
    this._sourceSelector = articleBlockConf.articleBlockProper.article.selectors.source;
    this._originUrlSelector = articleBlockConf.articleBlockProper.article.selectors.originUrl;
    this._keywordSelector = articleBlockConf.articleBlockProper.article.selectors.keyword;
    this._saveButtonSelector = articleBlockConf.articleBlockProper.article.saveButton.selector;
    this._unsavedButtonClass = articleBlockConf.articleBlockProper.article.saveButton.unsavedClass;
    this._savedButtonClass = articleBlockConf.articleBlockProper.article.saveButton.savedClass;
    this._savedNewsIntro = savedNewsIntro;
    /* ----------- */
    this._cardTooltipSel = articleBlockConf.articleBlockProper.article.tooltip.selector;
    this._ttipUnsavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.unsavedTextMarkup;
    this._ttipSavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.savedTextMarkup;
    /* data */
    this._defaultImageAddress = articleBlockConf.articleBlockProper.article.defaultImageAddress;
    this._keywordData = keyword || content.keyword;
    this._id = content._id;
    this._titleData = content.title;
    this._descData = content.description || content.text;
    this._dateData = content.publishedAt || content.date;
    this._sourceData = content.source.name || content.source;
    this._originUrlData = content.url || content.link;
    this._imageData = content.urlToImage !== null ? content.urlToImage : this._defaultImageAddress;
    /* other */
    this._mainApi = mainApi;
    this._popup = popup;
    this.render = this.render.bind(this);
    this._save = this._save.bind(this);
    this._delete = this._delete.bind(this);
  }

  _setTooltipText(markup) {
    const tooltip = this._component.querySelector(this._cardTooltipSel);
    BaseComponent.removeChildren(tooltip);
    const texNode = BaseComponent.create(markup);
    BaseComponent.insertChild(tooltip, texNode);
  }

  _save() {
    const articleData = {
      keyword: this._keywordData,
      title: this._titleData,
      text: this._descData,
      date: this._dateData,
      source: this._sourceData,
      link: this._originUrlData,
      urlToImage: this._imageData,
    };
    this._mainApi.saveArticle(articleData)
      .then((res) => {
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
        this._setTooltipText(this._ttipSavedMarkup);
      })
      .catch((err) => {
        this._popup.createErrorMessage(err.message);
      });
  }

  _delete() {
    this._mainApi.deleteArticle(this._id)
      .then((res) => {
        BaseComponent.removeHandlers(this._deleteButtonHandlerMap);
        switch (this._pageName) {
          case this._indexPageName:
            this._elemClassMap.push(
              {
                element: this._saveButtonElem,
                classToRemove: this._savedButtonClass,
                classToAdd: this._unsavedButtonClass,
              },
            );
            this._configureClassesOnElem();
            BaseComponent.setHandlers(this._saveButtonHandlerMap);
            this._setTooltipText(this._ttipUnsavedMarkup);
            break;
          case this._savedNewsPageName:
            this._component.remove();
            this._savedNewsIntro.updateOnArticleDeletion(res.keyword);
            break;
          default:
        }
      })
      .catch((err) => {
        this._popup.createErrorMessage(err.message);
      });
  }

  render() {
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
    this._originUrlElem.setAttribute('href', this._originUrlData);
    this._sourceElem.textContent = this._sourceData;
    this._saveButtonElem = this._component.querySelector(this._saveButtonSelector);
    this._deleteButtonHandlerMap = [{
      domElement: this._saveButtonElem,
      event: 'click',
      handler: this._delete,
    }];
    switch (this._pageName) {
      case this._indexPageName:
        this._saveButtonHandlerMap = [{
          domElement: this._saveButtonElem,
          event: 'click',
          handler: this._save,
        }];
        BaseComponent.setHandlers(this._saveButtonHandlerMap);
        break;
      case this._savedNewsPageName:
        this._keywordNode = this._component.querySelector(this._keywordSelector);
        this._keywordNode.textContent = this._keywordData;
        BaseComponent.setHandlers(this._deleteButtonHandlerMap);
        break;
      default:
    }
    return this._component;
  }
}

export { Article as default };
