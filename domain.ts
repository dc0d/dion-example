import { Hono } from 'jsr:@hono/hono';

export type Config = Readonly<{
  SVC_PORT: string;
  SVC_HOSTNAME: string;
  SVC_SERVICE_NAME: string;
  SVC_LOG_LEVEL: string;
}>;

export interface ConfigProvider {
  load(): Promise<void>;
  loadSync(): void;
  read(): Config;
}

export interface Server {
  serve(): void;
}

export interface App {
  run(): void;
}

export interface HttpClient {
  fetch(input: URL | Request | string, init?: RequestInit): Promise<Response>;
}

export interface Route {
  register(hono: Hono): void;
}
