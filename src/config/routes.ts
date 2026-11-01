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

  // Admin dashboard
  admin: {
    dashboard: "/admin",
    courses: "/admin/courses",
    newCourse: "/admin/courses/new",
    categories: "/admin/courses/categories",
    programs: "/admin/programs",
    learners: "/admin/learners",
    instructors: "/admin/instructors",
    enrollments: "/admin/enrollments",
    payments: "/admin/payments",
    reports: "/admin/reports",
    settings: "/admin/settings",
  },
} as const;
