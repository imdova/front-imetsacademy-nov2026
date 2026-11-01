import type { Metadata } from "next";
import { InstructorProfileView } from "@/features/instructor/components/instructor-profile-view";

export const metadata: Metadata = { title: "My Profile · Instructor" };

export default function Page() {
  return <InstructorProfileView />;
}
