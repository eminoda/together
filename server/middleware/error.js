const debug = require('debug')('middleware:error');
const logger = require('../util/logger')('middleware:error');
const accepts = require('accepts');

module.exports = options => {
    return async (ctx, next) => {
        debug('start');
        try {
            await next();
            if (ctx.status != 200) {
                debug('url %j', ctx.path);
                let type = accepts(ctx.request).type(['json', 'html']);
                _rendErrorResponse(ctx, ctx.message);
            }
        } catch (err) {
            logger.error(err);
            let type = accepts(ctx.request).type(['json', 'html']);
            _rendErrorResponse(ctx, err.stack);
        }
        debug('end');
    }
}

_rendErrorResponse = (ctx, data) => {
    let type = accepts(ctx.request).type(['json', 'html']);
    switch (type) {
        case 'html':
            ctx.body = `<h1>${data}</h1>`;
            break;
        case 'json':
            ctx.body = {
                success: false,
                resultMsg: data
            }
            break;
        default:
            ctx.body = {
                success: false,
                resultMsg: data
            }
    }
}