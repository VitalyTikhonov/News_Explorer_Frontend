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
    articleBlockConf,
  }) {
    super({});
    this._api = api;
    this._pageRootSelector = pageRootSelector;
    this._nonAuthorizedSelector = nonAuthorizedSelector;
    this._authorizedSelector = authorizedSelector;
    this._controlClassName = removalClassName;
    this._cardSaveBtSel = articleBlockConf.articleBlockProperConf.article.selectors.saveButton;
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

  _configurePage(isUserLoggedIn) {
    this._cardSaveButtonArray = this._pageRootSelector.querySelectorAll(this._cardSaveBtSel);
    if (isUserLoggedIn) {
      // console.log('this', this);
      // console.log('this._cardSaveButtonArray', this._cardSaveButtonArray);
      // _setupHeaderForAuth() {
      this._elemsToRemoveClass = this._elemsForAuth;
      this._elemsToAddClass = this._elemsForNonAuth;
      // _setupCardsForAuth() {
      this._cardSaveButtonArray.forEach((button) => {
        button.removeAttribute('disabled');
      });
      this._moveClassBetweenElements();
    } else {
      // _setupHeaderForNonAuth() {
      // console.log('this._cardSaveButtonArray', this._cardSaveButtonArray);
      this._elemsToRemoveClass = this._elemsForNonAuth;
      this._elemsToAddClass = this._elemsForAuth;
      this._moveClassBetweenElements();
      // _setupCardsForNonAuth() {
      this._cardSaveButtonArray.forEach((button) => {
        button.setAttribute('disabled', 'disabled');
      });
    }
  }

  configurePageOnLoad() {
    this._elemsForNonAuth = this._pageRootSelector.querySelectorAll(this._nonAuthorizedSelector);
    this._elemsForAuth = this._pageRootSelector.querySelectorAll(this._authorizedSelector);
    this.checkUserStatus()
      .then(() => {
        if (this.isUserLoggedIn) {
          this._configurePage(this.isUserLoggedIn);
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
        this._configurePage(this.isUserLoggedIn);
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
        this._configurePage(this.isUserLoggedIn);
      });
  }
}

export { AccessControl as default };
