import BaseComponent from './components/BaseComponent';
/* Наследование BaseComponent в этом классе – вынужденное временное решение,
связанное с тем, что вынести методы для замены классов в DOM-узлах в utils не получается
(модуль их почему-то не видит там, как не прописывал). */

class AccessControl extends BaseComponent {
  constructor({
    api,
    pageRootSelector,
    nonAuthorizedSelector,
    authorizedSelector,
    removalClassName,
    articleBlockConfig,
  }) {
    super({});
    this._api = api;
    this._pageRootSelector = pageRootSelector;
    this._nonAuthorizedSelector = nonAuthorizedSelector;
    this._authorizedSelector = authorizedSelector;
    this._controlClassName = removalClassName;
    this._articleBlockConfig = articleBlockConfig;
    this._cardSaveButtonSelector = articleBlockConfig.article.selectors.saveButton;
    /* inner */
    this._isLoggedIn = false;
    this.signout = this.signout.bind(this);
    this.setButtonState = this.setButtonState.bind(this);
  }

  _checkUserStatus() {
    return this._api.authenticate()
      .then((res) => {
        this._isLoggedIn = true;
        /* isLoggedIn — залогинен ли пользователь;
        userName */
        console.log(res);
      })
      .catch(() => {
        // console.log(err);
        this._isLoggedIn = false;
        // console.log(this._isLoggedIn);
      })
      .finally(() => this._isLoggedIn);
    // console.log('this._isLoggedIn', this._isLoggedIn);
  }

  setButtonState(button) {
    if (this._isLoggedIn) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

  setMultipleButtonsState(buttonArray) {
    if (this._isLoggedIn) {
      buttonArray.forEach((button) => {
        button.removeAttribute('disabled');
      });
    } else {
      buttonArray.forEach((button) => {
        button.setAttribute('disabled', 'disabled');
      });
    }
  }

  _setupHeaderForAuth() {
    this._elemsToRemoveClass = this._elemsForAuth;
    this._elemsToAddClass = this._elemsForNonAuth;
    this._moveClassBetweenElements();
  }

  _setupHeaderNonAuth() {
    this._elemsToRemoveClass = this._elemsForNonAuth;
    this._elemsToAddClass = this._elemsForAuth;
    this._moveClassBetweenElements();
  }

  configurePageOnLoad() {
    this._elemsForNonAuth = this._pageRootSelector.querySelectorAll(this._nonAuthorizedSelector);
    this._elemsForAuth = this._pageRootSelector.querySelectorAll(this._authorizedSelector);
    this._cardSaveButtonArray = this._pageRootSelector
      .querySelectorAll(this._cardSaveButtonSelector);
    this._checkUserStatus()
      .then(() => {
        // console.log('res', res); // почему unfdefined??
        // console.log('this._isLoggedIn', this._isLoggedIn);
        if (this._isLoggedIn) {
          this._setupHeaderForAuth();
        }
      })
      .catch((err) => {
        const error = new Error();
        error.message = err;
        throw error;
      });
  }

  signin(fieldValueMap) {
    return this._api.signin(fieldValueMap)
      .then((res) => {
        // console.log(res);
        this._isLoggedIn = true;
        this._setupHeaderForAuth();
        return res;
      });
  }

  signout() {
    this._api.signout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._isLoggedIn = false;
        this._setupHeaderNonAuth();
      });
  }
}

export { AccessControl as default };
