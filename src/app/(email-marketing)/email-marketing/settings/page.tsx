import { CalendarDays, Globe, Settings } from "lucide-react";
import { EmCard, PageHeader, Pill } from "@/components/email-marketing/em-ui";
import { EmTabs } from "@/components/email-marketing/em-tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Settings"]}
        icon={Settings}
        title="Email Marketing – Settings"
        description="Sender profiles, sending domains, reply-to addresses, tracking, unsubscribe center, suppression lists, and integrations."
        right={
          <>
            <Pill icon={Globe}>imetsedu.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />
      <EmTabs />
      <EmCard>
        <div className="flex flex-col items-center gap-3 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-2xl" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
            <Settings className="size-7" aria-hidden="true" />
          </span>
          <p className="text-[16px] font-bold text-[var(--em-text-primary)]">Settings</p>
          <p className="max-w-md text-[13.5px] text-[var(--em-text-secondary)]">
            Sender profiles, sending domains & DNS verification, tracking preferences, suppression lists, and integrations will appear here.
          </p>
        </div>
      </EmCard>
    </div>
  );
}
