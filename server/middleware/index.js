const compose = require('koa-compose');
const logger = require('./logger');
const error = require('./error');
const router = require('./router');
module.exports = compose([
    error(),
    logger,
    router
]);