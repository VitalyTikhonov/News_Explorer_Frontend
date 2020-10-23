/* ИМПОРТ МОДУЛЕЙ */
import './index.css';
import Header from '../../scripts/components/Header';
import Popup from '../../scripts/components/Popup';

(function site() {
  /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
  const pageRoot = document.querySelector('.root');
  const header = pageRoot.querySelector('.header');
  const authButton = header.querySelector('.menu__auth-button');
  /* КОЛБЕКИ */
  /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
  const popup = new Popup(undefined, { pageRoot });
  const headerObj = new Header(undefined, { header, authButton });
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
