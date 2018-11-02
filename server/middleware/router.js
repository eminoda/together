const debug = require('debug')('middleware:router');
const compose = require('koa-compose');
const router = require('koa-router')();
const user = require('../router/user');
const dispatch = require('../router/dispatch');

module.exports = compose([
    user.routes(),
    dispatch.routes(),
    router.allowedMethods()
])