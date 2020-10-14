// "use strict";
import './index.css';

const path = require('path');

// process.env.ASSET_PATH ;
// ASSET_PATH = path.resolve(__dirname);
process.env.ASSET_PATH = JSON.stringify(path.resolve(__dirname));
console.log(process.env.ASSET_PATH);
