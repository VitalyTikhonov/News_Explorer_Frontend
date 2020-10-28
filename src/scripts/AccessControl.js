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
    cardSaveButton,
    // removeClassFromElems,
    // addClassToElems,
  }) {
    super({});
    this._api = api;
    this._pageRootSelector = pageRootSelector;
    this._nonAuthorizedSelector = nonAuthorizedSelector;
    this._authorizedSelector = authorizedSelector;
    this._controlClassName = removalClassName;
    this._cardSaveButton = cardSaveButton;
    // this._removeClassFromElems = removeClassFromElems;
    // this._addClassToElems = addClassToElems;
    /* inner */
    this._isLoggedIn = false;
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

  _setupForAuth() {
    this._elemsToRemoveClass = this._elemsForAuth;
    this._elemsToAddClass = this._elemsForNonAuth;
    this._moveClassBetweenElements();
  }

  _setupForNonAuth() {
    this._elemsToRemoveClass = this._elemsForNonAuth;
    this._elemsToAddClass = this._elemsForAuth;
    this._moveClassBetweenElements();
  }

  configurePageOnLogin() {
    this._elemsForNonAuth = this._pageRootSelector.querySelectorAll(this._nonAuthorizedSelector);
    this._elemsForAuth = this._pageRootSelector.querySelectorAll(this._authorizedSelector);
    // console.log('this._checkUserStatus()', this._checkUserStatus());
    this._checkUserStatus()
      .then(() => {
        // console.log('res', res); // почему unfdefined??
        // console.log('this._isLoggedIn', this._isLoggedIn);
        if (this._isLoggedIn) {
          this._setupForAuth();
        }
      })
      .catch((err) => {
        const error = new Error();
        error.message = err;
        throw error;
      });
  }
}

export { AccessControl as default };
