const extend = require('extend2');
const debug = require('debug')('adapter');
const Http = require('./http');
class Adapter {
    constructor(options = {}) {
        this.options = {
            url: options.ctx.path,
            data: options.ctx.method.toLowerCase() == 'get' ? options.ctx.query : options.ctx.request.body,
            method: options.ctx.method
        }
    }
    /**
     * url
     * data
     * method
     */
    match(options = {}) {
        if (typeof options === 'string') {
            this.options = extend({}, {
                url: arguments[0]
            }, arguments[1]);
        } else {
            this.options = extend(this.options, options)
        }
        return this.options;
    }
}
module.exports = Adapter;