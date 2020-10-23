import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  constructor(pageRoot) {
    super();
    this._pageRoot = pageRoot;
    this._domElements = {};
    this.open = this._open.bind(this);
    this._close = this._close.bind(this);
  }

  _open() {
    const markup = `
        <div class="popup">
          <div class="popup__content">
            <button type="button"
                class="popup__close-icon button__modal button__modal_cross-white button_hover-on-black"></button>
          </div>
        </div>
    `;
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup);
    this._popup = element.firstElementChild;
    this._domElements.closeIcon = this._popup.querySelector('.popup__close-icon');

    this._domEventHandlerMap.push({ domElement: this._domElements.closeIcon, event: 'click', handler: this._close });
    /* здесь логику состояния хедера */
    this._setHandlers();
    this._pageRoot.appendChild(this._popup);
  }

  _close() {
    this._removeHandlers();
    this._popup.remove();
  }
}

export { Popup as default };
