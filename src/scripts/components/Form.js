import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor(markup, formProcessor) {
    super();
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

  render() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this._markup);
    // console.log('this._markup', this._markup);
    // console.log('element', element);
    // console.log('element.firstElementChild', element.firstElementChild);
    this._form = element.firstElementChild;
    // this._domEventHandlerMap.push(
    //   {
    //     domElement: ,
    //     event: 'click',
    //     handler: ,
    //   },
    // );
    // this._setHandlers();
    return this._form;
  }
}

export { Form as default };
