const debug = require('debug')('middleware:dispater');

/**
 * 分发
 * 根据请求路径，选择对应逻辑
 */
module.exports = async (ctx, next) => {
    debug('start');
    ctx.path = '/user/getbalance';
    await next();
    debug('end');
}