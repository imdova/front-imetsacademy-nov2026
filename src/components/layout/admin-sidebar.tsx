"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Target,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { adminNav, type AdminIcon, type AdminNavItem } from "@/config/admin";
import { routes } from "@/config/routes";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const iconFor: Record<AdminIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  crm: Target,
  courses: GraduationCap,
  programs: Layers,
  learners: Users,
  instructors: User,
  enrollments: ShoppingCart,
  payments: CreditCard,
  reports: BarChart3,
  settings: Settings,
};

function isActive(pathname: string, href: string) {
  // The dashboard root (/admin) is a prefix of every admin route — match it exactly.
  if (href === routes.admin.dashboard) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function sectionActive(pathname: string, item: AdminNavItem) {
  return isActive(pathname, item.href) || (item.children ?? []).some((c) => pathname === c.href);
}

const rowBase =
  "flex items-center gap-3 h-[42px] rounded-md px-3 text-body-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function LeafItem({
  item,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = iconFor[item.icon];
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        rowBase,
        active
          ? "bg-primary font-semibold text-on-dark"
          : "text-on-dark-muted hover:bg-white/6 hover:text-on-dark",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

function SectionItem({
  item,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = iconFor[item.icon];
  const active = sectionActive(pathname, item);
  const [open, setOpen] = useState(active);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          rowBase,
          "w-full",
          active ? "font-semibold text-on-dark" : "text-on-dark-muted hover:text-on-dark",
        )}
      >
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-start">{item.label}</span>
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-1 ps-4">
          {item.children!.map((child) => {
            const childActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                aria-current={childActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-body-sm transition-colors",
                  childActive
                    ? "bg-primary font-semibold text-on-dark"
                    : "text-on-dark-muted hover:bg-white/6 hover:text-on-dark",
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Shared sidebar nav content (used in the fixed desktop rail and mobile drawer). */
export function AdminSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-navy-950 text-on-dark-muted">
      <div className="flex h-16 items-center px-5">
        <Link href={routes.admin.dashboard} aria-label="IMETS Academy — admin" onClick={onNavigate}>
          <Logo variant="dark" className="h-9" />
        </Link>
      </div>
      <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {adminNav.map((item) =>
          item.children ? (
            <SectionItem key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
          ) : (
            <LeafItem key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
          ),
        )}
      </nav>
    </div>
  );
}

/** Fixed desktop sidebar (hidden below lg; mobile uses the drawer in AppHeader). */
export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 start-0 z-30 hidden w-[220px] lg:block">
      <AdminSidebarContent />
    </aside>
  );
}
