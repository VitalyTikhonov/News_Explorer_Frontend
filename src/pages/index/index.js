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
import AccessControl from '../../scripts/AccessControl';
import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import DialogForm from '../../scripts/components/DialogForm';
import NewsSearchForm from '../../scripts/components/NewsSearchForm';
import ArticleBlock from '../../scripts/components/ArticleBlock';
import Article from '../../scripts/components/Article';
import {
  createNode,
  formatDate,
  getPeriodStartDate,
  // removeClassFromElems,
  // addClassToElems,
} from '../../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  newsSearchFormConfig,
  messageConfig,
  articleBlockConfig,
  headerMenuConfig,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createArticleOnMainPage(content) {
    return new Article({
      markup: articleBlockConfig.article.markup.forMainPage,
      articleBlockConfig,
      createNode,
      content,
      // eslint-disable-next-line no-use-before-define
      accessControl,
    });
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);

  const accessControl = new AccessControl({
    api: mainApi,
    pageRootSelector: pageConfig.rootNode,
    nonAuthorizedSelector: pageConfig.accessMarkers.nonAuthorizedSelector,
    authorizedSelector: pageConfig.accessMarkers.authorizedSelector,
    removalClassName: pageConfig.accessMarkers.removalClassName,
    articleBlockConfig,
  });

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
    accessControl,
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
    accessControl,
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

  const articleBlock = new ArticleBlock({
    articleBlockConfig,
    createNode,
    createArticle: createArticleOnMainPage,
    pageConfig,
  });

  const newsSearchForm = new NewsSearchForm({
    newsSearchFormConfig,
    // eslint-disable-next-line no-use-before-define
    api: newsApi,
    articleBlock,
  });

  const headerObj = new Header({
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
