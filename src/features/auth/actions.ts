"use server";

import { logger } from "@/lib/logger";
import {
  registerSchema,
  signInSchema,
  type AuthResult,
  type RegisterValues,
  type SignInValues,
} from "@/features/auth/schemas";

/**
 * Auth is UI-only in this phase (no backend yet). These actions re-validate and
 * return a friendly preview message instead of creating a session.
 */
export async function signInAction(values: SignInValues): Promise<AuthResult> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) return { ok: false, message: "Please check your details and try again." };
  await new Promise((r) => setTimeout(r, 400));
  logger.info("Sign-in attempt (preview)", { email: parsed.data.email });
  return {
    ok: true,
    message: "This is a UI preview — sign-in will connect once the backend is ready.",
  };
}

export async function registerAction(values: RegisterValues): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) return { ok: false, message: "Please review the form and try again." };
  await new Promise((r) => setTimeout(r, 500));
  logger.info("Registration (preview)", { email: parsed.data.email, joinAs: parsed.data.joinAs });
  return {
    ok: true,
    message: "Thanks! This is a UI preview — accounts open once the backend is ready.",
  };
}
