import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { InstructorComingSoon } from "@/features/instructor/components/coming-soon";

export const metadata: Metadata = { title: "Earnings & Payouts · Instructor" };

export default function Page() {
  return (
    <InstructorComingSoon
      title="Earnings & Payouts"
      description="Track your earnings and manage payouts."
      icon={<CreditCard className="size-7" aria-hidden="true" />}
    />
  );
}
