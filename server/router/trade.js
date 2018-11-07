const debug = require('debug')('router:trade');
let router = require('koa-router')();

router.prefix('/trade');

module.exports = router;