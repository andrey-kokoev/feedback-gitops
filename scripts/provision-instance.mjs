#!/usr/bin/env node
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const workerPackageDir = path.join(repoRoot, "packages", "feedback-gitops");
const templateConfigPath = path.join(workerPackageDir, "wrangler.toml");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }
  const content = readFileSync(filePath, "utf8");
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function randomToken(bytes) {
  return randomBytes(bytes).toString("hex");
}

function ensureEnvKeys(filePath, env) {
  const updates = [];

  if (!env.AGENT_CHANGE_REQUEST_API_KEY) {
    env.AGENT_CHANGE_REQUEST_API_KEY = env.API_KEY || randomToken(32);
    updates.push(`AGENT_CHANGE_REQUEST_API_KEY=${env.AGENT_CHANGE_REQUEST_API_KEY}`);
  }
  if (!env.AGENT_CHANGE_REQUEST_ADMIN_TOKEN) {
    env.AGENT_CHANGE_REQUEST_ADMIN_TOKEN = env.ADMIN_TOKEN || randomToken(24);
    updates.push(`AGENT_CHANGE_REQUEST_ADMIN_TOKEN=${env.AGENT_CHANGE_REQUEST_ADMIN_TOKEN}`);
  }

  if (updates.length === 0) return;

  let prefix = "";
  if (existsSync(filePath)) {
    const current = readFileSync(filePath, "utf8");
    prefix = current.endsWith("\n") || current.length === 0 ? current : `${current}\n`;
  }
  const stamp = "# Added by feedback-gitops provisioning";
  const payload = `${prefix}${prefix.includes(stamp) ? "" : `${stamp}\n`}${updates.join("\n")}\n`;
  writeFileSync(filePath, payload, "utf8");
}

function usage() {
  console.log(`Usage:
  node scripts/provision-instance.mjs \\
    --worker <worker-name> \\
    --repo <owner/repo> \\
    --env-file <path-to-env-file> \\
    [--queue <queue-name>] \\
    [--base-branch <branch>]

Required keys in env file:
  API_KEY
  ADMIN_TOKEN
  GITHUB_PAT

Example:
  node scripts/provision-instance.mjs \\
    --worker feedback-gitops-thoughts \\
    --repo andrey-kokoev/thoughts \\
    --env-file /home/andrey/src/thoughts/.env.local \\
    --queue feedback-queue-thoughts \\
    --base-branch main
`);
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: options.cwd || repoRoot,
    input: options.input || undefined,
    stdio: options.input ? ["pipe", "inherit", "inherit"] : "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status}): ${cmd} ${args.join(" ")}`);
  }
}

function runAllowingQueueExists(queueName) {
  const result = spawnSync("npx", ["wrangler", "queues", "create", queueName], {
    cwd: workerPackageDir,
    encoding: "utf8",
    env: process.env,
  });
  const output = `${result.stdout || ""}\n${result.stderr || ""}`.toLowerCase();
  if (result.status === 0) {
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    return;
  }
  if (output.includes("already exists") || output.includes("already taken")) {
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    return;
  }
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  throw new Error(`Failed to create queue '${queueName}'`);
}

function buildConfig(workerName, queueName) {
  const template = readFileSync(templateConfigPath, "utf8");
  return template
    .replace(/^name\s*=\s*".*"$/m, `name = "${workerName}"`)
    .replace(/^main\s*=\s*".*"$/m, `main = "../src/index.ts"`)
    .replace(/(\[\[queues\.producers\]\][\s\S]*?queue\s*=\s*)".*"/m, `$1"${queueName}"`)
    .replace(/(\[\[queues\.consumers\]\][\s\S]*?queue\s*=\s*)".*"/m, `$1"${queueName}"`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.worker || !args.repo || !args["env-file"]) {
    usage();
    process.exit(1);
  }

  const workerName = String(args.worker).trim();
  const repoSpec = String(args.repo).trim();
  const envFile = path.resolve(String(args["env-file"]).trim());
  const queueName = args.queue ? String(args.queue).trim() : `${workerName}-queue`;
  const baseBranch = args["base-branch"] ? String(args["base-branch"]).trim() : "main";

  const slash = repoSpec.indexOf("/");
  if (slash <= 0 || slash >= repoSpec.length - 1) {
    throw new Error(`Invalid repo '${repoSpec}'. Use owner/repo format.`);
  }
  const owner = repoSpec.slice(0, slash);
  const repo = repoSpec.slice(slash + 1);

  const env = parseEnvFile(envFile);
  ensureEnvKeys(envFile, env);
  const apiKey = env.AGENT_CHANGE_REQUEST_API_KEY || env.API_KEY;
  const adminToken = env.AGENT_CHANGE_REQUEST_ADMIN_TOKEN || env.ADMIN_TOKEN;
  const githubPat = env.GITHUB_PAT;
  if (!apiKey || !adminToken || !githubPat) {
    throw new Error("Missing required secret in env file: GITHUB_PAT (agent keys are auto-generated if absent)");
  }

  const tmpDir = mkdtempSync(path.join(workerPackageDir, ".tmp-provision-"));
  const configPath = path.join(tmpDir, "wrangler.toml");

  try {
    writeFileSync(configPath, buildConfig(workerName, queueName), "utf8");

    console.log(`[provision] Queue: ${queueName}`);
    runAllowingQueueExists(queueName);

    const secrets = {
      API_KEY: apiKey,
      ADMIN_TOKEN: adminToken,
      GITHUB_PAT: githubPat,
      GITHUB_REPO_OWNER: owner,
      GITHUB_REPO_NAME: repo,
      GITHUB_BASE_BRANCH: baseBranch,
    };

    for (const [key, value] of Object.entries(secrets)) {
      console.log(`[provision] Setting secret: ${key}`);
      run("npx", ["wrangler", "secret", "put", key, "--name", workerName, "--config", configPath], {
        cwd: workerPackageDir,
        input: `${value}\n`,
      });
    }

    console.log(`[provision] Deploying worker: ${workerName}`);
    run("npx", ["wrangler", "deploy", "--config", configPath], { cwd: workerPackageDir });

    console.log("");
    console.log("Provisioning complete.");
    console.log(`Worker: ${workerName}`);
    console.log(`Queue: ${queueName}`);
    console.log(`URL: https://${workerName}.<your-workers-subdomain>.workers.dev`);
    console.log("");
    console.log("Target repo wiring:");
    console.log(`- Service binding: FEEDBACK_GITOPS -> ${workerName}`);
    console.log(`- Fallback URL: AGENT_CHANGE_REQUEST_WORKER_URL=https://${workerName}.<your-workers-subdomain>.workers.dev`);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error("[provision] Failed:", error instanceof Error ? error.message : error);
  process.exit(1);
}
