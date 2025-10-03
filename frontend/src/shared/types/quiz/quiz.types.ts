export interface Question {
  id?: string;
  type: "boolean" | "input" | "checkbox";
  text: string;
  options?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuizDTO {
  title: string;
  questions: Omit<Question, "id">[];
}

export interface QuestionFormValue {
  type: Question["type"];
  text: string;
  optionsText: string[];
}

export interface QuizFormDTO {
  title: string;
  questions: QuestionFormValue[];
}
