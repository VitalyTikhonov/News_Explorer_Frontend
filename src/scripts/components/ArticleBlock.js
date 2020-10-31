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
    this._markup = articleBlockConf.articleBlockProper.markup;
    this._cardContainerSel = articleBlockConf.articleBlockProper.innerContainerSelector;
    // this._innerContainer = articleBlockConf.selector;
    this._preloaderMarkup = articleBlockConf.preloader.markup;
    this._noNewsBumperMarkup = articleBlockConf.noNewsBumper.markup;
    this._cardSaveBtSel = articleBlockConf.articleBlockProper.article.saveButton.selector;
    /* ----------- */
    this._cardTooltipSel = articleBlockConf.articleBlockProper.article.tooltip.selector;
    this._ttipTextSel = articleBlockConf.articleBlockProper.article.tooltip.textSelector;
    this._ttipNonAuthMarkup = articleBlockConf.articleBlockProper.article.tooltip.nonAuthTextMarkup;
    this._ttipUnsavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.unsavedTextMarkup;
    // this._ttipSavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.savedTextMarkup;
    /* ----------- */
    this._createArticle = createArticle;
    this._removalClassName = pageConfig.accessMarkers.removalClassName;
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
      const card = this._createArticle(article, this._articleData.keyword).render();
      this._cardArray.push(card);
      /* tooltip */
      const tooltip = card.querySelector(this._cardTooltipSel);
      const texNode = BaseComponent.create(this._ttipNonAuthMarkup);
      BaseComponent.insertChild(tooltip, texNode);
      /* end tooltip */
      BaseComponent.insertChild(this._cardContainer, card);
    });
  }

  _renderArticlesForAuth() {
    this._cardArray = [];
    this._articleData.articles.forEach((article) => {
      const card = this._createArticle(article, this._articleData.keyword).render();
      this._cardArray.push(card);
      /* tooltip */
      const tooltip = card.querySelector(this._cardTooltipSel);
      const texNode = BaseComponent.create(this._ttipUnsavedMarkup);
      BaseComponent.insertChild(tooltip, texNode);
      /* end tooltip */
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
