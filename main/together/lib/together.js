const TogetherCore = require('../../together-core').TogetherCore;
/**
 * Together 框架
 * 核心功能：
 * 1. Action 规则的解析
 * 		- Http（自定义 HttpHeader、Restful 解析）
 * 		- Sql（mysql、redis）
 * 2. GraphQL 对象级接入
 */
class TogetherApplication extends TogetherCore {
	constructor(options = {}) {
		super(options);
		// 添加 Cookies、Session 验证
		// 加载 load 的配置文件
	}
}
module.exports = TogetherApplication;
