"use server";

import { updateTag } from "next/cache";
import { serverEnv } from "@/lib/env.server";
import * as api from "@/lib/api/categories";

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  active: boolean;
  parent?: string; // parent category name or slug (subcategory)
};

export type CategoryActionResult = { ok: boolean; message: string };

function errorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === "object" && "message" in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string") return m;
    if (Array.isArray(m)) return m.join(", ");
  }
  return fallback;
}

/**
 * Creates a category or subcategory in the backend (admin-only).
 * `parent` is passed as a slug; the caller resolves names → slugs.
 */
export async function createCategoryAction(input: CreateCategoryInput): Promise<CategoryActionResult> {
  if (!input.name.trim() || !input.slug.trim()) {
    return { ok: false, message: "Name and slug are required." };
  }
  if (serverEnv.DATA_SOURCE !== "api") {
    return { ok: true, message: "UI preview — set DATA_SOURCE=api (and sign in as admin) to save." };
  }
  try {
    await api.create({
      name: input.name.trim(),
      slug: input.slug.trim(),
      description: input.description.trim(),
      icon: input.icon,
      color: input.color,
      order: input.order,
      active: input.active,
      parent: input.parent?.trim() || undefined,
    });
    updateTag("categories");
    return { ok: true, message: input.parent ? "Subcategory created." : "Category created." };
  } catch (e) {
    return { ok: false, message: errorMessage(e, "Could not save the category.") };
  }
}
