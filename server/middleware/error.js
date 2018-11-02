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
                // debug('type %j', type);
                switch (type) {
                    case 'html':
                        ctx.body = `<h1>${ctx.message}</h1>`;
                        break;
                    case 'json':
                        ctx.body = {
                            success: false,
                            resultMsg: ctx.message
                        }
                        break;
                    default:
                        ctx.body = {
                            success: false,
                            resultMsg: ctx.message
                        }
                }
            }
        } catch (err) {
            logger.error(err.message);
            ctx.body = {
                success: false,
                resultMsg: err.stack
            }
        }
        debug('end');
    }
}