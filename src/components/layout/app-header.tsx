import Link from "next/link";
import { Bell, ChevronDown, CircleHelp, Search } from "lucide-react";
import { adminUser } from "@/config/admin";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/shared/avatar";
import { AdminMobileSidebar } from "@/components/layout/admin-mobile-sidebar";

/** Admin top bar: search, help, notifications, user menu. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
      <AdminMobileSidebar />

      <label className="relative hidden max-w-2xl flex-1 items-center md:flex">
        <Search className="pointer-events-none absolute start-4 size-5 text-ink-subtle" aria-hidden="true" />
        <span className="sr-only">Search in platform</span>
        <input
          type="search"
          placeholder="Search in platform…"
          className="h-11 w-full rounded-lg border border-border bg-surface-alt ps-12 pe-16 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
        />
        <kbd className="absolute end-4 hidden rounded border border-border bg-surface px-1.5 py-0.5 text-caption text-ink-subtle lg:inline">
          Ctrl K
        </kbd>
      </label>

      <div className="ms-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Help"
          className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <CircleHelp className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute end-2 top-2 size-2 rounded-full bg-danger ring-2 ring-surface" />
        </button>

        <details className="group relative ms-1">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md p-1 hover:bg-surface-alt [&::-webkit-details-marker]:hidden">
            <Avatar initials={adminUser.initials} size="md" />
            <span className="hidden text-start sm:block">
              <span className="block text-body-sm font-semibold text-ink">{adminUser.name}</span>
              <span className="block text-caption text-ink-subtle">{adminUser.role}</span>
            </span>
            <ChevronDown
              className="size-4 text-ink-subtle transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="absolute end-0 z-30 mt-2 w-48 rounded-md border border-border bg-surface p-1 shadow-lg">
            <Link href={routes.admin.settings} className="block rounded px-3 py-2 text-body-sm text-ink hover:bg-surface-alt">
              Profile
            </Link>
            <Link href={routes.admin.settings} className="block rounded px-3 py-2 text-body-sm text-ink hover:bg-surface-alt">
              Settings
            </Link>
            <Link href={routes.signIn} className="block rounded px-3 py-2 text-body-sm text-danger hover:bg-danger-50">
              Sign out
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
