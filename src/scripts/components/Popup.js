import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  // constructor(domEventHandlerCombs) {
  //   super(domEventHandlerCombs);
  // }
  // constructor() {
  // }

  render() {
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
  }
}

export { Popup as default };
