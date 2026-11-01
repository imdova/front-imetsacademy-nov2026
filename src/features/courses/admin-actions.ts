"use server";

import { revalidatePath } from "next/cache";
import { createCourse } from "@/lib/dal/courses";
import { routes } from "@/config/routes";
import { logger } from "@/lib/logger";
import { createCourseFormSchema, type CreateCourseForm } from "@/features/courses/wizard-schema";

export type CreateCourseResult = { ok: true; slug: string } | { ok: false; error: string };

/** Create a course from the admin wizard (re-validates, persists, revalidates). */
export async function createCourseAction(values: CreateCourseForm): Promise<CreateCourseResult> {
  const parsed = createCourseFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Some fields are invalid. Please review the form." };
  }
  try {
    const created = await createCourse(parsed.data);
    revalidatePath(routes.admin.courses);
    logger.info("Course created", { slug: created.slug, status: created.status });
    return { ok: true, slug: created.slug };
  } catch (error) {
    logger.error("Create course failed", error);
    return { ok: false, error: "Something went wrong creating the course. Please try again." };
  }
}
