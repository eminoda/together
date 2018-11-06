const md5 = require('md5');
const URL = require('../util/constant').URL;
module.exports = [{
    name: '/user/login',
    type: 0,
    requestOptions: {
        method: 'post',
        url: URL.USER_LOGIN,
        data: {
            'password': function() {
                return md5(this._getData('password') + '!@$#%^&*(%^##$!');
            }
        }
    }
}, {
    name: '/user/getbalance',
    type: 1,
    children: [{
        name: 'balance',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER_BALANCE
        }
    }, {
        name: 'user',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER
        }
    }, {
        name: 'coupon',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER_COUPON
        }
    }],
    responseMapper(data) {
        data.member.bindCard = data.banks && data.banks.length > 0 || false
        return data;
    }
}, {
    name: '/user/uploadHeader',
    type: 0,
    requestOptions: {
        method: 'post',
        url: URL.USER_UPLOADHEADER
    }
}]