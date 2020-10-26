/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import { API_URL, CONTENT_TYPE } from '../../configs/config';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
import MainApi from '../../scripts/api/MainApi';
import { createNode } from '../../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  messageConfig,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  const generatePopupContents = {
    createSignupForm() {
      // console.log('createSignupForm');
      return new Form(
        { markup: signupFormConfig.markup, createNode },
        // signupFormConfig.markup,
        signupFormConfig.nameAttr,
        signupFormConfig.fieldSelectors,
        genFormConfig,
        messageConfig.signupSuccess,

        // eslint-disable-next-line no-use-before-define
        mainApi,
      );
    },

    createLoginForm() {
      // console.log('createLoginForm');
      return new Form(
        { markup: loginFormConfig.markup, createNode },
        // loginFormConfig.markup,
        loginFormConfig.nameAttr,
        loginFormConfig.fieldSelectors,
        genFormConfig,
        messageConfig.signupSuccess,
        // eslint-disable-next-line no-use-before-define
        mainApi,
      );
    },
    signupFormNameAttr: signupFormConfig.nameAttr,
    loginFormNameAttr: loginFormConfig.nameAttr,
  };

  function createPopup(isUserLoggedIn) {
    // console.log('createPopup');
    return new Popup(
      {
        parent: pageConfig.rootNode,
        innerContainerSelector: popupShellConfig.innerContainerSelector,
        markup: popupShellConfig.markup,
        createNode,
      },
      // pageConfig.rootNode,
      // popupShellConfig.innerContainerSelector,
      // popupShellConfig.markup,
      // contentsSource,
      popupShellConfig.closeIconSelector,
      isUserLoggedIn,
      generatePopupContents,
      // genFormConfig.promptLinkSelector,
    );
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);
  const headerObj = new Header(
    {},
    mainApi,
    pageConfig.authButton,
    pageConfig.optionForAuthUsers,
    createPopup,
  );
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
