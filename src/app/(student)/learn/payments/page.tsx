import type { Metadata } from "next";
import {
  CreditCard,
  Gift,
  Layers,
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  ShoppingCart,
  User,
  Wallet,
} from "lucide-react";
import { getPayments, type PaymentMethod } from "@/features/student/payments";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortalHero } from "@/features/student/components/portal-hero";
import { PaymentsTransactions } from "@/features/student/components/payments-transactions";

export const metadata: Metadata = { title: "Payments" };

const BRAND: Record<PaymentMethod["brand"], { label: string; className: string }> = {
  visa: { label: "VISA", className: "bg-[#1a1f71] text-white" },
  mastercard: { label: "MC", className: "bg-[#eb001b] text-white" },
  paypal: { label: "PP", className: "bg-[#003087] text-white" },
};

export default async function PaymentsPage() {
  const { transactions, methods, stats, billing, walletBalance } = await getPayments();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <PortalHero
        title="Payments"
        subtitle="Manage your purchases, invoices, and payment methods."
        icon={<CreditCard className="size-28" aria-hidden="true" />}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={<ShoppingCart className="size-5" />} label="Total Purchases" value={stats.purchases} tone="primary" />
            <StatCard icon={<Layers className="size-5" />} label="Courses" value={stats.courses} tone="teal" />
            <StatCard icon={<CreditCard className="size-5" />} label="Subscription" value={stats.subscriptions} tone="violet" />
            <StatCard icon={<Gift className="size-5" />} label="Bundle" value={stats.bundles} tone="warm" />
          </div>

          <PaymentsTransactions transactions={transactions} />
        </div>

        <aside className="space-y-6">
          {/* Wallet */}
          <div className="rounded-xl bg-linear-to-br from-primary to-primary-hover p-5 text-on-dark">
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-2 text-body-sm font-semibold">
                <Wallet className="size-5" aria-hidden="true" />
                IMETS Wallet
              </span>
              <Button size="sm" variant="accent">
                Add Funds
              </Button>
            </div>
            <p className="mt-3 text-display-lg font-extrabold">{walletBalance}</p>
          </div>

          {/* Payment methods */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-ink">Payment Methods</h2>
              <button type="button" className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary hover:underline">
                <Plus className="size-4" aria-hidden="true" />
                Add Method
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {methods.map((m) => (
                <li key={m.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className={`flex h-8 w-11 shrink-0 items-center justify-center rounded text-[11px] font-extrabold ${BRAND[m.brand].className}`}>
                    {BRAND[m.brand].label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body-sm font-semibold text-ink">{m.label}</p>
                    <p className="text-caption text-ink-subtle">{m.meta}</p>
                  </div>
                  {m.default && <Badge variant="info">Default</Badge>}
                  <MoreVertical className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          {/* Billing */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-ink">Billing Information</h2>
              <button type="button" className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary hover:underline">
                <Pencil className="size-4" aria-hidden="true" />
                Edit
              </button>
            </div>
            <ul className="mt-4 space-y-3 text-body-sm text-ink">
              <li className="flex items-center gap-3">
                <User className="size-4 text-ink-subtle" aria-hidden="true" />
                {billing.name}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-ink-subtle" aria-hidden="true" />
                {billing.email}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-ink-subtle" aria-hidden="true" />
                {billing.phone}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-ink-subtle" aria-hidden="true" />
                {billing.location}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
