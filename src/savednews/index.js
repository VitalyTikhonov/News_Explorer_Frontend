/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import {
  API_URL,
  CONTENT_TYPE,
  ARTICLE_PORTION_SIZE,
} from '../configs/config';
import AccessControl from '../scripts/AccessControl';
import MainApi from '../scripts/api/MainApi';
import Header from '../scripts/components/Header';
import Popup from '../scripts/components/Popup';
import ArticleBlock from '../scripts/components/ArticleBlock';
import Article from '../scripts/components/Article';
// eslint-disable-next-line no-unused-vars
import SavedNewsIntro from '../scripts/components/SavedNewsIntro';
import {
  createNode,
  getAsNumberAndLastDigit,
} from '../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  messageConfig,
  articleBlockConf,
  headerMenuConfig,
  savedNewsIntroConfig,
} from '../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createArticleForNonAuth(content) {
    return new Article({
      pageName: pageConfig.pageNames.savedNews,
      indexPageName: pageConfig.pageNames.index,
      savedNewsPageName: pageConfig.pageNames.savedNews,
      markup: articleBlockConf.articleBlockProper.article.markup.forSavedNewsPage,
      articleBlockConf,
      createNode,
      content,
      // eslint-disable-next-line no-use-before-define
      mainApi,
      // eslint-disable-next-line no-use-before-define
      popup,
      // eslint-disable-next-line no-use-before-define
      savedNewsIntro,
    });
  }

  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const articleBlock = new ArticleBlock({
    pageName: pageConfig.pageNames.savedNews,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    articleBlockConf,
    createNode,
    createArticle: createArticleForNonAuth,
    pageConfig,
    ARTICLE_PORTION_SIZE,
  });

  const mainApi = new MainApi(API_URL, CONTENT_TYPE);

  const savedNewsIntro = new SavedNewsIntro({
    pageConfig,
    savedNewsIntroConfig,
    getAsNumberAndLastDigit,
  });

  const accessControl = new AccessControl({
    pageName: pageConfig.pageNames.savedNews,
    indexPageName: pageConfig.pageNames.index,
    savedNewsPageName: pageConfig.pageNames.savedNews,
    api: mainApi,
    pageConfig,
    articleBlockConf,
    // eslint-disable-next-line no-use-before-define
    savedNewsIntro,
  });

  const popup = new Popup({
    parent: pageConfig.rootNode,
    innerContainerSelector: popupShellConfig.innerContainerSelector,
    markup: popupShellConfig.markup,
    createNode,
    closeIconSelector: popupShellConfig.closeIconSelector,
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
  accessControl.setDependencies({ articleBlock });
  articleBlock.setDependencies({
    accessControl,
    mainApi,
    savedNewsIntro,
    popup,
  });
  savedNewsIntro.setDependencies({ articleBlock });

  accessControl.configurePageOnLoad();
  headerObj.render();
}());
