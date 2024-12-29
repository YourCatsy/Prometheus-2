const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const Koa = require('koa');
const redis = require('./db/redis');
const promClient = require('prom-client');  // Добавить импорт для prom-client
const appPort = require('../config/app');

const app = module.exports = new Koa();

// Создаем реестр для метрик
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Настройка представлений
app.use(serve(`${__dirname}/public`));
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// Данные пользователя для рендера
const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// Маршрут для получения метрик Prometheus
app.use(async (ctx, next) => {
  if (ctx.url === '/metrics') {
    ctx.set('Content-Type', register.contentType);
    ctx.body = await register.metrics();
  } else {
    await next();
  }
});

// Основной маршрут рендера данных пользователя
app.use(async function(ctx) {
  if (ctx.url === '/redis') {
    const data = await redis.ping();
    return ctx.render('redis', { redisData: data });
  }
  return ctx.render('user', { user });
});

// Запуск приложения
if (!module.parent) app.listen(appPort);
