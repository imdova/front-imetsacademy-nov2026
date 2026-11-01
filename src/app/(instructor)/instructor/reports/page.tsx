import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Reports & Insights · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Reports & Insights"
      description="Performance insights across your courses."
      icon={<BarChart3 className="size-7" aria-hidden="true" />}
    />
  );
}
