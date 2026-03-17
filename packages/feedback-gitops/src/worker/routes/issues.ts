import { Hono } from 'hono';
import type { Env } from '../env';
import type { IssueStatus, IssueListOptions } from '../types';
import { requireAuth } from '../middleware/auth';
import { listIssues } from '../github/issues';
import { errorPayload } from '../utils/errors';

const issues = new Hono<{ Bindings: Env }>();

issues.use('/', requireAuth);

issues.get('/', async (c) => {
  const limit = Number(c.req.query('limit') || '20');
  const statusParam = String(c.req.query('status') || '');
  const viewParam = String(c.req.query('view') || 'all');
  const queryParam = String(c.req.query('q') || '');
  const sortParam = String(c.req.query('sort') || 'updated_desc');

  const allowedStatuses = new Set<IssueStatus>(['new', 'queued', 'pr_draft', 'pr_open', 'pr_closed_unmerged', 'pr_merge_requested', 'merged', 'closed_unmerged']);
  const statusFilter = new Set(
    statusParam
      .split(',')
      .map((item) => item.trim())
      .filter((item): item is IssueStatus => allowedStatuses.has(item as IssueStatus)),
  );
  const view = (['active', 'needs_action', 'completed', 'all'].includes(viewParam) ? viewParam : 'all') as IssueListOptions['view'];
  const sort = (['updated_desc', 'updated_asc'].includes(sortParam) ? sortParam : 'updated_desc') as IssueListOptions['sort'];

  try {
    const result = await listIssues(
      c.env,
      Number.isFinite(limit) ? limit : 20,
      {
        statusFilter,
        view,
        query: queryParam,
        sort,
      },
    );
    return c.json({ issues: result });
  } catch (err) {
    console.error('Failed to list issues:', err);
    return c.json(errorPayload('Failed to load issues', 'GITHUB_ERROR'), 502);
  }
});

export { issues as issuesRoute };
