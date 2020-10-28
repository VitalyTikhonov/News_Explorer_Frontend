import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor({
    mainApi,
    pageConfig,
    popup,
    headerMenuConfig,
  }) {
    super({});
    this._mainApi = mainApi;
    this._authButton = pageConfig.authButton;
    this._optionForAuthUsers = pageConfig.optionForAuthUsers;
    this._authorizedSelector = pageConfig.accessMarkers.authorizedSelector;
    this._nonAuthorizedSelector = pageConfig.accessMarkers.nonAuthorizedSelector;
    this._popup = popup;
    /* ----------- */
    this._header = headerMenuConfig.elements.header;
    this._headerMenuButton = headerMenuConfig.elements.headerMenuButton;
    this._headerMenu = headerMenuConfig.elements.headerMenu;
    /* ----------- */
    this._headerMenuButtonDefClass = headerMenuConfig.defaultClassNames.headerMenuButton;
    this._headerMenuDefClass = headerMenuConfig.defaultClassNames.headerMenu;
    /* ----------- */
    this._headerOpenClass = headerMenuConfig.openClassNames.header;
    this._headerMenuButtonOpenClass = headerMenuConfig.openClassNames.headerMenuButton;
    this._headerMenuOpenClass = headerMenuConfig.openClassNames.headerMenu;
    /* ----------- */
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
  }

  _openMenu() {
    this._domEventHandlerMap.push(
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._openMenu,
      },
    );
    this._removeHandlers();

    this._domEventHandlerMap.push(
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._closeMenu,
      },
    );
    this._setHandlers();

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
    this._domEventHandlerMap.push(
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._closeMenu,
      },
    );
    this._removeHandlers();

    this._domEventHandlerMap.push(
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._openMenu,
      },
    );
    this._setHandlers();

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
    this._domEventHandlerMap.push(
      {
        domElement: this._authButton,
        event: 'click',
        handler: this._popup.open,
      },
      {
        domElement: this._headerMenuButton,
        event: 'click',
        handler: this._openMenu,
      },
    );
    this._setHandlers();
  }
}

export { Header as default };
