import React from "react";
import { Quiz } from "@/shared/types/quiz";

import QuizCard from "./QuizCard";
import QuizListEmptyState from "./QuizListEmptyState";

interface QuizListProps {
  quizzes: Quiz[];
  deletingId: string | null;
  handleDeleteQuiz: (id: string) => void;
}

const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  deletingId,
  handleDeleteQuiz,
}) => {
  if (quizzes.length === 0) {
    return <QuizListEmptyState />;
  }

  return (
    <ul className="space-y-4">
      {quizzes.map((q) => (
        <QuizCard
          key={q.id}
          quiz={q}
          isDeleting={deletingId === q.id}
          onDelete={handleDeleteQuiz}
        />
      ))}
    </ul>
  );
};

export default QuizList;
