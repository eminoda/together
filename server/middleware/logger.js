const debug = require('debug')('middleware:logger');
module.exports = async (ctx, next) => {
    debug('start');
    await next();
    debug('end');
}