import "server-only";
import { delay } from "@/lib/delay";

/* Student payments mock data (UI preview; replaced by the backend later). */

export type TxnKind = "course" | "subscription" | "bundle";
export type Transaction = {
  id: string;
  item: string;
  subtitle: string;
  kind: TxnKind;
  amount: string;
  date: string;
  status: "Paid" | "Refunded" | "Pending";
};

export type PaymentMethod = {
  id: string;
  brand: "visa" | "mastercard" | "paypal";
  label: string;
  meta: string;
  default: boolean;
};

export type PaymentStats = {
  purchases: number;
  courses: number;
  subscriptions: number;
  bundles: number;
};

export type BillingInfo = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

const transactions: Transaction[] = [
  {
    id: "PAY-10432",
    item: "Strategic Management",
    subtitle: "Course",
    kind: "course",
    amount: "$129.00",
    date: "Oct 28, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10418",
    item: "Business Analytics",
    subtitle: "Course",
    kind: "course",
    amount: "$99.00",
    date: "Oct 20, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10395",
    item: "Digital Transformation",
    subtitle: "Course",
    kind: "course",
    amount: "$149.00",
    date: "Oct 10, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10376",
    item: "IMETS Plus",
    subtitle: "Annual Subscription",
    kind: "subscription",
    amount: "$199.00",
    date: "Oct 1, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10354",
    item: "Business Leadership Bundle",
    subtitle: "3 Courses",
    kind: "bundle",
    amount: "$249.00",
    date: "Sep 18, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10331",
    item: "Project Management Fundamentals",
    subtitle: "Course",
    kind: "course",
    amount: "$89.00",
    date: "Sep 10, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10318",
    item: "Leadership & Team Management",
    subtitle: "Course",
    kind: "course",
    amount: "$119.00",
    date: "Aug 28, 2026",
    status: "Paid",
  },
  {
    id: "PAY-10302",
    item: "Executive Business Leadership",
    subtitle: "Program",
    kind: "bundle",
    amount: "$349.00",
    date: "Aug 12, 2026",
    status: "Refunded",
  },
];

const methods: PaymentMethod[] = [
  { id: "m1", brand: "visa", label: "Visa •••• 4242", meta: "Expires 09/29", default: true },
  { id: "m2", brand: "mastercard", label: "Mastercard •••• 5536", meta: "Expires 12/27", default: false },
  { id: "m3", brand: "paypal", label: "PayPal", meta: "ahmed.mahmoud@email.com", default: false },
];

const stats: PaymentStats = { purchases: 8, courses: 6, subscriptions: 1, bundles: 1 };

const billing: BillingInfo = {
  name: "Ahmed Mahmoud",
  email: "ahmed.mahmoud@email.com",
  phone: "+20 100 123 4567",
  location: "Cairo, Egypt",
};

export async function getPayments(): Promise<{
  transactions: Transaction[];
  methods: PaymentMethod[];
  stats: PaymentStats;
  billing: BillingInfo;
  walletBalance: string;
}> {
  await delay();
  return structuredClone({ transactions, methods, stats, billing, walletBalance: "$0.00" });
}
