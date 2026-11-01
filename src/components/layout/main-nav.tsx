"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/site";
import { NavLinks } from "@/components/layout/nav-links";

/** Desktop nav with active highlight. Streamed into the header via Suspense. */
export function MainNav({ items }: { items: readonly NavItem[] }) {
  return <NavLinks items={items} pathname={usePathname()} />;
}
