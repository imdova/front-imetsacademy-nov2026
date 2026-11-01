import "server-only";
import { delay } from "@/lib/delay";

/* Admin → Course Categories mock data (UI preview; replaced by the backend). */

export type CategoryIconKey =
  | "briefcase"
  | "chart"
  | "code"
  | "users"
  | "target"
  | "project"
  | "finance"
  | "lightbulb"
  | "operations"
  | "megaphone";

export type CategoryColorKey =
  | "navy"
  | "violet"
  | "pink"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "sky";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: CategoryIconKey;
  color: CategoryColorKey;
  courses: number;
  enrollments: number;
  status: "active" | "inactive";
  order: number;
  created: string; // ISO date
};

export type CategoryStats = {
  totalCategories: number;
  courses: number;
  enrollments: string;
  categoryViews: string;
  categoriesTrend: string;
  coursesTrend: string;
  enrollmentsTrend: string;
  viewsTrend: string;
};

type Seed = [name: string, slug: string, desc: string, icon: CategoryIconKey, color: CategoryColorKey, courses: number, enroll: number, status: "active" | "inactive", created: string];

const SEED: Seed[] = [
  ["Business & Management", "business-management", "Leadership, strategy, operations, and business skills.", "briefcase", "navy", 24, 842, "active", "2025-01-10"],
  ["Data & Analytics", "data-analytics", "Data analysis, BI, and data-driven decision making.", "chart", "sky", 18, 612, "active", "2025-01-12"],
  ["Technology & Digital", "technology-digital", "IT, software, AI, and digital transformation.", "code", "violet", 22, 768, "active", "2025-01-15"],
  ["Leadership & Personal Development", "leadership-development", "Communication, productivity, and career growth.", "users", "pink", 14, 496, "active", "2025-01-18"],
  ["Marketing & Sales", "marketing-sales", "Digital marketing, brand, and sales strategies.", "target", "orange", 12, 387, "active", "2025-01-20"],
  ["Project Management", "project-management", "Agile, Scrum, and project delivery skills.", "project", "yellow", 10, 324, "active", "2025-01-22"],
  ["Finance & Accounting", "finance-accounting", "Financial management, accounting, and investment.", "finance", "teal", 8, 210, "inactive", "2025-01-25"],
  ["Innovation & Entrepreneurship", "innovation-entrepreneurship", "Innovation, startups, and business growth.", "lightbulb", "green", 8, 208, "active", "2025-01-28"],
  ["Operations & Supply Chain", "operations-supply-chain", "Operations, logistics, and supply-chain management.", "operations", "navy", 7, 180, "active", "2025-02-02"],
  ["Human Resources", "human-resources", "Talent, people management, and HR strategy.", "users", "pink", 6, 165, "active", "2025-02-05"],
  ["Strategy & Consulting", "strategy-consulting", "Corporate strategy, planning, and consulting.", "target", "violet", 9, 240, "active", "2025-02-08"],
  ["Communication & Soft Skills", "communication-soft-skills", "Presentation, negotiation, and collaboration.", "megaphone", "orange", 5, 130, "active", "2025-02-12"],
];

const categories: AdminCategory[] = SEED.map(
  ([name, slug, description, icon, color, courses, enrollments, status, created], i) => ({
    id: `CAT-${301 + i}`,
    name,
    slug,
    description,
    icon,
    color,
    courses,
    enrollments,
    status,
    order: i + 1,
    created,
  }),
);

const stats: CategoryStats = {
  totalCategories: categories.length,
  courses: categories.reduce((n, c) => n + c.courses, 0),
  enrollments: "3,482",
  categoryViews: "1.2M",
  categoriesTrend: "+20%",
  coursesTrend: "+18%",
  enrollmentsTrend: "+27%",
  viewsTrend: "+16%",
};

export async function getAdminCategories(): Promise<{
  items: AdminCategory[];
  stats: CategoryStats;
}> {
  await delay();
  return structuredClone({ items: categories, stats });
}
