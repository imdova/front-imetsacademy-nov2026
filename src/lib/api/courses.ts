import "server-only";
import { apiFetch, unwrap, unwrapList } from "@/lib/api/client";
import type { CourseListQuery } from "@/features/courses/schemas";
import type { CreateCourseForm } from "@/features/courses/wizard-schema";

/**
 * HTTP adapter (NestJS) for courses.
 *
 * The backend course/category shapes are leaner than the UI's rich
 * `courseWithRelationsSchema`, so every response is mapped into that shape
 * here (and create-form input is mapped the other way). The DAL still
 * Zod-parses the result, so any drift surfaces there.
 */

// ── Backend shapes ───────────────────────────────────────────
type ApiInstructor = {
  name: string;
  title?: string;
  avatarUrl?: string | null;
  bio?: string;
};

type ApiLesson = { title: string; duration?: string; type?: string; preview?: boolean };
type ApiModule = { title: string; lessons?: ApiLesson[] };

type ApiCourse = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  categorySlug: string;
  level?: string;
  price?: number;
  discountPrice?: number | null;
  currency?: string;
  durationWeeks?: number;
  lessonsCount?: number;
  hoursCount?: number;
  language?: string;
  thumbnailUrl?: string | null;
  instructor?: ApiInstructor;
  rating?: number;
  ratingCount?: number;
  studentsCount?: number;
  tags?: string[];
  whatYouLearn?: string[];
  requirements?: string[];
  curriculum?: ApiModule[];
  status?: string;
  featured?: boolean;
  createdAt?: string;
};

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parent?: string | null;
};

// ── Helpers ──────────────────────────────────────────────────
function kebab(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function initialsOf(name: string): string {
  const parts = name.replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "").trim().split(/\s+/);
  const letters = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
  return (letters || name.slice(0, 2)).toUpperCase();
}

function clockToMinutes(duration?: string): number {
  if (!duration) return 5;
  const parts = duration.split(":").map((n) => Number(n) || 0);
  const a = parts[0] ?? 0;
  const b = parts[1];
  const mins = b === undefined ? a : a + Math.round(b / 60);
  return Math.max(1, mins || 5);
}

function minutesToClock(min: number): string {
  const m = Math.max(0, Math.round(min));
  return `${String(m).padStart(2, "0")}:00`;
}

const TINT_BY_COLOR: Record<string, "blue" | "teal" | "violet" | "warm"> = {
  navy: "blue",
  sky: "blue",
  teal: "teal",
  green: "teal",
  violet: "violet",
  pink: "violet",
  orange: "warm",
  yellow: "warm",
};

const ICON_BY_KEY: Record<string, "strategy" | "leadership" | "project" | "digital"> = {
  briefcase: "strategy",
  target: "strategy",
  chart: "strategy",
  finance: "strategy",
  users: "leadership",
  operations: "leadership",
  megaphone: "leadership",
  project: "project",
  code: "digital",
  lightbulb: "digital",
};

function mapStatus(status?: string): "published" | "scheduled" | "draft" | "archived" {
  if (status === "published" || status === "archived") return status;
  return "draft";
}

function mapCategory(c: ApiCategory): {
  id: string;
  slug: string;
  name: string;
  description: string;
  tint: "blue" | "teal" | "violet" | "warm";
  icon: "strategy" | "leadership" | "project" | "digital";
  courseCount: number;
} {
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description ?? "",
    tint: TINT_BY_COLOR[c.color ?? ""] ?? "blue",
    icon: ICON_BY_KEY[c.icon ?? ""] ?? "strategy",
    courseCount: 0,
  };
}

/** Synthesizes a minimal category when the referenced slug has no doc. */
function fallbackCategory(slug: string) {
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    id: slug,
    slug,
    name: name || "General",
    description: "",
    tint: "blue" as const,
    icon: "strategy" as const,
    courseCount: 0,
  };
}

function mapCourse(c: ApiCourse, categoryBySlug: Map<string, ReturnType<typeof mapCategory>>) {
  const instructorName = c.instructor?.name ?? "IMETS Faculty";
  const instructorSlug = kebab(instructorName) || "imets-faculty";
  const category = categoryBySlug.get(c.categorySlug) ?? fallbackCategory(c.categorySlug);

  const hasDiscount = typeof c.discountPrice === "number" && c.discountPrice! > 0;
  const listPrice = c.price ?? 0;
  const price = hasDiscount ? c.discountPrice! : listPrice;
  const oldPrice = hasDiscount ? listPrice : null;
  const discountPercent =
    hasDiscount && listPrice > 0
      ? Math.max(0, Math.min(100, Math.round((1 - c.discountPrice! / listPrice) * 100)))
      : null;

  const durationMonths = Math.max(1, Math.round((c.durationWeeks ?? 4) / 4));
  const sessions = Math.max(1, c.lessonsCount ?? 1);

  const curriculum = (c.curriculum ?? []).map((m, mi) => ({
    title: m.title,
    lessons: (m.lessons ?? []).map((l, li) => ({
      code: `${mi + 1}.${li + 1}`,
      title: l.title,
      durationMin: clockToMinutes(l.duration),
    })),
  }));

  return {
    id: c.id,
    slug: c.slug,
    code: (c.slug || c.id).toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 10),
    status: mapStatus(c.status),
    title: c.title,
    summary: c.subtitle || (c.description ?? "").slice(0, 160) || c.title,
    description: c.description ?? "",
    programType: "diploma" as const,
    categorySlug: c.categorySlug,
    instructorId: instructorSlug,
    price,
    oldPrice,
    discountPercent,
    durationMonths,
    sessions,
    learningMode: "Self-paced",
    language: c.language ?? "English",
    certificate: "Certificate of Completion",
    rating: Math.max(0, Math.min(5, c.rating ?? 0)),
    reviews: c.ratingCount ?? 0,
    enrolled: c.studentsCount ?? 0,
    registrationOpen: mapStatus(c.status) === "published",
    featured: c.featured ?? false,
    keyBenefits: c.requirements ?? [],
    whatYouLearn: c.whatYouLearn ?? [],
    curriculum,
    createdAt: c.createdAt ?? new Date().toISOString(),
    instructor: {
      id: instructorSlug,
      slug: instructorSlug,
      name: instructorName,
      title: c.instructor?.title ?? "",
      initials: initialsOf(instructorName),
      rating: Math.max(0, Math.min(5, c.rating ?? 0)),
      reviews: c.ratingCount ?? 0,
      bio: c.instructor?.bio ?? "",
    },
    category,
  };
}

