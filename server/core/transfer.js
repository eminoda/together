const extend = require('extend2');
const is = require('is-type-of');
const userAction = require('../action/userAction');
const Action = require('./action');
class Transfer {
    constructor(options = {}) {
        if (!options.ctx) {
            throw new Error('Transfer 初始化失败：ctx 未配置');
        }
        this.ctx = options.ctx;
        this.actions = options.actions || [];
        this.parentsAction = {}
        this._matchAction();
        this.run();
    }
    // 按照url旧地址匹配默认action
    _matchAction() {
        if (this.actions.length < 1) {
            for (let action of userAction) {
                if (action.name == this.ctx.path) {
                    this.parentsAction = action;
                    if (action.type) {
                        let childActions = action.children;
                        // 因为ctx.path，没有用递归
                        for (let childAction of childActions) {
                            _createAction.call(this, childAction.requestOptions);
                        }
                    } else {
                        _createAction.call(this, action.requestOptions);
                    }
                }
            }
        }

        function _createAction(requestOptions) {
            this.actions.push(new Action({
                ctx: this.ctx,
                requestOptions: requestOptions
            }).request());
        }
    }
    async run() {
        let dataCollection = await this._mix(this.actions);
        let result = {}
        for (let data of dataCollection) {
            result = extend(true, result, data);
        }
        this._responseMapper(result);
        return result;
    }
    // 混合Promise，注意：返回是个data集合
    _mix(actions) {
        return Promise.all(actions).then(datas => {
            return datas
        }).catch(err => {
            throw new Error(err);
        })
    }
    _responseMapper(data) {
        return this.parentsAction.responseMapper(data);
    }
}
module.exports = Transfer;