/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import {
  API_URL,
  CONTENT_TYPE,
} from '../../configs/config';
import AccessControl from '../../scripts/AccessControl';
import MainApi from '../../scripts/api/MainApi';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import ArticleBlock from '../../scripts/components/ArticleBlock';
import Article from '../../scripts/components/Article';
import {
  createNode,
} from '../../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  signupFormConfig,
  loginFormConfig,
  messageConfig,
  articleBlockConf,
  headerMenuConfig,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createArticleForNonAuth(content, keyword) {
    return new Article({
      markup: articleBlockConf.articleBlockProper.article.markup.forSavedNewsPage,
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

  function createArticleBlockObj() {
    return new ArticleBlock({
      articleBlockConf,
      createNode,
      createArticle: createArticleForNonAuth,
      pageConfig,
      // eslint-disable-next-line no-use-before-define
      accessControl,
    });
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);

  const accessControl = new AccessControl({
    pageName: pageConfig.pageNames.savedNews,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    api: mainApi,
    pageRootNode: pageConfig.rootNode,
    nonAuthorizedSelector: pageConfig.accessMarkers.nonAuthorizedSelector,
    authorizedSelector: pageConfig.accessMarkers.authorizedSelector,
    removalClassName: pageConfig.accessMarkers.removalClassName,
    articleBlockConf,
    createArticleBlockObj,
  });

  const popup = new Popup({
    parent: pageConfig.rootNode,
    innerContainerSelector: popupShellConfig.innerContainerSelector,
    markup: popupShellConfig.markup,
    createNode,
    closeIconSelector: popupShellConfig.closeIconSelector,
    signupFormNameAttr: signupFormConfig.nameAttr,
    loginFormNameAttr: loginFormConfig.nameAttr,
    messageConfig,
  });

  const headerObj = new Header({
    pageName: pageConfig.pageNames.savedNews,
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
}());
