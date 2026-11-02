import "server-only";
import { z } from "zod";
import { serverEnv } from "@/lib/env.server";
import * as mockAdapter from "@/lib/db/courses";
import * as apiAdapter from "@/lib/api/courses";
import {
  categorySchema,
  courseListQuerySchema,
  courseListResponseSchema,
  courseWithRelationsSchema,
  type CourseListQueryRaw,
} from "@/features/courses/schemas";
import { createCourseFormSchema, type CreateCourseForm } from "@/features/courses/wizard-schema";

/**
 * Courses Data Access Layer — the ONLY data entry point for the UI.
 * Chooses the adapter from DATA_SOURCE and Zod-parses every response so backend
 * contract drift is caught here, never in components.
 */
const adapter = serverEnv.DATA_SOURCE === "api" ? apiAdapter : mockAdapter;

export async function getCourses(input: CourseListQueryRaw = {}) {
  const query = courseListQuerySchema.parse(input);
  const raw = await adapter.listCourses(query);
  return courseListResponseSchema.parse(raw);
}

/**
 * Admin/instructor course list — includes drafts and archived.
 * Uses the authenticated admin endpoint when DATA_SOURCE=api; falls back to
 * the plain list for the mock adapter (which already carries every status).
 */
export async function getAdminCourses(input: CourseListQueryRaw = {}) {
  const query = courseListQuerySchema.parse(input);
  const raw =
    "listAdminCourses" in adapter
      ? await (adapter as typeof apiAdapter).listAdminCourses(query)
      : await adapter.listCourses(query);
  return courseListResponseSchema.parse(raw);
}

export async function getCourseBySlug(slug: string) {
  const raw = await adapter.getCourseBySlug(slug);
  return courseWithRelationsSchema.parse(raw);
}

export async function getFeaturedCourses(limit = 4) {
  const raw = await adapter.listFeaturedCourses(limit);
  return z.array(courseWithRelationsSchema).parse(raw);
}

export async function getCategories() {
  const raw = await adapter.listCategories();
  return z.array(categorySchema).parse(raw);
}

export async function createCourse(input: CreateCourseForm) {
  const data = createCourseFormSchema.parse(input);
  const raw = await adapter.createCourse(data);
  return courseWithRelationsSchema.parse(raw);
}
