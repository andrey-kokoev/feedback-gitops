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
wrangler secret put API_KEY --name feedback-gitops-thoughts
wrangler secret put ADMIN_TOKEN --name feedback-gitops-thoughts
wrangler secret put GITHUB_PAT --name feedback-gitops-thoughts
wrangler secret put GITHUB_REPO_OWNER --name feedback-gitops-thoughts
wrangler secret put GITHUB_REPO_NAME --name feedback-gitops-thoughts
wrangler secret put GITHUB_BASE_BRANCH --name feedback-gitops-thoughts
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

### Widget Development

**Recommended Workflow:**
- UX work: `pnpm --filter feedback-gitops run dev:widget` (opens the index chooser)
- Integration work: Run worker in one terminal, then `pnpm --filter feedback-gitops run dev:widget:integration`

The widget UI has two separated development environments:

- **Widget Sandbox** (`pnpm --filter feedback-gitops run dev:widget:sandbox`)
  - URL: [http://localhost:5173/widget/sandbox.html](http://localhost:5173/widget/sandbox.html)
  - Pure UX environment backed by local mock data. No authentication required.
  - Features in-page scenario controls to seamlessly test specific states:
    - `default`: Mixed data
    - `empty`: No requests
    - `comments`: Item with active discussion
    - `linked`: Epic/child relationship
    - `edit`: Item ready for editing
    - `unread`: New unread item
    - `loading`: Network wait
    - `error`: Failed fetch

- **Widget Integration Harness** (`pnpm --filter feedback-gitops run dev:widget:integration`)
  - URL: [http://localhost:5173/widget/integration.html](http://localhost:5173/widget/integration.html)
  - End-to-end harness for backend verification.
  - Requires the core worker to be running (`pnpm --filter feedback-gitops run dev` in a parallel terminal).
  - Verifies data against the actual Cloudflare pipeline (`http://localhost:8787`).
### Automated Smoke Tests

The repository includes automated browser smoke tests for the widget preview surfaces:

- **Run all fast preview tests:** `pnpm --filter feedback-gitops run test:preview`
  This runs deterministic Sandbox UI component tests and Integration configuration tests using mocked backend routes. It automatically starts up the necessary Vite webserver. It does *not* require a real token or the real worker.

**Note:** Use Sandbox for interaction and visual work. Use Integration Harness only when validating real backend behavior.

## thoughts integration

`thoughts` should call this worker via Cloudflare service binding `FEEDBACK_GITOPS`.

Fallback mode via public URL is still supported with:

```env
AGENT_CHANGE_REQUEST_WORKER_URL=https://feedback-gitops-thoughts.andrei-kokoev.workers.dev
```
