import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Learning Paths" };

export default function LearningPathsPage() {
  return (
    <PlaceholderPage
      title={
        <>
          Learning <span className="text-accent">Paths</span>
        </>
      }
      description="Guided, role-based tracks that take you from fundamentals to mastery, one course at a time."
    />
  );
}
