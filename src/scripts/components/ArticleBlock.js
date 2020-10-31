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
    /* More button */
    if (this._cardAdditionConfig.remainder > 0 && !this._moreButton) {
      this._moreButton = BaseComponent.create(this._moreButtonMarkup);
      BaseComponent.insertChild(this._articleBlockShell, this._moreButton);
      BaseComponent.setHandlers([
        {
          domElement: this._moreButton,
          event: 'click',
          handler: this._pleaseRenderTheArticlesWillYou,
        },
      ]);
    } else if (this._cardAdditionConfig.remainder < 0 && this._moreButton) {
      BaseComponent.removeHandlers([
        {
          domElement: this._moreButton,
          event: 'click',
          handler: this._pleaseRenderTheArticlesWillYou,
        },
      ]);
      BaseComponent.removeChild(this._moreButton);
      this._moreButton = null;
    }
    // console.log('this._cardAdditionConfig.remainder', this._cardAdditionConfig.remainder);
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
    this._keyword = articleData.keyword;
    this._articleArray = articleData.articles;
    this._cardAdditionConfig = {
      increment: 3,
      currentStart: 0,
      remainder: this._articleArray.length, // !== articleData.totalResults !!!
    };
    this._pleaseRenderTheArticlesWillYou(this._getUserStatus());
  }
}

export { ArticleBlock as default };
