const debug = require('debug')('router:user');
let router = require('koa-router')();
let Http = require('../util/http');

router.all('*', async (ctx, next) => {
    debug('start');
    // dispatch 无路由匹配
    let respData = await new Http({
        ctx
    }).request({
        url: '/V1.0' + ctx.path,
        method: ctx.method
    });
    ctx.body = respData;
    debug('end');
})

module.exports = router;