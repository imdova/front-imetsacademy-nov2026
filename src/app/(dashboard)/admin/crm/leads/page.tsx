import type { Metadata } from "next";
import { LeadsManagement } from "@/features/crm/components/leads-management";

export const metadata: Metadata = { title: "Leads · CRM · Admin" };

export default function Page() {
  return <LeadsManagement />;
}
