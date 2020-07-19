import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';

import Config from './config';
import Worker from './amqp/workers/worker';
import Publisher from './amqp/publishers/publisher';

const app = new Koa();

app.use(json());
app.use(logger());
app.use(async (ctx, next) => {
  const { message } = ctx.body;
  await Publisher.init();
  Publisher.publish('pipeline', { message });
  Worker.consume('pipeline');
  console.log('hello world');
  await next();
});

app.listen(Config.APP_PORT, () => {
  console.log('Running in port 3333');
});
