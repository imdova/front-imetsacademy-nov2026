import "server-only";
import { cookies } from "next/headers";

/** httpOnly session cookies holding the backend JWTs. Server-only. */
const ACCESS = "imets_at";
const REFRESH = "imets_rt";
const WEEK = 60 * 60 * 24 * 7;

export async function setSession(accessToken: string, refreshToken: string): Promise<void> {
  const jar = await cookies();
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  jar.set(ACCESS, accessToken, { ...base, maxAge: WEEK });
  jar.set(REFRESH, refreshToken, { ...base, maxAge: WEEK });
}

export async function getAccessToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(ACCESS)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAccessToken()) !== null;
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(ACCESS);
  jar.delete(REFRESH);
}
