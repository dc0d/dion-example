import { Hono } from 'jsr:@hono/hono';
import { inject, injectable } from '@dc0d/dion';
import { Logger } from '@std/log';
import { HttpClient, Route } from '../domain.ts';

@injectable({ group: 'routes' })
export class Quotes implements Route {
  #httpClient: HttpClient;
  #logger: Logger;

  constructor(
    httpClient = inject<HttpClient>({ tag: 'http_client' }),
    logger = inject<Logger>({ tag: 'logger' }),
  ) {
    this.#httpClient = httpClient;
    this.#logger = logger;
  }

  register(router: Hono): void {
    router.get('/quotes', async (c) => {
      // from https://animechan.io/
      const res = await this.#httpClient.fetch(
        'https://animechan.io/api/v1/quotes/random',
      );
      const data = await res.json();
      return c.json(data);
    });

    this.#logger.info('Quotes route registered');
  }
}
