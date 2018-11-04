const debug = require('debug')('router:user');
const router = require('koa-router')();
const FormData = require('form-data');
const Http = require('../util/http');
const util = require('../util');

router.post('/upload', async (ctx, next) => {
    debug('start');
    let formData = new FormData();
    formData.append('picFile', util.getTempFileStream(ctx.state.tempUploadDir));

    let respData = await new Http({
        ctx
    }).request({
        url: ctx.path,
        method: ctx.method,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
    })
    ctx.body = respData;
    debug('end');
})
router.all('*', async (ctx, next) => {
    debug('start');
    // dispatch 无路由匹配
    let respData = await new Http({
        ctx
    }).request({
        url: ctx.path,
        method: ctx.method
    });
    ctx.body = respData;
    debug('end');
})

module.exports = router;