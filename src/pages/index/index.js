/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import {
  API_URL,
  CONTENT_TYPE,
  NEWSAPI_TOKEN,
  NEWSAPI_BASE_PATH,
  NEWSAPI_PERIOD,
  NEWSAPI_PAGE_SIZE,
} from '../../configs/config';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import UserDataForm from '../../scripts/components/UserDataForm';
import NewsSearchForm from '../../scripts/components/NewsSearchForm';
import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import { createNode, formatDate, getPeriodStartDate } from '../../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  newsSearchFormConfig,
  messageConfig,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  const generatePopupContents = {
    createSignupForm() {
      return new UserDataForm(
        { markup: signupFormConfig.markup, createNode },
        {
          nameAttr: signupFormConfig.nameAttr,
          fieldSelectors: signupFormConfig.fieldSelectors,
          genFormConfig,
          signupSuccess: messageConfig.signupSuccess,
          // eslint-disable-next-line no-use-before-define
          api: mainApi,
        },
      );
    },

    createLoginForm() {
      return new UserDataForm(
        { markup: loginFormConfig.markup, createNode },
        {
          nameAttr: loginFormConfig.nameAttr,
          fieldSelectors: loginFormConfig.fieldSelectors,
          genFormConfig,
          signupSuccess: messageConfig.signupSuccess,
          // eslint-disable-next-line no-use-before-define
          api: mainApi,
        },
      );
    },
    signupFormNameAttr: signupFormConfig.nameAttr,
    loginFormNameAttr: loginFormConfig.nameAttr,
  };

  function createPopup(isUserLoggedIn) {
    return new Popup(
      {
        parent: pageConfig.rootNode,
        innerContainerSelector: popupShellConfig.innerContainerSelector,
        markup: popupShellConfig.markup,
        createNode,
      },
      popupShellConfig.closeIconSelector,
      isUserLoggedIn,
      generatePopupContents,
    );
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);
  const newsApi = new NewsApi(
    NEWSAPI_TOKEN,
    NEWSAPI_BASE_PATH,
    NEWSAPI_PERIOD,
    NEWSAPI_PAGE_SIZE,
    formatDate,
    getPeriodStartDate,
  );
  const newsSearchForm = new NewsSearchForm(
    {},
    newsSearchFormConfig.selector,
    newsSearchFormConfig.fieldSelector,
    newsSearchFormConfig.submitButtonSelector,
    genFormConfig,
    // eslint-disable-next-line no-use-before-define
    newsApi,
  );
  const headerObj = new Header(
    {},
    mainApi,
    pageConfig.authButton,
    pageConfig.optionForAuthUsers,
    createPopup,
  );
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
  newsSearchForm.render();
}());
