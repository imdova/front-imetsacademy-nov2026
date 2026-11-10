"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  FileQuestion,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LayoutGrid,
  Megaphone,
  Menu,
  Search,
  Settings,
  UserRound,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; icon: LucideIcon; href: string; caret?: boolean };

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Users & Access", icon: Users, href: "#", caret: true },
  { label: "Professionals (Talents)", icon: UserRound, href: "#", caret: true },
  { label: "Employers", icon: Building2, href: "#" },
  { label: "Recruitment Agencies", icon: Handshake, href: "#" },
  { label: "Jobs", icon: Briefcase, href: "#" },
  { label: "Applications", icon: FileText, href: "#" },
  { label: "Courses & Learning", icon: GraduationCap, href: "#", caret: true },
  { label: "Events", icon: CalendarDays, href: "#" },
  { label: "Question Banks", icon: FileQuestion, href: "#" },
  { label: "Finance", icon: Wallet, href: "#" },
  { label: "Content Management", icon: LayoutGrid, href: "#", caret: true },
  { label: "Reports & Analytics", icon: BarChart3, href: "#" },
  { label: "SEO Manager", icon: Globe, href: "#" },
];

const MARKETING_CHILDREN = [
  { label: "Landing Pages", href: "#" },
  { label: "Free Lecture Leads", href: "#" },
  { label: "Email Marketing", href: "/email-marketing" },
  { label: "Platform Marketing", href: "#" },
];

const rowBase =
  "flex items-center gap-3 h-10 rounded-md px-3 text-[14px] font-medium transition-colors";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const emActive = pathname.startsWith("/email-marketing");

  return (
    <div
      className="flex h-full flex-col text-white/75"
      style={{ background: "var(--em-navy)" }}
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-[var(--em-gold)]">
          <BookOpen className="size-5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-[17px] font-extrabold tracking-wide text-white">IMETS</span>
          <span className="block text-[10px] font-semibold tracking-wide text-[var(--em-gold)]">
            Medical School
          </span>
        </span>
      </div>

      <nav aria-label="Admin" className="em-noscroll flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(rowBase, "text-white/70 hover:bg-white/10 hover:text-white")}
              >
                <item.icon className="size-[18px] shrink-0" aria-hidden="true" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.caret && <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />}
              </Link>
            </li>
          ))}

          {/* Marketing (active group) */}
          <li className="relative mt-0.5">
            <span
              aria-hidden="true"
              className="absolute inset-y-1.5 start-0 w-1 rounded-e-full"
              style={{ background: "var(--em-gold)" }}
            />
            <div className={cn(rowBase, "font-semibold text-white")}>
              <Megaphone className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="flex-1">Marketing</span>
              <ChevronDown className="size-3.5 rotate-180 opacity-80" aria-hidden="true" />
            </div>
            <ul className="mt-0.5 flex flex-col gap-0.5 ps-5">
              {MARKETING_CHILDREN.map((c) => {
                const active = c.href === "/email-marketing" && emActive;
                return (
                  <li key={c.label}>
                    <Link
                      href={c.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-9 items-center rounded-md px-3 text-[13.5px] transition-colors",
                        active
                          ? "font-semibold text-white"
                          : "text-white/65 hover:bg-white/10 hover:text-white",
                      )}
                      style={active ? { background: "var(--em-primary)" } : undefined}
                    >
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          <li className="mt-0.5">
            <Link
              href="#"
              onClick={onNavigate}
              className={cn(rowBase, "text-white/70 hover:bg-white/10 hover:text-white")}
            >
              <Settings className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="flex-1">Settings</span>
              <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-white px-4 md:px-6"
      style={{ borderColor: "var(--em-border)" }}
    >
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="grid size-9 place-items-center rounded-md text-[var(--em-text-secondary)] hover:bg-[var(--em-blue-50)] lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-[520px] flex-1 sm:block">
        <Search
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[var(--em-text-muted)]"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search jobs, professionals, employers, applications…"
          className="h-10 w-full rounded-xl border bg-white ps-9 pe-16 text-[14px] text-[var(--em-text-body)] placeholder:text-[var(--em-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--em-blue-200)]"
          style={{ borderColor: "var(--em-border)" }}
        />
        <kbd
          className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold text-[var(--em-text-secondary)]"
          style={{ borderColor: "var(--em-border)", background: "var(--em-page)" }}
        >
          Ctrl + K
        </kbd>
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-md text-[var(--em-text-secondary)] hover:bg-[var(--em-blue-50)]"
        >
          <span
            className="absolute end-2 top-2 size-2 rounded-full ring-2 ring-white"
            style={{ background: "var(--em-danger)" }}
          />
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </button>
        <button
          type="button"
          aria-label="Help"
          className="grid size-9 place-items-center rounded-md text-[var(--em-text-secondary)] hover:bg-[var(--em-blue-50)]"
        >
          <CircleHelp className="size-5" aria-hidden="true" />
        </button>
        <div className="ms-1.5 flex items-center gap-2 border-s ps-3" style={{ borderColor: "var(--em-border)" }}>
          <span className="grid size-9 place-items-center rounded-full bg-[var(--em-blue-100)] text-[13px] font-bold text-[var(--em-primary)]">
            AM
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[13px] font-semibold text-[var(--em-text-primary)]">
              Ahmed Mahmoud
            </span>
            <span className="block text-[11px] text-[var(--em-text-secondary)]">Admin</span>
          </span>
          <ChevronDown className="hidden size-4 text-[var(--em-text-secondary)] sm:block" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

export function EmShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-[228px] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 w-[260px]">
            <SidebarContent onNavigate={() => setOpen(false)} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute end-3 top-4 grid size-8 place-items-center rounded-md text-white/80 hover:bg-white/10"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-dvh flex-col lg:ps-[228px]">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
