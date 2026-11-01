import { routes } from "@/config/routes";

export type CoursesQueryParams = {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
};

/**
 * Build a clean /courses URL from filter state. Defaults are omitted
 * (sort=popular, page=1) so shared links stay tidy. Pure — usable on the
 * server (chip hrefs) and the client (search/sort controls).
 */
export function buildCoursesQuery(params: CoursesQueryParams): string {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.category) sp.set("category", params.category);
  if (params.sort && params.sort !== "popular") sp.set("sort", params.sort);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const qs = sp.toString();
  return qs ? `${routes.courses}?${qs}` : routes.courses;
}
