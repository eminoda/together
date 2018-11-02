const debug = require('debug')('middleware:router');
const compose = require('koa-compose');
const router = require('koa-router')();
const receive = require('../router/receive');
const user = require('../router/user');
const common = require('../router/common');
const dispatcher = require('./dispatcher');

module.exports = compose([
    receive.routes(),
    // router.allowedMethods(),
    dispatcher,
    user.routes(),
    common.routes()
])