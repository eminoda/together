const debug = require('debug')('middleware');
const compose = require('koa-compose');
const router = require('koa-router')();
const user = require('../router/user');

module.exports = compose([
    user.routes(),
    router.allowedMethods()
])

module.exports = (ctx, next) => {
    next();
}