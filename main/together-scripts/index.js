const path = require('path');
const Command = require('./lib/command');

class TogetherCommand extends Command {
	constructor(rawArgv) {
		super(rawArgv);
		this.usage = 'Usage: together-scripts <command> [options]';
		this.load(path.join(__dirname, 'lib/cmd'));
	}
}

module.exports = TogetherCommand;
