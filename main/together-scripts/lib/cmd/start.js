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
		child.on('message', msg => {
			this.logger.info(msg.data);
			if (msg.action == 'together-ready') {
				// child.unref();
				// child.disconnect();
			}
		});
		child.on('error', err => {
			// console.log(err);
		});
		child.once('exit', (code, signal) => {
			this.logger.info('pid %s is exit,signal %s,code %s', child.pid, signal, code);
		});
		mainProcessExitListen();
	}
}
function mainProcessExitListen() {
	let signal;
	['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(event => {
		process.once(event, () => {
			signal = event;
			process.exit(0);
		});
	});
	// process.once('exit', () => {
	// 	console.log(`pid::${child.pid} is exit, signal::${signal}`);
	// 	child.kill(signal);
	// });
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
