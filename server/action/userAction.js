const md5 = require('md5');
const URL = require('../util/constant').URL;
module.exports = {
    '/user/login': {
        name: '登录',
        requestOptions: {
            method: 'post',
            url: URL.USER_LOGIN,
            data: {}
        }
    },
    '/user/getbalance': {
        name: '用户信息',
        children: [{
            name: 'balance',
            requestOptions: {
                method: 'get',
                url: URL.USER_BALANCE
            }
        }, {
            name: 'user',
            requestOptions: {
                method: 'get',
                url: URL.USER
            }
        }, {
            name: 'coupon',
            requestOptions: {
                method: 'get',
                url: URL.USER_COUPON
            }
        }],
        responseMapper(data) {
            data.member.bindCard = data.banks && data.banks.length > 0 || false
            return data;
        }
    },
    '/user/uploadHeader': {
        name: '上传头像',
        requestOptions: {
            method: 'post',
            url: URL.USER_UPLOADHEADER
        }
    }
}