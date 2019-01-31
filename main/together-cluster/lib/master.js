const EventEmitter = require('events');
const Messenger = require('../utils/messager');
const cluster = require('cluster');
const path = require('path');

class Master extends EventEmitter {
	constructor(options) {
		super();
		this.options = options;
		this.messenger = new Messenger(this);

		// kill(2) Ctrl-C
		process.once('SIGINT', function() {
			console.log(123);
		});
		// kill(3) Ctrl-\
		process.once('SIGQUIT', function() {
			console.log(123);
		});
		// kill(15) default
		process.once('SIGTERM', function() {
			console.log(123);
		});
	}
	ready() {
		this.messenger.send({ action: 'master-ready', to: 'parent', from: 'master', data: 'master ready is called' });
		cluster.setupMaster({
			exec: path.join(__dirname, 'worker.js'),
			args: [JSON.stringify(this.options)]
		});

		const numCPUs = require('os').cpus().length;

		if (cluster.isMaster) {
			for (let i = 0; i < numCPUs; i++) {
				cluster.fork();
			}
		}
		cluster.on('fork', worker => {
			this.messenger.send({ action: 'worker-ready', to: 'parent', from: 'master', data: `workder pid::${worker.process.pid} is ready` });
		});
		cluster.on('message', (worker, message, handle) => {
			this.messenger.send({ action: 'worker-message', to: 'parent', from: 'master', data: `workder pid::${worker.process.pid} receive::${message}` });
		});
		cluster.on('exit', (worker, code, signal) => {
			this.messenger.send({ action: 'worker-died', to: 'parent', from: 'master', data: `workder pid::${worker.process.pid} is died` });
		});
	}
}

module.exports = Master;
