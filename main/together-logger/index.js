const configure = require('./configure');

const log4js = require('log4js');
log4js.configure(configure);

module.exports = category => log4js.getLogger(category);
