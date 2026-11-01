import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";

export const metadata: Metadata = { title: "Certificates" };

export default function Page() {
  return <AdminPlaceholder title="Certificates" />;
}
