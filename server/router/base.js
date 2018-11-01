let router = require('koa-router')();
let logger = require('../util/logger')('router:base');
let Adapter = require('../util/adapter');
// 通配
router.get('*', async (ctx, next) => {
    try {
        let respData = await new Adapter({
            ctx
        }).dispatch();
        ctx.body = respData;
    } catch (err) {
        logger.error(err);
    }
})
module.exports = router;