async function categoryMap(): Promise<Map<string, ReturnType<typeof mapCategory>>> {
  const res = await apiFetch("/categories?all=true", { next: { tags: ["categories"] } });
  const cats = unwrap<ApiCategory[]>(res);
  const map = new Map<string, ReturnType<typeof mapCategory>>();
  for (const c of cats) map.set(c.slug, mapCategory(c));
  return map;
}

function toListQuery(query: CourseListQuery): string {
  const params = new URLSearchParams();
  if (query.q) params.set("search", query.q);
  if (query.category) params.set("category", query.category);
  params.set("sort", query.sort);
  params.set("page", String(query.page));
  params.set("limit", String(query.pageSize));
  return params.toString();
}

// ── Adapter API (mirrors the mock adapter) ───────────────────
export async function listCourses(query: CourseListQuery): Promise<unknown> {
  const [res, cats] = await Promise.all([
    apiFetch(`/courses?${toListQuery(query)}`, { next: { tags: ["courses"] } }),
    categoryMap(),
  ]);
  const { data, meta } = unwrapList<ApiCourse>(res);
  return {
    items: data.map((c) => mapCourse(c, cats)),
    total: Number(meta.total ?? data.length),
    page: Number(meta.page ?? query.page),
    pageSize: Number(meta.limit ?? query.pageSize),
  };
}

/** Admin listing — all statuses, incl. drafts (requires admin/instructor auth). */
export async function listAdminCourses(query: CourseListQuery): Promise<unknown> {
  const [res, cats] = await Promise.all([
    apiFetch(`/courses/admin/list?${toListQuery(query)}`, { auth: true, next: { tags: ["courses"] } }),
    categoryMap(),
  ]);
  const { data, meta } = unwrapList<ApiCourse>(res);
  return {
    items: data.map((c) => mapCourse(c, cats)),
    total: Number(meta.total ?? data.length),
    page: Number(meta.page ?? query.page),
    pageSize: Number(meta.limit ?? query.pageSize),
  };
}

export async function getCourseBySlug(slug: string): Promise<unknown> {
  const [res, cats] = await Promise.all([
    apiFetch(`/courses/${encodeURIComponent(slug)}`, {
      next: { tags: ["courses", `course:${slug}`] },
    }),
    categoryMap(),
  ]);
  return mapCourse(unwrap<ApiCourse>(res), cats);
}

export async function listFeaturedCourses(limit = 4): Promise<unknown> {
  const [res, cats] = await Promise.all([
    apiFetch(`/courses?featured=true&sort=popular&limit=${limit}`, { next: { tags: ["courses"] } }),
    categoryMap(),
  ]);
  const { data } = unwrapList<ApiCourse>(res);
  return data.map((c) => mapCourse(c, cats));
}

export async function listCategories(): Promise<unknown> {
  const res = await apiFetch(`/categories`, { next: { tags: ["categories"] } });
  return unwrap<ApiCategory[]>(res).map(mapCategory);
}

export async function createCourse(input: CreateCourseForm): Promise<unknown> {
  const lessonsCount = input.curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const totalMinutes = input.curriculum.reduce(
    (n, m) => n + m.lessons.reduce((s, l) => s + l.durationMin, 0),
    0,
  );
  const body = {
    title: input.title,
    slug: kebab(input.title),
    subtitle: input.summary,
    description: input.summary,
    categorySlug: input.categorySlug,
    durationWeeks: input.durationMonths * 4,
    lessonsCount,
    hoursCount: Math.max(0, Math.round(totalMinutes / 60)),
    language: input.language,
    thumbnailUrl: input.thumbnail || undefined,
    curriculum: input.curriculum.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({
        title: l.title,
        duration: minutesToClock(l.durationMin),
        type: "video" as const,
        preview: false,
      })),
    })),
    status: input.publishOption === "publish-now" ? "published" : "draft",
  };

  const res = await apiFetch(`/courses`, { method: "POST", body, auth: true });
  const created = unwrap<ApiCourse>(res);
  const cats = await categoryMap();
  return mapCourse(created, cats);
}
