import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './env';
import { submitRoute } from './routes/submit';
import { issuesRoute } from './routes/issues';
import { actionRoute } from './routes/action';
import { cancelRoute } from './routes/cancel';
import { widgetRoute } from './routes/widget';
import { healthRoute } from './routes/health';
import { errorPayload } from './utils/errors';

export function createApp() {
  const app = new Hono<{ Bindings: Env }>();

  app.use('*', cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'X-API-Key', 'X-Admin-Token'],
  }));

  app.route('/health', healthRoute);
  app.route('/widget.js', widgetRoute);
  app.route('/api/issue', submitRoute);
  app.route('/api/issues', issuesRoute);
  app.route('/api/action', actionRoute);
  app.route('/api/cancel', cancelRoute);

  app.notFound((c) => c.json(errorPayload('Not Found', 'NOT_FOUND'), 404));

  return app;
}
