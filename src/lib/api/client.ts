import "server-only";
import { env } from "@/lib/env";
import { NotFoundError } from "@/lib/errors";
import { ApiError, type FieldErrors } from "@/lib/api/errors";

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Next.js fetch caching options (tags / revalidate). */
  next?: { tags?: string[]; revalidate?: number | false };
  signal?: AbortSignal;
  timeoutMs?: number;
};

/**
 * Thin fetch wrapper around the NestJS REST API.
 * Not exercised while DATA_SOURCE=mock — it's the seam the http adapter uses
 * once the backend exists. Normalizes errors into ApiError / NotFoundError.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, next, signal, timeoutMs = 10_000 } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
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
