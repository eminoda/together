const debug = require('debug')('router:common');
const router = require('koa-router')();
const FormData = require('form-data');
const Http = require('../util/http');
const util = require('../util');
const Transfer = require('../core/transfer');

router.post('/upload', async (ctx, next) => {
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
})
router.all('*', async (ctx, next) => {
    let respData = await new Transfer({
        ctx
    }).run();
    ctx.body = respData;
})

module.exports = router;