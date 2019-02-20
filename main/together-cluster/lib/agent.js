process.send({ action: 'agent-start', to: 'master', from: 'agent' });

process.on('message', msg => {
	_wrapMessenger(msg);
});

function _wrapMessenger(action, data, to) {
	if (action == 'together-ready') {
		process.send({ action: 'agent-test' });
	}
}
