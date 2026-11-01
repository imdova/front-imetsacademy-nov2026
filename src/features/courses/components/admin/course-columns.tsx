import Link from "next/link";
import { EllipsisVertical, Eye, GraduationCap, Pencil } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge, type BadgeProps, Dot } from "@/components/ui/badge";
import { routes } from "@/config/routes";
import { formatCount } from "@/lib/format";
import {
  COURSE_STATUS_LABEL,
  type CategoryTint,
  type CourseStatus,
  type CourseWithRelations,
} from "@/features/courses/schemas";

const tintBadge: Record<CategoryTint, NonNullable<BadgeProps["variant"]>> = {
  blue: "info",
  teal: "teal",
  violet: "program",
  warm: "warm",
};

const statusBadge: Record<CourseStatus, NonNullable<BadgeProps["variant"]>> = {
  published: "success",
  scheduled: "teal",
  draft: "neutral",
  archived: "neutral",
};

function Thumb() {
  return (
    <span className="relative flex h-9 w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-sm bg-navy-800">
      <GraduationCap className="size-5 text-white/30" aria-hidden="true" />
    </span>
  );
}

function AvatarsCluster() {
  return (
    <span className="flex -space-x-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-6 rounded-pill border-2 border-surface bg-primary-100" />
      ))}
    </span>
  );
}

const iconAction =
  "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const courseColumns: ColumnDef<CourseWithRelations>[] = [
  {
    accessorKey: "title",
    header: "Course",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Thumb />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{row.original.title}</p>
          <p className="text-caption text-ink-subtle">{row.original.code}</p>
        </div>
      </div>
    ),
  },
  {
    id: "category",
    header: "Category",
    accessorFn: (r) => r.category.name,
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant={tintBadge[row.original.category.tint]}>{row.original.category.name}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusBadge[row.original.status]}>
        {row.original.status !== "archived" && <Dot />}
        {COURSE_STATUS_LABEL[row.original.status]}
      </Badge>
    ),
  },
  {
    accessorKey: "durationMonths",
    header: "Duration",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.durationMonths} Months</span>,
  },
  {
    accessorKey: "enrolled",
    header: "Enrollments",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2 whitespace-nowrap">
        <AvatarsCluster />
        <span className="font-semibold">{formatCount(row.original.enrolled)}</span>
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link href={routes.course(row.original.slug)} aria-label="View course" className={iconAction}>
          <Eye className="size-4" aria-hidden="true" />
        </Link>
        <Link href={routes.admin.newCourse} aria-label="Edit course" className={iconAction}>
          <Pencil className="size-4" aria-hidden="true" />
        </Link>
        <button type="button" aria-label="More actions" className={iconAction}>
          <EllipsisVertical className="size-4" aria-hidden="true" />
        </button>
      </div>
    ),
  },
];
