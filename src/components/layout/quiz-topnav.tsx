import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { routes } from "@/config/routes";
import { Logo } from "@/components/layout/logo";
import { Avatar } from "@/components/shared/avatar";

const NAV = [
  { label: "My Learning", href: routes.student.dashboard, active: true },
  { label: "Courses", href: routes.courses, active: false },
  { label: "Quizzes", href: routes.student.courses, active: false },
  { label: "Assignments", href: routes.student.courses, active: false },
];

/** Top navigation bar for the standalone learning / quiz experience. */
export function QuizTopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Link href={routes.student.dashboard} aria-label="IMETS Academy" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                item.active
                  ? "rounded-lg bg-primary-50 px-4 py-2 text-body-sm font-semibold text-primary"
                  : "rounded-lg px-4 py-2 text-body-sm font-medium text-ink-muted hover:bg-surface-alt hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link
            href={routes.student.notifications}
            aria-label="Notifications"
            className="relative inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink"
          >
            <Bell className="size-5" aria-hidden="true" />
            <span className="absolute end-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-surface" />
          </Link>
          <span className="flex items-center gap-2 rounded-md p-1">
            <Avatar initials="AA" size="md" />
            <span className="hidden text-body-sm font-bold text-ink sm:block">Ahmed Ali</span>
            <ChevronDown className="size-4 text-ink-subtle" aria-hidden="true" />
          </span>
        </div>
      </div>
    </header>
  );
}
