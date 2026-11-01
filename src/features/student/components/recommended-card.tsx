import { BarChart3, Clock, Plus, Target, TrendingUp, Users } from "lucide-react";
import type { Recommended } from "@/features/student/data";

const iconFor = { target: Target, chart: TrendingUp, users: Users } as const;

export function RecommendedCard({ item }: { item: Recommended }) {
  const Icon = iconFor[item.icon];
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="flex-1 text-body-sm font-bold text-ink">{item.title}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {item.weeks} Weeks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BarChart3 className="size-3.5" aria-hidden="true" />
            {item.level}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Save ${item.title}`}
          className="inline-flex size-8 items-center justify-center rounded-md border border-border-input text-primary hover:bg-primary-50"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
