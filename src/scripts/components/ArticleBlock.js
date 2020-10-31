import BaseComponent from './BaseComponent';

class ArticleBlock extends BaseComponent {
  constructor({
    articleBlockConf,
    createNode,
    createArticle,
    pageConfig,
    accessControl,
  }) {
    super({
      innerContainerSelector: articleBlockConf.innerContainerSelector,
      createNode,
    });
    this._component = articleBlockConf.node;
    this._markup = articleBlockConf.articleBlockProperConf.markup;
    this._cardContainerSel = articleBlockConf.articleBlockProperConf.innerContainerSelector;
    // this._innerContainer = articleBlockConf.selector;
    this._preloaderMarkup = articleBlockConf.preloader.markup;
    this._noNewsBumperMarkup = articleBlockConf.noNewsBumper.markup;
    this._cardSaveBtSel = articleBlockConf.articleBlockProperConf.article.saveButton.selector;
    this._createArticle = createArticle;
    this._removalClassName = pageConfig.accessMarkers.removalClassName;
    this._checkUserStatus = accessControl.checkUserStatus;
    this._getUserStatus = accessControl.getUserStatus;
  }

  _clearCards() {
    BaseComponent.removeChildren(this._cardContainer);
  }

  clearAllSection() {
    BaseComponent.removeChildren(this._component);
  }

  showPreloader() {
    this.clearAllSection();
    this._preloader = BaseComponent.create(this._preloaderMarkup);
    BaseComponent.insertChild(this._component, this._preloader);
  }

  showNoNewsBumper() {
    this.clearAllSection();
    this._noNewsBumper = BaseComponent.create(this._noNewsBumperMarkup);
    BaseComponent.insertChild(this._component, this._noNewsBumper);
  }

  _renderArticlesForNonAuth() {
    this._cardArray = [];
    this._articleData.articles.forEach((article) => {
      const card = this._createArticle(article).render();
      this._cardArray.push(card);
      BaseComponent.insertChild(this._cardContainer, card);
    });
  }

  _renderArticlesForAuth() {
    this._cardArray = [];
    this._articleData.articles.forEach((article) => {
      const card = this._createArticle(article).render();
      this._cardArray.push(card);
      this._contents = card;
      const button = card.querySelector(this._cardSaveBtSel);
      BaseComponent.enableButton(button);
      BaseComponent.insertChild(this._cardContainer, card);
    });
  }

  _renderArticleBlockShell() {
    this._articleBlockShell = BaseComponent.create(this._markup);
    this._cardContainer = this._articleBlockShell.querySelector(this._cardContainerSel);
    BaseComponent.insertChild(this._component, this._articleBlockShell);
  }

  renderArticles(articleData) {
    this._articleData = articleData;
    this.clearAllSection();
    this._renderArticleBlockShell();
    if (!this._getUserStatus()) {
      this._renderArticlesForNonAuth();
    } else {
      this._renderArticlesForAuth();
    }
  }
}

export { ArticleBlock as default };
