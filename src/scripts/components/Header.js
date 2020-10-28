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
    this._headerSelector = headerMenuConfig.selectors.header;
    this._headerMenuButtonSelector = headerMenuConfig.selectors.headerMenuButton;
    this._headerMenuSelector = headerMenuConfig.selectors.headerMenu;
    /* ----------- */
    this._headerMenuButtonDefClass = headerMenuConfig.defaultClassNames.headerMenuButton;
    this._headerMenuDefClass = headerMenuConfig.defaultClassNames.headerMenu;
    /* ----------- */
    this._headerOpenClass = headerMenuConfig.openClassNames.header;
    this._headerMenuButtonOpenClass = headerMenuConfig.openClassNames.headerMenuButton;
    this._headerMenuOpenClass = headerMenuConfig.openClassNames.headerMenu;
  }

  _openMenu() {
    this._elemClassMap = [].push(
      {
        element: ,
        classesToRemove: [

        ],
        classesToAdd: [

        ],
      },
    );
    this._configureClasses();
  }

  _closeMenu() {
    this._elemClassMap = [].push(
      {
        element: ,
        classesToRemove: [

        ],
        classesToAdd: [

        ],
      },
    );
    this._configureClasses();
  }

  // _removeClassFromElems() {
  //   // this._elemsToRemoveClass = ;
  //   // this._controlClassName = ;
  //   this._elemsToRemoveClass.forEach((element) => {
  //     element.classList.remove(this._controlClassName);
  //   });
  // }

  // _addClassToElems() {
  //   // this._elemsToAddClass = ;
  //   // this._controlClassName = ;
  //   this._elemsToAddClass.forEach((element) => {
  //     element.classList.add(this._controlClassName);
  //   });
  // }

  render() {
    this._domEventHandlerMap.push({
      domElement: this._authButton,
      event: 'click',
      handler: this._popup.open,
    });
    this._setHandlers();
  }
}

export { Header as default };
