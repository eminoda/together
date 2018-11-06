const debug = require('debug')('router:user');
let router = require('koa-router')();
let HttpService = require('../util/http');

router.prefix('/trade');

router.all('/stockLimits', async (ctx, next) => {
    debug('start');
    let respData = await new HttpService({
        ctx
    }).request({
        url: ctx.path,
        method: 'get'
    });
    let resultData = {
        limit: []
    }
    for (let index in respData.list) {
        console.log(index);
        resultData.limit.push({
            id: Number(index) + 1,
            stockCode: respData.list[index].stkCd,
            stockName: respData.list[index].stkNm
        });
    }
    ctx.body = resultData;
    debug('end');
})

module.exports = router;