/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import {
  NODE_ENV,
  API_URL,
  CONTENT_TYPE,
} from '../../configs/config';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
import MainApi from '../../scripts/api/MainApi';
import {
  pageRoot,
  // header,
  authButton,
  popupMarkup,
  popupInnerContainerSelector,
  popupCloseIconSelector,
  signupFormMarkup,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  function createSignupForm() {
    return new Form(signupFormMarkup, mainApi).render();
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi({ API_URL, CONTENT_TYPE });
  const signUpPopup = new Popup(
    pageRoot,
    popupMarkup,
    popupInnerContainerSelector,
    popupCloseIconSelector,
    createSignupForm,
  );
  const headerObj = new Header(authButton, signUpPopup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  console.log('NODE_ENV', NODE_ENV);
  headerObj.render();
}());
