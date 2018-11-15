const extend = require('extend2');
const is = require('is-type-of');
const defaultAction = require('../action/indexAction');
const Action = require('./action');

class Transfer {
    constructor(options = {}) {
        if (!options.ctx) {
            throw new Error('Transfer 初始化失败：ctx 未配置');
        }
        this.ctx = options.ctx;
        this.actions = defaultAction || {};
        this.action = this.actions[this.ctx.path] || {};
        this.promiseFn = [];
        this._initAction();
    }
    _initAction() {
        if (!this.action) {
            throw new Error('未配置 action');
        }
        if (this.action.children) {
            for (let childAction of this.action.children) {
                this.promiseFn.push(this._createAction(childAction.requestOptions));
            }
        } else {
            this.promiseFn.push(this._createAction(this.action.requestOptions));
        }
    }
    _createAction(requestOptions = {}) {
        return new Action({
            ctx: this.ctx,
            requestOptions
        }).request()
    }
    async run() {
        let result = {}
        if (!is.array(this.promiseFn)) {
            throw new Error('promise 解析错误');
        }
        // 混合Promise，注意：返回是个data集合
        let datas = await Promise.all(this.promiseFn);
        for (let data of datas) {
            result = extend(true, result, data);
        }
        return this.action.responseMapper ? this.action.responseMapper(result) : result;
    }
}
module.exports = Transfer;