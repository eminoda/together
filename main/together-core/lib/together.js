const Koa = require('koa');
/**
 * Together 核心功能，覆写 Koa 主要方法
 * 核心功能：
 * 1. Action 规则的解析
 * 		- Http（自定义 HttpHeader、Restful 解析）
 * 		- Sql（mysql、redis）
 * 2. GraphQL 对象级接入
 */
class TogetherCore extends Koa {
	constructor(options = {}) {
		super();
		// 定义主属性，Controller、Service
		// 定义并创建 loader
	}
}

module.exports = TogetherCore;
