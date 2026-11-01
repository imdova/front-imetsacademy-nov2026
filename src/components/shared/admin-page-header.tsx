import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

/** Admin page heading: breadcrumb + title + description + optional actions. */
export function AdminPageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  icon,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h1 className="text-h1 text-ink">{title}</h1>
            {description && <p className="text-body text-ink-muted">{description}</p>}
          </div>
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
