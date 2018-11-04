const debug = require('debug')('router:user');
let router = require('koa-router')();
let HttpService = require('../util/http');
const md5 = require('md5');

router.prefix('/V1.0/user');

router.all('/login', async (ctx, next) => {
    debug('start');
    let respData = await new HttpService({
        ctx
    }).request({
        url: ctx.path,
        method: 'post',
        data: {
            username: ctx.request.body.username,
            password: md5(ctx.request.body.password + '!@$#%^&*(%^##$!')
        }
    })
    ctx.body = respData;
    debug('end');
})
module.exports = router;