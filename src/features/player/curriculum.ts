/* Course curriculum structure (client-safe; the sidebar computes node states). */

export type NodeState = "done" | "current" | "todo";
export type CurriculumNode = {
  id: string;
  title: string;
  duration?: string;
  kind: "lesson" | "quiz";
};
export type CurriculumModule = {
  id: string;
  title: string;
  nodes: CurriculumNode[];
  total: number;
};

export const CURRICULUM: CurriculumModule[] = [
  {
    id: "m1",
    title: "Module 1: Strategic Management Fundamentals",
    total: 4,
    nodes: [
      { id: "1.1", title: "1.1 Introduction to Strategic Management", duration: "10:20", kind: "lesson" },
      { id: "1.2", title: "1.2 Vision, Mission and Objectives", duration: "12:05", kind: "lesson" },
      { id: "1.3", title: "1.3 Levels of Strategy", duration: "11:40", kind: "lesson" },
      { id: "1.4", title: "1.4 The Strategic Management Process", duration: "14:10", kind: "lesson" },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Strategic Analysis",
    total: 4,
    nodes: [
      { id: "2.1", title: "2.1 The External Environment (PESTLE Analysis)", duration: "12:34", kind: "lesson" },
      { id: "2.2", title: "2.2 Industry Analysis (Porter's Five Forces)", duration: "18:20", kind: "lesson" },
      { id: "2.3", title: "2.3 Internal Analysis (Resource-Based View)", duration: "14:16", kind: "lesson" },
      { id: "2.4", title: "2.4 SWOT Analysis & Strategic Implications", duration: "16:05", kind: "lesson" },
      { id: "quiz-m2", title: "Take Quiz – Module 2", kind: "quiz" },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Strategy Formulation",
    total: 4,
    nodes: [
      { id: "3.1", title: "3.1 Business-Level Strategy", duration: "13:00", kind: "lesson" },
      { id: "3.2", title: "3.2 Corporate-Level Strategy", duration: "15:20", kind: "lesson" },
      { id: "3.3", title: "3.3 Competitive Positioning", duration: "12:45", kind: "lesson" },
      { id: "3.4", title: "3.4 Strategic Options & Choice", duration: "14:30", kind: "lesson" },
    ],
  },
  {
    id: "m4",
    title: "Module 4: Strategy Implementation",
    total: 4,
    nodes: [
      { id: "4.1", title: "4.1 Structure & Strategy", duration: "12:10", kind: "lesson" },
      { id: "4.2", title: "4.2 Leading Strategic Change", duration: "13:55", kind: "lesson" },
      { id: "4.3", title: "4.3 Resource Allocation", duration: "11:30", kind: "lesson" },
      { id: "4.4", title: "4.4 Execution & Governance", duration: "15:00", kind: "lesson" },
    ],
  },
  {
    id: "m5",
    title: "Module 5: Strategy Evaluation & Control",
    total: 4,
    nodes: [
      { id: "5.1", title: "5.1 Performance Measurement", duration: "12:20", kind: "lesson" },
      { id: "5.2", title: "5.2 The Balanced Scorecard", duration: "14:40", kind: "lesson" },
      { id: "5.3", title: "5.3 Strategic Control Systems", duration: "11:15", kind: "lesson" },
      { id: "5.4", title: "5.4 Corrective Action", duration: "10:50", kind: "lesson" },
    ],
  },
  {
    id: "m6",
    title: "Module 6: Capstone Project",
    total: 4,
    nodes: [
      { id: "6.1", title: "6.1 Project Brief & Scope", duration: "09:30", kind: "lesson" },
      { id: "6.2", title: "6.2 Strategic Analysis in Practice", duration: "18:00", kind: "lesson" },
      { id: "6.3", title: "6.3 Recommendations", duration: "16:20", kind: "lesson" },
      { id: "6.4", title: "6.4 Final Presentation", duration: "20:00", kind: "lesson" },
    ],
  },
];

export const ORDERED_IDS: string[] = CURRICULUM.flatMap((m) => m.nodes.map((n) => n.id));

export function nodeState(nodeId: string, currentId: string): NodeState {
  const i = ORDERED_IDS.indexOf(nodeId);
  const c = ORDERED_IDS.indexOf(currentId);
  if (i === c) return "current";
  if (c !== -1 && i < c) return "done";
  return "todo";
}
