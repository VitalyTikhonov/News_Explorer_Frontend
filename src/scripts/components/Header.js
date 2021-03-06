/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor({
    pageName,
    indexPageName,
    savedNewsPageName,
    accessControl,
    pageConfig,
    popup,
    headerMenuConfig,
  }) {
    super({ pageName, indexPageName, savedNewsPageName });
    this._accessControl = accessControl;
    this._authButton = pageConfig.authButton;
    this._logoutButton = pageConfig.logoutButton;
    this._logoutButtonProperArray = pageConfig.logoutButtonProperArray;
    this._optionForAuthUsers = pageConfig.optionForAuthUsers;
    this._authorizedSelector = pageConfig.accessMarkers.authorizedSelector;
    this._nonAuthorizedSelector = pageConfig.accessMarkers.nonAuthorizedSelector;
    this._popup = popup;
    /* ----------- */
    this._header = headerMenuConfig.elements.header;
    this._headerBar = headerMenuConfig.elements.headerBar;
    this._headerMenuButton = headerMenuConfig.elements.headerMenuButton;
    this._headerMenu = headerMenuConfig.elements.headerMenu;
    this._headerMenuOptions = headerMenuConfig.elements.headerMenuOptions;
    this._pageDimmer = headerMenuConfig.elements.pageDimmer;
    /* ----------- */
    this._headerDefClass = headerMenuConfig.savedNews.defaultClassNames.header;
    this._headerBarDefClass = headerMenuConfig.savedNews.defaultClassNames.headerBar;
    this._headerMenuButtonDefClass = headerMenuConfig.index.defaultClassNames.headerMenuButton;
    this._headerMenuButtonDefClassA = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonA;
    this._headerMenuButtonDefClassB = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonB;
    this._headerMenuDefClass = headerMenuConfig[this._pageName].defaultClassNames.headerMenu;
    /* ----------- */
    this._headerOpenClass = headerMenuConfig[this._pageName].openClassNames.header;
    this._headerMenuButtonOpenClass = headerMenuConfig.index.openClassNames.headerMenuButton;
    this._headerMenuButtonOpenClassA = headerMenuConfig.savedNews.openClassNames.headerMenuButtonA;
    this._headerMenuButtonDefClassA = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonA;
    this._headerMenuButtonDefClassB = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonB;
    this._headerMenuOpenClass = headerMenuConfig[this._pageName].openClassNames.headerMenu;
    /* ----------- */
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._setHeaderBackground = this._setHeaderBackground.bind(this);
  }

  _setHeaderBackground() {
    if (this._pageName !== this._indexPageName) {
      return;
    }
    if (this._isMenuOpen) {
      this._header.removeAttribute('style');
      this._header.classList.add(this._headerOpenClass);
      return;
    }
    const scrollValue = window.scrollY;
    const ratio = 0.006;
    const maxOpacity = 0.75;
    const maxOpacityScroll = 125;
    const opacityValue = window.scrollY <= maxOpacityScroll ? scrollValue * ratio : maxOpacity;
    this._header.setAttribute('style', `background-color:rgba(0, 0, 0, ${opacityValue})`);
  }

  _setPageMaps() {
    switch (this._pageName) {
      case this._indexPageName:
        this._baseHandlerSettingMap = [
          {
            domElement: this._authButton,
            event: 'click',
            handler: this._popup.open,
          },
          {
            domElement: this._logoutButton,
            event: 'click',
            handler: this._accessControl.signout,
          },
          {
            domElement: this._headerMenuButton,
            event: 'click',
            handler: this._openMenu,
          },
          {
            domElement: window,
            event: 'scroll',
            handler: this._setHeaderBackground,
          },
        ];
        this._menuOpenMap = {
          handlers: {
            set: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._closeMenu,
              },
              {
                domElement: this._pageDimmer, //            _pageDimmer
                event: 'click',
                handler: this._closeMenu,
              },
            ], // this._menuOpenMap.handlers.set
            remove: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._openMenu,
              },
            ], // this._menuOpenMap.handlers.remove
          },
          classes: [
            {
              element: this._header,
              // classToRemove: ,
              classToAdd: this._headerOpenClass,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonDefClass,
              classToAdd: this._headerMenuButtonOpenClass,
            },
            {
              element: this._headerMenu,
              classToRemove: this._headerMenuDefClass,
              classToAdd: this._headerMenuOpenClass,
            },
          ], // this._menuOpenMap.classes
        };
        this._menuCloseMap = {
          handlers: {
            set: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._openMenu,
              },
            ], // this._menuCloseMap.handlers.set
            remove: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._closeMenu,
              },
              {
                domElement: this._pageDimmer, //            _pageDimmer
                event: 'click',
                handler: this._closeMenu,
              },
            ], // this._menuCloseMap.handlers.remove
          },
          classes: [
            {
              element: this._header,
              classToRemove: this._headerOpenClass,
              // classToAdd: ,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonOpenClass,
              classToAdd: this._headerMenuButtonDefClass,
            },
            {
              element: this._headerMenu,
              classToRemove: this._headerMenuOpenClass,
              classToAdd: this._headerMenuDefClass,
            },
          ], // this._menuCloseMap.classes
        };
        break;
      case this._savedNewsPageName:
        this._baseHandlerSettingMap = [
          {
            domElement: this._logoutButton,
            event: 'click',
            handler: this._accessControl.signout,
          },
          {
            domElement: this._headerMenuButton,
            event: 'click',
            handler: this._openMenu,
          },
        ];
        this._menuOpenMap = {
          handlers: {
            set: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._closeMenu,
              },
              {
                domElement: this._pageDimmer, //            _pageDimmer
                event: 'click',
                handler: this._closeMenu,
              },
            ], // this._menuOpenMap.handlers.set
            remove: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._openMenu,
              },
            ], // this._menuOpenMap.handlers.remove
          },
          classes: [
            {
              element: this._header,
              classToRemove: this._headerDefClass,
              classToAdd: this._headerOpenClass,
            },
            {
              element: this._headerBar,
              classToRemove: this._headerBarDefClass,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonDefClassA,
              classToAdd: this._headerMenuButtonOpenClassA,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonDefClassB,
              classToAdd: this._headerMenuButtonOpenClassB,
            },
            {
              element: this._headerMenu,
              classToRemove: this._headerMenuDefClass,
              classToAdd: this._headerMenuOpenClass,
            },
          ], // this._menuOpenMap.classes
        };
        this._menuCloseMap = {
          handlers: {
            set: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._openMenu,
              },
            ], // this._menuCloseMap.handlers.set
            remove: [
              {
                domElement: this._headerMenuButton,
                event: 'click',
                handler: this._closeMenu,
              },
              {
                domElement: this._pageDimmer, //            _pageDimmer
                event: 'click',
                handler: this._closeMenu,
              },
            ], // this._menuCloseMap.handlers.remove
          },
          classes: [
            {
              element: this._header,
              classToRemove: this._headerOpenClass,
              classToAdd: this._headerDefClass,
            },
            {
              element: this._headerBar,
              classToAdd: this._headerBarDefClass,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonOpenClassA,
              classToAdd: this._headerMenuButtonDefClassA,
            },
            {
              element: this._headerMenuButton,
              classToRemove: this._headerMenuButtonOpenClassB,
              classToAdd: this._headerMenuButtonDefClassB,
            },
            {
              element: this._headerMenu,
              classToRemove: this._headerMenuOpenClass,
              classToAdd: this._headerMenuDefClass,
            },
          ], // this._menuOpenMap.classes
        };
        break;
      default:
    }
  }

  _openMenu() {
    BaseComponent.removeHandlers(this._menuOpenMap.handlers.remove);
    BaseComponent.setHandlers(this._menuOpenMap.handlers.set);
    this._elemClassMap = [].concat(this._menuOpenMap.classes);
    this._configureClassesOnElem();
    this._isMenuOpen = true;
    this._setHeaderBackground();
  }

  _closeMenu() {
    BaseComponent.removeHandlers(this._menuCloseMap.handlers.remove);
    BaseComponent.setHandlers(this._menuCloseMap.handlers.set);
    this._elemClassMap = [].concat(this._menuCloseMap.classes);
    this._configureClassesOnElem();
    this._isMenuOpen = false;
    this._setHeaderBackground();
  }

  render() {
    this._setPageMaps();
    BaseComponent.setHandlers(this._baseHandlerSettingMap);
  }
}

export { Header as default };
