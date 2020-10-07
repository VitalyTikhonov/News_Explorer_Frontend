/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ // подключили cssnano
      preset: 'default', // выбрали настройки по умолчанию
    }),
  ],
};
