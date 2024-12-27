import { timeout } from 'jsr:@hono/hono/timeout';
import { delay } from '@std/async/delay';
import { Hono } from 'jsr:@hono/hono';
import { inject, injectable } from '@dc0d/dion';
import { Logger } from '@std/log';
import { Route } from '../domain.ts';

@injectable({ group: 'routes' })
export class Delay implements Route {
  #logger: Logger;

  constructor(logger = inject<Logger>({ tag: 'logger' })) {
    this.#logger = logger;
  }

  register(router: Hono): void {
    router.use('/delay', timeout(500));

    router.get('/delay', async (c) => {
      await delay(1000, { persistent: true });
      const response = { data: 'will not be received by the client' };
      return c.json(response);
    });

    this.#logger.info('Delay route registered');
  }
}
