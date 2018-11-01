const debug = require('debug')('middleware:dispater');
const accepts = require('accepts');

module.exports = async (ctx, next) => {
    debug('start');
    ctx.path = '/user/getbalance';
    await next();
    debug('end');
}