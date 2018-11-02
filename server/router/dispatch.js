let router = require('koa-router')();
let logger = require('../util/logger')('router:base');
const Adapter = require('../util/adapter');
const Http = require('../util/http');
/**
 * 通配路由
 * 接入所有请求
 */
router.get('*', async (ctx, next) => {
    await _dispatch(ctx);
})
router.post('*', async (ctx, next) => {
    await _dispatch(ctx);
})

async function _dispatch(ctx) {
    try {
        let httpConfig = await new Adapter({
            ctx
        }).match({
            url: '/V1.0/user/login',
            method: 'post'
        })
        let respData = await new Http({
            ctx
        }).request(httpConfig);
        ctx.body = respData;
    } catch (err) {
        throw err;
    }

}
module.exports = router;