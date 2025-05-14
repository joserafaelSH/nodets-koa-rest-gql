import { createYoga } from "graphql-yoga";
import Koa from "koa";
import { koaBody } from "koa-body";
import { authMiddleware } from "../auth/auth";
import { logger } from "../logger/logger";
import { setRoutes } from "../routes/routes";
import { setUsers } from "../user/user";
import { schema } from "./schema/schema";
import { createContext } from "./context";

export async function createGqlServer() {
  const app = new Koa();
  const yoga = createYoga({
    cors: {
      origin: "http://localhost:4000",
      credentials: true,
      allowedHeaders: ["X-Custom-Header"],
      methods: ["POST"],
    },
    schema,
    context: createContext,
  });

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

  app.use(async (ctx: Koa.Context) => {
    // Second parameter adds Koa's context into GraphQL Context
    // If you use any body parsing middleware in your application,
    // Make sure it is `ctx.request` and not `ctx.req`
    const response = await yoga.handleNodeRequestAndResponse(
      ctx.request,
      ctx.res,
    );

    // Set status code
    ctx.status = response.status;

    // Set headers
    response.headers.forEach((value, key) => {
      ctx.append(key, value);
    });

    // Converts ReadableStream to a NodeJS Stream
    ctx.body = response.body;
  });

  app.on("error", (err, ctx) => {
    logger.error("server error", err, ctx);
  });

  const port = process.env.PORT || 3000;

  logger.info(`Starting app: ${process.env.NODE_ENV} mode on ${port} port`);
  await setUsers();
  setRoutes();
  return app;
}
