import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system's type utilities (text-h2, text-body-sm, …) share the
 * `text-` prefix with color utilities, so stock tailwind-merge treats them as
 * colors and drops the font-size when a color is also present. Register them as
 * font-size classes so both survive a merge.
 */
const TYPE_UTILITIES = [
  "display-xl",
  "display-lg",
  "h1",
  "h2",
  "h3",
  "h4",
  "price",
  "stat",
  "body-lg",
  "body",
  "body-sm",
  "label",
  "caption",
  "overline",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: TYPE_UTILITIES }],
    },
  },
});

/** Merge class names with Tailwind-aware conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
