const extend = require('extend2');
const userAction = require('./userAction');
const tradeAction = require('./tradeAction');

module.exports = extend(true, {}, userAction, tradeAction);