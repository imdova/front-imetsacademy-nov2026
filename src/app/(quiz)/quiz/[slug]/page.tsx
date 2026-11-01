import type { Metadata } from "next";
import { QuizPlayer } from "@/features/quizzes/components/quiz-player";

export const metadata: Metadata = { title: "Quiz" };

export default async function QuizTakePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  return <QuizPlayer />;
}
