import type { Metadata } from "next";
import { SettingsView } from "@/features/admin-settings/components/settings-view";

export const metadata: Metadata = { title: "Settings · Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-h1 text-ink">Settings</h1>
        <p className="mt-1 text-body text-ink-muted">
          Manage and customize your platform, courses, users, and integrations.
        </p>
      </div>
      <SettingsView />
    </div>
  );
}
