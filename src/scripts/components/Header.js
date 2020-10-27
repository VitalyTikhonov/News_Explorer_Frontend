import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor({
    mainApi,
    pageConfig,
    popup,
  }) {
    super({});
    this._mainApi = mainApi;
    this._authButton = pageConfig.authButton;
    this._optionForAuthUsers = pageConfig.optionForAuthUsers;
    this._authorizedSelector = pageConfig.accessMarkers.authorizedSelector;
    this._nonAuthorizedSelector = pageConfig.accessMarkers.nonAuthorizedSelector;
    this._popup = popup;
  }

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
