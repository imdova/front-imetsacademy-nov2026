"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavItem } from "@/config/site";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Mobile navigation drawer (Radix Dialog). Trigger hidden on desktop. */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-md border border-border-input text-ink lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex h-16 items-center border-b border-border px-5">
          <SheetClose asChild>
            <Link href={routes.home} aria-label="IMETS Academy — home">
              <Logo />
            </Link>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-label text-ink hover:bg-surface-alt",
                    active && "bg-primary-50 text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <div className="flex flex-col gap-3 border-t border-border p-4">
          <SheetClose asChild>
            <Button asChild variant="outline" block>
              <Link href={routes.signIn}>Sign in</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="accent" block>
              <Link href={routes.register}>Register</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
