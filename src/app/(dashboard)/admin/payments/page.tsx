import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Payments · Admin" };

export default function Page() {
  return (
    <AdminPlaceholder
      title="Payments"
      breadcrumbs={[{ label: "Dashboard", href: routes.admin.dashboard }, { label: "Payments" }]}
    />
  );
}
