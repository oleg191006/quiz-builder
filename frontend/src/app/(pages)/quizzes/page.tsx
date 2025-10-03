import { quizService } from "@/services/quizzesService";
import QuizListClient from "@/shared/components/QuizListClient";
import { Quiz } from "@/shared/types/quiz";

import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function QuizzesPage() {
  let quizzes: Quiz[] = [];
  let error: string | null = null;

  try {
    quizzes = await quizService.getAllQuizzes();
  } catch (err) {
    console.error("Failed to fetch quizzes on server:", err);
    error = "Failed to load quizzes. Please check the server connection.";
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <QuizzesPageHeader quizzes={quizzes} />
        <QuizListClient initialQuizzes={quizzes} initialError={error} />
      </div>
    </div>
  );
}

function QuizzesPageHeader({ quizzes }: { quizzes: Quiz[] }) {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">
        My Quizzes ({quizzes.length})
      </h1>
      <Link
        href="/create"
        className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
      >
        <Plus size={20} className="mr-2" />
        Create New Quiz
      </Link>
    </header>
  );
}
