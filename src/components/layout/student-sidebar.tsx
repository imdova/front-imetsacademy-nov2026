"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Bell,
  Bookmark,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  PlayCircle,
  Rocket,
  User,
  type LucideIcon,
} from "lucide-react";
import { studentNav, type StudentIcon } from "@/config/student";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const iconFor: Record<StudentIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  profile: User,
  courses: PlayCircle,
  certificates: Award,
  payments: CreditCard,
  saved: Bookmark,
  notifications: Bell,
  help: CircleHelp,
};

function isActive(pathname: string, href: string) {
  if (href === routes.student.dashboard) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function StudentSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-4 border-e border-border bg-surface p-4">
      <Link
        href={routes.student.dashboard}
        onClick={onNavigate}
        aria-label="IMETS Academy"
        className="px-2 py-2"
      >
        <Logo />
      </Link>

      <nav aria-label="Student" className="flex flex-1 flex-col gap-1">
        {studentNav.map((item) => {
          const Icon = iconFor[item.icon];
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-body-sm transition-colors",
                active
                  ? "bg-primary font-semibold text-on-dark"
                  : "text-ink-muted hover:bg-surface-alt hover:text-ink",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                    active ? "bg-on-dark text-primary" : "bg-danger text-on-dark",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl bg-primary-50 p-5 text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-pill bg-primary text-on-dark">
          <Rocket className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-3 text-body-sm font-bold text-ink">Keep Learning, Grow Your Career</p>
        <Button asChild size="sm" block className="mt-3">
          <Link href={routes.courses} onClick={onNavigate}>
            Explore Courses
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function StudentSidebar() {
  return (
    <aside className="fixed inset-y-0 start-0 z-30 hidden w-[260px] lg:block">
      <StudentSidebarContent />
    </aside>
  );
}
