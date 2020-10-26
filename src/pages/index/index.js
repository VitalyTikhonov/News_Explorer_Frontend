/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import { API_URL, CONTENT_TYPE } from '../../configs/config';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
import ActionMessage from '../../scripts/components/ActionMessage';
import MainApi from '../../scripts/api/MainApi';
import { createNode } from '../../scripts/utils/utils';
import {
  pageConfig,
  popupShellConfig,
  signupFormConfig,
  messageConfig,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createPopup(contentsSource) {
    // console.log('createPopup');
    return new Popup(
      {
        parent: pageConfig.rootNode,
        innerContainerSelector: popupShellConfig.innerContainerSelector,
        markup: popupShellConfig.markup,
        contents: contentsSource,
        createNode,
      },
      // pageConfig.rootNode,
      // popupShellConfig.innerContainerSelector,
      // popupShellConfig.markup,
      // contentsSource,
      popupShellConfig.closeIconSelector,
    );
  }

  const generatePopupContents = {
    createSignupForm() {
      // console.log('createSignupForm');
      return new Form(
        { markup: signupFormConfig.markup, createNode },
        // signupFormConfig.markup,
        signupFormConfig.fieldSelectors,
        signupFormConfig.submitButtonSelector,
        signupFormConfig.genErrMessSelector,
        messageConfig.signupSuccess,
        // eslint-disable-next-line no-use-before-define
        mainApi,
      );
    },

    // createLoginForm() {
    //   // eslint-disable-next-line no-use-before-define
    //   return new Form(, mainApi);
    // },

    createActionMessage() {
      return new ActionMessage(messageConfig);
    },
  };
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);
  const headerObj = new Header({}, pageConfig.authButton, createPopup, generatePopupContents);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
