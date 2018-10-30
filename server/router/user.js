let router = require('koa-router')();

router.get('/', (ctx, next) => {
    ctx.body = {
        success: true
    }
});

module.exports = router;