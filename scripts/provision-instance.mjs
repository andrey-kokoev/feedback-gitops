#!/usr/bin/env node
/**
 * Provisions a feedback-gitops instance into a host project.
 *
 * What it does:
 *   1. Scaffolds a thin-wrapper worker package in <target-cwd>/<subdir>
 *   2. Installs dependencies (pnpm install)
 *   3. Creates the Cloudflare Queue (if missing)
 *   4. Deploys the worker (wrangler deploy)
 *   5. Sets all secrets on the deployed worker
 *   6. Writes secrets to the worker's .env
 *   7. Patches host project: pnpm-workspace.yaml, wrangler.toml, package.json
 *   8. Writes AGENT_CHANGE_REQUEST_* keys to the host .env
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const env = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function appendEnvFile(filePath, entries) {
  const existing = parseEnvFile(filePath);
  const toAdd = Object.entries(entries).filter(([k]) => !existing[k]);
  if (toAdd.length === 0) return;
  let content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  if (content.length && !content.endsWith("\n")) content += "\n";
  content += "# Added by feedback-gitops provisioning\n";
  for (const [k, v] of toAdd) content += `${k}=${v}\n`;
  writeFileSync(filePath, content, "utf8");
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: options.cwd,
    input: options.input,
    stdio: options.input !== undefined ? ["pipe", "inherit", "inherit"] : "inherit",
    env: process.env,
  });
  if (result.status !== 0) throw new Error(`Failed: ${cmd} ${args.join(" ")}`);
}

function runCapture(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", env: process.env });
  return { status: r.status, out: `${r.stdout || ""}\n${r.stderr || ""}` };
}

function createQueueIfNeeded(queueName, cwd) {
  const { status, out } = runCapture("wrangler", ["queues", "create", queueName], cwd);
  if (status === 0) return;
  if (out.toLowerCase().includes("already exists") || out.toLowerCase().includes("already taken")) {
    console.log(`[provision] Queue '${queueName}' already exists, reusing.`);
    return;
  }
  throw new Error(`Failed to create queue '${queueName}':\n${out}`);
}

function putSecret(workerName, key, value, cwd) {
  run("wrangler", ["secret", "put", key, "--name", workerName], { cwd, input: `${value}\n` });
}

// --- detect repo from host wrangler.toml [vars] ---

function detectRepo(targetCwd) {
  const tomlPath = path.join(targetCwd, "wrangler.toml");
  if (!existsSync(tomlPath)) return null;
  const content = readFileSync(tomlPath, "utf8");
  const owner = content.match(/GITHUB_(?:REPO_)?OWNER\s*=\s*["']?([^"'\s#]+)/)?.[1];
  const repo = content.match(/GITHUB_REPO(?:_NAME)?\s*=\s*["']?([^"'\s#]+)/)?.[1];
  return owner && repo ? `${owner}/${repo}` : null;
}

// --- scaffold thin wrapper ---

function scaffold({ workerDir, workerName, queueName, bucketName }) {
  mkdirSync(path.join(workerDir, "src"), { recursive: true });

  const files = {
    "package.json": JSON.stringify({
      name: `${workerName}`,
      version: "0.0.1",
      private: true,
      type: "module",
      scripts: { deploy: "wrangler deploy", dev: "wrangler dev", typecheck: "tsc --noEmit" },
      dependencies: { "feedback-gitops": "^0.1.1" },
      devDependencies: {
        "@cloudflare/workers-types": "^4.20260107.0",
        typescript: "^5.9.3",
        wrangler: "^4.66.0",
      },
    }, null, 2) + "\n",

    "wrangler.toml":
`name = "${workerName}"
main = "src/index.ts"
compatibility_date = "2026-01-01"

[ai]
binding = "AI"

[[r2_buckets]]
binding = "feedback_gitops_audio"
bucket_name = "${bucketName}"

[[queues.producers]]
queue = "${queueName}"
binding = "FEEDBACK_QUEUE"

[[queues.consumers]]
queue = "${queueName}"
max_batch_size = 10
max_batch_timeout = 30

[triggers]
crons = ["*/5 * * * *"]
`,

    "src/index.ts": `export { worker as default } from "feedback-gitops";\n`,

    "tsconfig.json": JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        types: ["@cloudflare/workers-types"],
      },
      include: ["src/**/*"],
    }, null, 2) + "\n",
  };

  for (const [rel, content] of Object.entries(files)) {
    const dest = path.join(workerDir, rel);
    if (!existsSync(dest)) {
      mkdirSync(path.dirname(dest), { recursive: true });
      writeFileSync(dest, content, "utf8");
      console.log(`[provision] Created ${rel}`);
    } else {
      console.log(`[provision] ${rel} already exists, skipping.`);
    }
  }
}

// --- patch host project ---

function patchWorkspace(targetCwd, glob) {
  const wsPath = path.join(targetCwd, "pnpm-workspace.yaml");
  if (!existsSync(wsPath)) return;
  let content = readFileSync(wsPath, "utf8");
  if (content.includes(glob)) {
    console.log(`[provision] Workspace already includes '${glob}'.`);
    return;
  }
  content = content.replace(/(packages:\s*\n)/, `$1  - "${glob}"\n`);
  writeFileSync(wsPath, content, "utf8");
  console.log(`[provision] Added '${glob}' to pnpm-workspace.yaml.`);
}

function patchHostWrangler(targetCwd, workerName) {
  const tomlPath = path.join(targetCwd, "wrangler.toml");
  if (!existsSync(tomlPath)) return;
  let content = readFileSync(tomlPath, "utf8");
  if (content.includes("FEEDBACK_GITOPS")) {
    console.log("[provision] FEEDBACK_GITOPS binding already in wrangler.toml.");
    return;
  }
  const block = `\n[[services]]\nbinding = "FEEDBACK_GITOPS"\nservice = "${workerName}"\nenvironment = "production"\n`;
  content = content.includes("[observability]")
    ? content.replace("[observability]", `${block}\n[observability]`)
    : content + block;
  writeFileSync(tomlPath, content, "utf8");
  console.log("[provision] Added FEEDBACK_GITOPS service binding to wrangler.toml.");
}

function patchHostPackageJson(targetCwd, subdir) {
  const pkgPath = path.join(targetCwd, "package.json");
  if (!existsSync(pkgPath)) return;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  if (pkg.scripts?.["deploy:feedback"]) {
    console.log("[provision] deploy:feedback script already exists.");
    return;
  }
  pkg.scripts = pkg.scripts || {};
  const entries = Object.entries(pkg.scripts);
  const after = entries.findIndex(([k]) => k === "deploy:queue");
  const insertAt = after >= 0 ? after + 1 : (entries.findIndex(([k]) => k === "deploy") + 1 || entries.length);
  entries.splice(insertAt, 0, ["deploy:feedback", `cd ${subdir} && pnpm install && pnpm deploy`]);
  pkg.scripts = Object.fromEntries(entries);
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log("[provision] Added deploy:feedback to package.json.");
}

// ---

function usage() {
  console.log(`
