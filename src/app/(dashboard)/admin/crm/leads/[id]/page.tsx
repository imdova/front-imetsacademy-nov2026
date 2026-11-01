import type { Metadata } from "next";
import { LEADS } from "@/features/crm/data";
import { LeadDetails } from "@/features/crm/components/lead-details";

export const metadata: Metadata = { title: "Lead Details · CRM · Admin" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = LEADS.find((l) => l.id === id) ?? LEADS[0]!;
  return <LeadDetails lead={lead} />;
}
