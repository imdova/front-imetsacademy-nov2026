import type { ReactNode } from "react";
import { QuizTopNav } from "@/components/layout/quiz-topnav";

// Quiz routes are per-slug and fully interactive; render at request time.
export const instant = false;

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface-alt">
      <QuizTopNav />
      <main>{children}</main>
    </div>
  );
}
