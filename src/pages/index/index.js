/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import { API_URL, CONTENT_TYPE } from '../../configs/config';
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
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi({ API_URL, CONTENT_TYPE });
  const signupForm = new Form(signupFormMarkup, mainApi);
  const signUpPopup = new Popup(
    pageRoot,
    popupMarkup,
    popupInnerContainerSelector,
    popupCloseIconSelector,
    signupForm,
  );
  const headerObj = new Header(authButton, signUpPopup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
