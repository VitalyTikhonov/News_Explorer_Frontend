import BaseComponent from './BaseComponent';

class ArticleBlock extends BaseComponent {
  constructor({
    articleBlockConfig,
    createNode,
    createArticle,
    pageConfig,
    accessControl,
  }) {
    super({
      innerContainerSelector: articleBlockConfig.innerContainerSelector,
      createNode,
    });
    this._component = articleBlockConfig.node;
    this._articleBlockContentsNode = articleBlockConfig.articleBlockContentsNode;
    this._preloaderMarkup = articleBlockConfig.preloader.markup;
    this._noNewsBumperMarkup = articleBlockConfig.noNewsBumper.markup;
    this._cardSaveButtonSelector = articleBlockConfig.article.saveButton.identifierSelector;
    this._createArticle = createArticle;
    this._removalClassName = pageConfig.accessMarkers.removalClassName;
    this._checkUserStatus = accessControl.checkUserStatus;
    this._getUserStatus = accessControl.getUserStatus;
  }

  showPreloader() {
    this._removeChild();
    this._contents = this._createNode(this._preloaderMarkup);
    this._component.appendChild(this._contents);
  }

  showNoNewsBumper() {
    this._removeChild();
    this._contents = this._createNode(this._noNewsBumperMarkup);
    this._component.appendChild(this._contents);
  }

  _renderArticlesForNonAuth() {
    this._cardArray = [];
    this._articleData.articles.forEach((article) => {
      const card = this._createArticle(article).render();
      this._cardArray.push(card);
      this._contents = card;
      this._insertChild();
    });
  }

  _renderArticlesForAuth() {
    this._cardArray = [];
    this._articleData.articles.forEach((article) => {
      const card = this._createArticle(article).render();
      this._cardArray.push(card);
      this._contents = card;
      const button = card.querySelector(this._cardSaveButtonSelector);
      BaseComponent.enableButton(button);
      this._insertChild();
    });
  }

  renderArticles(articleData) {
    this._articleData = articleData;
    this._removeChild();
    this._articleBlockContentsNode.classList.remove(this._removalClassName);
    if (!this._getUserStatus()) {
      this._renderArticlesForNonAuth();
    } else {
      this._renderArticlesForAuth();
    }
    this._contents = null;
  }
}

export { ArticleBlock as default };
