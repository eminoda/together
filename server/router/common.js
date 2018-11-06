const debug = require('debug')('router:user');
const router = require('koa-router')();
const FormData = require('form-data');
const Http = require('../util/http');
const util = require('../util');
const Transfer = require('../core/transfer');
const Action = require('../core/action');
const md5 = require('md5');

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
    let respData = await new Transfer({
        ctx
    }).run();
    ctx.body = respData;
    // let respData = await new Http({
    //     ctx
    // }).request({
    //     url: ctx.path,
    //     method: ctx.method
    // });
    debug('end');
})

module.exports = router;