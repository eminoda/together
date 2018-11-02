const debug = require('debug')('middleware:router');
const compose = require('koa-compose');
const router = require('koa-router')();
const receive = require('../router/receive');
const user = require('../router/user');
const trade = require('../router/trade');
const common = require('../router/common');
const dispatcher = require('./dispatcher');

module.exports = compose([
    receive.routes(),
    // router.allowedMethods(),
    dispatcher,
    user.routes(),
    trade.routes(),
    common.routes()
])