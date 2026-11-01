import { z } from "zod";

/**
 * Public, client-safe environment variables (NEXT_PUBLIC_*).
 * Validated at import time; fails fast on malformed values.
 * Server-only config lives in `env.server.ts`.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_BASE_URL: z.url().default("http://localhost:4000/api/v1"),
});

export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
