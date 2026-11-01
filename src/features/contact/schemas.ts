import { z } from "zod";

export const INTEREST_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "enrollment", label: "Course Enrollment" },
  { value: "corporate", label: "Corporate / Group Training" },
  { value: "partnership", label: "Partnership" },
] as const;

const INTEREST_VALUES = INTEREST_OPTIONS.map((o) => o.value) as readonly string[];

/** Single source of truth for the contact form (used by RHF and the action). */
export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a valid phone number"),
  interest: z
    .string()
    .min(1, "Please choose what you're interested in")
    .refine((v) => INTEREST_VALUES.includes(v), "Please choose a valid option"),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details")
    .max(500, "Keep your message under 500 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
    };
