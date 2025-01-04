import { HttpClient as IHttpClient } from './domain.ts';
import { injectable } from '@dc0d/dion';

@injectable({ tags: 'http_client' })
export class HttpClient implements IHttpClient {
  async fetch(
    input: URL | Request | string,
    init?: RequestInit,
  ): Promise<Response> {
    return await fetch(input, init);
  }
}
