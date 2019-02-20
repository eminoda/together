const TogetherApplication = require('./together');
/**
 * 应用层
 */
class Application extends TogetherApplication {
	constructor(options = {}) {
		super(options);
	}
}
module.exports = Application;
