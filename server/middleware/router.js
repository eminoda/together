const compose = require('koa-compose');
const receive = require('../router/receive');
const user = require('../router/user');
const trade = require('../router/trade');
const common = require('../router/common');

module.exports = compose([
    receive.routes(),
    user.routes(),
    trade.routes(),
    common.routes()
])