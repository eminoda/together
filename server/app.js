const debug = require('debug')('app');
const Koa = require('koa');
const middleware = require('./middleware');

let app = new Koa();

app.use(middleware);
debug('middleware is loaded');

app.use(async (ctx, next) => {
    await next();
    console.log('================over');
})
app.on('error', err => {
    debug('server error', err)
});

module.exports = app;