import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/components/shared/admin-page-header";
import type { Crumb } from "@/components/shared/breadcrumbs";

/** Stand-in for admin sections not yet built. */
export function AdminPlaceholder({
  title,
  description,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <AdminPageHeader title={title} description={description} breadcrumbs={breadcrumbs} />
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <Badge variant="info">Coming soon</Badge>
        <p className="text-body-sm max-w-md text-ink-muted">
          This admin section is on the way. Send the design and I&apos;ll build it next.
        </p>
      </div>
    </div>
  );
}
