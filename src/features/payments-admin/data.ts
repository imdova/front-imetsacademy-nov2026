import "server-only";
import { delay } from "@/lib/delay";

/* Admin → Payments & Transactions mock data (UI preview; replaced by backend). */

export type PaymentMethodKind = "credit" | "paypal" | "bank";
export type TxnStatus = "successful" | "pending" | "refunded";
export type CourseTint = "blue" | "teal" | "violet" | "warm";

export type AdminTransaction = {
  id: string;
  student: { name: string; email: string; initials: string };
  course: string;
  courseTint: CourseTint;
  amount: number;
  method: PaymentMethodKind;
  status: TxnStatus;
  date: string; // ISO datetime
};

export type PaymentStats = {
  totalRevenue: number;
  successfulPayments: number;
  refunds: number;
  totalTransactions: number;
  revenueTrend: string;
  successTrend: string;
  refundsTrend: string;
  transactionsTrend: string;
};

export type RevenuePoint = { label: string; value: number };
export type MethodShare = { label: string; pct: number };

function initials(name: string): string {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

type Seed = [student: string, course: string, tint: CourseTint, amount: number, method: PaymentMethodKind, status: TxnStatus, date: string];

const SEED: Seed[] = [
  ["Sara Mohamed", "Strategic Management", "blue", 699, "credit", "successful", "2026-11-08T10:24:00"],
  ["Ahmed Ali", "Business Analytics", "teal", 549, "paypal", "successful", "2026-11-08T09:18:00"],
  ["Mona Hassan", "Project Management", "violet", 499, "credit", "successful", "2026-11-07T16:32:00"],
  ["Youssef Hamdy", "Digital Marketing Strategy", "warm", 449, "bank", "pending", "2026-11-07T13:15:00"],
  ["Nour Emad", "Entrepreneurship & Innovation", "warm", 399, "paypal", "successful", "2026-11-06T20:47:00"],
  ["Omar Soliman", "Leadership & Team Management", "blue", 649, "credit", "refunded", "2026-11-05T11:20:00"],
  ["Hend Ibrahim", "Business Process Management", "teal", 549, "credit", "successful", "2026-11-05T09:05:00"],
  ["Kareem Tarek", "Strategic Management", "blue", 699, "paypal", "successful", "2026-11-04T18:40:00"],
  ["Laila Fahmy", "Digital Transformation", "violet", 749, "credit", "successful", "2026-11-04T08:12:00"],
  ["Mostafa Zaki", "Business Analytics", "teal", 549, "bank", "pending", "2026-11-03T15:55:00"],
  ["Dina Adel", "Leadership & Team Management", "blue", 649, "credit", "successful", "2026-11-03T12:30:00"],
  ["Hassan Nabil", "Project Management", "violet", 499, "paypal", "successful", "2026-11-02T17:08:00"],
  ["Aya Kamal", "Entrepreneurship & Innovation", "warm", 399, "credit", "refunded", "2026-11-02T10:45:00"],
  ["Tarek Sami", "Digital Marketing Strategy", "warm", 449, "credit", "successful", "2026-11-01T14:22:00"],
];

const transactions: AdminTransaction[] = SEED.map(([student, course, tint, amount, method, status, date], i) => ({
  id: `TRX-${104892 - i}`,
  student: { name: student, email: `${student.toLowerCase().replace(/\s+/g, ".")}@example.com`, initials: initials(student) },
  course,
  courseTint: tint,
  amount,
  method,
  status,
  date,
}));

const stats: PaymentStats = {
  totalRevenue: 228720,
  successfulPayments: 220840,
  refunds: 7880,
  totalTransactions: 328,
  revenueTrend: "+27%",
  successTrend: "+26%",
  refundsTrend: "+9%",
  transactionsTrend: "+12%",
};

const revenueTrend: RevenuePoint[] = [
  { label: "May", value: 12000 },
  { label: "Jun", value: 20400 },
  { label: "Jul", value: 24300 },
  { label: "Aug", value: 31200 },
  { label: "Sep", value: 42100 },
  { label: "Oct", value: 52840 },
];

const paymentMethods: MethodShare[] = [
  { label: "Credit / Debit Card", pct: 62 },
  { label: "PayPal", pct: 18 },
  { label: "Bank Transfer", pct: 12 },
  { label: "Other", pct: 8 },
];

export async function getAdminPayments(): Promise<{
  transactions: AdminTransaction[];
  stats: PaymentStats;
  revenueTrend: RevenuePoint[];
  paymentMethods: MethodShare[];
}> {
  await delay();
  return structuredClone({ transactions, stats, revenueTrend, paymentMethods });
}
