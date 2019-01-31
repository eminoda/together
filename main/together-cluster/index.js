const Master = require('./lib/master');
exports.startCluster = options => {
	new Master(options).ready();
};
