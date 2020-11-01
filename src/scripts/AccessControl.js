import BaseComponent from './components/BaseComponent';
/* Наследование BaseComponent в этом классе – вынужденное временное решение,
связанное с тем, что вынести методы для замены классов в DOM-узлах в utils не получается
(модуль их почему-то не видит там, как не прописывал). */

class AccessControl extends BaseComponent {
  constructor({
    api,
    pageName,
    indexPageName,
    savedNewsPageName,
    pageConfig,
    articleBlockConf,
    createArticleBlockObj,
    generateSigninEvent,
  }) {
    super({ pageName, indexPageName, savedNewsPageName });
    this._api = api;
    this._pageRootNode = pageConfig.rootNode;
    this._logoutButtonProperArray = pageConfig.logoutButtonProperArray;
    this._nonAuthorizedSelector = pageConfig.accessMarkers.nonAuthorizedSelector;
    this._authorizedSelector = pageConfig.accessMarkers.authorizedSelector;
    this._controlClassName = pageConfig.accessMarkers.removalClassName;
    this._cardSaveBtSel = articleBlockConf.articleBlockProper.article.saveButton.selector;
    this._cardTooltipSel = articleBlockConf.articleBlockProper.article.tooltip.selector;
    this._tooltipNonAuthText = articleBlockConf.articleBlockProper.article.tooltip.nonAuthText;
    this._tooltipUnsavedText = articleBlockConf.articleBlockProper.article.tooltip.unsavedText;
    this._tooltipSavedText = articleBlockConf.articleBlockProper.article.tooltip.savedText;
    this._ttipTextSel = articleBlockConf.articleBlockProper.article.tooltip.textSelector;
    this._ttipNonAuthMarkup = articleBlockConf.articleBlockProper.article.tooltip.nonAuthTextMarkup;
    this._ttipUnsavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.unsavedTextMarkup;
    this._ttipSavedMarkup = articleBlockConf.articleBlockProper.article.tooltip.savedTextMarkup;
    this._createArticleBlockObj = createArticleBlockObj;
    this._generateSigninEvent = generateSigninEvent;
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
        // console.log('checkUserStatus res', res);
        this.userName = res.name;
        this.isUserLoggedIn = true;
        // this._generateSigninEvent(res.name);
      })
      .catch(() => {
        // console.log('checkUserStatus', err); // добавить err в параметры
        this.isUserLoggedIn = false;
      });
  }

  getUserStatus() {
    return this.isUserLoggedIn;
  }

  getUserName() {
    return this.userName;
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

  _setLogoutButtonText() {
    this._logoutButtonProperArray.forEach((button) => {
      button.prepend(this.userName);
    });
  }

  _removetLogoutButtonText() {
    this._logoutButtonProperArray.forEach((button) => {
      button.firstChild.remove();
    });
  }

  _configurePage() {
    this._cardSaveButtonArray = this._pageRootNode.querySelectorAll(this._cardSaveBtSel);
    this._cardTooltipArray = this._pageRootNode.querySelectorAll(this._cardTooltipSel);
    if (this.isUserLoggedIn) {
      // _setupHeaderForAuth() {
      this._elemsToRemoveClass = this._elemsForAuth;
      this._elemsToAddClass = this._elemsForNonAuth;
      this._moveClassBetweenElements();
      this._setLogoutButtonText();
      this._cardSaveButtonArray.forEach((button) => {
        button.removeAttribute('disabled');
      });
      this._cardTooltipArray.forEach((tooltip) => {
        // eslint-disable-next-line no-param-reassign
        // tooltip.textContent = this._tooltipUnsavedText;
        const texNode = tooltip.querySelector(this._ttipTextSel);
        BaseComponent.replaceChildWithNewlyCreated(tooltip, texNode, this._ttipUnsavedMarkup);
      });
    } else {
      // _setupHeaderForNonAuth() {
      this._elemsToRemoveClass = this._elemsForNonAuth;
      this._elemsToAddClass = this._elemsForAuth;
      this._moveClassBetweenElements();
      this._removetLogoutButtonText();
      // _setupCardsForNonAuth() {
      this._cardSaveButtonArray.forEach((button) => {
        button.setAttribute('disabled', 'disabled');
      });
      this._cardTooltipArray.forEach((tooltip) => {
        const texNode = tooltip.querySelector(this._ttipTextSel);
        BaseComponent.replaceChildWithNewlyCreated(tooltip, texNode, this._ttipNonAuthMarkup);
      });
    }
  }

  static redirectToIndex() {
    window.location.replace('./');
  }

  configurePageOnLoad() {
    this._elemsForNonAuth = this._pageRootNode.querySelectorAll(this._nonAuthorizedSelector);
    this._elemsForAuth = this._pageRootNode.querySelectorAll(this._authorizedSelector);
    this.checkUserStatus()
      .then(() => {
        // console.log('this._savedNewsPageName', this._savedNewsPageName);
        // console.log('this.isUserLoggedIn', this.isUserLoggedIn);
        // console.log('this._pageName', this._pageName);
        switch (this._pageName) {
          case this._indexPageName:
            if (this.isUserLoggedIn) {
              this._configurePage();
            }
            break;
          case this._savedNewsPageName:
            if (!this.isUserLoggedIn) {
              AccessControl.redirectToIndex();
            } else {
              this._setLogoutButtonText();
              this._createArticleBlockObj().renderSavedArticles();
            }
            break;
          default:
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signin(fieldValueMap) {
    return this._api.signin(fieldValueMap)
      .then((res) => {
        this.userName = res.name;
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
        switch (this._pageName) {
          case this._indexPageName:
            this._configurePage();
            break;
          case this._savedNewsPageName:
            AccessControl.redirectToIndex();
            break;
          default:
        }
      });
  }
}

export { AccessControl as default };
