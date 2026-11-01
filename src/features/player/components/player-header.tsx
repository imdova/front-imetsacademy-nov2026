import Link from "next/link";
import { Bell, ChevronLeft, CircleHelp } from "lucide-react";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/shared/avatar";
import type { PlayerCourse } from "@/features/player/data";
import { CurriculumMobile } from "@/features/player/components/curriculum-mobile";

/** Course player top bar: exit, course title + meta, progress, actions. */
export function PlayerHeader({ course }: { course: PlayerCourse }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
      <Link
        href={routes.course(course.slug)}
        className="inline-flex items-center gap-1.5 rounded-md py-2 pe-3 text-body-sm font-semibold text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">Exit</span>
      </Link>

      <div className="h-6 w-px bg-border" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-body-sm font-bold text-ink">{course.title}</p>
        <p className="truncate text-caption text-ink-subtle">
          {course.type} · {course.level} · {course.weeks} weeks
        </p>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="w-40">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-caption font-semibold text-ink-muted">Progress</span>
            <span className="text-caption font-bold text-primary">{course.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-pill bg-surface-alt">
            <div className="h-full rounded-pill bg-primary" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
        <div className="h-6 w-px bg-border" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-1.5">
        <CurriculumMobile slug={course.slug} />
        <Link
          href={routes.student.help}
          aria-label="Help"
          className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <CircleHelp className="size-5" aria-hidden="true" />
        </Link>
        <Link
          href={routes.student.notifications}
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute end-2 top-2 flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-on-dark ring-2 ring-surface">
            3
          </span>
        </Link>
        <Avatar initials="AM" size="md" className="ms-1" />
      </div>
    </header>
  );
}
