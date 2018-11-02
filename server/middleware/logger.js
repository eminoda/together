const debug = require('debug')('middleware:logger');
/**
 * 日志记录
 * TODO: 如果有记录业务处理时间等落地信息
 */
module.exports = async (ctx, next) => {
    debug('start');
    await next();
    debug('end');
}