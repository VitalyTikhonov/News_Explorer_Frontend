import BaseComponent from './BaseComponent';

class Form extends BaseComponent {
  constructor({
    markup,
    createNode,
  }) {
    super({ markup, createNode });
  }
}

export { Form as default };
