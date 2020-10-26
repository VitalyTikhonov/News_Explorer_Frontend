import BaseComponent from './BaseComponent';

class Popup extends BaseComponent {
  constructor(
    parentArgs,
    /* own */
    closeIconSelector,
    isUserLoggedIn,
    generateContents,
    // formPromptLinkSelector,
  ) {
    super(parentArgs);
    /* own */
    this._closeIconSelector = closeIconSelector;
    this._isUserLoggedIn = isUserLoggedIn;
    this._createSignupForm = generateContents.createSignupForm;
    this._createLoginForm = generateContents.createLoginForm;
    this._signupFormNameAttr = generateContents.signupFormNameAttr;
    this._loginFormNameAttr = generateContents.loginFormNameAttr;
    // this._formPromptLinkSelector = formPromptLinkSelector;
    this.open = this.open.bind(this);
    this.dismiss = this._dismiss.bind(this);
    this._escapeHandler = this._escapeHandler.bind(this);
    this._clickAwayHandler = this._clickAwayHandler.bind(this);
    this._childDismissalHandler = this._childDismissalHandler.bind(this);
    this._changeFormHandler = this._changeFormHandler.bind(this);
  }

  _childDismissalHandler(event) {
    this._removeChild();
    const newContents = event.detail.replacingNode;
    // this._newPromptLink = event.detail.promptLink;
    if (newContents) {
      this._contents = newContents;
      this._insertChild();
      this._domEventHandlerMap.push( // рефакторить
        {
          domElement: newContents,
          event: 'formChangeRequest',
          handler: this._changeFormHandler,
        },
      );
      this._setHandlers();
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
    // if (this._isUserLoggedIn === false) {
    //   this._formObj = this._createSignupForm();
    // } else {
    this._formObj = this._createLoginForm();
    // }
    this._form = this._formObj.create();
    return this._form;
  }

  _changeFormHandler(event) {
    if (event.detail === this._signupFormNameAttr) {
      this._formObj = this._createLoginForm();
    } else {
      this._formObj = this._createSignupForm();
    }
    this._form = this._formObj.create();
    this._removeChild();
    this._contents = this._form;
    this._insertChild();
    this._domEventHandlerMap.push( // рефакторить
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
    this._setHandlers();
  }

  open() {
    this._create();
    this._popup = this._component;
    this._closeIcon = this._popup.querySelector(this._closeIconSelector);
    this._contents = this._createContents();
    // this._formPromptLink = this._form.querySelector(this._formPromptLinkSelector);
    this._insertChild();
    this._domEventHandlerMap.push(
      {
        domElement: this._closeIcon,
        event: 'click',
        handler: this.dismiss,
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
    this._setHandlers(); // не может быть в родительском классе
    this._open();
    this._popup.focus();
    /* Без focus(), если не установить курсор ни в одно из полей,
    кнопка "Авторизоваться" остается активной, и по Enter открываются новые попапы!
    Должно стоять после открытия! */
  }
}

export { Popup as default };
