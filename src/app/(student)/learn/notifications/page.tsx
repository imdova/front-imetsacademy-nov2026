import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Notifications" };

export default function Page() {
  return <AdminPlaceholder title="Notifications" />;
}
