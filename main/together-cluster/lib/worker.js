const options = JSON.parse(process.argv[2]);
const Application = require(options.framework).Application;
const app = new Application(options);
app.listen(3111);

process.on('uncaughtException', err => {
	process.send(err.message);
});
