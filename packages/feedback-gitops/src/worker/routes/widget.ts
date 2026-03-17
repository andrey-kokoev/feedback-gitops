import { Hono } from 'hono';
import type { Env } from '../env';

const widget = new Hono<{ Bindings: Env }>();

widget.get('/', async (c) => {
  if (c.env.ASSETS) {
    const res = await c.env.ASSETS.fetch(new Request(new URL('/widget.js', c.req.url)));
    if (res.ok) return res;
  }
  return c.json({ error: 'widget.js not available' }, 503);
});

export { widget as widgetRoute };
