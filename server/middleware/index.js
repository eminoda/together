const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const logger = require('./logger');
const error = require('./error');
const router = require('./router');
const userRouter = require('../router/user');
/**
 * 中间件
 */
module.exports = compose([
    error(),
    logger,
    bodyParser({
        enableTypes: ['json', 'form']
    }),
    router
]);