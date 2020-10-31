import BaseComponent from './BaseComponent';

class Article extends BaseComponent {
  constructor({
    articleBlockConf,
    createNode,
    content,
    // accessControl,
  }) {
    super({
      markup: articleBlockConf.articleBlockProperConf.article.markup.forMainPage,
      createNode,
    });
    /* selectors */
    this._titleSelector = articleBlockConf.articleBlockProperConf.article.selectors.title;
    this._dateSelector = articleBlockConf.articleBlockProperConf.article.selectors.date;
    this._descSelector = articleBlockConf.articleBlockProperConf.article.selectors.description;
    this._imageSelector = articleBlockConf.articleBlockProperConf.article.selectors.image;
    this._sourceSelector = articleBlockConf.articleBlockProperConf.article.selectors.source;
    this._originUrlSelector = articleBlockConf.articleBlockProperConf.article.selectors.originUrl;
    // this._saveButtonSelector = articleBlockConf
    // .articleBlockProperConf.article.saveButton.selector;
    /* data */
    this._titleData = content.title;
    this._dateData = content.publishedAt;
    this._descData = content.description;
    this._imageData = content.urlToImage;
    this._sourceData = content.source.name;
    this._originUrl = content.url;
    /* other */
    // this._setButtonState = accessControl.setButtonState;
  }

  render() {
    // console.log('this._titleData', this._titleData);
    // console.log('this._dateData', this._dateData);
    // console.log('this._descData', this._descData);
    // console.log('this._imageData', this._imageData);
    // console.log('this._sourceData', this._sourceData);
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
    // console.log('src', this._imageElem.getAttribute('src'));
    this._originUrlElem.setAttribute('href', this._originUrl);
    this._sourceElem.textContent = this._sourceData;
    // console.log('this._setButtonState', this._setButtonState);
    // console.log('this._saveButtonElem', this._saveButtonElem);
    // this._saveButtonElem = this._component.querySelector(this._saveButtonSelector);
    // BaseComponent.enableButton(this._saveButtonElem);
    return this._component;
  }
}

export { Article as default };
