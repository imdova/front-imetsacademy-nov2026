import "server-only";
import { apiFetch, unwrap } from "@/lib/api/client";

/** Categories HTTP adapter (NestJS). */
export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parent?: string | null;
  order?: number;
  active?: boolean;
  createdAt?: string;
};

export type CreateCategoryBody = {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parent?: string;
  order?: number;
  active?: boolean;
};

export async function listAll(): Promise<ApiCategory[]> {
  const res = await apiFetch("/categories?all=true", { next: { tags: ["categories"] } });
  return unwrap<ApiCategory[]>(res);
}

export async function listTopLevel(): Promise<ApiCategory[]> {
  const res = await apiFetch("/categories?parent=root", { next: { tags: ["categories"] } });
  return unwrap<ApiCategory[]>(res);
}

export async function create(body: CreateCategoryBody): Promise<ApiCategory> {
  const res = await apiFetch("/categories", { method: "POST", body, auth: true });
  return unwrap<ApiCategory>(res);
}
