// const Markup = ``;
const popupMarkup = `
  <div class="popup" tabindex="0">
    <div class="popup__body">
      <button type="button"
      class="popup__close-icon button__modal button__modal_cross-white button_hover-on-black"></button>
    </div>
  </div>
`;
const popupCloseIconSelector = '.popup__close-icon';
const signupFormMarkup = `
  <div class="popup__content">
    <h3 class="popup__title">Регистрация</h3>

    <form class="popup__form" name="loginForm" novalidate>
      <label class="popup__input-label" for="email">Email</label>

      <input type="email" name="userEmail" id="email" class="popup__input" placeholder="Введите почту" required
        minlength="2" maxlength="30">

      <span class="popup__error" id="email-error"></span>
      <!-- <span class="popup__error" id="email-error">Неправильный формат email</span> -->

      <label class="popup__input-label" for="password">Пароль</label>

      <input type="password" name="userPassword" id="password" class="popup__input" placeholder="Введите пароль" required
        minlength="8">

      <span class="popup__error" id="password-error"></span>
      <!-- <span class="popup__error" id="password-error">Неправильный пароль</span> -->

      <label class="popup__input-label" for="username">Имя</label>

      <input type="text" name="userName" id="username" class="popup__input" placeholder="Введите имя" required
        minlength="2" maxlength="30">

      <span class="popup__error" id="username-error"></span>
      <!-- <span class="popup__error" id="username-error">Недопустимое имя</span> -->

      <span class="popup__error" id="form-error"></span>
      <!-- <span class="popup__error popup__error_general" id="form-error">Такой пользователь уже есть</span> -->

      <!-- активная -->
      <!-- <button type="submit" class="popup__button button__rounded button__rounded_size_parent button__rounded_blue">Зарегистрироваться</button> -->
      <!-- неактивная -->
      <button type="submit"
        class="popup__button button__rounded button__rounded_size_parent button__rounded_blue-inactive"
        disabled>Войти</button>

      <p class="popup__prompt">или <span class="popup__prompt-link">войти</span></p>
    </form>
  </div>
`;

module.exports = {
  popupMarkup,
  popupCloseIconSelector,
  signupFormMarkup,
};
