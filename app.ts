import { Logger } from "@std/log";
import { inject, injectable } from "@dc0d/dion";
import { Config, ConfigProvider, Server } from "./domain.ts";

@injectable({ tags: "app" })
export class App {
  #config: Config;
  #logger: Logger;
  #server: Server;

  constructor(
    configProvider = inject<ConfigProvider>({ tag: "config" }),
    logger = inject<Logger>({ tag: "logger" }),
    server = inject<Server>({ tag: "server" }),
  ) {
    this.#config = configProvider.read();
    this.#logger = logger;
    this.#server = server;
  }

  run() {
    this.#logger.info("App started", { config: this.#config });
    this.#server.serve();
  }
}
