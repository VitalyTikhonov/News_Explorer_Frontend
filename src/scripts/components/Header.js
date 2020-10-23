import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(domEventHandlerCombs, doms) {
    super(domEventHandlerCombs);
    this._doms = doms;
  }

  render() {
    /* здесь логику состояния хедера */
    // console.log('this._doms', this._doms);
    // console.log('this._setHandlers', this._setHandlers);
    // this._domEventHandlerCombs = this._doms;
    this._setHandlers();
  }
}

export { Header as default };
