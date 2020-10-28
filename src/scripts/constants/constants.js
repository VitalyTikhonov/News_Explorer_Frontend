const rootNode = document.querySelector('.root');
const header = rootNode.querySelector('.header');
const authButton = header.querySelector('.menu__auth-button-wrap');
// const authButton = header.querySelector('.menu__auth-button');
const accessMarkers = {
  authorizedSelector: '.visibility__for-authorized',
  nonAuthorizedSelector: '.visibility__for-non-authorized',
  removalClassName: 'visibility__removed',
};
const headerMenuConfig = {
  elements: {
    header: rootNode.querySelector('.header'),
    headerMenuButton: header.querySelector('.header__menu-button'),
    headerMenu: header.querySelector('.header__menu'),
  },
  defaultClassNames: {
    headerMenuButton: 'button__modal_burger-white',
    headerMenu: 'header__menu_thinner-border',
  },
  openClassNames: {
    header: 'header_white-index',
    headerMenuButton: 'button__modal_cross-white',
    headerMenu: 'header__menu_show',
  },
};
const articleBlockConfig = {
  article: {
    markup: {
      // forMainPage: ``,
      // forSavedNewsPage: ``,
    },
    saveButtonSelector: '.card__breadcrumb_save-button',
  },
};
const popupShellConfig = {
  innerContainerSelector: '.popup__body',
  markup: `
    <div class="popup" tabindex="0">
      <div class="popup__body">
        <button type="button"
        class="popup__close-icon button__modal button__modal_cross-white button_hover-on-black"></button>
      </div>
    </div>
  `,
  closeIconSelector: '.popup__close-icon',
};
const signupFormConfig = {
  nameAttr: 'signupForm',
  markup: `
  <div class="popup__content">
    <h3 class="popup__title">Регистрация</h3>

    <form class="popup__form" name="signupForm" novalidate>
      <label class="popup__input-label" for="signupEmail">Email</label>

      <input type="email" name="email" id="signupEmail" class="popup__input" placeholder="Введите почту" required
        minlength="2" maxlength="30">

      <span class="popup__error" id="signupEmailError"></span>

      <label class="popup__input-label" for="signupPassword">Пароль</label>

      <input type="password" name="password" id="signupPassword" class="popup__input" placeholder="Введите пароль" required
        minlength="8">

      <span class="popup__error" id="signupPasswordError"></span>

      <label class="popup__input-label" for="signupName">Имя</label>

      <input type="text" name="name" id="signupName" class="popup__input" placeholder="Введите имя" required
        minlength="2" maxlength="30">

      <span class="popup__error" id="signupNameError"></span>

      <span class="popup__error popup__error_general" id="signupFormError"></span>

      <button type="submit" class="popup__button button__rounded button__rounded_size_parent button__rounded_blue">Зарегистрироваться</button>

      <p class="popup__prompt">или <span class="popup__prompt-link">войти</span></p>
    </form>
  </div>
  `,
  /* Атрибуты name инпутов должны соответствовать именам полей, которые требует бэкенд. */
  fieldSelectors: [
    '#signupEmail',
    '#signupPassword',
    '#signupName',
  ],
};
const loginFormConfig = {
  nameAttr: 'loginForm',
  markup: `
  <div class="popup__content">
    <h3 class="popup__title">Вход</h3>

    <form class="popup__form" name="loginForm" novalidate>
      <label class="popup__input-label" for="logiEmail">Email</label>

      <input type="email" name="email" id="logiEmail" class="popup__input" placeholder="Введите почту" required
        minlength="2" maxlength="30">

      <span class="popup__error" id="logiEmailError"></span>

      <label class="popup__input-label" for="loginPassword">Пароль</label>

      <input type="password" name="password" id="loginPassword" class="popup__input" placeholder="Введите пароль"
        required minlength="8">

      <span class="popup__error" id="loginPasswordError"></span>

      <span class="popup__error popup__error_general" id="loginFormError"></span>

      <button type="submit" class="popup__button button__rounded button__rounded_size_parent button__rounded_blue">Войти</button>

      <p class="popup__prompt">или <span class="popup__prompt-link">зарегистрироваться</span></p>
    </form>
  </div>
  `,
  /* Атрибуты name инпутов должны соответствовать именам полей, которые требует бэкенд. */
  fieldSelectors: [
    '#logiEmail',
    '#loginPassword',
  ],
};
const newsSearchFormConfig = {
  // nameAttr: 'loginForm',
  selector: '.news-search-form',
  fieldSelector: '#newsSearchField',
  submitButtonSelector: '.news-search-form__button',
};
const genFormConfig = {
  genErrMessSelector: '.popup__error_general',
  submitButtonSelector: '.popup__button',
  promptLinkSelector: '.popup__prompt-link',
  nameAttributes: {
    signupFormNameAttr: signupFormConfig.nameAttr, // nameAttributes.signupFormNameAttr
    loginFormNameAttr: loginFormConfig.nameAttr, // nameAttributes.loginFormNameAttr
  },
  /*
  genFormConfig.genErrMessSelector
  genFormConfig.submitButtonSelector
  genFormConfig.promptLinkSelector
   */
};
const messageConfig = {
  signupSuccess: `
    <div class="popup__content">
    <p class="popup__message">Пользователь успешно зарегистрирован!</p>

    <p class="popup__prompt"><span class="popup__prompt-link">Войти</span></p>
    </div>
`, // messageConfig.signupSuccess.markup
  // signupSuccess:
  // {
  //   markup: `
  //     <div class="popup__content">
  //       <p class="popup__message"></p>

  //       <p class="popup__prompt"><span class="popup__prompt-link">Войти</span></p>
  //     </div>
  //   `, // messageConfig.signupSuccess.markup
  //   text: 'Пользователь успешно зарегистрирован!', // messageConfig.signupSuccess.text
  // },
};

module.exports = {
  pageConfig: {
    rootNode,
    header,
    authButton,
    accessMarkers,
  },
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  newsSearchFormConfig,
  messageConfig,
  articleBlockConfig,
  headerMenuConfig,
};
