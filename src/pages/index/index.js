/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import { API_URL, CONTENT_TYPE } from '../../configs/config';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';
import Form from '../../scripts/components/Form';
import MainApi from '../../scripts/api/MainApi';
import {
  page,
  popupShell,
  signupForm,
} from '../../scripts/constants/constants';

(function site() {
  /* КОЛБЕКИ */
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const mainApi = new MainApi(API_URL, CONTENT_TYPE);
  const signupFormObj = new Form(signupForm, mainApi);
  const signUpPopup = new Popup(
    page.rootNode,
    popupShell,
    signupFormObj,
  );
  const headerObj = new Header(page.authButton, signUpPopup);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
