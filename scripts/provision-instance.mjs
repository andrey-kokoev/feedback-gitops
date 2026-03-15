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
    [--target-worker <target-worker-name>] \\
    [--target-cwd <target-worker-directory>] \\
    [--worker-url <feedback-worker-url>] \\
    [--queue <queue-name>] \\
    [--audio-bucket <bucket-name>] \\
    [--github-pat <token>] \\
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
    --target-worker thoughts2 \\
    --target-cwd /home/andrey/src/thoughts/packages/server \\
    --worker-url https://feedback-gitops-thoughts.andrei-kokoev.workers.dev \\
    --queue feedback-queue-thoughts \\
    --audio-bucket feedback-gitops-thoughts-audio \\
    --github-pat ghp_... \\
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
    console.log(`[provision] Queue '${queueName}' already exists. Reusing.`);
    return;
  }
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  throw new Error(`Failed to create queue '${queueName}'`);
}

function runAllowingBucketExists(bucketName) {
  const result = spawnSync("npx", ["wrangler", "r2", "bucket", "create", bucketName], {
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
  if (output.includes("already exists") || output.includes("already owned by you")) {
    console.log(`[provision] Bucket '${bucketName}' already exists. Reusing.`);
    return;
  }
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  throw new Error(`Failed to create bucket '${bucketName}'`);
}

function buildConfig(workerName, queueName, bucketName) {
  const template = readFileSync(templateConfigPath, "utf8");
  return template
    .replace(/^name\s*=\s*".*"$/m, `name = "${workerName}"`)
    .replace(/^main\s*=\s*".*"$/m, `main = "../src/index.ts"`)
    .replace(/(\[\[r2_buckets\]\][\s\S]*?bucket_name\s*=\s*)".*"/m, `$1"${bucketName}"`)
    .replace(/(\[\[queues\.producers\]\][\s\S]*?queue\s*=\s*)".*"/m, `$1"${queueName}"`)
    .replace(/(\[\[queues\.consumers\]\][\s\S]*?queue\s*=\s*)".*"/m, `$1"${queueName}"`);
}

function putWorkerSecret({ cwd, workerName, key, value }) {
  run("npx", ["wrangler", "secret", "put", key, "--name", workerName], {
    cwd,
    input: `${value}\n`,
  });
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
  const bucketName = args["audio-bucket"] ? String(args["audio-bucket"]).trim() : `${workerName}-audio`;
  const baseBranch = args["base-branch"] ? String(args["base-branch"]).trim() : "main";
  const targetWorkerName = args["target-worker"] ? String(args["target-worker"]).trim() : "";
  const targetWorkerCwd = args["target-cwd"] ? path.resolve(String(args["target-cwd"]).trim()) : "";
  const workerUrlArg = args["worker-url"] ? String(args["worker-url"]).trim().replace(/\/+$/, "") : "";

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
  const githubPat = args["github-pat"] ? String(args["github-pat"]).trim() : env.GITHUB_PAT;
  if (!apiKey || !adminToken || !githubPat) {
    throw new Error("Missing required secret in env file: GITHUB_PAT (agent keys are auto-generated if absent)");
  }

  const tmpDir = mkdtempSync(path.join(workerPackageDir, ".tmp-provision-"));
  const configPath = path.join(tmpDir, "wrangler.toml");

  try {
    writeFileSync(configPath, buildConfig(workerName, queueName, bucketName), "utf8");

    console.log(`[provision] Queue: ${queueName}`);
    runAllowingQueueExists(queueName);
    console.log(`[provision] Audio bucket: ${bucketName}`);
    runAllowingBucketExists(bucketName);

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

    if (targetWorkerName) {
      const targetCwd = targetWorkerCwd || path.dirname(envFile);
      const targetSecrets = {
        AGENT_CHANGE_REQUEST_API_KEY: apiKey,
        AGENT_CHANGE_REQUEST_ADMIN_TOKEN: adminToken,
      };
      if (workerUrlArg) {
        targetSecrets.AGENT_CHANGE_REQUEST_WORKER_URL = workerUrlArg;
      }

      console.log(`[provision] Wiring target worker: ${targetWorkerName}`);
      for (const [key, value] of Object.entries(targetSecrets)) {
        console.log(`[provision] Setting target secret: ${key}`);
        putWorkerSecret({
          cwd: targetCwd,
          workerName: targetWorkerName,
          key,
          value,
        });
      }
    }

    console.log("");
    console.log("Provisioning complete.");
    console.log(`Worker: ${workerName}`);
    console.log(`Queue: ${queueName}`);
    console.log(`Audio bucket: ${bucketName}`);
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
