# @feedback-gitops/worker

Queue-backed Cloudflare Worker for agent change requests.

## Endpoints

- `GET /widget.js`: embeddable widget script
- `GET /health`: health check
- `POST /api/issue`: validate/authenticate + enqueue feedback
- `queue()`: consumes queue messages and creates GitHub issues

## Prerequisites

- Cloudflare account with Workers + Queues
- Wrangler authenticated (`wrangler login`)
- Queue named `feedback-queue`

## Setup

```bash
cd /home/andrey/src/feedback-gitops/packages/feedback-gitops
wrangler queues create feedback-queue
```

Set secrets:

```bash
wrangler secret put API_KEY --name feedback-gitops
wrangler secret put ADMIN_TOKEN --name feedback-gitops
wrangler secret put GITHUB_PAT --name feedback-gitops
wrangler secret put GITHUB_REPO_OWNER --name feedback-gitops
wrangler secret put GITHUB_REPO_NAME --name feedback-gitops
wrangler secret put GITHUB_BASE_BRANCH --name feedback-gitops
```

## Run and deploy

From monorepo root:

```bash
cd /home/andrey/src/feedback-gitops
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run deploy
```

## thoughts integration

`thoughts` should call this worker via Cloudflare service binding `FEEDBACK_GITOPS`.

Fallback mode via public URL is still supported with:

```env
AGENT_CHANGE_REQUEST_WORKER_URL=https://feedback-gitops.andrei-kokoev.workers.dev
```
