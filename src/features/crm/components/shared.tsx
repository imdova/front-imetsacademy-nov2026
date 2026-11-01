import { Globe, Mail, Megaphone, MessageCircle, Search, UserPlus, type LucideIcon } from "lucide-react";
import type { LeadSource, LeadStatus } from "@/features/crm/data";
import { STATUS_LABEL } from "@/features/crm/data";
import { cn } from "@/lib/utils";

export const SOURCE_ICON: Record<LeadSource, LucideIcon> = {
  meta: Megaphone,
  website: Globe,
  whatsapp: MessageCircle,
  referral: UserPlus,
  email: Mail,
  google: Search,
};
export const SOURCE_LABEL: Record<LeadSource, string> = {
  meta: "Meta Ads",
  website: "Website",
  whatsapp: "WhatsApp",
  referral: "Referral",
  email: "Email Campaign",
  google: "Google Ads",
};

const STATUS_CLASS: Record<LeadStatus, string> = {
  new: "bg-surface-alt text-ink-muted",
  contacted: "bg-primary-50 text-primary",
  qualified: "bg-orange-50 text-orange",
  followup: "bg-violet-50 text-violet",
  enrolled: "bg-success-50 text-success",
  archived: "bg-surface-alt text-ink-subtle",
};

export function StatusPill({ status }: { status: LeadStatus }) {
  return <span className={cn("inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-semibold", STATUS_CLASS[status])}>{STATUS_LABEL[status]}</span>;
}

export function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 85 ? "bg-success-50 text-success" : score >= 70 ? "bg-orange-50 text-orange" : "bg-surface-alt text-ink-muted";
  return <span className={cn("inline-flex min-w-9 items-center justify-center rounded-md px-2 py-1 text-caption font-bold", cls)}>{score}</span>;
}

export function SourceCell({ source }: { source: LeadSource }) {
  const Icon = SOURCE_ICON[source];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink-muted">
      <Icon className="size-4 text-ink-subtle" aria-hidden="true" />
      {SOURCE_LABEL[source]}
    </span>
  );
}
