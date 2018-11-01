const debug = require('debug')('middleware');
const compose = require('koa-compose');
const router = require('koa-router')();
const user = require('../router/user');
const base = require('../router/base');

module.exports = compose([
    // user.routes(),
    base.routes(),
    router.allowedMethods()
])