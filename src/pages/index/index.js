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
import DialogForm from '../../scripts/components/DialogForm';
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

  const signupForm = new DialogForm({
    markup: signupFormConfig.markup,
    createNode,
    nameAttr: signupFormConfig.nameAttr,
    fieldSelectors: signupFormConfig.fieldSelectors,
    genFormConfig,
    signupSuccess: messageConfig.signupSuccess,
    // eslint-disable-next-line no-use-before-define
    api: mainApi,
  });

  const loginForm = new DialogForm({
    markup: loginFormConfig.markup,
    createNode,
    nameAttr: loginFormConfig.nameAttr,
    fieldSelectors: loginFormConfig.fieldSelectors,
    genFormConfig,
    signupSuccess: messageConfig.signupSuccess,
    // eslint-disable-next-line no-use-before-define
    api: mainApi,
  });

  const popup = new Popup({
    parent: pageConfig.rootNode,
    innerContainerSelector: popupShellConfig.innerContainerSelector,
    markup: popupShellConfig.markup,
    createNode,
    closeIconSelector: popupShellConfig.closeIconSelector,
    signupForm,
    loginForm,
    signupFormNameAttr: signupFormConfig.nameAttr,
    loginFormNameAttr: loginFormConfig.nameAttr,
  });

  const newsSearchForm = new NewsSearchForm({
    newsSearchFormConfig,
    // eslint-disable-next-line no-use-before-define
    api: newsApi,
  });

  const headerObj = new Header({
    mainApi,
    pageConfig,
    popup,
  });

  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
  newsSearchForm.render();
}());
