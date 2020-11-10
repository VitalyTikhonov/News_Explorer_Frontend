const string = '5';
const lastButOneDigitStr = string.slice(string.length - 2, string.length - 1);
const lastButOneDigitNum = Number(lastButOneDigitStr);
// console.log('lastButOneDigitNum', lastButOneDigitNum);

function getAsNumberAndLastDigit(numberArg) {
  let number;
  let string;
  if (typeof numberArg === 'number') {
    number = numberArg;
    string = numberArg.toString();
  } else {
    number = Number(numberArg);
    string = numberArg;
  }
  const { length } = string;
  const lastDigitStr = string.charAt(length - 1);
  const lastDigitNum = Number(lastDigitStr);
  const lastTwoDigitsStr = string.slice(length - 2);
  const lastTwoDigitsNum = Number(lastTwoDigitsStr);
  const lastButOneDigitStr = string.slice(length - 2, length - 1);
  const lastButOneDigitNum = Number(lastButOneDigitStr);
  const result = {
    number,
    string,
    lastDigitNum,
    lastTwoDigitsNum,
    lastButOneDigitNum,
  };
  return result;
}

function tooLong(constraint) {
  const {
    lastTwoDigitsNum,
    string,
    lastDigitNum,
  } = getAsNumberAndLastDigit(constraint);
  return lastDigitNum !== 1 || lastTwoDigitsNum === 11
    ? `Должно быть не более ${string} символов`
    : `Должно быть не более ${string} символа`;
}

// for (let i = 0; i <= 300; i++) {
//   console.log(tooLong(i));
// }

function _matchNumInAccusativeCase(TEMP_ARG) {
  const caseForms = {
    accusativeSingular: '..........сохраненная статья', // …1, кроме …11
    accusativePlural: '___сохраненные статьи', // …2–4, кроме …12–…14
    genitivePlural: 'сохраненных статей', // 0, …5–9, 10–20, …11
  };
  const {
    number: articleNumber,
    string: artNumbAsStr,
    lastDigitNum: lastDigit,
    lastTwoDigitsNum: lastTwoDigits,
    lastButOneDigitNum: lastButOneDigit,
  } = getAsNumberAndLastDigit(TEMP_ARG);
  if (
    // (lastDigit >= 5 && lastDigit <= 9)
    // || (articleNumber >= 10 && articleNumber <= 20)
    // || (lastTwoDigits >= 11 && lastTwoDigits <= 14) // optimized(?):
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

for (let i = 0; i <= 300; i++) {
  console.log(_matchNumInAccusativeCase(i));
}

