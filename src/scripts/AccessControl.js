class AccessControl {
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

  // _setupForAuth() {
  //   this._addClassToElems(this._elemsForNonAuth, this._addedClassName);
  //   this._removeClassFromElems(this._elemsForAuth, this._removedClassName);
  // }

  // _setupForNonAuth() {
  //   this._addClassToElems(this._elemsForAuth, this._addedClassName);
  //   this._removeClassFromElems(this._elemsForNonAuth, this._removedClassName);
  // }

  _setupForAuth() {
    this._elemsToAddClass = this._elemsForNonAuth;
    this._addClassToElems();
    this._elemsToRemoveClass = this._elemsForAuth;
    this._removeClassFromElems();
  }

  _setupForNonAuth() {
    this._elemsToAddClass = this._elemsForAuth;
    this._addClassToElems();
    this._elemsToRemoveClass = this._elemsForNonAuth;
    this._removeClassFromElems();
  }

  // _setupForAuth() {
  //   // console.log('_setupForAuth');
  //   this._elemsForNonAuth.forEach((element) => {
  //     element.classList.add(this._addedClassName);
  //     // console.log('_elemsForNonAuth', element);
  //   });
  //   this._elemsForAuth.forEach((element) => {
  //     element.classList.remove(this._removedClassName);
  //     // console.log('_elemsForAuth', element);
  //   });
  // }

  // _setupForNonAuth() {
  //   // console.log('elemsForNonAuth', elemsForNonAuth);
  //   this._elemsForNonAuth.forEach((element) => {
  //     element.classList.remove(this._removedClassName);
  //     // console.log('element', element);
  //   });
  //   this._elemsForAuth.forEach((element) => {
  //     element.classList.add(this._addedClassName);
  //     // console.log('element', element);
  //   });
  // }

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
