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
    courseDetail: (slug: string) => `/admin/courses/${slug}`,
    categories: "/admin/courses/categories",
    newCategory: "/admin/courses/categories/new",
    newSubcategory: "/admin/courses/categories/subcategory",
    programs: "/admin/programs",
    learners: "/admin/learners",
    instructors: "/admin/instructors",
    enrollments: "/admin/enrollments",
    payments: "/admin/payments",
    reports: "/admin/reports",
    settings: "/admin/settings",
  },

  // Student portal
  student: {
    dashboard: "/learn",
    profile: "/learn/profile",
    courses: "/learn/courses",
    certificates: "/learn/certificates",
    payments: "/learn/payments",
    saved: "/learn/saved",
    notifications: "/learn/notifications",
    settings: "/learn/settings",
    help: "/learn/help",
  },

  // Course player (learning experience)
  player: {
    lesson: (slug: string) => `/player/${slug}`,
    quiz: (slug: string) => `/player/${slug}/quiz`,
  },
} as const;
