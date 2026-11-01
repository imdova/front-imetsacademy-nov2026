import type { Metadata } from "next";
import { Users } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Students · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Students"
      description="View and support the learners in your courses."
      icon={<Users className="size-7" aria-hidden="true" />}
    />
  );
}
