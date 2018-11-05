const Http = require('../util/http');
const constant = require('../util/constant');
const extend = require('extend2');
module.exports = {
    getBalance: function() {
        return async (ctx) => {
            let balanceResp = await new Http({
                ctx
            }).request({
                url: constant.URL.USER_BALANCE,
                method: 'get'
            })
            let userResp = await new Http({
                ctx
            }).request({
                url: constant.URL.USER,
                method: 'get'
            })
            let couponResp = await new Http({
                ctx
            }).request({
                url: constant.URL.USER_COUPON,
                method: 'get'
            })
            return extend(true, {}, balanceResp, userResp, couponResp);
        }
    }
}