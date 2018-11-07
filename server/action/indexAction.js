const userAction = require('./userAction');
const tradeAction = require('./tradeAction');

module.exports = [...userAction, ...tradeAction]