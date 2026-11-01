import type { ReactNode } from "react";
import { InstructorSidebar } from "@/components/layout/instructor-sidebar";
import { InstructorHeader } from "@/components/layout/instructor-header";

// The sidebar reads the current path; render at request time (no static shell).
export const instant = false;

export default function InstructorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface-alt">
      <InstructorSidebar />
      <div className="flex min-h-dvh flex-col lg:ps-[260px]">
        <InstructorHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
