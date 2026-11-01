import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Settings · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Settings"
      description="Manage your instructor account preferences."
      icon={<Settings className="size-7" aria-hidden="true" />}
    />
  );
}
