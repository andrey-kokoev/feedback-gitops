# feedback-gitops

Standalone PNPM monorepo for the agent change-request worker.

## Workspace

- `packages/feedback-gitops` - Cloudflare Worker (`@feedback-gitops/worker`)

## Commands

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run deploy
```

## One-command instance provisioning

Provision a repo-scoped worker instance (worker + queue + secrets + deploy):

```bash
pnpm run provision:instance -- \
  --worker feedback-gitops-thoughts \
  --repo andrey-kokoev/thoughts \
  --env-file /home/andrey/src/thoughts/.env.local \
  --queue feedback-queue-thoughts \
  --base-branch main
```

`--env-file` must include:

- `API_KEY` (or `AGENT_CHANGE_REQUEST_API_KEY`)
- `ADMIN_TOKEN` (or `AGENT_CHANGE_REQUEST_ADMIN_TOKEN`)
- `GITHUB_PAT`
