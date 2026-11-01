import { AdminPlaceholder } from "@/components/shared/admin-placeholder";
import { routes } from "@/config/routes";
export default function Page() {
  return <AdminPlaceholder title="Add New Course" breadcrumbs={[{ label: "Dashboard", href: routes.admin.dashboard }, { label: "Courses", href: routes.admin.courses }, { label: "Add New Course" }]} />;
}
