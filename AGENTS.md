# AGENTS.md — feedback-gitops

## What this repo is

`feedback-gitops` is an npm package (`feedback-gitops`) and a Cloudflare Worker that lets users submit feedback (text or voice) from a widget embedded in a web app. Submissions become GitHub issues. Each host project deploys its own thin worker wrapper that re-exports the npm package's `worker` default.

## Wiring feedback-gitops into a host project

When the user asks to "wire up feedback-gitops", "connect feedback-gitops", or "add the feedback widget" to a project, do the following:

### 1. Run the provision script

```bash
node /home/andrey/src/feedback-gitops/scripts/provision-instance.mjs \
  --worker feedback-gitops-<project-name> \
  --target-cwd /path/to/host-project \
  --github-pat <token>
```

The script auto-detects `--repo` from the host project's `wrangler.toml` `[vars]` (`GITHUB_OWNER` / `GITHUB_REPO`). If not found there, ask the user which GitHub repo should receive the issues.

For `--github-pat`: look in the host project's `.env`, `.env.local`, `.dev.vars`, or any `.env.*` file for `GITHUB_PAT`. If not found, ask the user.

The script will:
- Scaffold `<subdir>/package.json`, `wrangler.toml`, `src/index.ts`, `tsconfig.json`
- Install deps, create the Cloudflare Queue, deploy the worker
- Set all secrets on the deployed worker
- Patch the host `pnpm-workspace.yaml`, `wrangler.toml` (adds `FEEDBACK_GITOPS` service binding), `package.json` (adds `deploy:feedback` script)
- Write secrets to `<subdir>/.env` and `AGENT_CHANGE_REQUEST_*` keys to the host `.env`

### 2. Deploy the host app

After provisioning, the host app's `wrangler.toml` now has the `FEEDBACK_GITOPS` service binding. Deploy it so the binding takes effect.

### 3. Embed the widget

Find where the host app serves its HTML shell (e.g. Nuxt `app.vue`, a server route, or a layout file). Add the widget bootstrap script. The `apiKey` is `AGENT_CHANGE_REQUEST_API_KEY` from the host `.env`. The `workerUrl` is `https://feedback-gitops-<project-name>.andrei-kokoev.workers.dev`.

For Cloudflare Worker / Nuxt server-side rendering, prefer generating the script via the service binding:

```ts
// server route or plugin
const script = await env.FEEDBACK_GITOPS.fetch(new Request("https://x/widget-config")).then(r => r.text());
```

Or use `generateWidgetScript` from the npm package if building server-side.

## Thin wrapper pattern

Every host project gets a minimal worker package:

```
workers/feedback-gitops/        (or packages/feedback-gitops/)
  src/index.ts                  → export { worker as default } from "feedback-gitops";
  wrangler.toml                 → name, queue, R2 bucket, AI binding, cron
  package.json                  → depends on feedback-gitops npm package
  tsconfig.json
  .env                          → all secrets (gitignored)
```

Secrets set on the worker: `API_KEY`, `ADMIN_TOKEN`, `GITHUB_PAT`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_BASE_BRANCH`.

## Publishing the npm package

```bash
cd packages/feedback-gitops
# bump version in package.json
pnpm run build   # tsc
pnpm publish
```

Then commit. CI also publishes automatically on `v*` tag push.

## Key files

- `packages/feedback-gitops/src/lib.ts` — npm entry point; exports `worker`, `createIssueConsumer`, `generateWidgetScript`
- `packages/feedback-gitops/src/index.ts` — full Cloudflare Worker handler (fetch + queue + scheduled)
- `packages/feedback-gitops/src/widget.ts` — client-side widget (mobile-first); **always keep `widget.js` in sync**
- `packages/feedback-gitops/src/consumer.ts` — queue consumer logic
- `scripts/provision-instance.mjs` — provisions a new instance end-to-end
