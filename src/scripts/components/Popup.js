import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  constructor({
    parent,
    innerContainerSelector,
    markup,
    createNode,
    /* own */
    closeIconSelector,
    signupForm,
    loginForm,
    signupFormNameAttr,
    loginFormNameAttr,
    // formPromptLinkSelector,
    messageConfig,
  }) {
    super({
      parent,
      innerContainerSelector,
      markup,
      createNode,
    });
    /* own */
    this._closeIconSelector = closeIconSelector;
    this._signupForm = signupForm;
    this._loginForm = loginForm;
    this._signupFormNameAttr = signupFormNameAttr;
    this._loginFormNameAttr = loginFormNameAttr;
    this._errMessageMarkup = messageConfig.error.markup;
    this._errMessageSelector = messageConfig.error.textSelector;
    // this._createSignupForm = generateContents.createSignupForm;
    // this._createLoginForm = generateContents.createLoginForm;
    // this._signupFormNameAttr = generateContents.signupFormNameAttr;
    // this._loginFormNameAttr = generateContents.loginFormNameAttr;
    /* inner */
    this._domEventHandlerMap = []; // !!!
    this.open = this.open.bind(this);
    this._dismiss = this._dismiss.bind(this);
    this._escapeHandler = this._escapeHandler.bind(this);
    this._clickAwayHandler = this._clickAwayHandler.bind(this);
    this._childDismissalHandler = this._childDismissalHandler.bind(this);
    this._changeFormHandler = this._changeFormHandler.bind(this);
    // this._setAltContents = this._setAltContents.bind(this);
  }

  _childDismissalHandler(event) {
    this._removeChild();
    const newContents = event.detail.replacingNode;
    if (newContents) {
      this._contents = newContents;
      this._insertChild();
      BaseComponent.setHandlers([ // рефакторить
        {
          domElement: newContents,
          event: 'formChangeRequest',
          handler: this._changeFormHandler,
        },
      ]);
    } else {
      this._dismiss();
    }
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

  _createContents() {
    this._form = this._loginForm.create();
    this._domEventHandlerMap.push(
      {
        domElement: this._form,
        event: 'dismissal',
        handler: this._childDismissalHandler,
      },
      {
        domElement: this._form,
        event: 'formChangeRequest',
        handler: this._changeFormHandler,
      },
    );
    return this._form;
  }

  _changeFormHandler(event) {
    if (event.detail === this._signupFormNameAttr) {
      this._form = this._loginForm.create();
    } else {
      this._form = this._signupForm.create();
    }
    this._removeChild();
    this._contents = this._form;
    this._insertChild();
    BaseComponent.setHandlers([ // рефакторить
      {
        domElement: this._form,
        event: 'dismissal',
        handler: this._childDismissalHandler,
      },
      {
        domElement: this._form,
        event: 'formChangeRequest',
        handler: this._changeFormHandler,
      },
    ]);
  }

  _dismiss() {
    BaseComponent.removeHandlers(this._domEventHandlerMap);
    super._dismiss();
  }

  /* to optionally call before open */
  _setAltContents(alternativeNode) {
    this._alternativeNode = alternativeNode;
  }

  createErrorMessage(text) {
    const errorMessageNode = BaseComponent.create(this._errMessageMarkup);
    const errMessageNode = errorMessageNode.querySelector(this._errMessageSelector);
    errMessageNode.textContent = text;
    this._setAltContents(errorMessageNode);
    this.open();
  }

  open() {
    this._create();
    this._popup = this._component;
    this._closeIcon = this._popup.querySelector(this._closeIconSelector);
    if (!this._alternativeNode) {
      this._contents = this._createContents();
    } else {
      this._contents = this._alternativeNode;
    }
    this._insertChild();
    this._alternativeNode = null;
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
    BaseComponent.setHandlers(this._domEventHandlerMap);
    this._open();
    this._popup.focus();
    /* Без focus(), если не установить курсор ни в одно из полей,
    кнопка "Авторизоваться" остается активной, и по Enter открываются новые попапы!
    Должно стоять после открытия! */
  }
}

export { Popup as default };
