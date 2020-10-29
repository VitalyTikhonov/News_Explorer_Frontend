import BaseComponent from './BaseComponent';

class Article extends BaseComponent {
  constructor({
    markup,
    articleBlockConfig,
    createNode,
    content,
  }) {
    super({
      markup,
      createNode,
    });
    /* selectors */
    this._titleSelector = articleBlockConfig.article.selectors.title;
    this._releaseDateSelector = articleBlockConfig.article.selectors.releaseDate;
    this._descriptionSelector = articleBlockConfig.article.selectors.description;
    this._imageSelector = articleBlockConfig.article.selectors.image;
    this._sourceSelector = articleBlockConfig.article.selectors.source;
    /* data */
    this._titleData = content.title;
    this._releaseDateData = content.publishedAt;
    this._descriptionData = content.description;
    this._imageData = content.urlToImage;
    this._sourceData = content.source.name;
  }

  render() {
    // console.log('this._titleData', this._titleData);
    // console.log('this._releaseDateData', this._releaseDateData);
    // console.log('this._descriptionData', this._descriptionData);
    // console.log('this._imageData', this._imageData);
    // console.log('this._sourceData', this._sourceData);
    this._create();
    this._titleElem = this._component.querySelector(this._titleSelector);
    this._releaseDateElem = this._component.querySelector(this._releaseDateSelector);
    this._descriptionElem = this._component.querySelector(this._descriptionSelector);
    this._imageElem = this._component.querySelector(this._imageSelector);
    this._sourceElem = this._component.querySelector(this._sourceSelector);
    this._titleElem.textContent = this._titleData;
    this._releaseDateElem.textContent = new Date(this._releaseDateData)
      .toLocaleDateString(
        'ru-RU',
        { year: 'numeric', month: 'long', day: 'numeric' },
      );
    this._descriptionElem.textContent = this._descriptionData;
    this._imageElem.setAttribute('src', this._imageData);
    this._sourceElem.textContent = this._sourceData;
    return this._component;
  }
}

export { Article as default };
