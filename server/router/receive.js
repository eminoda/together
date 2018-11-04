const router = require('koa-router')();
const logger = require('../util/logger')('router:base');
const debug = require('debug')('router:receive');
const Http = require('../util/http');
/**
 * 通配路由
 * 接入所有请求
 */
router.all('*', async (ctx, next) => {
    debug('start');
    await next();
    debug('end');
})

module.exports = router;