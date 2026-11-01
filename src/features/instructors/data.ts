import "server-only";
import { delay } from "@/lib/delay";

/* Admin → Instructors mock data (UI preview; replaced by the backend). */

export type InstructorStatus = "active" | "pending" | "inactive";
export type ExpertiseTint = "violet" | "blue" | "teal" | "warm" | "rose";

export type AdminInstructor = {
  id: string;
  name: string;
  email: string;
  initials: string;
  expertise: string;
  expertiseTint: ExpertiseTint;
  courses: number;
  enrollments: number;
  rating: number;
  revenue: number;
  status: InstructorStatus;
  joined: string; // ISO date
};

export type InstructorStats = {
  total: number;
  active: number;
  totalCourses: number;
  avgRating: number;
  totalTrend: string;
  activeTrend: string;
  coursesTrend: string;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

type Seed = [name: string, expertise: string, tint: ExpertiseTint, courses: number, enroll: number, rating: number, revenue: number, status: InstructorStatus, joined: string];

const SEED: Seed[] = [
  ["Mona Hassan", "Management", "violet", 12, 1840, 4.9, 52480, "active", "2025-01-10"],
  ["Ahmed Ali", "Business", "blue", 8, 1260, 4.8, 38720, "active", "2025-02-05"],
  ["Sara Mohamed", "Leadership", "teal", 10, 1972, 4.9, 56900, "active", "2025-02-12"],
  ["Youssef Hamdy", "Marketing", "warm", 7, 1044, 4.7, 29450, "active", "2025-03-01"],
  ["Nour Emad", "Analytics", "rose", 6, 896, 4.6, 24320, "pending", "2025-03-15"],
  ["Omar Soliman", "Project Mgmt", "violet", 9, 1310, 4.8, 41670, "active", "2025-04-02"],
  ["Hend Ibrahim", "Innovation", "teal", 5, 712, 4.7, 18960, "inactive", "2025-04-18"],
  ["Kareem Tarek", "Strategy", "blue", 8, 1205, 4.8, 36140, "active", "2025-05-06"],
  ["Laila Fahmy", "Finance", "warm", 6, 940, 4.6, 27800, "active", "2025-05-20"],
  ["Mostafa Zaki", "Operations", "violet", 7, 1120, 4.7, 31500, "active", "2025-06-03"],
  ["Dina Adel", "HR & People", "rose", 4, 560, 4.5, 14200, "pending", "2025-06-19"],
  ["Hassan Nabil", "Business", "blue", 9, 1480, 4.8, 44300, "active", "2025-07-01"],
  ["Aya Kamal", "Marketing", "warm", 5, 780, 4.6, 21900, "active", "2025-07-15"],
  ["Tarek Sami", "Strategy", "blue", 11, 1650, 4.9, 49800, "active", "2025-08-02"],
  ["Salma Yousry", "Leadership", "teal", 6, 905, 4.7, 26400, "active", "2025-08-21"],
  ["Khaled Fouad", "Analytics", "rose", 8, 1190, 4.8, 34700, "active", "2025-09-04"],
  ["Rana Hossam", "Innovation", "teal", 3, 420, 4.4, 10800, "inactive", "2025-09-18"],
  ["Amr Gamal", "Project Mgmt", "violet", 7, 1065, 4.7, 30200, "active", "2025-10-01"],
  ["Farida Ashraf", "Management", "violet", 6, 870, 4.6, 25100, "pending", "2025-10-16"],
  ["Ziad Mansour", "Finance", "warm", 9, 1395, 4.8, 42600, "active", "2025-11-03"],
  ["Habiba Saeed", "HR & People", "rose", 4, 610, 4.5, 15700, "active", "2025-11-20"],
  ["Sherif Adly", "Operations", "violet", 8, 1220, 4.8, 37400, "active", "2025-12-05"],
  ["Nada Refaat", "Marketing", "warm", 5, 735, 4.6, 20300, "inactive", "2025-12-19"],
  ["Mahmoud Essam", "Business", "blue", 10, 1530, 4.9, 47200, "active", "2026-01-08"],
];

const instructors: AdminInstructor[] = SEED.map(
  ([name, expertise, tint, courses, enroll, rating, revenue, status, joined], i) => {
    const slug = name.toLowerCase().replace(/\s+/g, ".");
    return {
      id: `INS-${2001 + i}`,
      name,
      email: `${slug}@imets.academy`,
      initials: initials(name),
      expertise,
      expertiseTint: tint,
      courses,
      enrollments: enroll,
      rating,
      revenue,
      status,
      joined,
    };
  },
);

const stats: InstructorStats = {
  total: instructors.length,
  active: instructors.filter((i) => i.status === "active").length,
  totalCourses: instructors.reduce((n, i) => n + i.courses, 0),
  avgRating:
    Math.round((instructors.reduce((n, i) => n + i.rating, 0) / instructors.length) * 10) / 10,
  totalTrend: "+20%",
  activeTrend: "+12%",
  coursesTrend: "+18%",
};

export async function getInstructors(): Promise<{
  items: AdminInstructor[];
  stats: InstructorStats;
}> {
  await delay();
  return structuredClone({ items: instructors, stats });
}
