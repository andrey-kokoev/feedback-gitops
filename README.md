# feedback-gitops

Turns user feedback into GitHub issues via a Cloudflare Worker + Queue, with a self-hosted mobile-first widget.

## How it works

1. A thin Cloudflare Worker receives feedback submissions and audio recordings, enqueues them, and serves the client-side widget JS.
2. A Queue consumer processes each submission: transcribes audio (via Cloudflare AI), creates a GitHub issue, and optionally auto-merges the resulting PR.
3. The widget is embedded in the host app via a `<script>` tag pointing at the worker's `/widget.js` endpoint.

## Connecting feedback-gitops to a project

### For humans — ask your AI assistant

> "Wire up feedback-gitops to this project. The GitHub repo for issues is `<owner>/<repo>`. I have a GitHub PAT at `<path-or-env-file>`."

The AI will run the provision script, scaffold the worker, set secrets, and patch the host project. See `CLAUDE.md` for what the AI does step by step.

### Manual one-command provisioning

```bash
node scripts/provision-instance.mjs \
  --worker feedback-gitops-myapp \
  --target-cwd /path/to/host-project \
  --github-pat ghp_...
```

Optional flags (all auto-detected or derived when omitted):

| Flag | Default |
|---|---|
| `--repo <owner/repo>` | read from host `wrangler.toml` `[vars]` |
| `--env-file <path>` | `<target-cwd>/.env` |
| `--subdir <rel-path>` | `workers/feedback-gitops` |
| `--queue <name>` | `feedback-queue-<suffix>` |
| `--audio-bucket <name>` | `feedback-gitops-audio-<suffix>` |
| `--base-branch <branch>` | `main` |

The script scaffolds the thin wrapper, creates the queue, deploys, sets secrets, and patches `pnpm-workspace.yaml`, `wrangler.toml`, and `package.json` in the host project.

### After provisioning

Deploy the host app to pick up the `FEEDBACK_GITOPS` service binding, then embed the widget:

```html
<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://<worker-url>/widget.js';
    s.dataset.apiKey = 'AGENT_CHANGE_REQUEST_API_KEY value';
    s.dataset.workerUrl = 'https://<worker-url>';
    document.head.appendChild(s);
  })();
</script>
```

Or generate it server-side via the service binding using `generateWidgetScript` from the npm package.

## npm package

```bash
npm install feedback-gitops
```

```ts
import { worker, createIssueConsumer, generateWidgetScript } from "feedback-gitops";
```

- `worker` — full Cloudflare Worker handler; re-export as `default` for a thin wrapper deployment
- `createIssueConsumer` — wire into your own worker's queue handler
- `generateWidgetScript` — generate the `<script>` bootstrap string for the widget

## Development

```bash
pnpm install
cd packages/feedback-gitops
pnpm run dev      # wrangler dev (worker name: feedback-gitops-dev)
pnpm run build    # tsc
pnpm run deploy   # deploys feedback-gitops-dev to Cloudflare
```

## Publishing

```bash
cd packages/feedback-gitops
# bump version in package.json
pnpm run build
pnpm publish
```

CI publishes automatically on `v*` tag push (requires `NPM_TOKEN` secret in GitHub).
