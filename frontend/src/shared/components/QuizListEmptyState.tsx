import { BookOpen } from "lucide-react";
import React from "react";

const QuizListEmptyState: React.FC = () => (
  <div className="text-center p-10 border border-dashed rounded-lg bg-gray-50">
    <BookOpen size={40} className="mx-auto text-gray-400 mb-4" />
    <p className="text-lg text-gray-600">
      You haven&apost created any quizzes yet.
    </p>
    <p className="text-sm text-gray-400 mt-2">
      Click `Create New Quiz` to start building one.
    </p>
  </div>
);

export default QuizListEmptyState;
