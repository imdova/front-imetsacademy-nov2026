import type { Metadata } from "next";
import { AdminPlaceholder } from "@/components/shared/admin-placeholder";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Categories · Admin" };

export default function Page() {
  return (
    <AdminPlaceholder
      title="Categories"
      breadcrumbs={[{ label: "Dashboard", href: routes.admin.dashboard }, { label: "Categories" }]}
    />
  );
}
