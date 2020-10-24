import Popup from './Popup';

class FormPopup extends Popup {
  constructor(pageRoot, popupMarkup, closeIconSelector, formMarkup) {
    super();
    this._pageRoot = pageRoot;
    this._popupMarkup = popupMarkup;
    this._closeIconSelector = closeIconSelector;
    this._formMarkup = formMarkup;
    this.open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._escapeHandler = this._escapeHandler.bind(this);
    this._clickAwayHandler = this._clickAwayHandler.bind(this);
  }

  _open() {
    this._popup.insertAdjacentHTML('beforeend', this._formMarkup);
    this._form = this._popup.lastElementChild;
    // this._closeIcon = this._popup.querySelector(this._closeIconSelector);

    this._domEventHandlerMap.push(
      {
        domElement: this._closeIcon,
        event: 'click',
        handler: this._close,
      },
      {
        domElement: document,
        event: 'keydown',
        handler: this._escapeHandler,
      },
      {
        domElement: this._popup,
        event: 'click',
        handler: this._clickAwayHandler,
      },
    );
    this._setHandlers();
    this._pageRoot.appendChild(this._popup);
    super._open();
  }
}

export { FormPopup as default };
