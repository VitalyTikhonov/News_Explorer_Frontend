const rootNode = document.querySelector('.root');
const header = rootNode.querySelector('.header');
const authButton = header.querySelector('.menu__auth-button');
const popupShell = {
  markup: `
    <div class="popup" tabindex="0">
      <div class="popup__body">
        <button type="button"
        class="popup__close-icon button__modal button__modal_cross-white button_hover-on-black"></button>
      </div>
    </div>
  `,
  innerContainerSelector: '.popup__body',
  closeIconSelector: '.popup__close-icon',
};
const signupForm = {
  markup: `
    <div class="popup__content">
      <h3 class="popup__title">Регистрация</h3>

      <form class="popup__form" name="loginForm" novalidate>
        <label class="popup__input-label" for="signupEmail">Email</label>

        <input type="email" name="email" id="signupEmail" class="popup__input" placeholder="Введите почту" required
          minlength="2" maxlength="30">

        <span class="popup__error" id="email-error"></span>
        <!-- <span class="popup__error" id="email-error">Неправильный формат email</span> -->

        <label class="popup__input-label" for="signupPassword">Пароль</label>

        <input type="password" name="password" id="signupPassword" class="popup__input" placeholder="Введите пароль" required
          minlength="8">

        <span class="popup__error" id="password-error"></span>
        <!-- <span class="popup__error" id="password-error">Неправильный пароль</span> -->

        <label class="popup__input-label" for="signupName">Имя</label>

        <input type="text" name="name" id="signupName" class="popup__input" placeholder="Введите имя" required
          minlength="2" maxlength="30">

        <span class="popup__error" id="username-error"></span>
        <!-- <span class="popup__error" id="username-error">Недопустимое имя</span> -->

        <span class="popup__error" id="form-error"></span>
        <!-- <span class="popup__error popup__error_general" id="form-error">Такой пользователь уже есть</span> -->

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
  submitButtonSelector: '.popup__button',
};

module.exports = {
  page: {
    rootNode,
    header,
    authButton,
  },
  popupShell,
  signupForm,
};

/*
прописать псевдоэлемент на disabled
      <!-- активная -->
      <!-- <button type="submit" class="popup__button button__rounded
      button__rounded_size_parent button__rounded_blue">Зарегистрироваться</button> -->
      <!-- неактивная -->
      <button type="submit"
        class="popup__button button__rounded button__rounded_size_parent
        button__rounded_blue-inactive"
        disabled>Войти</button>
         */
