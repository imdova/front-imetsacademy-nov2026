import type { ReactNode } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentHeader } from "@/components/layout/student-header";

// The sidebar reads the current path; render at request time (no static shell).
export const instant = false;

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface-alt">
      <StudentSidebar />
      <div className="flex min-h-dvh flex-col lg:ps-[260px]">
        <StudentHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
