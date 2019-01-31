const TogetherApplication = require('./together');
/**
 * 应用层
 */
class Application extends TogetherApplication {
	constructor(options = {}) {
		super(options);
		// load 加载启动
	}
}
module.exports = Application;
