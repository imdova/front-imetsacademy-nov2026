import "server-only";
import { delay } from "@/lib/delay";

/* Admin → Students (learners) mock data (UI preview; replaced by the backend). */

export type LearnerStatus = "active" | "completed" | "inactive";

export type Learner = {
  id: string;
  name: string;
  email: string;
  initials: string;
  enrollments: number;
  progress: number;
  status: LearnerStatus;
  joined: string; // ISO date
  lastActivity: string;
};

export type LearnerStats = {
  total: string;
  active: string;
  completedCourses: string;
  newThisMonth: string;
  totalTrend: string;
  activeTrend: string;
  completedTrend: string;
  newTrend: string;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

const NAMES = [
  "Sara Mohamed",
  "Ahmed Ali",
  "Mona Hassan",
  "Youssef Hamdy",
  "Nour Emad",
  "Omar Soliman",
  "Hend Ibrahim",
  "Kareem Tarek",
  "Laila Fahmy",
  "Mostafa Zaki",
  "Dina Adel",
  "Hassan Nabil",
  "Aya Kamal",
  "Tarek Sami",
  "Salma Yousry",
  "Khaled Fouad",
  "Rana Hossam",
  "Amr Gamal",
  "Farida Ashraf",
  "Ziad Mansour",
  "Habiba Saeed",
  "Sherif Adly",
  "Nada Refaat",
  "Mahmoud Essam",
];

const STATUSES: LearnerStatus[] = [
  "active",
  "active",
  "completed",
  "active",
  "inactive",
  "active",
  "completed",
  "active",
];
const PROGRESS = [80, 65, 100, 40, 25, 90, 100, 70, 55, 100, 35, 85, 60, 100, 45, 95, 30, 75, 100, 50, 68, 20, 100, 82];
const ENROLL = [6, 4, 3, 5, 2, 7, 4, 3, 5, 8, 2, 6, 4, 9, 3, 7, 2, 5, 4, 3, 6, 2, 5, 4];
const ACTIVITY = [
  "2 hours ago",
  "5 hours ago",
  "1 day ago",
  "2 days ago",
  "5 days ago",
  "6 hours ago",
  "3 days ago",
  "1 day ago",
];

function joinedDate(i: number): string {
  // Spread joins backward from Nov 1, 2026
  const base = new Date("2026-11-01T00:00:00Z").getTime();
  const d = new Date(base - i * 3 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

const learners: Learner[] = NAMES.map((name, i) => {
  const first = name.split(" ")[0]!.toLowerCase();
  const last = name.split(" ")[1]!.toLowerCase();
  const progress = PROGRESS[i % PROGRESS.length]!;
  const status: LearnerStatus =
    progress === 100 ? "completed" : (STATUSES[i % STATUSES.length] ?? "active");
  return {
    id: `ST-${10451 + i}`,
    name,
    email: `${first}.${last}@example.com`,
    initials: initials(name),
    enrollments: ENROLL[i % ENROLL.length]!,
    progress,
    status,
    joined: joinedDate(i),
    lastActivity: ACTIVITY[i % ACTIVITY.length]!,
  };
});

const stats: LearnerStats = {
  total: "3,482",
  active: "2,764",
  completedCourses: "612",
  newThisMonth: "128",
  totalTrend: "+12%",
  activeTrend: "+14%",
  completedTrend: "+18%",
  newTrend: "+9%",
};

export async function getLearners(): Promise<{ items: Learner[]; stats: LearnerStats }> {
  await delay();
  return structuredClone({ items: learners, stats });
}
