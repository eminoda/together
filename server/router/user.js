const debug = require('debug')('router:user');
const router = require('koa-router')();
const userService = require('../service/userService');

router.prefix('/user');

router.all('/balance', async (ctx, next) => {
    debug('start');
    let respData = await userService.getBalance()(ctx);
    ctx.body = respData;
    debug('end');
})

module.exports = router;