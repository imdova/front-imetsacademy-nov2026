import type { Metadata } from "next";
import { QuizResults } from "@/features/quizzes/components/quiz-results";

export const metadata: Metadata = { title: "Quiz Results" };

export default async function QuizResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ outcome?: string }>;
}) {
  await params;
  const { outcome } = await searchParams;
  const passed = outcome !== "fail";
  return <QuizResults passed={passed} />;
}
