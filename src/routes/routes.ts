export type RouteProperties = {
  method: string;
  isPublic: boolean;
  allowedRoles: string[];
  path: string;
};

export const ROUTES: Map<string, RouteProperties> = new Map<
  string,
  RouteProperties
>();

export function setRoutes() {
  ROUTES.set("/api/ping", {
    method: "GET",
    isPublic: true,
    allowedRoles: ["*"],
    path: "/api/ping",
  });

  ROUTES.set("/api/register", {
    method: "POST",
    isPublic: true,
    allowedRoles: ["*"],
    path: "/api/register",
  });

  ROUTES.set("/api/login", {
    method: "POST",
    isPublic: true,
    allowedRoles: ["*"],
    path: "/api/login",
  });

  ROUTES.set("/api/private", {
    method: "GET",
    isPublic: false,
    allowedRoles: ["*"],
    path: "/api/private",
  });

  ROUTES.set("/api/private/admin", {
    method: "GET",
    isPublic: false,
    allowedRoles: ["ADMIN"],
    path: "/api/admin",
  });
}
