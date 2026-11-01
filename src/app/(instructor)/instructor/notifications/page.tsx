import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Notifications · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Notifications"
      description="Your latest activity and alerts."
      icon={<Bell className="size-7" aria-hidden="true" />}
    />
  );
}
