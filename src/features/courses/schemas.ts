import { z } from "zod";

/** Program types — fixed wording: "Diploma", "Certification Prep". */
export const programTypeSchema = z.enum(["diploma", "certification-prep"]);
export type ProgramType = z.infer<typeof programTypeSchema>;

export const PROGRAM_TYPE_LABEL: Record<ProgramType, string> = {
  diploma: "Diploma",
  "certification-prep": "Certification Prep",
};

/** Publication lifecycle status (admin). */
export const courseStatusSchema = z.enum(["published", "scheduled", "draft", "archived"]);
export type CourseStatus = z.infer<typeof courseStatusSchema>;

export const COURSE_STATUS_LABEL: Record<CourseStatus, string> = {
  published: "Published",
  scheduled: "Scheduled",
  draft: "Draft",
  archived: "Archived",
};

/** Category tile tints (design-system). One category keeps one tint site-wide. */
export const categoryTintSchema = z.enum(["blue", "teal", "violet", "warm"]);
export type CategoryTint = z.infer<typeof categoryTintSchema>;

/** Icon keys mapped to lucide components in the UI (data can't hold components). */
export const categoryIconSchema = z.enum(["strategy", "leadership", "project", "digital"]);
export type CategoryIcon = z.infer<typeof categoryIconSchema>;

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  tint: categoryTintSchema,
  icon: categoryIconSchema,
  courseCount: z.number().int().nonnegative(),
});
export type Category = z.infer<typeof categorySchema>;

export const instructorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  initials: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  bio: z.string(),
});
export type Instructor = z.infer<typeof instructorSchema>;

export const lessonSchema = z.object({
  code: z.string(), // "1.1"
  title: z.string(),
  durationMin: z.number().int().positive(),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const moduleSchema = z.object({
  title: z.string(),
  lessons: z.array(lessonSchema),
});
export type CourseModule = z.infer<typeof moduleSchema>;

export const courseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  code: z.string(),
  status: courseStatusSchema,
  title: z.string(),
  summary: z.string(), // one-line card description
  description: z.string(), // "About This Course"
  programType: programTypeSchema,
  categorySlug: z.string(),
  instructorId: z.string(),
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().nullable(),
  discountPercent: z.number().int().min(0).max(100).nullable(),
  durationMonths: z.number().int().positive(),
  sessions: z.number().int().positive(),
  learningMode: z.string(), // "Live on Zoom"
  language: z.string(),
  certificate: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  enrolled: z.number().int().nonnegative(),
  registrationOpen: z.boolean(),
  featured: z.boolean(),
  keyBenefits: z.array(z.string()),
  whatYouLearn: z.array(z.string()),
  curriculum: z.array(moduleSchema),
  createdAt: z.string(), // ISO date, used for "newest" sort
});
export type Course = z.infer<typeof courseSchema>;

/** A course joined with its instructor and category (returned by the DAL). */
export const courseWithRelationsSchema = courseSchema.extend({
  instructor: instructorSchema,
  category: categorySchema,
});
export type CourseWithRelations = z.infer<typeof courseWithRelationsSchema>;

/** Sort options for the explore listing. */
export const courseSortSchema = z.enum([
  "popular",
  "newest",
  "price-asc",
  "price-desc",
  "rating",
]);
export type CourseSort = z.infer<typeof courseSortSchema>;

export const COURSE_SORT_OPTIONS: { value: CourseSort; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

/**
 * List query — parsed from URL search params. Invalid values fall back to
 * sensible defaults (robust against hand-edited URLs) rather than throwing.
 */
export const courseListQuerySchema = z.object({
  q: z.string().trim().optional(),
  category: z.string().trim().optional(), // category slug; undefined = all
  sort: courseSortSchema.catch("popular"),
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(48).catch(9),
});
export type CourseListQuery = z.infer<typeof courseListQuerySchema>;

/** Loose input accepted by the DAL (raw URL params; validated on parse). */
export type CourseListQueryRaw = {
  q?: string;
  category?: string;
  sort?: string;
  page?: string | number;
  pageSize?: string | number;
};

/** Standard paginated list response. */
export const courseListResponseSchema = z.object({
  items: z.array(courseWithRelationsSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});
export type CourseListResponse = z.infer<typeof courseListResponseSchema>;
