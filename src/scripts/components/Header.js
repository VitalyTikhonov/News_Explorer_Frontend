/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor({
    pageName,
    accessControl,
    pageConfig,
    popup,
    headerMenuConfig,
  }) {
    super({});
    this._accessControl = accessControl;
    this._authButton = pageConfig.authButton;
    this._logoutButton = pageConfig.logoutButton;
    this._optionForAuthUsers = pageConfig.optionForAuthUsers;
    this._authorizedSelector = pageConfig.accessMarkers.authorizedSelector;
    this._nonAuthorizedSelector = pageConfig.accessMarkers.nonAuthorizedSelector;
    this._popup = popup;
    /* ----------- */
    this._pageName = pageName;
    this._header = headerMenuConfig.elements.header;
    this._headerBar = headerMenuConfig.elements.headerBar;
    this._headerMenuButton = headerMenuConfig.elements.headerMenuButton;
    this._headerMenu = headerMenuConfig.elements.headerMenu;
    /* ----------- */
    this._headerDefClass = headerMenuConfig.savedNews.defaultClassNames.header;
    this._headerBarDefClass = headerMenuConfig.savedNews.defaultClassNames.headerBar;
    this._headerMenuButtonDefClass = headerMenuConfig[this._pageName].defaultClassNames.headerMenuButton;
    this._headerMenuButtonDefClassA = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonA;
    this._headerMenuButtonDefClassB = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonB;
    this._headerMenuDefClass = headerMenuConfig[this._pageName].defaultClassNames.headerMenu;
    /* ----------- */
    this._headerOpenClass = headerMenuConfig[this._pageName].openClassNames.header;
    this._headerMenuButtonOpenClass = headerMenuConfig[this._pageName].openClassNames.headerMenuButton;
    this._headerMenuButtonDefClassA = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonA;
    this._headerMenuButtonDefClassB = headerMenuConfig.savedNews.defaultClassNames.headerMenuButtonB;
    this._headerMenuOpenClass = headerMenuConfig[this._pageName].openClassNames.headerMenu;
    /* ----------- */
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
  }

  _openMenu() {
    BaseComponent.removeHandlers([
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._openMenu,
      },
    ]);

    BaseComponent.setHandlers([
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._closeMenu,
      },
    ]);

    this._elemClassMap = [].concat(
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
    );
    this._configureClassesOnElem();
  }

  _closeMenu() {
    BaseComponent.removeHandlers([
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._closeMenu,
      },
    ]);

    BaseComponent.setHandlers([
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._openMenu,
      },
    ]);

    this._elemClassMap = [].concat(
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
      // {
      //   element: ,
      //   classToRemove:,
      //   classToAdd:,
      // },
    );
    this._configureClassesOnElem();
  }

  render() {
    BaseComponent.setHandlers([
      // {
      //   domElement: this._authButton,
      //   event: 'click',
      //   handler: this._popup.open,
      // },
      // {
      //   domElement: this._logoutButton,
      //   event: 'click',
      //   handler: this._accessControl.signout,
      // },
      // {
      //   domElement: this._headerMenuButton,
      //   event: 'click',
      //   handler: this._openMenu,
      // },
    ]);
  }
}

export { Header as default };
