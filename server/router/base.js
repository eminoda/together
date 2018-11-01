let router = require('koa-router')();
let logger = require('../util/logger')('router:base');
let HttpService = require('../util/http');

// 通配
router.get('*', async (ctx, next) => {
    try {
        let respData = await new HttpService({
            ctx
        }).request({
            url: ctx.path
        })
        ctx.body = respData;
    } catch (err) {
        throw err;
    }
})
module.exports = router;