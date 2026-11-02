import "server-only";
import { env } from "@/lib/env";
import { NotFoundError } from "@/lib/errors";
import { ApiError, type FieldErrors } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/session";

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Next.js fetch caching options (tags / revalidate). */
  next?: { tags?: string[]; revalidate?: number | false };
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Attach the current user's Bearer token (for protected routes). */
  auth?: boolean;
};

/** Standard NestJS success envelope: `{ success, data, meta? }`. */
type Envelope<T> = { success: true; data: T; meta?: unknown };

/** Returns the `data` field of a wrapped response (or the value as-is). */
export function unwrap<T>(res: unknown): T {
  if (res && typeof res === "object" && "data" in res) {
    return (res as Envelope<T>).data;
  }
  return res as T;
}

/** Returns `{ data, meta }` from a paginated envelope. */
export function unwrapList<T>(res: unknown): { data: T[]; meta: Record<string, unknown> } {
  const env_ = (res ?? {}) as Envelope<T[]> & { meta?: Record<string, unknown> };
  return { data: Array.isArray(env_.data) ? env_.data : [], meta: env_.meta ?? {} };
}

/**
 * Thin fetch wrapper around the NestJS REST API.
 * Not exercised while DATA_SOURCE=mock — it's the seam the http adapter uses
 * once the backend exists. Normalizes errors into ApiError / NotFoundError.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, next, signal, timeoutMs = 10_000, auth = false } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (auth) {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
      signal: signal ?? controller.signal,
      next,
    });

    if (!res.ok) {
      const payload = (await res.json().catch(() => ({}))) as {
        code?: string;
        message?: string;
        fieldErrors?: FieldErrors;
      };
      if (res.status === 404) {
        throw new NotFoundError(payload.message ?? "Resource not found");
      }
      throw new ApiError({
        status: res.status,
        code: payload.code ?? "API_ERROR",
        message: payload.message ?? res.statusText,
        fieldErrors: payload.fieldErrors,
      });
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
