/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

class SavedNewsIntro extends BaseComponent {
  constructor({
    savedNewsIntroConfig,
    accessControl,
  }) {
    super({});
    this._subHeadlineNode = savedNewsIntroConfig.subHeadlineNode;
    this._detailsSelector = savedNewsIntroConfig.details.selector;
    this._detailsFrameMarkup = savedNewsIntroConfig.details.frameMarkup;
    this._detailsEmphasisMarkup = savedNewsIntroConfig.details.emphasisMarkup;
    this._getArticleArray = accessControl.getArticleArray;
    this._getArticleArray = accessControl.getUserName;
  }

  render() {
    this._articleArray = this._getArticleArray();
    this._articleNumber = this._articleArray.length;
  }
}

export { SavedNewsIntro as default };
