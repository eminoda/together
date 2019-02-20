const EventEmitter = require('events');
const Messenger = require('../utils/messager');
const childprocess = require('child_process');
const cluster = require('cluster');
const path = require('path');
const logger = require('../../together-logger')('master');

class Master extends EventEmitter {
	constructor(options) {
		super();
		this.options = options;
		this.messenger = new Messenger(this);
	}
	forkAgentWorker() {
		const agentWorker = childprocess.fork(path.join(__dirname, 'agent.js'), [], {});
		agentWorker.on('message', msg => {
			this.messenger.send(msg);
		});
		this.agentWorker = agentWorker;
	}
	forkAppWorkers() {
		this.messenger.send({ action: 'together-ready', to: 'agent', from: 'master', data: `together-ready` });
	}
	ready() {
		this.forkAgentWorker();
		this.once('agent-start', this.forkAppWorkers.bind(this));
		this.once('agent-test', function() {
			this.messenger.send({ action: 'test', to: 'parent', from: 'master', data: `test` });
		});
		// cluster.setupMaster({
		// 	exec: path.join(__dirname, 'worker.js'),
		// 	args: [JSON.stringify(this.options)]
		// });
		// const numCPUs = require('os').cpus().length;
		// if (cluster.isMaster) {
		// 	// logger.info('master pid::' + process.pid);
		// 	for (let i = 0; i < numCPUs; i++) {
		// 		cluster.fork();
		// 	}
		// }
		// cluster.on('fork', worker => {
		// 	this.messenger.send({ action: 'worker-ready', to: 'parent', from: 'master', data: `workder pid::${worker.process.pid} is ready` });
		// });
		// cluster.on('message', (worker, message, handle) => {
		// 	console.log(message);
		// 	this.messenger.send({
		// 		action: 'worker-message',
		// 		to: 'parent',
		// 		from: 'master',
		// 		data: `workder pid::${worker.process.pid} receive::${JSON.stringify(message)}`
		// 	});
		// });
		// cluster.on('exit', (worker, code, signal) => {
		// 	this.messenger.send({ action: 'worker-died', to: 'parent', from: 'master', data: `workder pid::${worker.process.pid} is died` });
		// });
	}
}
process.on('uncaughtException', err => {
	process.send({ action: 'error', data: err.message });
});

module.exports = Master;
