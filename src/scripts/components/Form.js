import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(container, markup, formProcessor) {
    super();
    this._container = container;
    this._markup = markup;
    this._processForm = formProcessor;
    // this.open = this._open.bind(this);
    // this._close = this._close.bind(this);
    // this._escapeHandler = this._escapeHandler.bind(this);
    // this._clickAwayHandler = this._clickAwayHandler.bind(this);
  }

  // _formSubmitHandler(event) {
  //   event.preventDefault();
  //   // this.toggleButtonText(false);
  //   this._processForm(this._form)
  //     .then(() => {
  //       this._form.reset();
  //     })
  //     .catch((err) => {
  //       alert(`Произошла ошибка: ${err.status} ${err.statusText}`);
  //     })
  //     .finally(() => {
  //       // this.toggleButtonText(true);
  //     });
  // }

  _render() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._markup);
    this._form = element.firstElementChild;
    this._domElements.closeIcon = this._form.querySelector('.popup__close-icon');

    // this._domEventHandlerMap.push(
    //   {
    //     domElement: ,
    //     event: 'click',
    //     handler: ,
    //   },
    // );
    this._setHandlers();
    this._container.appendChild(this._form);
  }
}

export { Form as default };
