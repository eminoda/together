const axios = require('axios');
const logger = require('./logger')('http');
const debug = require('debug')('http');
const cookie = require('cookie');
// const tough = require('tough-cookie');
// const Cookie = tough.Cookie;
class Http {
    constructor(options = {}) {
        this.ctx = options.ctx;
        this.instance = axios.create({
            baseURL: 'http://bg.niu100.com',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': options.ctx.headers['cookie'] || ''
            }
        });
        this.interceptorRequest();
        this.interceptorResponse();
    }
    interceptorRequest() {
        let self = this;
        return this.instance.interceptors.request.use(function(instance) {
            if (instance.method == 'get') {
                instance.params = instance.data;
                instance.data = null;
            }
            debug('url %j', instance.url);
            debug('method %j', instance.method);
            debug('data %j', instance.method == 'get' ? instance.params : instance.data);
            return instance;
        })
    }
    interceptorResponse() {
        let self = this;
        return this.instance.interceptors.response.use(function(response) {
            return new Promise((resolve, reject) => {
                try {
                    self.saveCookieToResponse(response.headers['set-cookie']);
                    if (response.status == 200) {
                        let data = response.data;
                        resolve(data);
                    } else {
                        reject({
                            success: false,
                            resultMsg: response.statusText
                        });
                    }
                } catch (err) {
                    logger.error(err);
                    reject({
                        success: false,
                        resultMsg: err.message
                    });
                }
            })
        })
    }
    request(options = {}) {
        let config = {
            method: (options.method || 'get').toLowerCase(),
            url: options.url,
            data: options.data
        }
        try {
            return this.instance(config)
        } catch (err) {
            logger.error(err.message);
            throw (err);
        }
    }
    saveCookieToResponse(cookies) {
        if (cookies) {
            const cookieKeys = ['uid', 'nick', 'userLever', 'token', 'finance'];
            let targetCookie = {}
            for (let cookieStr of cookies) {
                targetCookie = Object.assign(targetCookie, cookie.parse(cookieStr))
            }
            for (let key of cookieKeys) {
                this.ctx.cookies.set(key, targetCookie[key], {
                    path: '/',
                    domain: this.ctx.hostname,
                    // maxAge: targetCookie['Max-Age'],
                    // expires: targetCookie['Expires']
                });
            }
        }
    }
}
module.exports = Http;