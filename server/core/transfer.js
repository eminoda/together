const extend = require('extend2');
const is = require('is-type-of');
const defaultAction = require('../action/userAction');
const Action = require('./action');

class Transfer {
    constructor(options = {}) {
        if (!options.ctx) {
            throw new Error('Transfer 初始化失败：ctx 未配置');
        }
        this.ctx = options.ctx;
        this.actions = defaultAction;
        this.parentsAction = {};
        this.promiseFn = [];
        this._matchAction();
    }
    // 按照url旧地址匹配默认action
    _matchAction() {
        if (!this.actions) {
            throw new Error('未配置 action');
        }
        if (this.actions && this.actions.length > 0) {
            for (let action of this.actions) {
                if (action.name == this.ctx.path) {
                    this.parentAction = action;
                    if (action.type) {
                        let childActions = action.children;
                        // 因为ctx.path，没有用递归
                        for (let childAction of childActions) {
                            this._pushAction(this._createAction(childAction.requestOptions));
                        }
                    } else {
                        this.promiseFn = this._createAction(action.requestOptions);
                        return;
                    }
                }
            }
        }
        if (!this.promiseFn || this.promiseFn && this.promiseFn.length < 1) {
            this.promiseFn = this._createAction({});
        }
    }
    _pushAction(action) {
        this.promiseFn.push(action);
    }
    _createAction(requestOptions) {
        return new Action({
            ctx: this.ctx,
            requestOptions: requestOptions
        }).request()
    }
    async run() {
        let result = {}
        if (is.array(this.promiseFn)) {
            let dataCollection = await this._mix(this.promiseFn);
            for (let data of dataCollection) {
                result = extend(true, result, data);
            }
            this._responseMapper(result);
            return result;
        } else {
            return this.promiseFn;
        }
    }
    // 混合Promise，注意：返回是个data集合
    _mix(fn) {
        return Promise.all(fn).then(datas => {
            return datas
        }).catch(err => {
            throw new Error(err);
        })
    }
    _responseMapper(data) {
        return this.parentAction ? this.parentAction.responseMapper(data) : data;
    }
}
module.exports = Transfer;