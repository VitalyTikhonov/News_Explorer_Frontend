import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  constructor(pageRoot, popupMarkup, closeIconSelector) {
    super();
    this._pageRoot = pageRoot;
    this._popupMarkup = popupMarkup;
    this._closeIconSelector = closeIconSelector;
    this._popupContents = null;
    this.open = this.open.bind(this);
    this._close = this._close.bind(this);
    this._escapeHandler = this._escapeHandler.bind(this);
    this._clickAwayHandler = this._clickAwayHandler.bind(this);
  }

  _close() {
    this._removeHandlers();
    this._popup.remove();
  }

  _escapeHandler(event) {
    if (event.key === 'Escape' && this._popup) {
      this._close();
    }
  }

  _clickAwayHandler(event) {
    if (event.target === this._popup) {
      this._close();
    }
  }

  set popupContents(value) {
    this._popupContents = value.toString();
  }

  open() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._popupMarkup);
    console.log('typeof this._popupMarkup', typeof this._popupMarkup);
    console.log('this._popupMarkup', this._popupMarkup);
    this._popup = element.firstElementChild;
    this._closeIcon = this._popup.querySelector(this._closeIconSelector);
    console.log('typeof this._popupContents', typeof this._popupContents);
    console.log('this._popupContents', this._popupContents);
    this._popup.insertAdjacentHTML('beforeend', this._popupContents);

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
  }
}

export { Popup as default };
