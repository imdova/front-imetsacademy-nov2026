import type { Metadata } from "next";
import { getCategories } from "@/lib/dal/courses";
import { CourseWizard } from "@/features/courses/components/admin/wizard/course-wizard";

export const metadata: Metadata = { title: "Add New Course · Admin" };

export default async function AddNewCoursePage() {
  const categories = await getCategories();
  return <CourseWizard categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />;
}
