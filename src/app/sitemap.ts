import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const paths = [
    routes.home,
    routes.courses,
    routes.contact,
    routes.learningPaths,
    routes.forBusinesses,
    routes.faculty,
    routes.about,
  ];
  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
