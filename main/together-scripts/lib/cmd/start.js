const Command = require('../command');
const path = require('path');
const spawn = require('child_process').spawn;

class StartCommand extends Command {
	constructor(rawArgv) {
		super(rawArgv);
		this.usage = 'Usage: together-scripts start [options]';
		this.options = {
			name: {
				type: 'string',
				description: '测试-项目名称'
			},
			author: {
				type: 'string',
				description: '测试-项目作者'
			},
			framework: {
				type: 'string',
				description: 'together lib 主入口路径，[default] project/main/together'
			}
		};
	}

	*run(context) {
		const { argv, env, cwd, execArgv } = context;
		const command = argv.node || 'node';
		const serverBin = path.join(__dirname, '../../bin/start-cluster');
		argv.baseDir = cwd;
		argv.framework = argv.framework || path.join(argv.baseDir, 'main', 'together');
		const ignoreKeys = ['_', '$0']; //["_", "$0", "env", "daemon", "stdout", "stderr", "timeout", "ignore-stderr", "node"];
		const togetherOptions = stringify(argv, ignoreKeys);
		// array type
		const spawnArgv = [...(execArgv || []), serverBin, togetherOptions];
		const options = {
			stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
			detached: true
		};
		const child = (this.child = spawn(command, spawnArgv, options));
		this.logger.info('main pid %s is running', process.pid);
		this.logger.info('child pid %s is running', child.pid);
		child.on('message', msg => {
			this.logger.info(msg.data);
			if (msg.action == 'together-ready') {
				// child.unref();
				// child.disconnect();
				// this.exit(0);
			}
		});
		process.on('uncaughtException', err => {
			this.logger.info(err);
		});
		process.on('exit', code => {
			this.logger.info('process exit code::%s', code);
		});
		// attach master signal to child
		// let signal;
		// ['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(event => {
		// 	process.once(event, () => {
		// 		signal = event;
		// 		process.exit(0);
		// 	});
		// });
		// process.once('exit', () => {
		// 	child.kill(signal);
		// });
	}
}

function stringify(obj, ignore) {
	const result = {};
	Object.keys(obj).forEach(key => {
		if (!ignore.includes(key)) {
			result[key] = obj[key];
		}
	});
	return JSON.stringify(result);
}

module.exports = StartCommand;
