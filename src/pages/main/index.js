/* eslint-disable camelcase */
/* eslint-disable no-undef */
// "use strict";
import './index.css';

const path = require('path');

// process.env.ASSET_PATH ;
process.env.ASSET_PATH = JSON.stringify(path.resolve(__dirname));
console.log(process.env.ASSET_PATH);
