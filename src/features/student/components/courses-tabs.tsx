"use client";

import { useMemo, useState } from "react";
import { CircleCheck, Layers, Play, Clock, GraduationCap } from "lucide-react";
import type { Enrollment, EnrollmentStatus } from "@/features/student/data";
import { EmptyState } from "@/components/shared/empty-state";
import { CourseProgressCard } from "@/features/student/components/course-progress-card";
import { cn } from "@/lib/utils";

type Tab = EnrollmentStatus | "all";

const TABS: { value: Tab; label: string; icon: typeof Play }[] = [
  { value: "in-progress", label: "In Progress", icon: Play },
  { value: "completed", label: "Completed", icon: CircleCheck },
  { value: "not-started", label: "Not Started", icon: Clock },
  { value: "all", label: "All Courses", icon: Layers },
];

export function CoursesTabs({ enrollments }: { enrollments: Enrollment[] }) {
  const [tab, setTab] = useState<Tab>("in-progress");

  const counts = useMemo(() => {
    const c: Record<Tab, number> = {
      "in-progress": 0,
      completed: 0,
      "not-started": 0,
      all: enrollments.length,
    };
    enrollments.forEach((e) => {
      c[e.status] += 1;
    });
    return c;
  }, [enrollments]);

  const filtered = tab === "all" ? enrollments : enrollments.filter((e) => e.status === tab);

  return (
    <div>
      <div role="tablist" aria-label="My courses" className="flex flex-wrap gap-6 border-b border-border">
        {TABS.map((t) => {
          const selected = tab === t.value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t.value)}
              className={cn(
                "relative inline-flex h-12 items-center gap-2 text-label transition-colors",
                selected
                  ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-t-[3px] after:bg-primary"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              <t.icon className="size-4" aria-hidden="true" />
              {t.label} ({counts[t.value]})
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<GraduationCap className="size-6" />}
            title="Nothing here yet"
            description="Courses you add will show up in this tab."
          />
        ) : (
          filtered.map((e) => <CourseProgressCard key={e.id} enrollment={e} />)
        )}
      </div>
    </div>
  );
}
