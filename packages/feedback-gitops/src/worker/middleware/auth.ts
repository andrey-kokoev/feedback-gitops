import type { MiddlewareHandler } from 'hono';
import type { Env } from '../env';
import { errorPayload } from '../utils/errors';

export const requireAuth: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const adminToken = c.req.header('X-Admin-Token') || '';
  const apiKey = c.req.header('X-API-Key') || '';

  if (c.env.ADMIN_TOKEN && adminToken) {
    if (adminToken !== c.env.ADMIN_TOKEN) {
      return c.json(errorPayload('Unauthorized', 'UNAUTHORIZED'), 401);
    }
  } else if (apiKey !== c.env.API_KEY) {
    return c.json(errorPayload('Unauthorized', 'UNAUTHORIZED'), 401);
  }

  await next();
};
