import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "My Courses · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="My Courses"
      description="Manage your courses, content, and learners."
      icon={<ClipboardCheck className="size-7" aria-hidden="true" />}
    />
  );
}
