module.exports = {
	pm2: true,
	appenders: {
		all: {
			type: 'file',
			filename: './all-the-logs.log'
		}
	},
	categories: {
		default: {
			appenders: ['all'],
			level: 'info'
		}
	}
};
