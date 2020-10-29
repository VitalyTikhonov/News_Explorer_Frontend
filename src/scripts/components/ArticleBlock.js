import BaseComponent from './BaseComponent';

class ArticleBlock extends BaseComponent {
  constructor({
    articleBlockConfig,
    createNode,
    createArticle,
    pageConfig,
  }) {
    super({
      innerContainerSelector: articleBlockConfig.innerContainerSelector,
      createNode,
    });
    this._component = articleBlockConfig.node;
    this._articleBlockContentsNode = articleBlockConfig.articleBlockContentsNode;
    this._preloaderMarkup = articleBlockConfig.preloader.markup;
    this._noNewsBumperMarkup = articleBlockConfig.noNewsBumper.markup;
    this._createArticle = createArticle;
    this._removalClassName = pageConfig.accessMarkers.removalClassName;
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

  renderArticles(articleData) {
    this._removeChild();
    this._articleBlockContentsNode.classList.remove(this._removalClassName);
    this._cardArray = [];
    articleData.articles.forEach((article) => {
      const card = this._createArticle(article).render();
      this._cardArray.push(card);
      this._contents = card;
      this._insertChild();
    });
    this._contents = null;
  }
}

export { ArticleBlock as default };
