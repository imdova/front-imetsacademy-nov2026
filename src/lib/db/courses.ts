import "server-only";
import { NotFoundError } from "@/lib/errors";
import { delay } from "@/lib/db/delay";
import type {
  Category,
  Course,
  CourseListQuery,
  CourseModule,
  CourseWithRelations,
  Instructor,
} from "@/features/courses/schemas";
import type { CreateCourseForm } from "@/features/courses/wizard-schema";

/* ------------------------------------------------------------------ seed --- */

const instructors: Instructor[] = [
  {
    id: "ins_ahmed",
    slug: "ahmed-mahmoud",
    name: "Dr. Ahmed Mahmoud",
    title: "Strategy & Business Management Expert",
    initials: "AM",
    rating: 4.9,
    reviews: 410,
    bio: "20+ years advising regional enterprises on corporate strategy, transformation and leadership. Former strategy director turned educator.",
  },
  {
    id: "ins_sarah",
    slug: "sarah-ibrahim",
    name: "Dr. Sarah Ibrahim",
    title: "Digital Transformation & Analytics Lead",
    initials: "SI",
    rating: 4.8,
    reviews: 263,
    bio: "Helps organisations turn data into decisions. Leads digital change programmes across the Gulf and North Africa.",
  },
  {
    id: "ins_hatem",
    slug: "hatem-ali",
    name: "Prof. Hatem Ali",
    title: "Project Management & PMP® Instructor",
    initials: "HA",
    rating: 4.7,
    reviews: 189,
    bio: "PMP®-certified programme director with a track record of delivering complex projects on time and on budget.",
  },
];

const categoriesSeed: Omit<Category, "courseCount">[] = [
  {
    id: "cat_strategy",
    slug: "strategic-management",
    name: "Strategic Management",
    description: "Strategy, planning and competitive advantage.",
    tint: "blue",
    icon: "strategy",
  },
  {
    id: "cat_leadership",
    slug: "leadership",
    name: "Leadership & Management",
    description: "Lead teams and drive real performance.",
    tint: "teal",
    icon: "leadership",
  },
  {
    id: "cat_project",
    slug: "project-management",
    name: "Project Management",
    description: "Deliver projects on time and on budget.",
    tint: "violet",
    icon: "project",
  },
  {
    id: "cat_digital",
    slug: "digital-transformation",
    name: "Digital Transformation",
    description: "Lead change and data-driven decisions.",
    tint: "warm",
    icon: "digital",
  },
];

/** Build a 3-module curriculum from compact definitions. */
function buildCurriculum(
  modules: { title: string; lessons: [string, number][] }[],
): CourseModule[] {
  return modules.map((m, mi) => ({
    title: m.title,
    lessons: m.lessons.map(([title, durationMin], li) => ({
      code: `${mi + 1}.${li + 1}`,
      title,
      durationMin,
    })),
  }));
}

