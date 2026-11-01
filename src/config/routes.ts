/** Typed route constants — the single source of internal hrefs. */
export const routes = {
  home: "/",
  courses: "/courses",
  course: (slug: string) => `/courses/${slug}`,
  learningPaths: "/learning-paths",
  forBusinesses: "/for-businesses",
  faculty: "/faculty",
  about: "/about",
  contact: "/contact",
  signIn: "/sign-in",
  register: "/register",
} as const;
