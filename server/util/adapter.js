const logger = require('./logger')('adapter');
let HttpService = require('../util/http');
class Adapter {
    constructor(options = {}) {
        this.ctx = options.ctx;
        this._parse();
    }
    _parse(options = {}) {
        let dispatch = {
            body: this.ctx.method == 'get' ? null : options.query || this.ctx.request.body,
            query: options.query || this.ctx.query,
            url: options.url || this.ctx.path
        }
    }
    dispatch() {
        console.log('dispatch');
        return new HttpService({
            ctx: this.ctx
        }).request({
            url: '/user/getbalance'
        })
    }
}
module.exports = Adapter;