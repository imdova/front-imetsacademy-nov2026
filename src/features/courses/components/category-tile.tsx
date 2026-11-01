import Link from "next/link";
import { ArrowRight, ClipboardList, Target, TrendingUp, Users } from "lucide-react";
import type { Category, CategoryIcon, CategoryTint } from "@/features/courses/schemas";
import { buildCoursesQuery } from "@/features/courses/url";
import { cn } from "@/lib/utils";

const tintBg: Record<CategoryTint, string> = {
  blue: "bg-primary-50",
  teal: "bg-teal-50",
  violet: "bg-violet-50",
  warm: "bg-orange-50",
};

const tintIcon: Record<CategoryTint, string> = {
  blue: "text-primary",
  teal: "text-teal",
  violet: "text-violet",
  warm: "text-orange",
};

const iconFor: Record<CategoryIcon, typeof Target> = {
  strategy: Target,
  leadership: Users,
  project: ClipboardList,
  digital: TrendingUp,
};

/** CategoryTile — tinted tile linking to a filtered course listing. */
export function CategoryTile({ category }: { category: Category }) {
  const Icon = iconFor[category.icon];
  return (
    <Link
      href={buildCoursesQuery({ category: category.slug })}
      className={cn(
        "group flex min-h-[112px] flex-col justify-between gap-4 rounded-lg p-4 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        tintBg[category.tint],
      )}
    >
      <Icon className={cn("size-7", tintIcon[category.tint])} aria-hidden="true" />
      <div className="flex items-end justify-between gap-2">
        <span className="text-[15px] leading-5 font-bold text-ink">{category.name}</span>
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill bg-surface text-ink shadow-sm transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
