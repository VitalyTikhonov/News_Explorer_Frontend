import BaseComponent from './BaseComponent';

class ArticleBlock extends BaseComponent {
  constructor({
    api,
    pageName,
    indexPageName,
    savedNewsPageName,
    articleBlockConf,
    createNode,
    createArticle,
    // pageConfig,
    accessControl,
    popup,
    savedNewsIntro,
    ARTICLE_PORTION_SIZE,
  }) {
    super({
      innerContainerSelector: articleBlockConf.innerContainerSelector,
      createNode,
      pageName,
      indexPageName,
      savedNewsPageName,
    });
    this._api = api;
    this._component = articleBlockConf.node;
    this._markup = articleBlockConf.articleBlockProper.markup[this._pageName];
    this._cardContainerSel = articleBlockConf.articleBlockProper.innerContainerSelector;
    this._popup = popup;
    this._savedNewsIntro = savedNewsIntro;
    this._ARTICLE_PORTION_SIZE = ARTICLE_PORTION_SIZE;
    // this._innerContainer = articleBlockConf.selector;
    /* ----------- */
    this._preloaderMarkup = articleBlockConf.preloader.markup;
    this._preloaderTextSelector = articleBlockConf.preloader.textSelector;
    this._preloaderNewsSearchText = articleBlockConf.preloader.newsSearchText;
    this._preloaderLoadText = articleBlockConf.preloader.loadText;
    /* ----------- */
    this._noNewsBumperMarkup = articleBlockConf.noNewsBumper.markup;
    this._noNewsBumperTitleSelector = articleBlockConf.noNewsBumper.titleSelector;
    this._noNewsBumperTextSelector = articleBlockConf.noNewsBumper.textSelector;
    this._noNewsBumperNoNewNewsTitle = articleBlockConf.noNewsBumper.noNewNewsTitle;
    this._noNewsBumperNoSavedNewsTitle = articleBlockConf.noNewsBumper.noSavedNewsTitle;
    this._noNewsBumperNoNewNewsText = articleBlockConf.noNewsBumper.noNewNewsText;
    this._noNewsBumperNoSavedNewsText = articleBlockConf.noNewsBumper.noSavedNewsText;
    /* ----------- */
    this._cardSaveBtSel = articleBlockConf.articleBlockProper.article.saveButton.selector;
    this._moreButtonMarkup = articleBlockConf.articleBlockProper.moreButton.markup;
    /* ----------- */
    this._cardTooltipSel = articleBlockConf.articleBlockProper.article.tooltip.selector;
    this._ttipTextSel = articleBlockConf.articleBlockProper.article.tooltip.textSelector;
    this._ttipNonAuthMarkup = articleBlockConf.articleBlockProper.article.tooltip.nonAuthTextMarkup;
    this._ttipUnsavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.unsavedTextMarkup;
    // this._ttipSavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.savedTextMarkup;
    /* ----------- */
    this._createArticle = createArticle;
    // this._removalClassName = pageConfig.accessMarkers.removalClassName;
    this._getUserStatus = accessControl.getUserStatus;
    this._renderPortionOfArticles = this._renderPortionOfArticles.bind(this);
  }

  // _clearCards() {
  //   BaseComponent.removeChildren(this._cardContainer);
  // }

  clearAllSection() {
    BaseComponent.removeChildren(this._component);
    this._moreButton = null;
  }

  showPreloader(text) {
    this.clearAllSection();
    this._preloader = BaseComponent.create(this._preloaderMarkup);
    const textNode = this._preloader.querySelector(this._preloaderTextSelector);
    textNode.textContent = text || this._preloaderNewsSearchText;
    BaseComponent.insertChild(this._component, this._preloader);
  }

  showNoNewsBumper(title, text) {
    this.clearAllSection();
    this._noNewsBumper = BaseComponent.create(this._noNewsBumperMarkup);
    const titleNode = this._noNewsBumper.querySelector(this._noNewsBumperTitleSelector);
    const textNode = this._noNewsBumper.querySelector(this._noNewsBumperTextSelector);
    titleNode.textContent = title || this._noNewsBumperNoNewNewsTitle;
    textNode.textContent = text || this._noNewsBumperNoNewNewsText;
    BaseComponent.insertChild(this._component, this._noNewsBumper);
  }

