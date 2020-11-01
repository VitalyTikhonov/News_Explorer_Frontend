export function createNode(markup) {
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', markup);
  return element.firstElementChild;
}

export function formatDate(localeString) {
  return localeString.toISOString().slice(0, 10);
}

export function getPeriodStartDate(period) {
  const today = new Date();
  const date = today.setDate(today.getDate() - period);
  const localeString = new Date(date);
  return localeString;
}

export function generateSigninEvent(detail) {
  console.log('detail', detail);
  const signinEvent = new CustomEvent(
    'signin',
    {
      detail: { name: detail },
    },
  );
  document.dispatchEvent(signinEvent);
}
// export function removeClassFromElems(elemsToRemoveClassArray, className) {
//   elemsToRemoveClassArray.forEach((element) => {
//     element.classList.remove(className);
//   });
// }

// export function addClassToElems(elemsToAddClassArray, className) {
//   elemsToAddClassArray.forEach((element) => {
//     element.classList.add(className);
//   });
// }

// const createNode = function createNode(markup) {
//   const element = document.createElement('div');
//   element.insertAdjacentHTML('afterbegin', markup);
//   return element.firstElementChild;
// };

// const formatDate = function formatDate(localeString) {
//   return localeString.toISOString().slice(0, 10);
// };

// const getPeriodStartDate = function getPeriodStartDate(period) {
//   const today = new Date();
//   const date = today.setDate(today.getDate() - period);
//   const localeString = new Date(date);
//   return localeString;
// };

// export default {
//   createNode(markup) {
//     const element = document.createElement('div');
//     element.insertAdjacentHTML('afterbegin', markup);
//     return element.firstElementChild;
//   },

//   formatDate(localeString) {
//     return localeString.toISOString().slice(0, 10);
//   },

//   getPeriodStartDate(period) {
//     const today = new Date();
//     const date = today.setDate(today.getDate() - period);
//     const localeString = new Date(date);
//     return localeString;
//   },
// };

// module.exports = {
//   createNode,
//   // formatDate,
//   // getPeriodStartDate,
// };
