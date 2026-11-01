import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-linear-to-b from-primary-50/50 to-surface-alt p-4 md:p-8">
      {children}
    </main>
  );
}
