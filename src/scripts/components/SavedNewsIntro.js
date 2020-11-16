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
    this._detailsFrameMarkup = savedNewsIntroConfig.details.frameMarkup;
    this._getAsNumberAndLastDigit = getAsNumberAndLastDigit;
  }

  setDependencies(dependencies) {
    super.setDependencies(dependencies);
    this._articleBlock = this._dependencies.articleBlock;
  }

  setUserName(userName) {
    this._userName = userName;
  }

  setArticleArray(articleArray) {
    this._articleArray = articleArray;
  }

  updateOnArticleDeletion(keyword) {
    this._subHeadlineNode.textContent = '';
    this._detailsFrame.remove();
    this._articleNumber -= 1;
    if (this._articleNumber > 0) {
      const keywordIndex = this._keywordArray.indexOf(keyword);
      if (keywordIndex >= 0) { // >= !!!
        this._keywordArray.splice(keywordIndex, 1);
      }
      this._setSubHeadline();
      this._makeKeywordSummary();
    } else {
      this._setSubHeadline();
      this._articleBlock.showNoNewsBumper();
    }
  }

  _matchNumInAccusativeCase() {
    const caseForms = {
      accusativeSingular: 'сохраненная статья', // …1, кроме …11
      accusativePlural: 'сохраненные статьи', // …2–4, кроме …12–…14
      genitivePlural: 'сохраненных статей', // 0, …5–9, 10–20, …11
    };
    const {
      number: artNumber,
      string: artNumbAsStr,
      lastDigitNum: lastDigit,
      lastButOneDigitNum: lastButOneDigit,
    } = this._getAsNumberAndLastDigit(this._articleNumber);
    if (artNumber === 0) {
      this._numberOfArticlesPhrase = `нет ${caseForms.genitivePlural}`;
      return this._numberOfArticlesPhrase;
    }
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
      return this._numberOfArticlesPhrase;
    }
    return this._numberOfArticlesPhrase;
  }

  _setSubHeadline() {
    this._numberOfArticlesPhrase = `${this._userName}, у Вас ${this._matchNumInAccusativeCase()}`;
    this._subHeadlineNode.textContent = this._numberOfArticlesPhrase;
  }

  _getKeywordStats() {
    const counts = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this._articleNumber; i++) {
      const keyword = this._keywordArray[i];
      counts[keyword] = counts[keyword] ? counts[keyword] + 1 : 1;
    }

    const arrToSort = Object.keys(counts).map((key) => ({ value: key, freq: counts[key] }));

    arrToSort.sort((a, b) => ((a.freq < b.freq) ? 1 : -1));
    this._sortedKeywords = arrToSort.map((entry) => entry.value);
    this._uniqueKeywordNumber = this._sortedKeywords.length;
  }

  _makeKeywordSummary() {
    this._getKeywordStats();
    switch (this._uniqueKeywordNumber) {
      case 1: this._keywordSummary = `По ключевому слову "${this._sortedKeywords[0]}"`;
        break;
      case 2: this._keywordSummary = `По ключевым словам "${this._sortedKeywords[0]}"
            и "${this._sortedKeywords[1]}"`;
        break;
      case 3: this._keywordSummary = ''.concat(
        'По ключевым словам "',
        this._sortedKeywords[0],
        '", "',
        this._sortedKeywords[1],
        '" и ещё одному',
      );
        break;
      default: { // вынести в первый case, перерасположить варианты по вероятности
        const {
          lastDigitNum,
          lastTwoDigitsNum,
        } = this._getAsNumberAndLastDigit(this._uniqueKeywordNumber - 2);
        /*
        1, …1, кроме …11: другому
        2, …2: другим
        */
        this._keywordSummary = ''.concat(
          'По ключевым словам "',
          this._sortedKeywords[0],
          '", "',
          this._sortedKeywords[1],
          `" и ${this._uniqueKeywordNumber - 2} `,
          lastDigitNum !== 1 || lastTwoDigitsNum === 11
            ? 'другим'
            : 'другому',
        );
      }
    }
    this._detailsFrame = BaseComponent.create(this._detailsFrameMarkup);
    this._detailsFrame.textContent = this._keywordSummary;
    BaseComponent.insertChild(this._node, this._detailsFrame);
  }

  render() {
    if (this._articleArray) {
      this._articleNumber = this._articleArray.length;
      this._keywordArray = this._articleArray.map((article) => article.keyword);
      this._setSubHeadline();
      this._makeKeywordSummary();
      this._node.classList.remove(this._controlClassName);
    }
  }
}

export { SavedNewsIntro as default };
