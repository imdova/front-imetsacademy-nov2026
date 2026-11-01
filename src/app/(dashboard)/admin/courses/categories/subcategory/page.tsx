import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminCategories } from "@/features/categories/data";
import { routes } from "@/config/routes";
import {
  CategoryForm,
  CategoryFormFooter,
} from "@/features/categories/components/category-form";

export const metadata: Metadata = { title: "Add New Subcategory · Admin" };

export default async function AddSubcategoryPage() {
  const { items } = await getAdminCategories();
  const parents = items.map((c) => c.name);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm">
        <Link href={routes.admin.courses} className="font-medium text-primary hover:underline">Courses</Link>
        <span className="text-ink-subtle">/</span>
        <Link href={routes.admin.categories} className="font-medium text-primary hover:underline">Categories</Link>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink-muted">Add New Subcategory</span>
      </nav>

      <div className="flex items-start gap-3">
        <Link href={routes.admin.categories} aria-label="Back to categories" className="mt-1 inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary hover:text-primary">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <div>
          <h1 className="text-h1 text-ink">Add New Subcategory</h1>
          <p className="mt-1 text-body text-ink-muted">
            Create a new subcategory under an existing category to better organize your courses.
          </p>
        </div>
      </div>

      <CategoryForm mode="subcategory" parents={parents} />
      <CategoryFormFooter mode="subcategory" />
    </div>
  );
}
