const debug = require('debug')('middleware:router');
const compose = require('koa-compose');
const router = require('koa-router')();
const base = require('../router/base');
const user = require('../router/user');

module.exports = compose([
    // user.routes(),
    base.routes(),
    router.allowedMethods()
])