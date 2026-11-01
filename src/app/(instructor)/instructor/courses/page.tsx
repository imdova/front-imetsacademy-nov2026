import type { Metadata } from "next";
import { InstructorCoursesView } from "@/features/instructor/components/instructor-courses-view";

export const metadata: Metadata = { title: "My Courses · Instructor" };

export default function Page() {
  return <InstructorCoursesView />;
}
