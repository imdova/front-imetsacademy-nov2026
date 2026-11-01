import "server-only";
import { delay } from "@/lib/delay";

/* Student notifications mock data (UI preview; replaced by the backend later). */

export type NotificationCategory = "course" | "payment" | "certificate" | "account";

export type StudentNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  highlight?: string;
};

export type NotificationPrefKey =
  | "course-updates"
  | "live-sessions"
  | "payments"
  | "certificates"
  | "news";

export type NotificationPref = { key: NotificationPrefKey; label: string; enabled: boolean };

const notifications: StudentNotification[] = [
  {
    id: "n1",
    category: "course",
    title: "Your next live session is tomorrow",
    body: "Strategic Management – Module 3: Competitive Strategy",
    time: "2h ago",
    unread: true,
    highlight: "Tomorrow, 8:00 PM",
  },
  {
    id: "n2",
    category: "certificate",
    title: "Certificate is ready!",
    body: "Your certificate for “Business Analytics” is now available for download.",
    time: "5h ago",
    unread: true,
  },
  {
    id: "n3",
    category: "payment",
    title: "Payment confirmed",
    body: "We’ve received your payment of $99.00 for “Digital Transformation”.",
    time: "6h ago",
    unread: true,
  },
  {
    id: "n4",
    category: "course",
    title: "New module is now available",
    body: "Module 4: Strategy Implementation is now open.",
    time: "Oct 28, 2026",
    unread: false,
  },
  {
    id: "n5",
    category: "course",
    title: "New course: Leadership & Team Management",
    body: "A new course has been added to the Business category.",
    time: "Oct 27, 2026",
    unread: false,
  },
  {
    id: "n6",
    category: "course",
    title: "Live webinar: Business Strategy in 2026",
    body: "Join our upcoming free webinar on Nov 5, 2026 at 8:00 PM (Cairo Time).",
    time: "Oct 26, 2026",
    unread: false,
  },
  {
    id: "n7",
    category: "certificate",
    title: "You earned a new achievement",
    body: "“Certificate Hunter” — you’ve earned 5 certificates. Keep it up!",
    time: "Oct 25, 2026",
    unread: false,
  },
  {
    id: "n8",
    category: "payment",
    title: "Invoice available",
    body: "Your invoice for the Business Leadership Bundle is ready to download.",
    time: "Oct 24, 2026",
    unread: false,
  },
  {
    id: "n9",
    category: "account",
    title: "New sign-in to your account",
    body: "A new sign-in from Chrome on Windows was detected in Cairo, Egypt.",
    time: "Oct 23, 2026",
    unread: false,
  },
  {
    id: "n10",
    category: "account",
    title: "Password changed successfully",
    body: "Your account password was updated. If this wasn’t you, contact support.",
    time: "Oct 21, 2026",
    unread: false,
  },
  {
    id: "n11",
    category: "account",
    title: "Two-factor authentication enabled",
    body: "2FA is now protecting your account on every sign-in.",
    time: "Oct 20, 2026",
    unread: false,
  },
  {
    id: "n12",
    category: "course",
    title: "Reminder: finish Strategic Management",
    body: "You’re 60% through — complete Module 3 to stay on track.",
    time: "Oct 19, 2026",
    unread: false,
  },
];

const preferences: NotificationPref[] = [
  { key: "course-updates", label: "Course updates & new content", enabled: true },
  { key: "live-sessions", label: "Live sessions & webinars", enabled: true },
  { key: "payments", label: "Payments & invoices", enabled: true },
  { key: "certificates", label: "Certificates & achievements", enabled: true },
  { key: "news", label: "News, offers & announcements", enabled: true },
];

export async function getNotifications(): Promise<{
  items: StudentNotification[];
  preferences: NotificationPref[];
}> {
  await delay();
  return structuredClone({ items: notifications, preferences });
}
