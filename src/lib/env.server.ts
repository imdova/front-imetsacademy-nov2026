import "server-only";
import { z } from "zod";

/**
 * Server-only environment. Never reaches the browser.
 * `DATA_SOURCE` selects the DAL adapter: 'mock' (in-memory seed) or 'api' (NestJS).
 */
const serverEnvSchema = z.object({
  DATA_SOURCE: z.enum(["mock", "api"]).default("mock"),
});

export const serverEnv = serverEnvSchema.parse({
  DATA_SOURCE: process.env.DATA_SOURCE,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
