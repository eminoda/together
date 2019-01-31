const path = require('path');
const BaseCommand = require('common-bin');
const Logger = require('zlogger');

/**
 * 命令行-基础类
 */
class Command extends BaseCommand {
	constructor(rawArgv) {
		super(rawArgv);
		this.load(path.join(__dirname, 'cmd'));
		this.yargs.alias('v', 'version');
		this.logger = new Logger({
			prefix: '[egg-scripts] ',
			time: true
		});
	}
}

module.exports = Command;
