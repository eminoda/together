const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const upload = require('./upload');
const logger = require('./logger');
const error = require('./error');
const router = require('./router');
/**
 * 中间件
 */
module.exports = compose([
    error(),
    logger,
    bodyParser({
        enableTypes: ['json', 'form'],
        formLimit: 20 * 1000 * 1000
    }),
    upload,
    router
]);