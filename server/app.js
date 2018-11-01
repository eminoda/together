const debug = require('debug')('app');
const Koa = require('koa');
const middleware = require('./middleware');

let app = new Koa();

app.use(middleware);
debug('middleware is loaded');

app.on('error', err => {
    debug('error', err)
});

module.exports = app;