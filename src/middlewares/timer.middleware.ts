import { Context, Next } from 'koa';

export default async (ctx: Context, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.body = {
    ...ctx.body,
    requestTime: `${ms}ms`,
  };
};
