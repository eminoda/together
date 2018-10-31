let router = require('koa-router')();
let UserService = require('../service/user');

router.get('/', async (ctx, next) => {
    let respData = await new UserService().getbalance();
    ctx.body = respData
});

module.exports = router;