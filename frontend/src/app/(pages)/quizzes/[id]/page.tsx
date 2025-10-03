import { quizService } from "@/services/quizzesService";
import QuizView from "@/shared/components/QuizView";
import NotFoundState from "@/shared/components/NotFoundState";
import type { Quiz } from "@/shared/types/quiz";
import Link from "next/link";

interface QuizDetailPageProps {
  params: { id: string };
}

export default async function QuizDetailPage({ params }: QuizDetailPageProps) {
  const { id } = params;

  try {
    const quiz: Quiz = await quizService.getQuizById(id);

    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link
              href="/quizzes"
              className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              ← Back to quizzes
            </Link>
          </div>

          <QuizView quiz={quiz} />
        </div>
      </div>
    );
  } catch {
    return (
      <NotFoundState
        title="Download error"
        message={`Quiz with ID: ${id} not found, or a server error occurred`}
      />
    );
  }
}
