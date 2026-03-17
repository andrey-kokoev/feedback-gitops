import { Hono } from 'hono';
import type { Env } from '../env';
import { getServiceName } from '../github/issues';

const health = new Hono<{ Bindings: Env }>();

health.get('/', (c) => {
  return c.json({ ok: true, service: getServiceName(c.req.raw) });
});

export { health as healthRoute };
