import BaseComponent from './BaseComponent';

class ArticleBlock extends BaseComponent {
  constructor({
    articleBlockConfig,
    createNode,
  }) {
    super({
      innerContainerSelector: articleBlockConfig.selector,
      createNode,
    });
    this._component = articleBlockConfig.node;
    this._preloaderMarkup = articleBlockConfig.preloader.markup;
    this._noNewsBumper = articleBlockConfig.noNewsBumper.markup;
  }

  showPreloader() {
    // this._component.removeChild(this._contents);
    if (this._contents) {
      this._removeChild();
    }
    this._contents = this._createNode(this._preloaderMarkup);
    this._component.appendChild(this._contents);
    /* _insertChild не подходит */
  }

  showNoNewsBumper() {
    // this._component.removeChild(this._contents);
    if (this._contents) {
      this._removeChild();
    }
    this._contents = this._createNode(this._noNewsBumper);
    this._component.appendChild(this._contents);
  }

  renderArticles() {

  }
}

export { ArticleBlock as default };
