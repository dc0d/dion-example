import { Hono } from 'jsr:@hono/hono';
import { inject, injectable } from '@dc0d/dion';
import { Logger } from '@std/log';
import { Route } from '../domain.ts';

@injectable({ group: 'routes' })
export class Api implements Route {
  #logger: Logger;

  constructor(logger = inject<Logger>({ tag: 'logger' })) {
    this.#logger = logger;
  }

  register(router: Hono): void {
    router.get('/api', (c) => {
      const response = { data: 'Hello Hono!' };
      return c.json(response);
    });

    router.get('/api/2', (c) => {
      const response = { data: 'invalid data' };
      return c.json(response, 422);
    });

    router.get('/api/error', (_c) => {
      throw new Error('An error occurred');
    });

    this.#logger.info('Api route registered');
  }
}
