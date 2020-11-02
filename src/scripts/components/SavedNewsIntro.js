/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

class SavedNewsIntro extends BaseComponent {
  constructor({
    pageConfig,
    savedNewsIntroConfig,
  }) {
    super({});
    this._controlClassName = pageConfig.accessMarkers.removalClassName;
    this._node = savedNewsIntroConfig.node;
    this._subHeadlineNode = savedNewsIntroConfig.subHeadlineNode;
    this._detailsSelector = savedNewsIntroConfig.details.selector;
    this._detailsFrameMarkup = savedNewsIntroConfig.details.frameMarkup;
    this._detailsEmphasisMarkup = savedNewsIntroConfig.details.emphasisMarkup;
  }

  setUserName(userName) {
    this._userName = userName;
  }

  setArticleArray(articleArray) {
    this._articleArray = articleArray;
    // console.log('this._articleArray\n', this._articleArray);
  }

  _selectCase() {
    const caseForms = {
      one: 'сохраненная статья', // …1
      twoFour: 'сохраненные статьи', // …2–4
      zeroFiveNineTenTwenty: 'сохраненных статей', // 0, …5–9, 10–20
    };
    const string = this._articleNumber.toString();
    const { length } = string;
    const lastDigitChar = string.charAt(length - 1);
    const lastDigit = Number(lastDigitChar);
    if ((lastDigit >= 5 && lastDigit <= 9) || (this._articleNumber >= 10 && this._articleNumber <= 20)) {
      this._numberOfArticlesPhrase = `${string} ${caseForms.zeroFiveNineTenTwenty}`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      this._numberOfArticlesPhrase = `${string} ${caseForms.twoFour}`;
    }
    if (lastDigit === 1) {
      this._numberOfArticlesPhrase = `${string} ${caseForms.one}`;
    }
    // if (lastDigit === 0) {
    //   this._numberOfArticlesPhrase = `нет ${caseForms.zeroFiveNineTenTwenty}`;
    // }
    return this._numberOfArticlesPhrase;
  }

  _setPhrase() {
    this._numberOfArticlesPhrase = `${this._userName}, у Вас ${this._selectCase()}`;
    return this._numberOfArticlesPhrase;
  }

  render() {
    // console.log('render');
    if (this._articleArray) {
      this._articleNumber = this._articleArray.length;
      this._node.classList.remove(this._controlClassName);
      this._subHeadlineNode.textContent = this._setPhrase();
    }
    // console.log('this._subHeadlineNode', this._subHeadlineNode);
  }
}

export { SavedNewsIntro as default };
