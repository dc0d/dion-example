// this is how services/dependencies are registered in the container:
import "./config.ts";
import "./logger.ts";
import "./router.ts";
import "./server.ts";
import "./app.ts";
import "./http_client.ts";
import "./routes/mod.ts";

import { inject } from "@dc0d/dion";
import { App, ConfigProvider } from "./domain.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const configProvider = inject<ConfigProvider>({ tag: "config" });
  configProvider.loadSync();

  const app = inject<App>({ tag: "app" });
  app.run();
}
