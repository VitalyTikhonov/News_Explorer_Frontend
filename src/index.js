/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import {
  API_URL,
  CONTENT_TYPE,
  NEWSAPI_TOKEN,
  NEWSAPI_BASE_PATH,
  NEWSAPI_PERIOD,
  NEWSAPI_PAGE_SIZE,
} from './configs/config';
import AccessControl from './scripts/AccessControl';
import MainApi from './scripts/api/MainApi';
import NewsApi from './scripts/api/NewsApi';
import Header from './scripts/components/Header';
import Popup from './scripts/components/Popup';
import DialogForm from './scripts/components/DialogForm';
import NewsSearchForm from './scripts/components/NewsSearchForm';
import ArticleBlock from './scripts/components/ArticleBlock';
import Article from './scripts/components/Article';
import FormValidator from './scripts/FormValidator';
import {
  createNode,
  formatDate,
  getPeriodStartDate,
  // removeClassFromElems,
  // addClassToElems,
  generateSigninEvent,
} from './scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  newsSearchFormConfig,
  messageConfig,
  articleBlockConf,
  headerMenuConfig,
  errorMessages,
} from './scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createArticleOnMainPage(content, keyword) {
    return new Article({
      pageName: pageConfig.pageNames.index,
      indexPageName: pageConfig.pageNames.index,
      savedNewsPageName: pageConfig.pageNames.savedNews,
      markup: articleBlockConf.articleBlockProper.article.markup.forMainPage,
      articleBlockConf,
      createNode,
      content,
      // eslint-disable-next-line no-use-before-define
      mainApi,
      // eslint-disable-next-line no-use-before-define
      popup,
      keyword,
    });
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);

  const accessControl = new AccessControl({
    pageName: pageConfig.pageNames.index,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    api: mainApi,
    pageConfig,
    articleBlockConf,
    generateSigninEvent,
  });

  const newsApi = new NewsApi(
    NEWSAPI_TOKEN,
    NEWSAPI_BASE_PATH,
    NEWSAPI_PERIOD,
    NEWSAPI_PAGE_SIZE,
    formatDate,
    getPeriodStartDate,
  );

  const formValidator = new FormValidator({ errorMessages });

  const signupForm = new DialogForm({
    markup: signupFormConfig.markup,
    createNode,
    nameAttr: signupFormConfig.nameAttr,
    fieldSelectors: signupFormConfig.fieldSelectors,
    errMessageSelectorEnding: signupFormConfig.errMessageSelectorEnding,
    submitButtonTexts: signupFormConfig.submitButtonTexts,
    genFormConfig,
    signupSuccess: messageConfig.signupSuccess,
    // eslint-disable-next-line no-use-before-define
    accessControl,
    api: mainApi,
    formValidator,
  });

  const loginForm = new DialogForm({
    markup: loginFormConfig.markup,
    createNode,
    nameAttr: loginFormConfig.nameAttr,
    fieldSelectors: loginFormConfig.fieldSelectors,
    errMessageSelectorEnding: loginFormConfig.errMessageSelectorEnding,
    submitButtonTexts: loginFormConfig.submitButtonTexts,
    genFormConfig,
    signupSuccess: messageConfig.signupSuccess,
    // eslint-disable-next-line no-use-before-define
    accessControl,
    api: mainApi,
    formValidator,
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
    messageConfig,
  });

  const articleBlock = new ArticleBlock({
    pageName: pageConfig.pageNames.index,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    articleBlockConf,
    createNode,
    createArticle: createArticleOnMainPage,
    pageConfig,
    accessControl,
    popup,
  });

  const newsSearchForm = new NewsSearchForm({
    newsSearchFormConfig,
    // eslint-disable-next-line no-use-before-define
    api: newsApi,
    articleBlock,
    popup,
    messageConfig,
    formValidator,
  });

  const headerObj = new Header({
    pageName: pageConfig.pageNames.index,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    accessControl,
    pageConfig,
    popup,
    headerMenuConfig,
  });

  /* ВЫЗОВЫ ФУНКЦИЙ */
  accessControl.configurePageOnLoad();
  headerObj.render();
  newsSearchForm.render();
}());
