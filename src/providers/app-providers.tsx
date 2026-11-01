import type { ReactNode } from "react";

/**
 * Composed application providers.
 * Thin for Phase 1 (pages are server-rendered). React Query / theme providers
 * slot in here when the student and admin areas need client fetching.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
