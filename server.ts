import { Hono } from "jsr:@hono/hono";
import { inject, injectable } from "@dc0d/dion";
import { Config, ConfigProvider, Server as IServer } from "./domain.ts";

@injectable({ tags: "server" })
export class Server implements IServer {
  #config: Config;
  #router: Hono;

  constructor(
    configProvider = inject<ConfigProvider>({ tag: "config" }),
    router = inject<Hono>({ tag: "router" }),
  ) {
    this.#config = configProvider.read();
    this.#router = router;
  }

  serve() {
    Deno.serve(
      { port: +this.#config.SVC_PORT, hostname: this.#config.SVC_HOSTNAME },
      this.#router.fetch,
    );
  }
}
