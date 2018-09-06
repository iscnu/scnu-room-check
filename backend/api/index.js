const Koa = require('koa');
const logger = require('koa-logger');
const { getWeek, headers } = require('./middleware');
const app = new Koa();
const router = require('./router');

if (!process.env.PRODUCTION) {
  app.use(logger());
}
app.use(headers);
app.use(getWeek);
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
