"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutGrid,
  Mail,
  Megaphone,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS: { label: string; href: string; icon: LucideIcon; match: string }[] = [
  { label: "Overview", href: "/email-marketing", icon: Megaphone, match: "/email-marketing" },
  { label: "Campaigns", href: "/email-marketing/campaigns", icon: Mail, match: "/email-marketing/campaigns" },
  { label: "Automations", href: "/email-marketing/automations", icon: Workflow, match: "/email-marketing/automations" },
  { label: "Audiences", href: "/email-marketing/audiences", icon: Users, match: "/email-marketing/audiences" },
  { label: "Templates", href: "/email-marketing/templates", icon: LayoutGrid, match: "/email-marketing/templates" },
  { label: "Analytics", href: "/email-marketing/analytics", icon: Activity, match: "/email-marketing/analytics" },
  { label: "Settings", href: "/email-marketing/settings", icon: Settings, match: "/email-marketing/settings" },
];

export function EmTabs() {
  const pathname = usePathname();

  const isActive = (match: string) => {
    if (match === "/email-marketing") return pathname === "/email-marketing";
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  return (
    <div className="em-noscroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {TABS.map((tab) => {
        const active = isActive(tab.match);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-12 shrink-0 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold transition-colors",
              active
                ? "text-white"
                : "border bg-white text-[var(--em-text-secondary)] hover:text-[var(--em-primary)]",
            )}
            style={
              active
                ? { background: "var(--em-primary)", boxShadow: "var(--em-shadow-card)" }
                : { borderColor: "var(--em-border)", boxShadow: "var(--em-shadow-card)" }
            }
          >
            <tab.icon className="size-5 shrink-0" aria-hidden="true" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
