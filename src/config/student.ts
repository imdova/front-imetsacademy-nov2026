import { routes } from "@/config/routes";

export type StudentIcon =
  | "dashboard"
  | "profile"
  | "courses"
  | "certificates"
  | "payments"
  | "saved"
  | "notifications"
  | "help";

export type StudentNavItem = {
  label: string;
  href: string;
  icon: StudentIcon;
  badge?: number;
};

export const studentNav: StudentNavItem[] = [
  { label: "Dashboard", href: routes.student.dashboard, icon: "dashboard" },
  { label: "My Profile", href: routes.student.profile, icon: "profile" },
  { label: "My Courses", href: routes.student.courses, icon: "courses" },
  { label: "Certificates", href: routes.student.certificates, icon: "certificates" },
  { label: "Payments", href: routes.student.payments, icon: "payments" },
  { label: "Saved Courses", href: routes.student.saved, icon: "saved" },
  { label: "Notifications", href: routes.student.notifications, icon: "notifications", badge: 3 },
  { label: "Help & Support", href: routes.student.help, icon: "help" },
];
