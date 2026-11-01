import type { Metadata } from "next";
import { InstructorSettingsView } from "@/features/instructor/components/instructor-settings-view";

export const metadata: Metadata = { title: "Settings · Instructor" };

export default function Page() {
  return <InstructorSettingsView />;
}
