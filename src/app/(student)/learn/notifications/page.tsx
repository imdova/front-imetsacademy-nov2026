import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { getNotifications } from "@/features/student/notifications";
import { PortalHero } from "@/features/student/components/portal-hero";
import { NotificationsView } from "@/features/student/components/notifications-view";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const { items, preferences } = await getNotifications();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <PortalHero
        title="Notifications"
        subtitle="Stay informed about your courses, payments, and account updates."
        icon={<Bell className="size-28" aria-hidden="true" />}
      />
      <NotificationsView items={items} preferences={preferences} />
    </div>
  );
}
