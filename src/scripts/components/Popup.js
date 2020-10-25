import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  constructor(
    parentArgs,
    /* own */
    closeIconSelector,
  ) {
    super(parentArgs);
    /* own */
    this._closeIconSelector = closeIconSelector;
    this.open = this.open.bind(this);
    this._dismiss = this._dismiss.bind(this);
    this._escapeHandler = this._escapeHandler.bind(this);
    this._clickAwayHandler = this._clickAwayHandler.bind(this);
  }

  _escapeHandler(event) {
    if (event.key === 'Escape' && this._popup) {
      this._dismiss();
    }
  }

  _clickAwayHandler(event) {
    if (event.target === this._popup) {
      this._dismiss();
    }
  }

  open() {
    this._create();
    this._popup = this._component;
    this._closeIcon = this._popup.querySelector(this._closeIconSelector);
    this._insertChild();
    this._domEventHandlerMap.push(
      {
        domElement: this._closeIcon,
        event: 'click',
        handler: this._dismiss,
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
    this._setHandlers(); // не может быть в родительском классе
    this._open();
  }
}

export { Popup as default };
