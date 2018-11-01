const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const logger = require('./logger');
const error = require('./error');
const dispatch = require('./dispatch');
const router = require('./router');
// const user = require('../router/user');
module.exports = compose([
    error(),
    logger,
    bodyParser({
        enableTypes: ['json', 'form']
    }),
    dispatch,
    router
]);