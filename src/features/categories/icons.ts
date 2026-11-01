import {
  BarChart3,
  Boxes,
  Briefcase,
  Code2,
  Landmark,
  Lightbulb,
  Megaphone,
  Share2,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CategoryColorKey, CategoryIconKey } from "@/features/categories/data";

export const CATEGORY_ICONS: Record<CategoryIconKey, LucideIcon> = {
  briefcase: Briefcase,
  chart: BarChart3,
  code: Code2,
  users: Users,
  target: Target,
  project: Share2,
  finance: Landmark,
  lightbulb: Lightbulb,
  operations: Boxes,
  megaphone: Megaphone,
};

export const CATEGORY_COLOR_HEX: Record<CategoryColorKey, string> = {
  navy: "#2435a8",
  violet: "#8b5cf6",
  pink: "#ec4899",
  orange: "#f59e0b",
  yellow: "#eab308",
  green: "#22c55e",
  teal: "#14b8a6",
  sky: "#38bdf8",
};

export const CATEGORY_COLOR_KEYS: CategoryColorKey[] = [
  "navy",
  "violet",
  "pink",
  "orange",
  "yellow",
  "green",
  "teal",
  "sky",
];

/** Soft tinted background (10% alpha) for an icon chip of the given color. */
export function colorTint(color: CategoryColorKey): { background: string; color: string } {
  const hex = CATEGORY_COLOR_HEX[color];
  return { background: `${hex}1a`, color: hex };
}
