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
    this.isUserLoggedIn = false;
    this.signout = this.signout.bind(this);
    this.checkUserStatus = this.checkUserStatus.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
    // this.setButtonState = this.setButtonState.bind(this);
  }

  checkUserStatus() {
    return this._api.authenticate()
      .then((res) => {
        this.isUserLoggedIn = true;
        /* isLoggedIn — залогинен ли пользователь;
        userName */
        // console.log(res);
        // console.log('this AccessC', this);
        // console.log('this.isUserLoggedIn', this.isUserLoggedIn);
      })
      .catch(() => {
        // console.log(err);
        this.isUserLoggedIn = false;
        // console.log('catch chekUS', this.isUserLoggedIn);
      });
  }

  getUserStatus() {
    return this.isUserLoggedIn;
  }
  // setButtonState(button) {
  //   if (this.isUserLoggedIn) {
  //     button.removeAttribute('disabled');
  //   } else {
  //     button.setAttribute('disabled', 'disabled');
  //   }
  // }

  // setMultipleButtonsState(buttonArray) {
  //   if (this.isUserLoggedIn) {
  //     buttonArray.forEach((button) => {
  //       button.removeAttribute('disabled');
  //     });
  //   } else {
  //     buttonArray.forEach((button) => {
  //       button.setAttribute('disabled', 'disabled');
  //     });
  //   }
  // }

  _setupHeaderForAuth() {
    this._elemsToRemoveClass = this._elemsForAuth;
    this._elemsToAddClass = this._elemsForNonAuth;
    this._moveClassBetweenElements();
  }

  _setupHeaderForNonAuth() {
    this._elemsToRemoveClass = this._elemsForNonAuth;
    this._elemsToAddClass = this._elemsForAuth;
    this._moveClassBetweenElements();
  }

  configurePageOnLoad() {
    this._elemsForNonAuth = this._pageRootSelector.querySelectorAll(this._nonAuthorizedSelector);
    this._elemsForAuth = this._pageRootSelector.querySelectorAll(this._authorizedSelector);
    // this._cardSaveButtonArray = this._pageRootSelector
    //   .querySelectorAll(this._cardSaveButtonSelector);
    this.checkUserStatus()
      .then(() => {
        if (this.isUserLoggedIn) {
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
        this.isUserLoggedIn = true;
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
        this.isUserLoggedIn = false;
        this._setupHeaderForNonAuth();
      });
  }
}

export { AccessControl as default };
