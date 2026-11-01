"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  GraduationCap,
  BarChart3,
  MessageSquare,
  Settings,
  User,
  Users,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { instructorNav, type InstructorIcon } from "@/config/instructor";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const iconFor: Record<InstructorIcon, LucideIcon> = {
  profile: User,
  courses: ClipboardCheck,
  quizzes: ClipboardList,
  assignments: ClipboardList,
  students: Users,
  earnings: CreditCard,
  reports: BarChart3,
  messages: MessageSquare,
  notifications: Bell,
  settings: Settings,
};

function isActive(pathname: string, href: string) {
  if (href === routes.instructor.courses) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function InstructorSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-4 border-e border-border bg-surface p-4">
      <Link href={routes.instructor.home} onClick={onNavigate} aria-label="IMETS Academy — Instructor Portal" className="px-2 py-2">
        <Logo />
        <span className="mt-2 flex items-center gap-2 text-body-sm font-bold text-ink">
          <GraduationCap className="size-4 text-primary" aria-hidden="true" />
          Instructor Portal
        </span>
      </Link>

      <nav aria-label="Instructor" className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {instructorNav.map((item) => {
          const Icon = iconFor[item.icon];
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm transition-colors",
                active ? "bg-primary font-semibold text-on-dark" : "text-ink-muted hover:bg-surface-alt hover:text-ink",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={cn("flex min-w-5 items-center justify-center rounded-pill px-1.5 text-caption font-bold", active ? "bg-on-dark text-primary" : "bg-danger text-on-dark")}>
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
        <p className="mt-3 text-body-sm font-bold text-ink">Create Engaging Assessments</p>
        <p className="mt-1 text-caption text-ink-subtle">Build quizzes, set rules, and assess learners.</p>
        <Button asChild size="sm" block className="mt-3">
          <Link href={routes.instructor.newQuiz} onClick={onNavigate}>New Quiz</Link>
        </Button>
      </div>
    </div>
  );
}

export function InstructorSidebar() {
  return (
    <aside className="fixed inset-y-0 start-0 z-30 hidden w-[260px] lg:block">
      <InstructorSidebarContent />
    </aside>
  );
}
