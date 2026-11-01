import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { getStudentProfile } from "@/features/student/data";
import { PortalHero } from "@/features/student/components/portal-hero";
import { SettingsView } from "@/features/student/components/settings-view";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const profile = await getStudentProfile();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <PortalHero
        title="Settings"
        subtitle="Manage your account, security, and learning experience."
        icon={<Settings className="size-28" aria-hidden="true" />}
      />
      <SettingsView profile={profile} />
    </div>
  );
}
