let router = require('koa-router')();
let UserService = require('../service/user');
let CommonService = require('../service/common');
let HttpService = require('../util/http');

router.prefix('/user')

router.post('/login', async (ctx, next) => {
    console.log(ctx.request.body);
    let respData = await new HttpService({
        ctx
    }).request({
        url: ctx.path,
        method: 'post',
        data: ctx.request.body
    })
    ctx.body = respData;
})

module.exports = router;