  _renderPortionOfArticles() {
    this._isUserLoggedIn = this._getUserStatus();
    const currentEnd = this._cardAdditionConfig.currentStart + this._cardAdditionConfig.increment;
    const portion = this._articleArray.slice(this._cardAdditionConfig.currentStart, currentEnd);
    this._cardAdditionConfig.currentStart += this._cardAdditionConfig.increment;
    this._cardAdditionConfig.remainder -= this._cardAdditionConfig.increment;
    portion.forEach((article) => {
      const card = this._createArticle(article, this._keyword).render();
      /* tooltip */
      const tooltip = card.querySelector(this._cardTooltipSel);
      const texNode = BaseComponent.create(
        !this._isUserLoggedIn
          ? this._ttipNonAuthMarkup
          // eslint-disable-next-line comma-dangle
          : this._ttipUnsavedMarkup
      );
      BaseComponent.insertChild(tooltip, texNode);
      /* button */
      if (this._isUserLoggedIn) {
        this._contents = card;
        const button = card.querySelector(this._cardSaveBtSel);
        BaseComponent.enableButton(button);
      }
      /* end button */
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
          handler: this._renderPortionOfArticles,
        },
      ]);
    } else if (this._cardAdditionConfig.remainder <= 0 && this._moreButton) {
      BaseComponent.removeHandlers([
        {
          domElement: this._moreButton,
          event: 'click',
          handler: this._renderPortionOfArticles,
        },
      ]);
      BaseComponent.removeChild(this._moreButton);
      this._moreButton = null;
    }
  }

  _renderArticleBlockShell() {
    this._articleBlockShell = BaseComponent.create(this._markup);
    this._cardContainer = this._articleBlockShell.querySelector(this._cardContainerSel);
    BaseComponent.insertChild(this._component, this._articleBlockShell);
  }

  renderSavedArticles() {
    this.showPreloader(this._preloaderLoadText);
    // this.toggleButtonText(false);
    this._api.getArticles()
      .then((res) => {
        // console.log('res\n', res);
        // console.log('isArray', Array.isArray(res));
        this._savedNewsIntro.setArticleArray(res);
        this.renderArticles(res);
      })
      .catch((err) => {
        if (err.message === 'Статьи не найдены') {
          this.showNoNewsBumper(
            this._noNewsBumperNoSavedNewsTitle,
            this._noNewsBumperNoSavedNewsText,
          );
          return;
        }
        this.clearAllSection();
        this._popup.createErrorMessage(err.message);
      })
      .finally(() => {
        // console.log('res\n', res);
        // this.toggleButtonText(true);
        this._savedNewsIntro.render();
      });
  }

  getArticleArray() {
    return this._articleArray;
  }

  renderArticles(articleData) {
    // console.log('articleData', articleData);
    this.clearAllSection();
    switch (this._pageName) {
      case this._indexPageName:
        this._keyword = articleData.keyword;
        this._articleArray = articleData.articles;
        break;
      case this._savedNewsPageName:
        this._articleArray = articleData;
        break;
      default:
    }
    this._renderArticleBlockShell();
    this._cardAdditionConfig = {
      increment: this._ARTICLE_PORTION_SIZE,
      currentStart: 0,
      remainder: this._articleArray.length, // !== articleData.totalResults !!!
    };
    this._renderPortionOfArticles();
    // this.clearAllSection();                                                         // new
    // this._keyword = articleData.keyword;                                            // new
    // this._articleArray = articleData.articles;                                      // new
    // this._renderArticleBlockShell();                                                //
    // this._cardAdditionConfig = {                                                    //
    //   increment: 3,
    //   currentStart: 0,
    //   remainder: this._articleArray.length, // !== articleData.totalResults !!!
    // };
    // this._renderPortionOfArticles();                                                //
  }
}

export { ArticleBlock as default };
