const debug = require('debug')('middleware');
module.exports = (ctx, next) => {
    next();
    debug('logger finished');
}