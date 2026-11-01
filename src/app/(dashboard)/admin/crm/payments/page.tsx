import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Payments & Installments · CRM · Admin" };

export default function Page() {
  return (
    <AdminPlaceholder
      title="Payments & Installments"
      breadcrumbs={[{ label: "CRM", href: routes.admin.crm.overview }, { label: "Payments & Installments" }]}
    />
  );
}
