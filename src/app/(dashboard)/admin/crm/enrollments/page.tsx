import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Enrollments · CRM · Admin" };

export default function Page() {
  return (
    <AdminPlaceholder
      title="Enrollments"
      breadcrumbs={[{ label: "CRM", href: routes.admin.crm.overview }, { label: "Enrollments" }]}
    />
  );
}
