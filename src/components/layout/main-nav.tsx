"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop primary navigation. Active link: bold with an accent underline. */
export function MainNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative inline-flex items-center gap-1 text-body-sm text-ink transition-colors hover:text-primary",
              "after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-accent after:opacity-0",
              active && "font-bold after:opacity-100",
            )}
          >
            {item.label}
            {item.hasMenu && <ChevronDown className="size-4" aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}
