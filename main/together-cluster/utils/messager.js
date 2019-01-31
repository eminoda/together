class Messenger {
	constructor() {}
	send(data) {
		if (data.to == 'parent') {
			this.sendToParent(data);
			return;
		}
	}
	sendToParent(data) {
		process && process.send(data);
	}
}
module.exports = Messenger;
