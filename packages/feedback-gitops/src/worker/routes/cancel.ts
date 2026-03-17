import { Hono } from 'hono';
import type { Env } from '../env';
import { requireAuth } from '../middleware/auth';
import { errorPayload } from '../utils/errors';

const cancel = new Hono<{ Bindings: Env }>();

cancel.use('/', requireAuth);

cancel.post('/', async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json(errorPayload('Invalid JSON body', 'INVALID_JSON'), 400);
  }

  const submissionId = typeof (body as { submissionId?: unknown })?.submissionId === 'string'
    ? (body as { submissionId: string }).submissionId.trim()
    : '';
  if (!submissionId) {
    return c.json(errorPayload('submissionId required', 'VALIDATION_ERROR'), 400);
  }

  if (c.env.CANCELLATIONS) {
    const audioKey = await c.env.CANCELLATIONS.get(`sub:${submissionId}`);
    if (audioKey) {
      await c.env.feedback_gitops_audio.delete(audioKey).catch(() => {});
      await c.env.CANCELLATIONS.delete(`sub:${submissionId}`);
    }
    await c.env.CANCELLATIONS.put(`cancel:${submissionId}`, '1', { expirationTtl: 300 });
  }

  return c.json({ success: true });
});

export { cancel as cancelRoute };
