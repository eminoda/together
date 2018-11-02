const debug = require('debug')('router:user');
let router = require('koa-router')();
let HttpService = require('../util/http');

router.prefix('/V1.0/trade');

router.all('/stockLimits', async (ctx, next) => {
    debug('start');
    let respData = await new HttpService({
        ctx
    }).request({
        url: ctx.path,
        method: 'get'
    });
    ctx.body = respData;
    debug('end');
})

module.exports = router;