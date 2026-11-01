import { describe, expect, it } from "vitest";
import {
  getCategories,
  getCourseBySlug,
  getCourses,
  getFeaturedCourses,
} from "@/lib/dal/courses";
import { isNotFoundError } from "@/lib/errors";

describe("courses DAL (mock adapter)", () => {
  it("returns a valid paginated list with defaults", async () => {
    const res = await getCourses();
    expect(res.page).toBe(1);
    expect(res.pageSize).toBe(9);
    expect(res.total).toBe(8);
    expect(res.items.length).toBe(8);
    // relations are joined
    expect(res.items[0]?.instructor.name).toBeTruthy();
    expect(res.items[0]?.category.name).toBeTruthy();
  });

  it("filters by category", async () => {
    const res = await getCourses({ category: "leadership" });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((c) => c.categorySlug === "leadership")).toBe(true);
  });

  it("searches by query text", async () => {
    const res = await getCourses({ q: "PMP" });
    expect(res.items.some((c) => c.title.includes("PMP"))).toBe(true);
  });

  it("sorts by price ascending", async () => {
    const res = await getCourses({ sort: "price-asc", pageSize: 48 });
    const prices = res.items.map((c) => c.price);
    expect([...prices]).toEqual([...prices].sort((a, b) => a - b));
  });

  it("paginates", async () => {
    const page1 = await getCourses({ page: 1, pageSize: 3 });
    const page2 = await getCourses({ page: 2, pageSize: 3 });
    expect(page1.items.length).toBe(3);
    expect(page1.items[0]?.id).not.toBe(page2.items[0]?.id);
  });

  it("returns a course by slug", async () => {
    const course = await getCourseBySlug("strategic-management-diploma");
    expect(course.title).toBe("Strategic Management Diploma");
    expect(course.curriculum.length).toBeGreaterThan(0);
  });

  it("throws NotFound for an unknown slug", async () => {
    await expect(getCourseBySlug("does-not-exist")).rejects.toSatisfy(isNotFoundError);
  });

  it("returns featured courses within the limit", async () => {
    const featured = await getFeaturedCourses(3);
    expect(featured.length).toBe(3);
    expect(featured.every((c) => c.featured)).toBe(true);
  });

  it("returns categories with course counts", async () => {
    const categories = await getCategories();
    expect(categories.length).toBe(4);
    const total = categories.reduce((sum, c) => sum + c.courseCount, 0);
    expect(total).toBe(8);
  });
});
