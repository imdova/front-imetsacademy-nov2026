import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

/** Display family (headings) — Outfit, exposed as --font-outfit. */
export const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/** Body family — Plus Jakarta Sans, exposed as --font-jakarta. */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
