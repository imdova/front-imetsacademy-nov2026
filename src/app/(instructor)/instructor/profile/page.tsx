import type { Metadata } from "next";
import { User } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "My Profile · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="My Profile"
      description="Your instructor profile and public information."
      icon={<User className="size-7" aria-hidden="true" />}
    />
  );
}
