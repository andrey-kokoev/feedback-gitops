import type { FeedbackSubmission } from '../../consumer';
import type { Env } from '../env';

export function normalizeSubmission(value: unknown): FeedbackSubmission | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const title = typeof item.title === "string" ? item.title.trim() : "";
  if (!title) return null;

  const labels = Array.isArray(item.labels) ? item.labels.filter((label) => typeof label === "string") as string[] : undefined;
  return {
    input: {
      type: "text",
      title,
      description: typeof item.description === "string" ? item.description : "",
    },
    url: typeof item.url === "string" ? item.url : undefined,
    userAgent: typeof item.userAgent === "string" ? item.userAgent : undefined,
    labels,
    mergePolicy: item.mergePolicy === 'auto_unblocked' ? 'auto_unblocked' : undefined,
  };
}

export function parseLabelsField(raw: FormDataEntryValue | null): string[] | undefined {
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const labels = parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      return labels.length ? labels : undefined;
    }
  } catch {
    // Fall back to comma-separated labels.
  }
  const labels = raw.split(",").map((item) => item.trim()).filter(Boolean);
  return labels.length ? labels : undefined;
}

export function getAudioExtension(mimeType: string): string {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("mp4") || mimeType.includes("m4a")) return "m4a";
  if (mimeType.includes("mpeg")) return "mp3";
  if (mimeType.includes("wav")) return "wav";
  return "bin";
}

export async function normalizeAudioSubmission(request: Request, env: Env): Promise<FeedbackSubmission | null> {
  const formData = await request.formData();
  const audioValue = formData.get("audio");
  if (!(audioValue instanceof Blob) || audioValue.size < 1) return null;

  const mimeType = String(formData.get("mimeType") || audioValue.type || "audio/webm");
  const durationMsRaw = Number(formData.get("durationMs"));
  const durationMs = Number.isFinite(durationMsRaw) && durationMsRaw > 0 ? Math.round(durationMsRaw) : undefined;
  const extension = getAudioExtension(mimeType);
  const audioKey = `audio-requests/${crypto.randomUUID()}.${extension}`;

  await env.feedback_gitops_audio.put(audioKey, await audioValue.arrayBuffer(), {
    httpMetadata: { contentType: mimeType },
  });

  return {
    input: {
      type: "audio",
      audioKey,
      mimeType,
      durationMs,
    },
    url: typeof formData.get("url") === "string" ? String(formData.get("url")) : undefined,
    userAgent: typeof formData.get("userAgent") === "string" ? String(formData.get("userAgent")) : undefined,
    labels: parseLabelsField(formData.get("labels")),
    mergePolicy: formData.get("mergePolicy") === "auto_unblocked" ? "auto_unblocked" : undefined,
  };
}
