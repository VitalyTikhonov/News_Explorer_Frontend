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
  }

  _showPreloader() {
    this._contents = this._createNode(this._preloaderMarkup);
    this._component.appendChild(this._contents);
    /* _insertChild не подходит */
  }

  // render() {

  // }
}

export { ArticleBlock as default };
