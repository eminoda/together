const debug = require('debug')('middleware');
const accepts = require('accepts');

module.exports = options => {
    return (ctx, next) => {
        next();
        if (ctx.status != 200) {
            let type = accepts(ctx.request).type(['json', 'html']);
            debug('type %j', type);
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
        debug('error finished');
    }
}