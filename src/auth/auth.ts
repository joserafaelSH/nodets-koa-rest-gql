import { ParameterizedContext, Next, Middleware } from "koa";
import { ROUTES } from "../routes/routes";
import { decodeToken, JwtPayload, validateToken } from "../libs/jwt";
import { USERS } from "../user/user";

export function customAuth() {
  return async function (ctx: ParameterizedContext, next: Next) {
    const routeCalled = ROUTES.get(ctx.path);
    if (!routeCalled) {
      ctx.status = 404;
      ctx.body = { message: "Route not found" };
      return;
    }

    if (routeCalled.isPublic) {
      return next();
    }

    const token = ctx.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      ctx.status = 401;
      ctx.body = { message: "Authorization token is missing" };
      return;
    }

    const isValidToken = validateToken(token);
    if (!isValidToken) {
      ctx.status = 401;
      ctx.body = { message: "Invalid token" };
      return;
    }

    const decodedToken: JwtPayload = decodeToken(token) as JwtPayload;
    if (!decodedToken) {
      ctx.status = 401;
      ctx.body = { message: "Failed to decode token" };
      return;
    }

    const foundedUser = USERS.get(decodedToken.email);
    if (!foundedUser) {
      ctx.status = 401;
      ctx.body = { message: "Invalid token" };
      return;
    }

    const allRolesAllowed =
      routeCalled.allowedRoles.length === 1 &&
      routeCalled.allowedRoles[0] === "*";

    if (
      allRolesAllowed ||
      routeCalled.allowedRoles.includes(foundedUser.role)
    ) {
      ctx.state.user = foundedUser;
      return next();
    }

    ctx.status = 403;
    ctx.body = { message: "Access forbidden: role not authorized" };
    return;
  };
}

export const authMiddleware: Middleware = customAuth();
