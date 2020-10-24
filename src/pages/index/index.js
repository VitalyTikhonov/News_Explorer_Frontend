/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import Header from '../../scripts/components/Header';
import FormPopup from '../../scripts/components/FormPopup';
import { popupMarkup, popupCloseIconSelector, signupFormMarkup } from '../../scripts/constants/constants';

(function site() {
  /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
  const pageRoot = document.querySelector('.root');
  const header = pageRoot.querySelector('.header');
  const authButton = header.querySelector('.menu__auth-button');
  /* КОЛБЕКИ */
  function renderFormPopup() {
    return new FormPopup(pageRoot, popupMarkup, popupCloseIconSelector, signupFormMarkup);
  }
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  // const popup = new Popup(pageRoot, popupMarkup, popupCloseIconSelector);
  const headerObj = new Header(authButton, renderFormPopup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
