import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Help & Support" };

export default function Page() {
  return <AdminPlaceholder title="Help & Support" />;
}
