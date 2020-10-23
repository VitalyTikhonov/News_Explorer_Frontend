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
  const popup = new Popup(pageRoot);
  const headerObj = new Header(authButton, popup);
  // const headerObj = new Header([{ domElement: authButton, event: 'click', handler: openPopup }]);
  /* ВЫЗОВЫ ФУНКЦИЙ */
  headerObj.render();
}());
