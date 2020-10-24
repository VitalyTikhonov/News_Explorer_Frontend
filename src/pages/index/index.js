/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
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
    return new Form(signupFormMarkup).render();
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const signUpPopup = new Popup(
    pageRoot,
    popupMarkup,
    popupInnerContainerSelector,
    popupCloseIconSelector,
    createSignupForm,
  );
  const headerObj = new Header(authButton, signUpPopup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
