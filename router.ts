import { Logger } from "@std/log";
import { Hono } from "jsr:@hono/hono";
import { inject, injectable } from "@dc0d/dion";
import { Route } from "./domain.ts";

@injectable({ tags: "router" })
export class Router extends Hono {
  constructor(
    logger = inject<Logger>({ tag: "logger" }),
    routes = inject<Route[]>({ group: "routes" }),
  ) {
    super();

    this.use(async (c, next) => {
      await next();

      logger.debug("incoming request", {
        request: { method: c.req.method, url: c.req.url },
        response: { status: c.res.status },
      });
    });

    routes.forEach((route) => route.register(this));
  }
}
