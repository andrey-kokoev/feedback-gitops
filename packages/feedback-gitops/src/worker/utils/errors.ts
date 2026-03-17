import type { ErrorPayload } from '../types';

export class ActionError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export function errorPayload(message: string, code: string): ErrorPayload {
  return { ok: false, error: { error: message, code } };
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}
