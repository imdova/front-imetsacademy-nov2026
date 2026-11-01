import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AppHeader } from "@/components/layout/app-header";

// The sidebar reads the current path (usePathname); let the admin render at
// request time instead of prerendering a static shell.
export const instant = false;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface-alt">
      <AdminSidebar />
      <div className="flex min-h-dvh flex-col lg:ps-[220px]">
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
