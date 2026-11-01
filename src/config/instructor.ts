import { routes } from "@/config/routes";

export type InstructorIcon =
  | "profile"
  | "courses"
  | "quizzes"
  | "assignments"
  | "students"
  | "earnings"
  | "reports"
  | "messages"
  | "notifications"
  | "settings";

export type InstructorNavItem = {
  label: string;
  href: string;
  icon: InstructorIcon;
  badge?: number;
};

export const instructorNav: InstructorNavItem[] = [
  { label: "My Profile", href: routes.instructor.profile, icon: "profile" },
  { label: "My Courses", href: routes.instructor.courses, icon: "courses" },
  { label: "Quizzes", href: routes.instructor.quizzes, icon: "quizzes" },
  { label: "Assignments", href: routes.instructor.assignments, icon: "assignments" },
  { label: "Students", href: routes.instructor.students, icon: "students" },
  { label: "Earnings & Payouts", href: routes.instructor.earnings, icon: "earnings" },
  { label: "Reports & Insights", href: routes.instructor.reports, icon: "reports" },
  { label: "Messages", href: routes.instructor.messages, icon: "messages" },
  { label: "Notifications", href: routes.instructor.notifications, icon: "notifications", badge: 3 },
  { label: "Settings", href: routes.instructor.settings, icon: "settings" },
];

export const instructorUser = {
  name: "Dr. Ahmed Ali",
  role: "Course Instructor",
  initials: "AA",
};
