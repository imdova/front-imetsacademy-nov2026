import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Payments" };

export default function Page() {
  return <AdminPlaceholder title="Payments" />;
}
