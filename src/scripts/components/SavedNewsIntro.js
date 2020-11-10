/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

class SavedNewsIntro extends BaseComponent {
  constructor({
    pageConfig,
    savedNewsIntroConfig,
    getAsNumberAndLastDigit,
  }) {
    super({});
    this._controlClassName = pageConfig.accessMarkers.removalClassName;
    this._node = savedNewsIntroConfig.node;
    this._subHeadlineNode = savedNewsIntroConfig.subHeadlineNode;
    this._detailsSelector = savedNewsIntroConfig.details.selector;
    this._makeDetailsFrameMarkup = savedNewsIntroConfig.details.makeDetailsFrameMarkup;
    // this._detailsEmphasisMarkup = savedNewsIntroConfig.details.emphasisMarkup;
    this._makeKeywordMarkup = savedNewsIntroConfig.details.makeKeywordMarkup;
    this._getAsNumberAndLastDigit = getAsNumberAndLastDigit;
  }

  setUserName(userName) {
    this._userName = userName;
  }

  setArticleArray(articleArray) {
    this._articleArray = articleArray;
    // console.log('this._articleArray\n', this._articleArray);
  }

  updateOnArticleDeletion(keyword) {
    // console.clear();
    this._subHeadlineNode.textContent = '';
    this._detailsFrame.remove();
    this._articleNumber -= 1;
    // console.log('console.log.clear keyword', keyword);
    // console.log('this._keywordArray', this._keywordArray);
    if (this._articleNumber > 0) {
      const keywordIndex = this._keywordArray.indexOf(keyword);
      // console.log('this._keywordArray[keywordIndex]', this._keywordArray[keywordIndex]);
      // console.log('keywordIndex', keywordIndex);
      if (keywordIndex >= 0) { // >= !!!
        this._keywordArray.splice(keywordIndex, 1);
        // const res = this._keywordArray.splice(keywordIndex, 1);
        // console.log('res', res);
      }
      // console.log('this._keywordArray', this._keywordArray);
      // console.log('REMOVED this._keywordArray[keywordIndex]', this._keywordArray[keywordIndex]);
      this._setSubHeadline();
      this._makeKeywordSummary();
    } else {
      this._node.classList.add(this._controlClassName);
    }
  }

  _matchNumInAccusativeCase() {
    const caseForms = {
      accusativeSingular: 'сохраненная статья', // …1, кроме …11
      accusativePlural: 'сохраненные статьи', // …2–4, кроме …12–…14
      genitivePlural: 'сохраненных статей', // 0, …5–9, 10–20, …11
    };
    const {
      string: artNumbAsStr,
      lastDigitNum: lastDigit,
      lastButOneDigitNum: lastButOneDigit,
    } = this._getAsNumberAndLastDigit(this._articleNumber);
    if (
      (lastDigit >= 5 && lastDigit <= 9)
      || lastDigit === 0
      || lastButOneDigit === 1
    ) {
      this._numberOfArticlesPhrase = `${artNumbAsStr} ${caseForms.genitivePlural}`;
      return this._numberOfArticlesPhrase;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      this._numberOfArticlesPhrase = `${artNumbAsStr} ${caseForms.accusativePlural}`;
      return this._numberOfArticlesPhrase;
    }
    if (lastDigit === 1) {
      this._numberOfArticlesPhrase = `${artNumbAsStr} ${caseForms.accusativeSingular}`;
    }
    return this._numberOfArticlesPhrase;
    // if (lastDigit === 0) {
    //   this._numberOfArticlesPhrase = `нет ${caseForms.genitivePlural}`;
    // }
  }

  _setSubHeadline() {
    this._numberOfArticlesPhrase = `${this._userName}, у Вас ${this._matchNumInAccusativeCase()}`;
    this._subHeadlineNode.textContent = this._numberOfArticlesPhrase;
  }

  _getKeywordStats() {
    const counts = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this._articleNumber; i++) {
      // console.log('this._keywordArray', this._keywordArray);
      const keyword = this._keywordArray[i];
      // console.log('keyword', keyword);
      counts[keyword] = counts[keyword] ? counts[keyword] + 1 : 1;
    }
    // console.log('counts', counts);

    const arrToSort = Object.keys(counts).map((key) => ({ value: key, freq: counts[key] }));

    arrToSort.sort((a, b) => ((a.freq < b.freq) ? 1 : -1));
    // this._sortedKeywords = arrToSort.map((entry) => entry.value);
    this._sortedKeywords = arrToSort.map((entry) => entry.value);
    // console.log('entry', entry);
    // return entry.value;
    // });
    // console.log('this._sortedKeywords', this._sortedKeywords);
    this._uniqueKeywordNumber = this._sortedKeywords.length;
    // console.log('this._uniqueKeywordNumber', this._uniqueKeywordNumber);
  }

  _makeKeywordSummary() {
    this._getKeywordStats();
    switch (this._uniqueKeywordNumber) {
      case 1: this._keywordSummary = `По ключевому слову: ${this._makeKeywordMarkup(this._sortedKeywords[0])}`;
        break;
      case 2: this._keywordSummary = `По ключевым словам: ${this._makeKeywordMarkup(this._sortedKeywords[0])}
          и ${this._makeKeywordMarkup(this._sortedKeywords[1])}`;
        break;
      case 3: this._keywordSummary = ''.concat(
        'По ключевым словам: ',
        this._makeKeywordMarkup(this._sortedKeywords[0]),
        ', ',
        this._makeKeywordMarkup(this._sortedKeywords[1]),
        ' и ещё одному',
      );
        break;
      default: {
        const {
          lastDigitNum,
          lastTwoDigitsNum,
        } = this._getAsNumberAndLastDigit(this._uniqueKeywordNumber - 2);
        /*
        1, …1, кроме …11: другому
        2, …2: другим
        */
        this._keywordSummary = ''.concat(
          'По ключевым словам: ',
          this._makeKeywordMarkup(this._sortedKeywords[0]),
          ', ',
          this._makeKeywordMarkup(this._sortedKeywords[1]),
          ` и ${this._uniqueKeywordNumber - 2} `,
          lastDigitNum !== 1 || lastTwoDigitsNum === 11
            ? 'другим'
            : 'другому',
        );
      }
    }
    this._detailsFrameMarkup = this._makeDetailsFrameMarkup(this._keywordSummary);
    this._detailsFrame = BaseComponent.create(this._detailsFrameMarkup);
    BaseComponent.insertChild(this._node, this._detailsFrame);
  }

  render() {
    // console.log('render');
    if (this._articleArray) {
      this._articleNumber = this._articleArray.length;
      // console.log('START this._articleNumber', this._articleNumber);
      this._keywordArray = this._articleArray.map((article) => article.keyword);
      // console.log('START this._keywordArray', this._keywordArray);
      this._setSubHeadline();
      this._makeKeywordSummary();
      this._node.classList.remove(this._controlClassName);
    }
  }
}

export { SavedNewsIntro as default };
