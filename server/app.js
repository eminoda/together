const debug = require('debug')('app');
const logger = require('./util/logger')('app');
const Koa = require('koa');
const middleware = require('./middleware');

let app = new Koa();

app.use(middleware);

app.on('error', err => {
    logger.error(err);
});

module.exports = app;