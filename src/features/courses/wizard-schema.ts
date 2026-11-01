import { z } from "zod";

/** Admin course types (wizard) — distinct from the public program type. */
export const courseTypeSchema = z.enum(["diploma", "certificate", "short-course"]);
export type CourseType = z.infer<typeof courseTypeSchema>;

export const COURSE_TYPE_OPTIONS: { value: CourseType; label: string }[] = [
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
  { value: "short-course", label: "Short Course" },
];

export const DURATION_OPTIONS = [1, 2, 3, 4, 6, 9, 12].map((n) => ({
  value: n,
  label: `${n} ${n === 1 ? "Month" : "Months"}`,
}));

export const SESSIONS_OPTIONS = [8, 12, 16, 20, 24, 28, 32].map((n) => ({
  value: n,
  label: `${n} Sessions`,
}));

export const LEARNING_MODE_OPTIONS = ["Live on Zoom", "Self-paced", "Hybrid"].map((v) => ({
  value: v,
  label: v,
}));

export const LANGUAGE_OPTIONS = ["English", "Arabic"].map((v) => ({ value: v, label: v }));

/** Learning material attached to a module (Video / PDF / File / Link / Quiz). */
export const materialTypeSchema = z.enum(["video", "pdf", "file", "link", "quiz"]);
export type MaterialType = z.infer<typeof materialTypeSchema>;

export const materialDraftSchema = z.object({
  type: materialTypeSchema,
  label: z.string().min(1),
});
export type MaterialDraft = z.infer<typeof materialDraftSchema>;

export const lessonDraftSchema = z.object({
  title: z.string().trim().min(1, "Lesson title is required"),
  durationMin: z.number().int().min(1, "Min 1").max(600),
});
export type LessonDraft = z.infer<typeof lessonDraftSchema>;

export const moduleDraftSchema = z.object({
  title: z.string().trim().min(1, "Module title is required"),
  description: z.string().max(300),
  lessons: z.array(lessonDraftSchema).min(1, "Add at least one lesson"),
  materials: z.array(materialDraftSchema),
});
export type ModuleDraft = z.infer<typeof moduleDraftSchema>;

export const publishOptionSchema = z.enum(["publish-now", "schedule", "draft"]);
export type PublishOption = z.infer<typeof publishOptionSchema>;

export const createCourseFormSchema = z.object({
  title: z.string().trim().min(3, "Course title is required"),
  courseType: courseTypeSchema,
  categorySlug: z.string().min(1, "Choose a category"),
  subcategory: z.string(),
  summary: z.string().trim().min(10, "Add a short summary").max(300, "Keep it under 300 characters"),
  thumbnail: z.string(),
  durationMonths: z.number().int().min(1).max(24),
  learningMode: z.string().min(1),
  sessions: z.number().int().min(1).max(100),
  language: z.string().min(1),
  curriculum: z.array(moduleDraftSchema).min(1, "Add at least one module"),
  publishOption: publishOptionSchema,
});

export type CreateCourseForm = z.infer<typeof createCourseFormSchema>;

/** Field groups validated per wizard step (via RHF trigger). */
export const STEP_FIELDS = {
  0: [
    "title",
    "courseType",
    "categorySlug",
    "summary",
    "durationMonths",
    "learningMode",
    "sessions",
    "language",
  ],
  1: ["curriculum"],
} as const;
