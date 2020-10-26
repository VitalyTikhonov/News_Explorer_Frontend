const createNode = function createNode(markup) {
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', markup);
  return element.firstElementChild;
};

const dateMethods = function dateMethods() {
  function formDate(y, m, d) {
    function getDoubleDigitValue(value) {
      return value > 9 ? value : `0${value}`;
    }
    return `${y}-${getDoubleDigitValue(m)}-${getDoubleDigitValue(d)}`;
  }

  function getNDaysInThePastDate(N) {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth() + 1;
    const currDate = today.getDate();
    const lastMonthEndDate = new Date(currYear, currMonth - 1, 0).getDate();
    let month;
    let date;
    if (currDate > N) {
      date = currDate - N;
      month = currMonth;
    } else {
      date = lastMonthEndDate - (N - currDate);
      month = currMonth - 1;
    }
    return formDate(currYear, month, date);
  }

  return {
    formDate,
    getNDaysInThePastDate,
  };
};

module.exports = {
  createNode,
  dateMethods,
};