Usage:
  node scripts/provision-instance.mjs \\
    --worker <worker-name>          e.g. feedback-gitops-smart-scheduling
    --target-cwd <host-project>     path to the host project root
    [--repo <owner/repo>]           auto-detected from host wrangler.toml if omitted
    [--env-file <path>]             default: <target-cwd>/.env
    [--subdir <rel-path>]           default: workers/feedback-gitops
    [--queue <queue-name>]          default: derived from worker name
    [--audio-bucket <bucket-name>]  default: derived from worker name
    [--github-pat <token>]          or set GITHUB_PAT in env-file
    [--base-branch <branch>]        default: main
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.worker || !args["target-cwd"]) { usage(); process.exit(1); }

  const workerName   = args.worker.trim();
  const targetCwd    = path.resolve(args["target-cwd"].trim());
  const subdir       = (args.subdir || "workers/feedback-gitops").trim();
  const workerDir    = path.join(targetCwd, subdir);
  const envFile      = args["env-file"] ? path.resolve(args["env-file"].trim()) : path.join(targetCwd, ".env");
  const baseBranch   = (args["base-branch"] || "main").trim();

  // Derive queue/bucket names from worker name (strip "feedback-gitops-" prefix)
  const suffix     = workerName.replace(/^feedback-gitops-/, "");
  const queueName  = (args.queue || `feedback-queue-${suffix}`).trim();
  const bucketName = (args["audio-bucket"] || `feedback-gitops-audio-${suffix}`).trim();

  // Repo: explicit arg → auto-detect from host wrangler.toml
  const repoSpec = (args.repo || detectRepo(targetCwd) || "").trim();
  if (!repoSpec) throw new Error("Cannot detect GitHub repo. Pass --repo <owner/repo>.");
  const slash = repoSpec.indexOf("/");
  const owner = repoSpec.slice(0, slash);
  const repo  = repoSpec.slice(slash + 1);

  // Secrets: env file → CLI arg
  const env        = parseEnvFile(envFile);
  const workerEnv  = existsSync(path.join(workerDir, ".env")) ? parseEnvFile(path.join(workerDir, ".env")) : {};
  const apiKey     = env.AGENT_CHANGE_REQUEST_API_KEY || env.API_KEY || randomBytes(32).toString("hex");
  const adminToken = env.AGENT_CHANGE_REQUEST_ADMIN_TOKEN || env.ADMIN_TOKEN || randomBytes(24).toString("hex");
  const githubPat  = (args["github-pat"] || workerEnv.GITHUB_PAT || env.GITHUB_PAT || "").trim();
  if (!githubPat) throw new Error("GITHUB_PAT required. Pass --github-pat or set it in env-file.");

  // 1. Scaffold
  console.log(`\n[provision] Scaffolding ${workerName} in ${workerDir}`);
  scaffold({ workerDir, workerName, queueName, bucketName });

  // 2. Install
  console.log("\n[provision] Installing dependencies...");
  run("pnpm", ["install"], { cwd: workerDir });

  // 3. Queue
  console.log(`\n[provision] Ensuring queue '${queueName}'...`);
  createQueueIfNeeded(queueName, workerDir);

  // 4. Deploy
  console.log(`\n[provision] Deploying ${workerName}...`);
  run("wrangler", ["deploy"], { cwd: workerDir });

  // 5. Secrets
  console.log("\n[provision] Setting worker secrets...");
  const secrets = { API_KEY: apiKey, ADMIN_TOKEN: adminToken, GITHUB_PAT: githubPat, GITHUB_REPO_OWNER: owner, GITHUB_REPO_NAME: repo, GITHUB_BASE_BRANCH: baseBranch };
  for (const [key, value] of Object.entries(secrets)) {
    console.log(`[provision]   ${key}`);
    putSecret(workerName, key, value, workerDir);
  }

  // 6. Worker .env
  appendEnvFile(path.join(workerDir, ".env"), { GITHUB_PAT: githubPat, GITHUB_REPO_OWNER: owner, GITHUB_REPO_NAME: repo, GITHUB_BASE_BRANCH: baseBranch, API_KEY: apiKey, ADMIN_TOKEN: adminToken });

  // 7. Patch host project
  console.log("\n[provision] Patching host project...");
  const subdirParts = subdir.split("/");
  const workspaceGlob = subdirParts.length > 1 ? `${subdirParts[0]}/*` : `${subdirParts[0]}/*`;
  patchWorkspace(targetCwd, workspaceGlob);
  patchHostWrangler(targetCwd, workerName);
  patchHostPackageJson(targetCwd, subdir);

  // 8. Host .env
  appendEnvFile(envFile, { AGENT_CHANGE_REQUEST_API_KEY: apiKey, AGENT_CHANGE_REQUEST_ADMIN_TOKEN: adminToken });

  console.log(`
✅ Provisioning complete.

  Worker:  ${workerName}
  URL:     https://${workerName}.${process.env.CF_WORKERS_SUBDOMAIN || "<subdomain>"}.workers.dev
  Queue:   ${queueName}
  Bucket:  ${bucketName}
  Repo:    ${repoSpec}

Next steps:
  1. Deploy host app to pick up the FEEDBACK_GITOPS service binding.
  2. Embed the widget in your app (see feedback-gitops README).
`);
}

try {
  main();
} catch (e) {
  console.error("\n[provision] Failed:", e instanceof Error ? e.message : e);
  process.exit(1);
}
