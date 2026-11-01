import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Saved Courses" };

export default function Page() {
  return <AdminPlaceholder title="Saved Courses" />;
}
