class Messenger {
	constructor(master) {
		this.master = master;
	}
	send(data) {
		// agent -> master
		if (data.to === 'master') {
			this.sendToMaster(data);
			return;
		}
		// master -> parent
		if (data.to == 'parent') {
			this.sendToParent(data);
			return;
		}
		// masster -> agent
		if (data.to === 'agent') {
			this.sendToAgentWorker(data);
			return;
		}
	}
	sendToMaster(data) {
		this.master.emit(data.action, data.data);
	}
	sendToParent(data) {
		process && process.send(data);
	}
	sendToAgentWorker(data) {
		console.log(123);
		if (this.master.agentWorker) {
			this.master.agentWorker.send(data);
		}
	}
}
module.exports = Messenger;
