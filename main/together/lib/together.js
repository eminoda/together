const TogetherCore = require('../../together-core').TogetherCore;
/**
 * Together 应用层
 */
class TogetherApplication extends TogetherCore {
	constructor(options = {}) {
		super(options);
		// 添加 Cookies、Session 验证
		// 加载 load 的配置文件
	}
}
module.exports = TogetherApplication;
