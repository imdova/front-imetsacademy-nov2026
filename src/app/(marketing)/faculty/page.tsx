import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Faculty" };

export default function FacultyPage() {
  return (
    <PlaceholderPage
      title={
        <>
          Our <span className="text-accent">Faculty</span>
        </>
      }
      description="Learn from industry practitioners and seasoned leaders with real-world experience."
    />
  );
}
