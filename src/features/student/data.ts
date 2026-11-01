import "server-only";
import { delay } from "@/lib/delay";

/* Student portal mock data (UI preview; replaced by the backend later). */

export type StudentProfile = {
  name: string;
  initials: string;
  title: string;
  verified: boolean;
  location: string;
  email: string;
  phone: string;
  education: string;
  languages: string;
  about: string;
  tags: string[];
};

export type LearningStats = {
  enrolled: number;
  completed: number;
  certificates: number;
  learningHours: number;
};

export type AchievementTone = "primary" | "teal" | "accent";
export type Achievement = {
  key: "first-course" | "certificate-hunter" | "active-learner";
  title: string;
  description: string;
  tone: AchievementTone;
};

export type EnrollmentStatus = "in-progress" | "completed" | "not-started";
export type Enrollment = {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  weeks: number;
  lessons: number;
  progress: number;
  status: EnrollmentStatus;
  nextModule?: string;
};

export type LearningProgress = {
  percent: number;
  total: number;
  inProgress: number;
  completed: number;
  notStarted: number;
};

export type Recommended = {
  title: string;
  weeks: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: "target" | "chart" | "users";
};

const profile: StudentProfile = {
  name: "Ahmed Mahmoud",
  initials: "AM",
  title: "Business Professional",
  verified: true,
  location: "Cairo, Egypt",
  email: "ahmed.mahmoud@email.com",
  phone: "+20 100 123 4567",
  education: "MBA – Strategic Management (AAST)",
  languages: "Arabic (Native), English (Fluent)",
  about:
    "Business professional with over 10 years of experience in strategic management and digital transformation. Passionate about lifelong learning and building a successful career in the business world.",
  tags: ["MBA Holder", "Strategic Management", "10+ Years Experience"],
};

const stats: LearningStats = { enrolled: 6, completed: 3, certificates: 2, learningHours: 24 };

const achievements: Achievement[] = [
  {
    key: "first-course",
    title: "First Course",
    description: "Completed your first course",
    tone: "primary",
  },
  {
    key: "certificate-hunter",
    title: "Certificate Hunter",
    description: "Earned 2 certificates",
    tone: "teal",
  },
  {
    key: "active-learner",
    title: "Active Learner",
    description: "7 days in a row",
    tone: "accent",
  },
];

const enrollments: Enrollment[] = [
  {
    id: "en_1",
    title: "Strategic Management",
    category: "Business Course",
    level: "Intermediate",
    weeks: 6,
    lessons: 24,
    progress: 60,
    status: "in-progress",
    nextModule: "Module 4 – Strategic Analysis Tools",
  },
  {
    id: "en_2",
    title: "Business Process Management",
    category: "Business Course",
    level: "Beginner",
    weeks: 4,
    lessons: 18,
    progress: 35,
    status: "in-progress",
    nextModule: "Module 3 – Process Mapping (BPMN)",
  },
  {
    id: "en_3",
    title: "Digital Transformation for Business",
    category: "Business Course",
    level: "Intermediate",
    weeks: 5,
    lessons: 20,
    progress: 80,
    status: "in-progress",
    nextModule: "Module 5 – Implementation & Change Management",
  },
  {
    id: "en_4",
    title: "Leadership & Team Management",
    category: "Business Course",
    level: "Intermediate",
    weeks: 4,
    lessons: 16,
    progress: 100,
    status: "completed",
  },
  {
    id: "en_5",
    title: "Project Management Professional (PMP)® Prep",
    category: "Business Course",
    level: "Advanced",
    weeks: 3,
    lessons: 16,
    progress: 100,
    status: "completed",
  },
  {
    id: "en_6",
    title: "Business Analytics Fundamentals",
    category: "Business Course",
    level: "Beginner",
    weeks: 5,
    lessons: 22,
    progress: 0,
    status: "not-started",
  },
];

const recommended: Recommended[] = [
  { title: "Leadership & Team Management", weeks: 4, level: "Intermediate", icon: "target" },
  { title: "Business Analytics", weeks: 5, level: "Beginner", icon: "chart" },
  { title: "Project Management", weeks: 6, level: "Intermediate", icon: "users" },
];

export async function getStudentProfile(): Promise<StudentProfile> {
  await delay();
  return structuredClone(profile);
}

export async function getLearningStats(): Promise<LearningStats> {
  await delay();
  return structuredClone(stats);
}

export async function getAchievements(): Promise<Achievement[]> {
  await delay();
  return structuredClone(achievements);
}

export async function getEnrollments(): Promise<Enrollment[]> {
  await delay();
  return structuredClone(enrollments);
}

export async function getRecommended(): Promise<Recommended[]> {
  await delay();
  return structuredClone(recommended);
}

export async function getLearningProgress(): Promise<LearningProgress> {
  await delay();
  const total = enrollments.length;
  const completed = enrollments.filter((e) => e.status === "completed").length;
  const inProgress = enrollments.filter((e) => e.status === "in-progress").length;
  const notStarted = enrollments.filter((e) => e.status === "not-started").length;
  const percent = Math.round(
    enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length,
  );
  return { percent, total, inProgress, completed, notStarted };
}
