import type { Env } from '../env';
import type { GraphQLResponse } from '../types';

export async function githubRequest(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  const url = `https://api.github.com/repos/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}${path}`;
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("Authorization", `Bearer ${env.GITHUB_PAT}`);
  headers.set("X-GitHub-Api-Version", "2022-11-28");
  headers.set("User-Agent", "feedback-gitops-worker");
  if (init.body && !headers.get("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, { ...init, headers });
}

export async function githubGraphqlRequest<T>(env: Env, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "feedback-gitops-worker",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json().catch(() => null) as GraphQLResponse<T> | null;
  if (!response.ok) {
    const errorMessage = payload?.errors?.map((error) => error.message).filter(Boolean).join("; ")
      || `GitHub GraphQL request failed (${response.status})`;
    throw new Error(errorMessage);
  }

  if (!payload || payload.errors?.length || !payload.data) {
    const errorMessage = payload?.errors?.map((error) => error.message).filter(Boolean).join("; ")
      || "GitHub GraphQL request returned no data";
    throw new Error(errorMessage);
  }

  return payload.data;
}
