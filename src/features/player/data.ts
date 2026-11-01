import "server-only";
import { delay } from "@/lib/delay";

/* Course player mock data (UI preview; a real player connects to the backend). */

import type { NodeState } from "@/features/player/curriculum";

export type PlayerCourse = {
  slug: string;
  title: string;
  type: string;
  level: string;
  weeks: number;
  progress: number;
};

export type Resource = { type: "pdf" | "ppt" | "xls"; name: string; size: string };
export type LessonNote = { time: string; text: string };

export type LessonDetail = {
  id: string;
  title: string;
  duration: string;
  position: string;
  whatYouLearn: string[];
  resources: Resource[];
  notes: LessonNote[];
  qaCount: number;
  moduleTitle: string;
  moduleProgress: number;
  moduleLessons: { id: string; title: string; state: NodeState }[];
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: { key: string; label: string }[];
  correct: string;
};

export type Quiz = {
  module: string;
  totalQuestions: number;
  timeLimitMin: number;
  passingScore: number;
  questions: QuizQuestion[];
};

const course: PlayerCourse = {
  slug: "strategic-management",
  title: "Strategic Management",
  type: "Business Course",
  level: "Intermediate",
  weeks: 6,
  progress: 60,
};

export async function getPlayerCourse(): Promise<PlayerCourse> {
  await delay();
  return structuredClone(course);
}

export async function getCurrentLesson(): Promise<LessonDetail> {
  await delay();
  const detail: LessonDetail = {
    id: "2.2",
    title: "2.2 Industry Analysis (Porter's Five Forces)",
    duration: "18:20",
    position: "07:24",
    whatYouLearn: [
      "The five competitive forces and their impact",
      "How to assess industry attractiveness",
      "Practical example: Applying the model to a real business",
    ],
    resources: [
      { type: "pdf", name: "Porter's Five Forces – Summary.pdf", size: "2.1 MB" },
      { type: "ppt", name: "Industry Analysis – Template.pptx", size: "4.8 MB" },
      { type: "xls", name: "Case Study – Industry Analysis.xlsx", size: "1.2 MB" },
    ],
    notes: [
      { time: "07:24", text: "The five forces help evaluate the competitive intensity of an industry." },
      { time: "12:10", text: "Remember: higher rivalry = lower industry profitability." },
    ],
    qaCount: 4,
    moduleTitle: "Module 2: Strategic Analysis",
    moduleProgress: 25,
    moduleLessons: [
      { id: "2.1", title: "The External Environment", state: "done" },
      { id: "2.2", title: "Industry Analysis (Current)", state: "current" },
      { id: "2.3", title: "Internal Analysis", state: "todo" },
      { id: "2.4", title: "SWOT Analysis", state: "todo" },
    ],
  };
  return structuredClone(detail);
}

const quiz: Quiz = {
  module: "Module 2: Strategic Analysis",
  totalQuestions: 10,
  timeLimitMin: 20,
  passingScore: 70,
  questions: [
    {
      id: "q1",
      text: "Which of the following is NOT one of Porter's Five Forces?",
      options: [
        { key: "A", label: "Threat of new entrants" },
        { key: "B", label: "Bargaining power of suppliers" },
        { key: "C", label: "Organizational culture" },
        { key: "D", label: "Threat of substitute products or services" },
      ],
      correct: "C",
    },
    {
      id: "q2",
      text: "The bargaining power of suppliers is greater when:",
      options: [
        { key: "A", label: "There are many competing suppliers" },
        { key: "B", label: "Inputs are undifferentiated" },
        { key: "C", label: "A few suppliers dominate the market" },
        { key: "D", label: "Switching costs are low" },
      ],
      correct: "C",
    },
    {
      id: "q3",
      text: "Which tool assesses a firm's internal resources and capabilities?",
      options: [
        { key: "A", label: "PESTLE analysis" },
        { key: "B", label: "Porter's Five Forces" },
        { key: "C", label: "VRIO framework" },
        { key: "D", label: "BCG matrix" },
      ],
      correct: "C",
    },
    {
      id: "q4",
      text: "A high threat of new entrants usually leads to:",
      options: [
        { key: "A", label: "Higher industry profitability" },
        { key: "B", label: "Lower industry profitability" },
        { key: "C", label: "No effect on profitability" },
        { key: "D", label: "A guaranteed monopoly" },
      ],
      correct: "B",
    },
    {
      id: "q5",
      text: "Which of the following is an example of a substitute product?",
      options: [
        { key: "A", label: "A competitor's identical product" },
        { key: "B", label: "Video calls replacing business travel" },
        { key: "C", label: "A supplier's raw material" },
        { key: "D", label: "A new market entrant's product" },
      ],
      correct: "B",
    },
    {
      id: "q6",
      text: "PESTLE analysis primarily examines which environment?",
      options: [
        { key: "A", label: "The internal environment" },
        { key: "B", label: "The macro (external) environment" },
        { key: "C", label: "The financial environment only" },
        { key: "D", label: "The competitive environment only" },
      ],
      correct: "B",
    },
    {
      id: "q7",
      text: "SWOT stands for:",
      options: [
        { key: "A", label: "Strengths, Weaknesses, Opportunities, Threats" },
        { key: "B", label: "Strategy, Work, Operations, Tactics" },
        { key: "C", label: "Scope, Width, Output, Time" },
        { key: "D", label: "Strengths, Workforce, Options, Trends" },
      ],
      correct: "A",
    },
    {
      id: "q8",
      text: "A sustainable competitive advantage is best explained by resources that are:",
      options: [
        { key: "A", label: "Cheap and easy to copy" },
        { key: "B", label: "Valuable, rare, inimitable and organized (VRIO)" },
        { key: "C", label: "Only supported by a large marketing budget" },
        { key: "D", label: "Widely available to all competitors" },
      ],
      correct: "B",
    },
    {
      id: "q9",
      text: "Rivalry among existing competitors tends to be higher when:",
      options: [
        { key: "A", label: "Industry growth is high" },
        { key: "B", label: "There are only a few competitors" },
        { key: "C", label: "Products are highly differentiated" },
        { key: "D", label: "Exit barriers are high" },
      ],
      correct: "D",
    },
    {
      id: "q10",
      text: "The primary purpose of strategic management is to:",
      options: [
        { key: "A", label: "Reduce headcount" },
        { key: "B", label: "Achieve sustained competitive advantage" },
        { key: "C", label: "Increase short-term costs" },
        { key: "D", label: "Avoid long-term planning" },
      ],
      correct: "B",
    },
  ],
};

export async function getQuiz(): Promise<Quiz> {
  await delay();
  return structuredClone(quiz);
}
