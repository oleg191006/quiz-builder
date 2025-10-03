import React from "react";
import type { Quiz } from "@/shared/types/quiz";
import { MinusSquare } from "lucide-react";
import { QuestionTypeBadge } from "./QuestionTypeBadge";

interface QuizViewProps {
  quiz: Quiz;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900">{quiz.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Total questions: {quiz.questions.length}
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quiz structure (reading mode)
        </h2>

        <ul className="space-y-6">
          {quiz.questions.map((q, index) => (
            <li
              key={q.id || index}
              className="p-5 border border-gray-100 rounded-lg bg-white shadow-md transition hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-lg font-medium text-gray-800">
                  <span className="font-bold mr-2 text-blue-600">
                    {index + 1}.
                  </span>{" "}
                  {q.text}
                </p>
                <QuestionTypeBadge type={q.type} />
              </div>
              {Array.isArray(q.options) && q.options.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Варіанти:
                  </p>
                  <ul className="space-y-1">
                    {q.options.map((o, optIndex) => (
                      <li
                        key={optIndex}
                        className="text-gray-600 flex items-center"
                      >
                        <MinusSquare
                          size={14}
                          className="mr-2 text-gray-400 flex-shrink-0"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.type === "input" && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-500 text-sm italic">
                  Це поле для вільної текстової відповіді.
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default QuizView;
