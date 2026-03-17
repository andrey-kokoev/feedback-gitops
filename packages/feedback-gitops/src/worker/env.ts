export interface Env {
  FEEDBACK_QUEUE: Queue;
  feedback_gitops_audio: R2Bucket;
  GITHUB_PAT: string;
  GITHUB_REPO_OWNER: string;
  GITHUB_REPO_NAME: string;
  GITHUB_BASE_BRANCH?: string;
  API_KEY: string;
  ADMIN_TOKEN?: string;
  AI?: Ai;
  CANCELLATIONS?: KVNamespace;
  ASSETS?: Fetcher;
}
