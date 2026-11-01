import { describe, expect, it } from "vitest";
import { courseListQuerySchema } from "@/features/courses/schemas";

describe("courseListQuerySchema", () => {
  it("applies defaults for an empty query", () => {
    const parsed = courseListQuerySchema.parse({});
    expect(parsed).toMatchObject({ sort: "popular", page: 1, pageSize: 9 });
  });

  it("coerces page/pageSize from strings (URL params)", () => {
    const parsed = courseListQuerySchema.parse({ page: "3", pageSize: "12" });
    expect(parsed.page).toBe(3);
    expect(parsed.pageSize).toBe(12);
  });

  it("rejects an unknown sort value", () => {
    expect(() => courseListQuerySchema.parse({ sort: "cheapest" })).toThrow();
  });

  it("clamps pageSize within bounds", () => {
    expect(() => courseListQuerySchema.parse({ pageSize: "999" })).toThrow();
  });
});
