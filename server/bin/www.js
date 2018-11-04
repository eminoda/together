// TODO: add multi cpu
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const debug = require('debug')('www');
const app = require('../app.js')
app.listen(3000);
debug('server is running 3000');