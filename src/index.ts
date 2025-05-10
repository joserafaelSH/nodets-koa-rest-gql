import { logger } from "./logger/logger";

import router from "@koa/router";
import Koa from "koa";
import { koaBody } from "koa-body";
import { authMiddleware } from "./auth/auth";
import { setRoutes } from "./routes/routes";
import { login, register, setUsers } from "./user/user";

const appRouter = new router();
const app = new Koa();

app.use(koaBody());

// request log
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// response time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// auth middleware
app.use(authMiddleware);

appRouter.get("/api/ping", (ctx) => {
  ctx.body = { message: "pong" };
});

appRouter.post("/api/register", async (ctx: Koa.Context) => {
  const body = ctx.request.body;
  const user = await register(body);
  ctx.body = user;
});

appRouter.post("/api/login", async (ctx: Koa.Context) => {
  const body = ctx.request.body;
  logger.info(ctx);
  const token = await login(body);
  ctx.body = { token };
});

appRouter.post("/api/private", async (ctx: Koa.Context) => {
  ctx.body = { messge: "private" };
});

appRouter.get("/api/private/admin", async (ctx: Koa.Context) => {
  ctx.body = { messge: "private admin" };
});

app.use(appRouter.routes());

app.on("error", (err, ctx) => {
  logger.error("server error", err, ctx);
});

const port = process.env.PORT || 3000;

logger.info(`Starting app: ${process.env.NODE_ENV} mode on ${port} port`);
await setUsers();
setRoutes();
app.listen(port);
