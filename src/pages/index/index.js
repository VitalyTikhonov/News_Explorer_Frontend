/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
import { popupMarkup, popupCloseIconSelector, signupFormMarkup } from '../../scripts/constants/constants';

(function site() {
  /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
  const pageRoot = document.querySelector('.root');
  const header = pageRoot.querySelector('.header');
  const authButton = header.querySelector('.menu__auth-button');
  /* КОЛБЕКИ */
  function createForm(markup) {
    return new Form(markup).render();
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const popup = new Popup(pageRoot, popupMarkup, popupCloseIconSelector);
  // const popup = new Popup(pageRoot, popupMarkup, popupCloseIconSelector);
  const headerObj = new Header(authButton, popup, createForm, signupFormMarkup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
