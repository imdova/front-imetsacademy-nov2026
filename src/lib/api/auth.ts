import "server-only";
import { apiFetch, unwrap } from "@/lib/api/client";

/** Auth HTTP adapter (NestJS). Returns the unwrapped session payload. */
export type ApiSession = {
  user: { id: string; name: string; email: string; role: string };
  accessToken: string;
  refreshToken: string;
};

export async function login(body: { email: string; password: string }): Promise<ApiSession> {
  const res = await apiFetch("/auth/login", { method: "POST", body });
  return unwrap<ApiSession>(res);
}

export async function register(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiSession> {
  const res = await apiFetch("/auth/register", { method: "POST", body });
  return unwrap<ApiSession>(res);
}
