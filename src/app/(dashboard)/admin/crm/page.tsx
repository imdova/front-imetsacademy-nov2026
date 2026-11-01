import type { Metadata } from "next";
import { CrmOverview } from "@/features/crm/components/crm-overview";

export const metadata: Metadata = { title: "CRM · Admin" };

export default function Page() {
  return <CrmOverview />;
}
