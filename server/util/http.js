const axios = require('axios');
const logger = require('./logger')('http');
const debug = require('debug')('http');
const cookie = require('cookie');
const extend = require('extend2');
const qs = require('qs');
class Http {
    constructor(options = {}) {
        this.ctx = options.ctx;
        this.instance = this._createInstance(options);
        this.interceptorRequest();
        this.interceptorResponse();
    }
    _createInstance(options = {}) {
        return axios.create({
            baseURL: process.env.API_URL,
            method: options.ctx.method.toLowerCase(),
            timeout: 3000,
            headers: {
                'Cookie': this.ctx.headers['cookie'] || '',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }
    interceptorRequest() {
        let self = this;
        return this.instance.interceptors.request.use(function(instance) {
            if (!instance.headers['Content-Type']) {
                instance.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }

            if (instance.method == 'get') {
                instance.params = instance.data || self.ctx.query;
                instance.data = null;
            } else {
                if (instance.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                    instance.data = qs.stringify(instance.data || self.ctx.request.body);
                }
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
                        // 业务逻辑
                        let data = response.data;
                        if (data.success || data.status == 'true') {
                            resolve(data);
                        } else {
                            logger.error(data);
                            reject(new Error(data.resultMsg || '服务器错误'));
                        }
                    } else {
                        reject(new Error(response.statusText));
                    }
                } catch (err) {
                    logger.error(err);
                    reject(err);
                }
            })
        })
    }
    request(config = {}) {
        try {
            debug('request %j', config);
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