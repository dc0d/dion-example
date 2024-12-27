import {
  ConsoleHandler,
  formatters,
  LevelName,
  Logger as BaseLogger,
  LoggerOptions,
} from "@std/log";
import { inject, injectable } from "@dc0d/dion";
import { ConfigProvider } from "./domain.ts";

export const LoggerComponent = () => {
  return injectable({ tags: "logger" });
};

@LoggerComponent()
export class Logger extends BaseLogger {
  constructor(configProvider = inject<ConfigProvider>({ tag: "config" })) {
    const { SVC_SERVICE_NAME, SVC_LOG_LEVEL } = configProvider.read();
    const levelName = SVC_LOG_LEVEL as LevelName;

    const options: LoggerOptions = {
      handlers: [
        new ConsoleHandler(levelName, {
          useColors: false,
          formatter: formatters.jsonFormatter,
        }),
      ],
    };
    super(SVC_SERVICE_NAME, levelName, options);
  }
}
