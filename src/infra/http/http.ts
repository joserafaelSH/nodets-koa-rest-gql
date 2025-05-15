import router from "@koa/router";
import Koa from "koa";
import { koaBody } from "koa-body";
import { setUsers } from "../../domain/repository/user";
import { login, register } from "../../domain/services/user";
import { authMiddleware } from "../auth/auth";
import { logger } from "../logger/logger";

export async function createHttpServer() {
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
    const token = await login(body);
    ctx.body = { token };
  });

  appRouter.get(
    "/api/private",
    authMiddleware(["ADMIN", "USER"]),
    async (ctx: Koa.Context) => {
      ctx.body = { messge: "private" };
    },
  );

  appRouter.get(
    "/api/private/admin",
    authMiddleware(["ADMIN"]),
    async (ctx: Koa.Context) => {
      ctx.body = { messge: "private admin" };
    },
  );

  app.use(appRouter.routes());

  app.on("error", (err, ctx) => {
    logger.error("server error", err, ctx);
  });

  await setUsers();
  return app;
}
