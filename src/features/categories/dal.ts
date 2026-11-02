import "server-only";
import { serverEnv } from "@/lib/env.server";
import * as api from "@/lib/api/categories";
import { CATEGORY_ICONS } from "@/features/categories/icons";
import {
  getAdminCategories as getMockCategories,
  type AdminCategory,
  type CategoryColorKey,
  type CategoryIconKey,
  type CategoryStats,
} from "@/features/categories/data";

const ICON_KEYS = new Set(Object.keys(CATEGORY_ICONS));
const COLOR_KEYS = new Set<CategoryColorKey>(["navy", "violet", "pink", "orange", "yellow", "green", "teal", "sky"]);

function mapCategory(c: api.ApiCategory): AdminCategory {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    icon: (ICON_KEYS.has(c.icon ?? "") ? c.icon : "briefcase") as CategoryIconKey,
    color: (COLOR_KEYS.has((c.color ?? "") as CategoryColorKey) ? c.color : "navy") as CategoryColorKey,
    courses: 0,
    enrollments: 0,
    status: c.active === false ? "inactive" : "active",
    order: c.order ?? 0,
    created: c.createdAt ?? new Date().toISOString(),
  };
}

/** Admin categories list — from the backend when DATA_SOURCE=api, else mock. */
export async function getAdminCategoriesData(): Promise<{ items: AdminCategory[]; stats: CategoryStats }> {
  if (serverEnv.DATA_SOURCE !== "api") return getMockCategories();

  const raw = await api.listAll();
  const items = raw.map(mapCategory).sort((a, b) => a.order - b.order);
  const stats: CategoryStats = {
    totalCategories: items.length,
    courses: items.reduce((n, c) => n + c.courses, 0),
    enrollments: "—",
    categoryViews: "—",
    categoriesTrend: "",
    coursesTrend: "",
    enrollmentsTrend: "",
    viewsTrend: "",
  };
  return { items, stats };
}

/** Top-level categories (for the parent picker). */
export async function getParentCategories(): Promise<{ name: string; slug: string }[]> {
  if (serverEnv.DATA_SOURCE !== "api") {
    const { items } = await getMockCategories();
    return items.map((c) => ({ name: c.name, slug: c.slug }));
  }
  const raw = await api.listTopLevel();
  return raw.map((c) => ({ name: c.name, slug: c.slug }));
}
