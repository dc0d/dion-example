// deno-lint-ignore-file no-explicit-any

import { loadSync } from '@std/dotenv';
import { delay } from '@std/async/delay';

import { Config as ConfigData, ConfigProvider } from './domain.ts';
import { injectable } from '@dc0d/dion';

export const ConfigComponent = () => {
  return injectable({ tags: 'config' });
};

@ConfigComponent()
export class Config implements ConfigProvider {
  #config: Record<string, string> = null as never;

  async load(): Promise<void> {
    this.loadSync();
    // any async loading logic goes here.
    // this code is just for demonstration purposes.
    await delay(0);
  }

  loadSync(): void {
    if (this.#config) return;

    this.#config = loadSync();

    let env = Deno.env.get('APP_ENV');
    env = env ? `.${env}` : '';
    const overWritten = loadSync({ envPath: `.env${env}` });

    this.#config = { ...this.#config, ...overWritten };
  }

  read(): ConfigData {
    return this.#config as any;
  }
}
