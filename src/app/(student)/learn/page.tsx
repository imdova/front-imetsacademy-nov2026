import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Dashboard" };

export default function StudentDashboardPage() {
  return <AdminPlaceholder title="Dashboard" description="Your learning overview." />;
}
