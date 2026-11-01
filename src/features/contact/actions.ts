"use server";

import { logger } from "@/lib/logger";
import {
  contactFormSchema,
  type ContactFormResult,
  type ContactFormValues,
} from "@/features/contact/schemas";

/**
 * Handle a contact submission. Re-validates with the same schema (never trust
 * the client), logs the message, and returns a typed result. Phase 1 only logs;
 * later this will persist / notify via the backend.
 */
export async function submitContactMessage(
  values: ContactFormValues,
): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof ContactFormValues] = issue.message;
      }
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  // Simulate backend work.
  await new Promise((resolve) => setTimeout(resolve, 500));

  logger.info("Contact message received", {
    email: parsed.data.email,
    interest: parsed.data.interest,
  });

  return { ok: true };
}
