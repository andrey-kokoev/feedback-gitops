import { createApp } from './app';
import { createIssueConsumer, type ConsumerConfig } from '../consumer';
import { reconcileMergeRequestedIssues } from './github/issues';
import { getErrorMessage } from './utils/errors';
import type { Env } from './env';

const app = createApp();

export default {
  fetch: app.fetch.bind(app),

  async queue(batch: MessageBatch<unknown>, env: Env, _ctx: ExecutionContext): Promise<void> {
    const config: ConsumerConfig = {
      github: {
        pat: env.GITHUB_PAT,
        owner: env.GITHUB_REPO_OWNER,
        repo: env.GITHUB_REPO_NAME,
        labels: [],
        baseBranch: env.GITHUB_BASE_BRANCH || 'main',
      },
      audio: {
        bucket: env.feedback_gitops_audio,
        ai: env.AI,
      },
      cancellations: env.CANCELLATIONS,
    };

    const consumer = createIssueConsumer<unknown>(config);
    return consumer(batch);
  },

  async scheduled(controller: ScheduledController, env: Env, _ctx: ExecutionContext): Promise<void> {
    try {
      const result = await reconcileMergeRequestedIssues(env);
      console.log('Merge request reconcile finished:', { cron: controller.cron, ...result });
    } catch (error) {
      console.error('Merge request reconcile failed:', {
        cron: controller.cron,
        error: getErrorMessage(error, 'Reconcile failed'),
      });
    }
  },
};
