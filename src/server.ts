import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';

import Config from './config';

import Publisher from './amqp/publishers/publisher';
import Worker from './amqp/workers/worker';
import timer from './middlewares/timer.middleware';

const app = new Koa();
Publisher.init(Config.QUEUES);
Worker.init(Config.QUEUES);

app.use(json());
app.use(logger());

app.use(timer);

app.use(async (ctx) => {
  try {
    await Publisher.publish('playground', { message: 'Hello Rabbit!' }, { persitent: true });

    ctx.body = { message: 'Published' };
  } catch (err) {
    ctx.body = { error: err };
  }
});

app.listen(Config.APP_PORT, () => {
  console.log('Running in port 3333');
});
