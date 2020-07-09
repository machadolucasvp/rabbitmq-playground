import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';

import Config from './config';

const app = new Koa();

app.use(json());
app.use(logger());
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.body = {
    ...ctx.body,
    requestTime: `${ms}ms`,
  };
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx) => {
  ctx.body = { message: 'hello world!' };
});

app.listen(Config.APP_PORT, () => {
  console.log('Running in port 3333');
});
