import "server-only";
import { connection } from "next/server";

/**
 * Simulate network latency for the mock DAL.
 * `connection()` first marks the scope as request-time, so the randomness below
 * never runs during prerender (required under Cache Components).
 */
export async function delay(min = 200, max = 600): Promise<void> {
  // Tests run the mock DB outside a Next request context.
  if (process.env.NODE_ENV === "test") return;
  await connection();
  const ms = min + Math.floor(Math.random() * (max - min));
  await new Promise((resolve) => setTimeout(resolve, ms));
}
