import Link from "next/link";
import { Trash2, Loader2 } from "lucide-react";
import { Quiz } from "@/shared/types/quiz";
import React from "react";

interface QuizCardProps {
  quiz: Quiz;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, isDeleting, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-200">
      <Link href={`/quizzes/${quiz.id}`} className="flex-grow pr-4 group">
        <h2 className="text-xl font-semibold text-gray-700 group-hover:text-blue-600 transition">
          {quiz.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {quiz.questions.length} questions
        </p>
      </Link>

      <button
        onClick={() => onDelete(quiz.id)}
        className={`p-2 rounded-full transition ${
          isDeleting
            ? "bg-red-500 text-white cursor-not-allowed"
            : "text-red-500 hover:text-white hover:bg-red-600"
        }`}
        disabled={isDeleting}
        title="Delete Quiz"
      >
        {isDeleting ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Trash2 size={20} />
        )}
      </button>
    </li>
  );
};

export default QuizCard;
