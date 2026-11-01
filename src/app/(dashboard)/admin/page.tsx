import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Dashboard · Admin" };

export default function AdminDashboardPage() {
  return (
    <AdminPlaceholder
      title="Dashboard"
      description="Overview of your academy's performance."
    />
  );
}
