import { routes } from "@/config/routes";

/** Icon keys mapped to lucide components in the sidebar (config stays icon-free). */
export type AdminIcon =
  | "dashboard"
  | "crm"
  | "courses"
  | "programs"
  | "learners"
  | "instructors"
  | "enrollments"
  | "payments"
  | "reports"
  | "settings";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminIcon;
  children?: { label: string; href: string }[];
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: routes.admin.dashboard, icon: "dashboard" },
  {
    label: "CRM",
    href: routes.admin.crm.overview,
    icon: "crm",
    children: [
      { label: "Overview", href: routes.admin.crm.overview },
      { label: "Leads", href: routes.admin.crm.leads },
      { label: "Pipeline", href: routes.admin.crm.pipeline },
      { label: "Deals", href: routes.admin.crm.deals },
      { label: "Enrollments", href: routes.admin.crm.enrollments },
      { label: "Payments & Installments", href: routes.admin.crm.payments },
    ],
  },
  {
    label: "Courses",
    href: routes.admin.courses,
    icon: "courses",
    children: [
      { label: "All Courses", href: routes.admin.courses },
      { label: "Add New Course", href: routes.admin.newCourse },
      { label: "Categories", href: routes.admin.categories },
    ],
  },
  { label: "Programs", href: routes.admin.programs, icon: "programs" },
  { label: "Learners", href: routes.admin.learners, icon: "learners" },
  { label: "Instructors", href: routes.admin.instructors, icon: "instructors" },
  { label: "Enrollments", href: routes.admin.enrollments, icon: "enrollments" },
  { label: "Payments", href: routes.admin.payments, icon: "payments" },
  { label: "Reports", href: routes.admin.reports, icon: "reports" },
  { label: "Settings", href: routes.admin.settings, icon: "settings" },
];

export const adminUser = {
  name: "Ahmed Mahmoud",
  role: "Platform Admin",
  initials: "AM",
};