const courses: Course[] = [
  {
    id: "crs_strategic_mgmt",
    slug: "strategic-management-diploma",
    code: "IM-SMD-001",
    status: "published",
    title: "Strategic Management Diploma",
    summary: "Develop strategic thinking and leadership skills to drive business growth.",
    description:
      "A comprehensive, practical program designed to equip professionals with the strategic management tools, frameworks, and leadership skills needed to analyze business environments, formulate effective strategies, and lead successful business transformation.",
    programType: "diploma",
    categorySlug: "strategic-management",
    instructorId: "ins_ahmed",
    price: 299,
    oldPrice: 399,
    discountPercent: 25,
    durationMonths: 4,
    sessions: 24,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.8,
    reviews: 320,
    enrolled: 1240,
    registrationOpen: true,
    featured: true,
    keyBenefits: [
      "Build a strategic mindset and leadership capability",
      "Apply proven strategic management frameworks",
      "Make data-driven business decisions",
      "Drive organizational growth and performance",
    ],
    whatYouLearn: [
      "Strategic analysis of the business environment",
      "Strategy formulation and competitive positioning",
      "Strategy implementation and execution",
      "Performance measurement and strategic control",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Strategic Management Fundamentals",
        lessons: [
          ["Introduction to Strategic Management", 45],
          ["Vision, Mission and Strategic Objectives", 52],
          ["Levels of Strategy (Corporate, Business, Functional)", 48],
          ["Strategic Management Process (Case Application)", 60],
        ],
      },
      {
        title: "Module 2: External Environment & Competitive Analysis",
        lessons: [
          ["PESTEL and Industry Analysis", 50],
          ["Porter's Five Forces in Practice", 55],
          ["Competitor and Market Mapping", 47],
          ["Opportunities, Threats and Scenarios", 49],
        ],
      },
      {
        title: "Module 3: Internal Analysis & Organizational Capability",
        lessons: [
          ["Resources, Capabilities and the Value Chain", 52],
          ["Core Competencies and Competitive Advantage", 50],
          ["Financial and Operational Diagnostics", 46],
          ["Building a Strategy-Ready Organization", 58],
        ],
      },
    ]),
    createdAt: "2026-06-12",
  },
  {
    id: "crs_digital_transformation",
    slug: "digital-transformation-diploma",
    code: "IM-DTD-002",
    status: "published",
    title: "Digital Transformation Diploma",
    summary: "Lead digital change and build the capabilities for business transformation.",
    description:
      "Lead digital change in your organization. This diploma covers digital strategy, operating models, customer experience and the change leadership needed to turn technology investment into measurable business outcomes.",
    programType: "diploma",
    categorySlug: "digital-transformation",
    instructorId: "ins_sarah",
    price: 299,
    oldPrice: 399,
    discountPercent: 25,
    durationMonths: 4,
    sessions: 20,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.9,
    reviews: 186,
    enrolled: 980,
    registrationOpen: true,
    featured: true,
    keyBenefits: [
      "Craft a digital strategy aligned to business goals",
      "Redesign operating models and customer journeys",
      "Lead change across teams and stakeholders",
      "Measure the value of digital initiatives",
    ],
    whatYouLearn: [
      "Digital strategy and business model innovation",
      "Customer experience and journey redesign",
      "Technology, data and platform foundations",
      "Change leadership for digital adoption",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Foundations of Digital Transformation",
        lessons: [
          ["What Digital Transformation Really Means", 44],
          ["Digital Maturity and Readiness Assessment", 50],
          ["Building the Digital Business Case", 48],
          ["Operating Models for the Digital Era", 52],
        ],
      },
      {
        title: "Module 2: Customer Experience & Data",
        lessons: [
          ["Customer Journey Mapping", 49],
          ["Data-Driven Decision Making", 55],
          ["Personalization and Digital Channels", 47],
          ["Measuring Experience and Outcomes", 46],
        ],
      },
      {
        title: "Module 3: Leading Change",
        lessons: [
          ["Digital Culture and Ways of Working", 50],
          ["Stakeholder Alignment and Governance", 48],
          ["Scaling Pilots to the Enterprise", 53],
          ["Transformation Roadmap (Capstone)", 60],
        ],
      },
    ]),
    createdAt: "2026-07-03",
  },
  {
    id: "crs_pmp_prep",
    slug: "pmp-certification-prep",
    code: "IM-PMP-003",
    status: "published",
    title: "Project Management Professional (PMP)® Prep",
    summary: "Comprehensive preparation to pass the PMP® exam with mock exams and real-world scenarios.",
    description:
      "Comprehensive preparation to pass the PMP® exam with practical tools, mock exams, and real-world scenarios. Aligned to the latest PMI® examination content outline and taught by a certified practitioner.",
    programType: "certification-prep",
    categorySlug: "project-management",
    instructorId: "ins_hatem",
    price: 249,
    oldPrice: 349,
    discountPercent: 29,
    durationMonths: 3,
    sessions: 16,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.7,
    reviews: 142,
    enrolled: 760,
    registrationOpen: true,
    featured: true,
    keyBenefits: [
      "Cover the full PMI® examination content outline",
      "Practice with realistic mock exams",
      "Master people, process and business environment domains",
      "Earn the required contact hours",
    ],
    whatYouLearn: [
      "Predictive, agile and hybrid delivery approaches",
      "Leading and developing project teams",
      "Managing scope, schedule, cost and risk",
      "Exam tactics and question interpretation",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: People",
        lessons: [
          ["Building and Leading a Team", 50],
          ["Managing Conflict and Stakeholders", 48],
          ["Servant Leadership and Motivation", 45],
          ["Virtual Teams and Communication", 47],
        ],
      },
      {
        title: "Module 2: Process",
        lessons: [
          ["Scope, Schedule and Cost Management", 55],
          ["Risk and Quality Management", 52],
          ["Procurement and Resources", 46],
          ["Agile and Hybrid Delivery", 54],
        ],
      },
      {
        title: "Module 3: Business Environment & Exam Prep",
        lessons: [
          ["Compliance and Organizational Change", 44],
          ["Benefits and Value Delivery", 43],
          ["Full-Length Mock Exam", 90],
          ["Exam Strategy and Review", 60],
        ],
      },
    ]),
    createdAt: "2026-05-20",
  },
  {
    id: "crs_leadership_diploma",
    slug: "leadership-team-management-diploma",
    code: "IM-LTM-004",
    status: "published",
    title: "Leadership & Team Management Diploma",
    summary: "Build the leadership skills to motivate teams and deliver results.",
    description:
      "A practical leadership diploma for new and aspiring managers. Build the communication, coaching and decision-making skills to lead high-performing teams through everyday challenges and change.",
    programType: "diploma",
    categorySlug: "leadership",
    instructorId: "ins_sarah",
    price: 279,
    oldPrice: 359,
    discountPercent: 22,
    durationMonths: 4,
    sessions: 22,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.8,
    reviews: 205,
    enrolled: 870,
    registrationOpen: true,
    featured: false,
    keyBenefits: [
      "Lead with clarity, empathy and accountability",
      "Coach and develop individual team members",
      "Handle difficult conversations with confidence",
      "Build trust and a high-performance culture",
    ],
    whatYouLearn: [
      "Leadership styles and situational leadership",
      "Coaching, feedback and delegation",
      "Team dynamics and motivation",
      "Leading through change and uncertainty",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: The Leader's Mindset",
        lessons: [
          ["From Manager to Leader", 45],
          ["Self-Awareness and Emotional Intelligence", 50],
          ["Situational Leadership", 48],
          ["Leading with Values", 44],
        ],
      },
      {
        title: "Module 2: Leading People",
        lessons: [
          ["Coaching and Feedback", 52],
          ["Delegation and Empowerment", 47],
          ["Difficult Conversations", 49],
          ["Motivation and Recognition", 46],
        ],
      },
      {
        title: "Module 3: Leading Teams",
        lessons: [
          ["Team Dynamics and Trust", 50],
          ["Decision-Making and Problem-Solving", 48],
          ["Leading Change", 51],
          ["Leadership Action Plan (Capstone)", 58],
        ],
      },
    ]),
    createdAt: "2026-04-15",
  },
  {
    id: "crs_agile_scrum",
    slug: "agile-scrum-master-prep",
    code: "IM-ASM-005",
    status: "draft",
    title: "Agile & Scrum Master Certification Prep",
    summary: "Master agile delivery and prepare for your Scrum Master certification.",
    description:
      "Learn to lead agile teams and prepare for your Scrum Master certification. This course covers the Scrum framework, agile facilitation, and the metrics that keep delivery on track.",
    programType: "certification-prep",
    categorySlug: "project-management",
    instructorId: "ins_hatem",
    price: 229,
    oldPrice: 299,
    discountPercent: 23,
    durationMonths: 2,
    sessions: 12,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.6,
    reviews: 98,
    enrolled: 540,
    registrationOpen: true,
    featured: false,
    keyBenefits: [
      "Understand the Scrum framework end to end",
      "Facilitate agile ceremonies effectively",
      "Coach teams toward continuous improvement",
      "Prepare for the certification exam",
    ],
    whatYouLearn: [
      "Scrum roles, events and artifacts",
      "Backlog refinement and sprint planning",
      "Agile metrics and flow",
      "Scaling agile and overcoming anti-patterns",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Agile & Scrum Foundations",
        lessons: [
          ["Agile Values and Principles", 42],
          ["The Scrum Framework", 48],
          ["Roles and Accountabilities", 45],
          ["Artifacts and Commitments", 44],
        ],
      },
      {
        title: "Module 2: Running Scrum",
        lessons: [
          ["Sprint Planning and Backlogs", 50],
          ["Daily Scrum and Review", 40],
          ["Retrospectives that Work", 43],
          ["Facilitation and Coaching", 47],
        ],
      },
      {
        title: "Module 3: Scaling & Certification",
        lessons: [
          ["Agile Metrics and Flow", 46],
          ["Scaling Agile Patterns", 48],
          ["Common Anti-Patterns", 41],
          ["Certification Practice Exam", 60],
        ],
      },
    ]),
    createdAt: "2026-03-28",
  },
  {
    id: "crs_data_analytics",
    slug: "data-analytics-for-decision-making",
    code: "IM-DAD-006",
    status: "scheduled",
    title: "Data & Analytics for Decision Making",
    summary: "Turn data into confident, evidence-based business decisions.",
    description:
      "A hands-on diploma for managers who want to lead with data. Learn to read, question and present analytics, build dashboards, and embed evidence-based decisions into everyday management.",
    programType: "diploma",
    categorySlug: "digital-transformation",
    instructorId: "ins_sarah",
    price: 269,
    oldPrice: 339,
    discountPercent: 21,
    durationMonths: 3,
    sessions: 18,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.7,
    reviews: 131,
    enrolled: 620,
    registrationOpen: true,
    featured: false,
    keyBenefits: [
      "Read and question data with confidence",
      "Build clear, decision-ready dashboards",
      "Communicate insights to any audience",
      "Embed analytics into management routines",
    ],
    whatYouLearn: [
      "Descriptive, diagnostic and predictive analytics",
      "Metrics, KPIs and data storytelling",
      "Dashboard design principles",
      "From insight to decision and action",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Thinking with Data",
        lessons: [
          ["Data Literacy for Managers", 44],
          ["Asking the Right Questions", 46],
          ["Descriptive and Diagnostic Analytics", 50],
          ["Avoiding Common Data Pitfalls", 43],
        ],
      },
      {
        title: "Module 2: Metrics & Dashboards",
        lessons: [
          ["Choosing Metrics and KPIs", 48],
          ["Dashboard Design Principles", 52],
          ["Data Storytelling", 47],
          ["Presenting to Stakeholders", 45],
        ],
      },
      {
        title: "Module 3: From Insight to Action",
        lessons: [
          ["Predictive Analytics Basics", 50],
          ["Experiments and Decisions", 48],
          ["Embedding Analytics in Routines", 44],
          ["Capstone: A Decision Dashboard", 60],
        ],
      },
    ]),
    createdAt: "2026-02-10",
  },
  {
    id: "crs_change_mgmt",
    slug: "change-management-diploma",
    code: "IM-CMD-007",
    status: "published",
    title: "Change Management Diploma",
    summary: "Lead organizational change that sticks, from plan to adoption.",
    description:
      "Lead change that people embrace. This diploma covers change models, stakeholder engagement, communication and the practical tools to move an organization from current state to a new way of working.",
    programType: "diploma",
    categorySlug: "leadership",
    instructorId: "ins_ahmed",
    price: 279,
    oldPrice: 359,
    discountPercent: 22,
    durationMonths: 3,
    sessions: 16,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.8,
    reviews: 154,
    enrolled: 690,
    registrationOpen: true,
    featured: false,
    keyBenefits: [
      "Apply leading change-management models",
      "Engage stakeholders and reduce resistance",
      "Communicate change with clarity",
      "Sustain adoption after go-live",
    ],
    whatYouLearn: [
      "Change models (ADKAR, Kotter and more)",
      "Stakeholder analysis and engagement",
      "Change communication planning",
      "Measuring and sustaining adoption",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Understanding Change",
        lessons: [
          ["Why Change Fails", 44],
          ["Change Models and Frameworks", 50],
          ["The Psychology of Change", 47],
          ["Assessing Change Impact", 45],
        ],
      },
      {
        title: "Module 2: Leading Change",
        lessons: [
          ["Stakeholder Analysis", 48],
          ["Building a Guiding Coalition", 46],
          ["Change Communication", 49],
          ["Managing Resistance", 47],
        ],
      },
      {
        title: "Module 3: Making It Stick",
        lessons: [
          ["Training and Enablement", 45],
          ["Reinforcement and Rewards", 43],
          ["Measuring Adoption", 46],
          ["Change Plan (Capstone)", 58],
        ],
      },
    ]),
    createdAt: "2026-01-22",
  },
  {
    id: "crs_executive_leadership",
    slug: "executive-leadership-program",
    code: "IM-ELP-008",
    status: "published",
    title: "Executive Leadership Program",
    summary: "An advanced program for senior leaders shaping strategy and culture.",
    description:
      "An advanced program for senior managers and executives. Sharpen strategic leadership, enterprise decision-making and the ability to shape culture and performance at scale.",
    programType: "diploma",
    categorySlug: "leadership",
    instructorId: "ins_ahmed",
    price: 349,
    oldPrice: 449,
    discountPercent: 22,
    durationMonths: 5,
    sessions: 28,
    learningMode: "Live on Zoom",
    language: "English",
    certificate: "IMETS Academy Certificate",
    rating: 4.9,
    reviews: 276,
    enrolled: 1120,
    registrationOpen: true,
    featured: true,
    keyBenefits: [
      "Lead at the enterprise and portfolio level",
      "Shape culture, vision and performance",
      "Make high-stakes decisions under uncertainty",
      "Grow and mentor other leaders",
    ],
    whatYouLearn: [
      "Strategic and systems leadership",
      "Enterprise decision-making",
      "Culture, influence and executive presence",
      "Leading leaders and succession",
    ],
    curriculum: buildCurriculum([
      {
        title: "Module 1: Strategic Leadership",
        lessons: [
          ["The Executive Role", 48],
          ["Systems Thinking for Leaders", 52],
          ["Vision and Strategic Narrative", 50],
          ["Leading the Organization", 49],
        ],
      },
      {
        title: "Module 2: Decisions & Influence",
        lessons: [
          ["High-Stakes Decision-Making", 54],
          ["Executive Presence and Influence", 48],
          ["Negotiation at the Top", 50],
          ["Board and Stakeholder Relations", 47],
        ],
      },
      {
        title: "Module 3: Culture & Growth",
        lessons: [
          ["Shaping Culture and Performance", 51],
          ["Leading Leaders", 49],
          ["Succession and Talent", 46],
          ["Executive Capstone", 60],
        ],
      },
    ]),
    createdAt: "2026-07-18",
  },
];

