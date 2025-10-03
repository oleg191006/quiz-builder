type QuestionType = "boolean" | "input" | "checkbox";

interface QuestionForm {
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface QuizForm {
  title: string;
  questions: QuestionForm[];
}
