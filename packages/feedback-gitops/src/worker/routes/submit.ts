import { Hono } from 'hono';
import type { Env } from '../env';
import { requireAuth } from '../middleware/auth';
import { normalizeSubmission, normalizeAudioSubmission } from '../utils/normalize';
import { errorPayload } from '../utils/errors';

const submit = new Hono<{ Bindings: Env }>();

submit.use('/', requireAuth);

submit.post('/', async (c) => {
  const contentType = c.req.header('content-type') ?? '';

  let submission;
  try {
    if (contentType.includes('multipart/form-data')) {
      submission = await normalizeAudioSubmission(c.req.raw, c.env);
    } else {
      const body = await c.req.json().catch(() => null);
      submission = normalizeSubmission(body);
    }
  } catch {
    return c.json(errorPayload('Invalid request body', 'INVALID_JSON'), 400);
  }

  if (!submission) return c.json(errorPayload('Invalid submission payload', 'VALIDATION_ERROR'), 400);

  const submissionId = crypto.randomUUID();
  submission.submissionId = submissionId;

  if (c.env.CANCELLATIONS && submission.input.type === 'audio') {
    await c.env.CANCELLATIONS.put(
      `sub:${submissionId}`,
      (submission.input as { audioKey: string }).audioKey,
      { expirationTtl: 600 },
    );
  }

  try {
    await c.env.FEEDBACK_QUEUE.send(submission);
  } catch (err) {
    console.error('[submit] queue error', err);
    return c.json(errorPayload('Failed to enqueue feedback', 'QUEUE_ERROR'), 500);
  }

  return c.json({ success: true, submissionId });
});

export { submit as submitRoute };
