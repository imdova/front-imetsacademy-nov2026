import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Messages · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Messages"
      description="Chat with your students and the team."
      icon={<MessageSquare className="size-7" aria-hidden="true" />}
    />
  );
}
