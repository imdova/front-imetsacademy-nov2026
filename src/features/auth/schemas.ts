import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const JOIN_AS_OPTIONS = [
  { value: "individual", label: "Individual Learner" },
  { value: "business", label: "Business / Organization" },
] as const;

export const DIAL_CODES = [
  { value: "+20", label: "🇪🇬 +20" },
  { value: "+966", label: "🇸🇦 +966" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+974", label: "🇶🇦 +974" },
  { value: "+968", label: "🇴🇲 +968" },
];

export const registerSchema = z
  .object({
    joinAs: z.enum(["individual", "business"]),
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.email("Enter a valid email address"),
    dialCode: z.string(),
    phone: z.string().trim().min(6, "Enter a valid phone number"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string(),
    agree: z.boolean(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((d) => d.agree, {
    message: "Please accept the terms to continue",
    path: ["agree"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export type AuthResult = { ok: boolean; message: string; role?: string; redirect?: string };
