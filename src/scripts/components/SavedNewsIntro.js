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
    this._makeDetailsFrameMarkup = savedNewsIntroConfig.details.makeDetailsFrameMarkup;
    // this._detailsEmphasisMarkup = savedNewsIntroConfig.details.emphasisMarkup;
    this._makeKeywordMarkup = savedNewsIntroConfig.details.makeKeywordMarkup;
  }

  setUserName(userName) {
    this._userName = userName;
  }

  setArticleArray(articleArray) {
    this._articleArray = articleArray;
    // console.log('this._articleArray\n', this._articleArray);
  }

  _selectAccusativeCase() {
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
      return this._numberOfArticlesPhrase;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      this._numberOfArticlesPhrase = `${string} ${caseForms.twoFour}`;
      return this._numberOfArticlesPhrase;
    }
    if (lastDigit === 1) {
      this._numberOfArticlesPhrase = `${string} ${caseForms.one}`;
    }
    return this._numberOfArticlesPhrase;
    // if (lastDigit === 0) {
    //   this._numberOfArticlesPhrase = `нет ${caseForms.zeroFiveNineTenTwenty}`;
    // }
  }

  _setPhrase() {
    this._numberOfArticlesPhrase = `${this._userName}, у Вас ${this._selectAccusativeCase()}`;
    return this._numberOfArticlesPhrase;
  }

  _getKeyWordStats() {
    const counts = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this._articleNumber; i++) {
      // console.log('this._keywordArray', this._keywordArray);
      const keyword = this._keywordArray[i];
      // console.log('keyword', keyword);
      counts[keyword] = counts[keyword] ? counts[keyword] + 1 : 1;
    }

    const arrToSort = Object.keys(counts).map((key) => ({ value: key, freq: counts[key] }));

    this._sortedKeywordStats = arrToSort.sort((a, b) => ((a.freq < b.freq) ? 1 : -1));
    this._sortedKeywords = this._sortedKeywordStats.map((entry) => entry.value);
    this._uniqueKeywordNumber = this._sortedKeywords.length;
  }

  _makeKeywordSummary() {
    this._getKeyWordStats();
    switch (this._uniqueKeywordNumber) {
      case 1: this._keywordSummary = `По ключевому слову: ${this._makeKeywordMarkup(this._sortedKeywords[0])}`;
        break;
      case 2: this._keywordSummary = `По ключевым словам: ${this._makeKeywordMarkup(this._sortedKeywords[0])}
          и ${this._makeKeywordMarkup(this._sortedKeywords[1])}`;
        break;
      default: this._keywordSummary = ''.concat(
        'По ключевым словам: ',
        this._makeKeywordMarkup(this._sortedKeywords[0]),
        ', ',
        this._makeKeywordMarkup(this._sortedKeywords[1]),
        this._uniqueKeywordNumber === 3 ? ' и ещё одному' : ` и ${this._uniqueKeywordNumber - 3} другим`,
      );
    }
    this._detailsFrameMarkup = this._makeDetailsFrameMarkup(this._keywordSummary);
    this._detailsFrame = BaseComponent.create(this._detailsFrameMarkup);
  }

  render() {
    // console.log('render');
    if (this._articleArray) {
      this._articleNumber = this._articleArray.length;
      this._node.classList.remove(this._controlClassName);
      this._subHeadlineNode.textContent = this._setPhrase();
      this._keywordArray = this._articleArray.map((article) => article.keyword);
      // this._uniqueKeywordArray = [...new Set(this._keywordArray)];
      // console.log('this._keywordArray', this._keywordArray);
      // console.log('_getKeyWordStats', this._getKeyWordStats());
      this._makeKeywordSummary();
      BaseComponent.insertChild(this._node, this._detailsFrame);
    }
  }
}

export { SavedNewsIntro as default };
