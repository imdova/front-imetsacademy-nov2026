import type { Metadata } from "next";
import { getQuiz } from "@/features/player/data";
import { QuizRunner } from "@/features/player/components/quiz-runner";

export const metadata: Metadata = { title: "Module Quiz" };

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuiz();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <QuizRunner quiz={quiz} slug={slug} />
    </div>
  );
}
