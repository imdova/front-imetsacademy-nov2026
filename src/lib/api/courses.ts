import "server-only";
import { apiFetch } from "@/lib/api/client";
import type { CourseListQuery } from "@/features/courses/schemas";
import type { CreateCourseForm } from "@/features/courses/wizard-schema";

/** HTTP adapter (NestJS). Mirrors the mock adapter; parsed by the DAL. */

function toQueryString(query: CourseListQuery): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  params.set("sort", query.sort);
  params.set("page", String(query.page));
  params.set("pageSize", String(query.pageSize));
  return params.toString();
}

export function listCourses(query: CourseListQuery): Promise<unknown> {
  return apiFetch(`/courses?${toQueryString(query)}`, { next: { tags: ["courses"] } });
}

export function getCourseBySlug(slug: string): Promise<unknown> {
  return apiFetch(`/courses/${encodeURIComponent(slug)}`, {
    next: { tags: ["courses", `course:${slug}`] },
  });
}

export function listFeaturedCourses(limit = 4): Promise<unknown> {
  return apiFetch(`/courses/featured?limit=${limit}`, { next: { tags: ["courses"] } });
}

export function listCategories(): Promise<unknown> {
  return apiFetch(`/categories`, { next: { tags: ["categories"] } });
}

export function createCourse(input: CreateCourseForm): Promise<unknown> {
  return apiFetch(`/courses`, { method: "POST", body: input });
}
