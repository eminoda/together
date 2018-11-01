const log4js = require('log4js');
const config = require('../config/logger');
log4js.configure(config);
module.exports = category => {
    return log4js.getLogger(category);
}