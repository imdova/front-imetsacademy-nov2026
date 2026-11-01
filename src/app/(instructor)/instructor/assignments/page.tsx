import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Assignments · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Assignments"
      description="Create and grade assignments for your courses."
      icon={<ClipboardList className="size-7" aria-hidden="true" />}
    />
  );
}