/* --------------------------------------------------------------- helpers --- */

function categoryBySlugOrThrow(slug: string): Category {
  const base = categoriesSeed.find((c) => c.slug === slug);
  if (!base) throw new NotFoundError(`Category not found: ${slug}`);
  return { ...base, courseCount: courses.filter((c) => c.categorySlug === slug).length };
}

function instructorByIdOrThrow(id: string): Instructor {
  const found = instructors.find((i) => i.id === id);
  if (!found) throw new NotFoundError(`Instructor not found: ${id}`);
  return found;
}

function withRelations(course: Course): CourseWithRelations {
  return {
    ...course,
    instructor: instructorByIdOrThrow(course.instructorId),
    category: categoryBySlugOrThrow(course.categorySlug),
  };
}

function matchesQuery(course: Course, q: string): boolean {
  const needle = q.toLowerCase();
  return (
    course.title.toLowerCase().includes(needle) ||
    course.summary.toLowerCase().includes(needle) ||
    course.description.toLowerCase().includes(needle)
  );
}

function sortCourses(list: Course[], sort: CourseListQuery["sort"]): Course[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "popular":
    default:
      return sorted.sort((a, b) => b.enrolled - a.enrolled);
  }
}

/* --------------------------------------------------------------- queries --- */

export async function listCourses(query: CourseListQuery) {
  await delay();
  let result = courses;
  if (query.category) result = result.filter((c) => c.categorySlug === query.category);
  if (query.q) result = result.filter((c) => matchesQuery(c, query.q!));
  result = sortCourses(result, query.sort);

  const total = result.length;
  const start = (query.page - 1) * query.pageSize;
  const items = result.slice(start, start + query.pageSize).map(withRelations);

  return structuredClone({ items, total, page: query.page, pageSize: query.pageSize });
}

