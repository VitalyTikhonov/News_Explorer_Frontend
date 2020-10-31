const rootNode = document.querySelector('.root');
const header = rootNode.querySelector('.header');
const authButton = header.querySelector('.menu__auth-button-login');
const logoutButton = header.querySelector('.menu__auth-button-logout');
const accessMarkers = {
  authorizedSelector: '.visibility__for-authorized',
  nonAuthorizedSelector: '.visibility__for-non-authorized',
  removalClassName: 'visibility__removed',
};
const headerMenuConfig = {
  elements: {
    header: rootNode.querySelector('.header'),
    headerBar: header.querySelector('.header__bar'),
    headerMenuButton: header.querySelector('.header__menu-button'),
    headerMenu: header.querySelector('.header__menu'),
  },
  index: {
    defaultClassNames: {
      headerMenuButton: 'button__modal_burger-white',
      headerMenu: 'header__menu_thinner-border',
    },
    openClassNames: {
      header: 'header_white-index',
      headerMenuButton: 'button__modal_cross-white',
      headerMenu: 'header__menu_show',
    },
  },
  savedNews: {
    defaultClassNames: {
      header: 'header_black-on-white',
      headerBar: 'header__bar_thicker-border',
      headerMenuButtonA: 'button__modal_burger-black',
      headerMenuButtonB: 'button_hover-on-white',
      headerMenu: 'header__menu_thicker-border',
    },
    openClassNames: {
      header: 'header_white-saved-news',
      headerMenuButtonA: 'button__modal_cross-white',
      headerMenuButtonB: 'button_hover-on-black',
      headerMenu: 'header__menu_show',
    },
  },
};
const articleBlockConf = {
  node: document.querySelector('.article-block'),
  selector: '.article-block',
  articleBlockProper: {
    // selector: '.article-block__proper',
    innerContainerSelector: '.article-block__card-container',
    markup: `
      <div class="article-block__proper root__child-width">
        <h2 class="article-block__headline section-headline">Результаты поиска</h2>

        <div class="article-block__card-container">
        </div>
      </div>
    `,
    moreButton: {
      markup: `
        <button type="button"
        class="article-block__button button__rounded button__rounded_white button_hover-on-black">Показать
        ещё</button>
      `,
    },
    article: {
      selectors: {
        title: '.card__headline',
        date: '.card__date',
        description: '.card__text',
        image: '.card__image',
        source: '.card__source-name',
        originUrl: '.card__link-wrap',
      },
      saveButton: {
        selector: '.card__breadcrumb_save-button',
        unsavedClass: 'button__breadcrumb_icon-flag',
        savedClass: 'button__breadcrumb_icon-flag-marked',
      },
      tooltip: {
        selector: '.card__breadcrumb_tooltip',
        nonAuthText: 'Войдите, чтобы сохранять статьи',
        unsavedText: 'Сохранить',
        savedText: 'Удалить',
        textSelector: '.card__tooltip-text',
        nonAuthTextMarkup: '<span class="card__tooltip-text">Войдите, чтобы сохранять статьи</span>',
        unsavedTextMarkup: '<span class="card__tooltip-text">Сохранить</span>',
        savedTextMarkup: '<span class="card__tooltip-text">Удалить</span>',
      },
      defaultImageAddress: './src/images/what.png',
      markup: {
        forMainPage: `
      <article class="card">
        <button type="button"
          class="card__breadcrumb card__breadcrumb_save-button button__breadcrumb button__breadcrumb_icon button__breadcrumb_icon-flag"
          disabled></button>
        <button type="button"
          class="card__breadcrumb card__breadcrumb_tooltip visibility__removed button__breadcrumb button__breadcrumb_labelled button__breadcrumb_labelled-tooltip"></button>
        <a href="" class="card__link-wrap link" target="_blank" rel="noopener noreferrer">
          <div class="card__cover">
            <img
                onerror="this.onerror=null;this.src='./src/images/what.png';"
                alt="Изображение – обложка карточки"
                class="card__image">
          </div>

          <div class="card__body">
            <p class="card__date"></p>

            <h3 class="card__headline"></h3>

            <p class="card__text"></p>

            <p class="card__source-name"></p>
          </div>
        </a>
      </article>
      `,
        // forSavedNewsPage: ``,
      },
    },
  },
  preloader: {
    markup: `
    <div class="article-block__bumper">
      <i class="article-block__bumper-preloader-circle"></i>

      <p class="article-block__bumper-message">Идет поиск новостей&hellip;</p>
    </div>
    `,
  },
  noNewsBumper: {
    markup: `
    <div class="article-block__bumper">
      <img src="./src/images/no-news-icon.png" alt="Значок &laquo;Ничего не найдено&raquo;"
        class="article-block__bumper-no-news-icon">
      <h3 class="article-block__bumper-title">Ничего не найдено</h3>

      <p class="article-block__bumper-message">К сожалению, по Вашему запросу
          ничего не найдено.</p>
    </div>
    `,
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
  error: {
    textSelector: '.popup__message', // messageConfig.error.textSelector
    markup: `
    <div class="popup__content">
    <h3 class="popup__title">Ошибка!</h3>

    <p class="popup__message"></p>
    </div>
    `, // messageConfig.error.markup
  },
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
    logoutButton,
    accessMarkers,
  },
  popupShellConfig,
  genFormConfig,
  signupFormConfig,
  loginFormConfig,
  newsSearchFormConfig,
  messageConfig,
  articleBlockConf,
  headerMenuConfig,
};
