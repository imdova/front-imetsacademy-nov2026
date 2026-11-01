import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Quizzes · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Quizzes"
      description="Create and manage quizzes for your courses."
      icon={<ClipboardList className="size-7" aria-hidden="true" />}
    />
  );
}
