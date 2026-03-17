import { Hono } from 'hono';
import type { Env } from '../env';
import { requireAuth } from '../middleware/auth';
import { executeAction, reconcileMergeRequestedIssues } from '../github/issues';
import { ActionError, errorPayload, getErrorMessage } from '../utils/errors';

const action = new Hono<{ Bindings: Env }>();

action.use('/', requireAuth);

action.post('/', async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json(errorPayload('Invalid JSON body', 'INVALID_JSON'), 400);
  }

  const issueNumber = typeof (body as { issueNumber?: unknown })?.issueNumber === 'number'
    ? (body as { issueNumber: number }).issueNumber
    : Number.NaN;
  if (!Number.isInteger(issueNumber) || issueNumber < 1) {
    return c.json(errorPayload('Invalid issue number', 'VALIDATION_ERROR'), 400);
  }

  const target = String((body as { target?: unknown })?.target || '').trim();
  const act = String((body as { action?: unknown })?.action || '').trim();
  if (!target || !act || !['issue', 'pull_request'].includes(target)) {
    return c.json(errorPayload('Invalid action payload', 'VALIDATION_ERROR'), 400);
  }

  // Handle reconcile action specially
  if (target === 'system' && act === 'reconcile_merge_requests') {
    try {
      const result = await reconcileMergeRequestedIssues(c.env);
      return c.json({ success: true, ...result });
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to reconcile merge requests');
      console.error('Failed to reconcile merge requests:', { message, err });
      return c.json(errorPayload(message, 'GITHUB_ERROR'), 502);
    }
  }

  try {
    const result = await executeAction(c.env, issueNumber, target as 'issue' | 'pull_request', act);
    return c.json({ success: true, target, action: act, pullRequest: result.pullRequest });
  } catch (err) {
    if (err instanceof ActionError) {
      return c.json(errorPayload(err.message, err.code), 422);
    }
    const message = getErrorMessage(err, 'Failed to apply action');
    console.error('Failed to apply action:', { issueNumber, target, action: act, message, err });
    return c.json(errorPayload(message, 'GITHUB_ERROR'), 502);
  }
});

export { action as actionRoute };
