const options = JSON.parse(process.argv[2]);
const Application = require(options.framework).Application;
const app = new Application(options);
const logger = require('../../together-logger')('worker');
logger.info('worker pid::' + process.pid);

app.listen(3111);

process.on('uncaughtException', err => {
	logger.error(err);
	logger.error(1);
	process.send(err.message);
});
