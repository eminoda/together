const debug = require('debug')('dispatcher');
const match = require('../util/match');

/**
 * 分发
 * rewrite ctx.path
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports = async (ctx, next) => {
    debug('start');
    ctx.path = match(ctx.path) || ctx.path;
    debug(ctx.path);
    await next();
    debug('end');
};