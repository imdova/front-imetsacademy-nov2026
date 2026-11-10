import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./email-marketing.css";
import { EmShell } from "@/components/email-marketing/em-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function EmailMarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`em-theme ${inter.variable}`}
      style={{ background: "var(--em-page)", minHeight: "100dvh" }}
    >
      <EmShell>{children}</EmShell>
    </div>
  );
}
