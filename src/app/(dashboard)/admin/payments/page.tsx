import type { Metadata } from "next";
import { CreditCard, Database, Download, FileText, RotateCcw, Settings } from "lucide-react";
import { getAdminPayments } from "@/features/payments-admin/data";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { TrendStat } from "@/components/shared/trend-stat";
import {
  PaymentMethodsDonut,
  RevenueTrendChart,
} from "@/features/payments-admin/components/payments-charts";
import { TransactionsTable } from "@/features/payments-admin/components/transactions-table";

export const metadata: Metadata = { title: "Payments · Admin" };

export default async function AdminPaymentsPage() {
  const { transactions, stats, revenueTrend, paymentMethods } = await getAdminPayments();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Payments &amp; Transactions</h1>
          <p className="mt-1 text-body text-ink-muted">
            Track revenue, manage transactions, and monitor payments across your platform.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="lg">
            <Download className="size-5" aria-hidden="true" />
            Export
          </Button>
          <Button size="lg">
            <Settings className="size-5" aria-hidden="true" />
            Payment Settings
          </Button>
        </div>
      </div>

      {/* Stats + charts */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          <TrendStat tone="primary" icon={<Database className="size-6" />} value={formatPrice(stats.totalRevenue)} label="Total Revenue" trend={stats.revenueTrend} />
          <TrendStat tone="teal" icon={<CreditCard className="size-6" />} value={formatPrice(stats.successfulPayments)} label="Successful Payments" trend={stats.successTrend} />
          <TrendStat tone="rose" icon={<RotateCcw className="size-6" />} value={formatPrice(stats.refunds)} label="Refunds" trend={stats.refundsTrend} />
          <TrendStat tone="violet" icon={<FileText className="size-6" />} value={stats.totalTransactions} label="Total Transactions" trend={stats.transactionsTrend} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <RevenueTrendChart points={revenueTrend} />
          <PaymentMethodsDonut segments={paymentMethods} centerValue={formatPrice(stats.totalRevenue)} />
        </div>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