export async function getCourseBySlug(slug: string): Promise<CourseWithRelations> {
  await delay();
  const course = courses.find((c) => c.slug === slug);
  if (!course) throw new NotFoundError(`Course not found: ${slug}`);
  return structuredClone(withRelations(course));
}

export async function listFeaturedCourses(limit = 4): Promise<CourseWithRelations[]> {
  await delay();
  const items = courses
    .filter((c) => c.featured)
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, limit)
    .map(withRelations);
  return structuredClone(items);
}

export async function listCategories(): Promise<Category[]> {
  await delay();
  const items = categoriesSeed.map((c) => categoryBySlugOrThrow(c.slug));
  return structuredClone(items);
}

/* ------------------------------------------------------------ mutations --- */

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "course"
  );
}

const PROGRAM_BY_TYPE: Record<CreateCourseForm["courseType"], Course["programType"]> = {
  diploma: "diploma",
  certificate: "certification-prep",
  "short-course": "certification-prep",
};

const STATUS_BY_PUBLISH: Record<CreateCourseForm["publishOption"], Course["status"]> = {
  "publish-now": "published",
  schedule: "scheduled",
  draft: "draft",
};

/** Create a course from the admin wizard. Persists in memory only (dev). */
export async function createCourse(input: CreateCourseForm): Promise<CourseWithRelations> {
  await delay();
  const seq = String(courses.length + 1).padStart(3, "0");
  const id = `crs_${Date.now().toString(36)}`;
  const baseSlug = slugify(input.title);
  const slug = courses.some((c) => c.slug === baseSlug) ? `${baseSlug}-${seq}` : baseSlug;
  const status = STATUS_BY_PUBLISH[input.publishOption];
  const firstInstructor = instructors[0];
  if (!firstInstructor) throw new NotFoundError("No instructors available");

  const curriculum: CourseModule[] = input.curriculum.map((m, mi) => ({
    title: m.title,
    lessons: m.lessons.map((l, li) => ({
      code: `${mi + 1}.${li + 1}`,
      title: l.title,
      durationMin: l.durationMin,
    })),
  }));

  const course: Course = {
    id,
    slug,
    code: `IM-NEW-${seq}`,
    status,
    title: input.title,
    summary: input.summary,
    description: input.summary,
    programType: PROGRAM_BY_TYPE[input.courseType],
    categorySlug: input.categorySlug,
    instructorId: firstInstructor.id,
    price: 0,
    oldPrice: null,
    discountPercent: null,
    durationMonths: input.durationMonths,
    sessions: input.sessions,
    learningMode: input.learningMode,
    language: input.language,
    certificate: "IMETS Academy Certificate",
    rating: 0,
    reviews: 0,
    enrolled: 0,
    registrationOpen: status === "published",
    featured: false,
    keyBenefits: [],
    whatYouLearn: [],
    curriculum,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  courses.unshift(course);
  return structuredClone(withRelations(course));
}
