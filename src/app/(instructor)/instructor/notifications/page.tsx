import type { Metadata } from "next";
import { InstructorNotificationsView } from "@/features/instructor/components/instructor-notifications-view";

export const metadata: Metadata = { title: "Notifications · Instructor" };

export default function Page() {
  return <InstructorNotificationsView />;
}
