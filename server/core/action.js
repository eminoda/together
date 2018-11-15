const is = require('is-type-of');
const extend = require('extend2');
const Http = require('../util/http');

/**
 * Action 
 */
class Action {
    /**
     * @param {Object} ctx  全局request、response对象
     * @param {String} name action 名称
     * @param {Object} requestOptions   请求接口的request参数
     * @param {String} requestOptions.url
     * @param {String} requestOptions.method
     * @param {Object} requestOptions.data
     */
    constructor(options = {}) {
        this.name = options.name || '';
        if (!options.ctx) {
            throw new Error('Action 初始化失败：ctx 未配置');
        }
        this.ctx = options.ctx;
        this.requestOptions = this._rewriteRequest(options.requestOptions);
    }
    async request() {
        return await new Http({
            ctx: this.ctx
        }).request(this.requestOptions)
    }
    // 重写默认request参数
    _rewriteRequest(requestOptions) {
        // 默认配置 
        let defaultOptions = {
            url: this.ctx.path,
            method: this.ctx.method,
            data: extend(true, {}, this.ctx.query, this.ctx.request.body) //this.ctx.method == 'get' ? this.ctx.query : this.ctx.request.body
        }
        requestOptions = extend(true, {}, defaultOptions, requestOptions);
        // 函数则执行；请求参数则替换；其他直接使用
        Object.keys(requestOptions.data).forEach(key => {
            let fn = requestOptions.data[key];
            requestOptions.data[key] = is.function(fn) ? fn.call(this) : this._getData(fn) ? this._getData(fn) : fn;
        })
        return requestOptions;
    }
    // 获取指定请求参数（url params/post body）
    _getData(key) {
        if (this.ctx.method && this.ctx.method.toLowerCase() == 'post') {
            return this.ctx.request.body && this.ctx.request.body[key] || this.ctx.query && this.ctx.query[key] || '';
        }
        return this.ctx.query && this.ctx.query[key] || ''
    }
}

module.exports = Action;