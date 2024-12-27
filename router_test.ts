// deno-lint-ignore-file no-explicit-any

// this is how services/dependencies are registered in the container:
import "./routes/mod.ts";

import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { delay } from "@std/async/delay";
import { injectable } from "@dc0d/dion";

import { Router } from "./router.ts";

@injectable({ tags: ["logger", "http_client"] })
export class Dummy {
  constructor() {
    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (typeof prop !== "string") {
          return Reflect.get(target, prop, receiver);
        }

        return (..._args: any[]) => {
          // provide behaviour if needed.
        };
      },
    });
  }
}

// TODO: add config for test - load from file, for each environment (dev, test, prod)

describe("a promise", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it('should return "Hello Hono!" on GET /api', async () => {
    const res = await router.request("/api");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: "Hello Hono!" });
  });

  it('should return "invalid data" on GET /api/2', async () => {
    const res = await router.request("/api/2");
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ data: "invalid data" });
  });

  it("should throw an error on GET /api/error", async () => {
    const res = await router.request("/api/error");
    expect(res.status).toBe(500);
    expect(await res.text()).toEqual("Internal Server Error");
  });

  it("should return 404 on GET /unknown", async () => {
    const res = await router.request("/unknown");
    expect(res.status).toBe(404);
    expect(await res.text()).toEqual("404 Not Found");
  });

  it("should return 404 on GET /delay", async () => {
    const res = await router.request("/delay");
    expect(await res.text()).toEqual("Gateway Timeout");
    expect(res.status).toBe(504);

    await delay(1050);
  });
});
