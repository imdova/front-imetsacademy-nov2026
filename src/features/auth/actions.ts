"use server";

import { serverEnv } from "@/lib/env.server";
import { routes } from "@/config/routes";
import { logger } from "@/lib/logger";
import * as authApi from "@/lib/api/auth";
import { clearSession, setSession } from "@/lib/auth/session";
import {
  registerSchema,
  signInSchema,
  type AuthResult,
  type RegisterValues,
  type SignInValues,
} from "@/features/auth/schemas";

function redirectForRole(role: string): string {
  if (role === "admin") return routes.admin.dashboard;
  if (role === "instructor") return routes.instructor.home;
  return routes.student.dashboard;
}

function errorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === "object" && "message" in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string") return m;
    if (Array.isArray(m)) return m.join(", ");
  }
  return fallback;
}

export async function signInAction(values: SignInValues): Promise<AuthResult> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) return { ok: false, message: "Please check your details and try again." };

  if (serverEnv.DATA_SOURCE !== "api") {
    await new Promise((r) => setTimeout(r, 300));
    return { ok: true, message: "UI preview — set DATA_SOURCE=api to sign in against the backend." };
  }

  try {
    const s = await authApi.login({ email: parsed.data.email, password: parsed.data.password });
    await setSession(s.accessToken, s.refreshToken);
    return { ok: true, message: "Signed in successfully.", role: s.user.role, redirect: redirectForRole(s.user.role) };
  } catch (e) {
    logger.info("Sign-in failed", { email: parsed.data.email });
    return { ok: false, message: errorMessage(e, "Invalid email or password.") };
  }
}

export async function registerAction(values: RegisterValues): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) return { ok: false, message: "Please review the form and try again." };

  if (serverEnv.DATA_SOURCE !== "api") {
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, message: "UI preview — set DATA_SOURCE=api to create accounts." };
  }

  try {
    const s = await authApi.register({
      name: parsed.data.fullName,
      email: parsed.data.email,
      password: parsed.data.password,
    });
    await setSession(s.accessToken, s.refreshToken);
    return { ok: true, message: "Account created.", role: s.user.role, redirect: redirectForRole(s.user.role) };
  } catch (e) {
    return { ok: false, message: errorMessage(e, "Could not create your account.") };
  }
}

export async function logoutAction(): Promise<void> {
  await clearSession();
}
