import { URLs } from "@/shared/constants/request";
import { baseService } from "./baseService";
import { getFullUrl } from "@/shared/utils/get-full-url";

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
  questions: Question[];
}

export const quizService = {
  getAllQuizzes: () => {
    return baseService.request<Quiz[]>({
      method: "GET",
      url: getFullUrl({ pathname: URLs.quizzes.getAll }),
    });
  },

  getQuizById: (id: string) => {
    return baseService.request<Quiz>({
      method: "GET",
      url: getFullUrl({
        pathname: URLs.quizzes.getById,
        parameters: { id },
      }),
    });
  },

  createQuiz: (dto: QuizDTO) => {
    return baseService.request<Quiz>({
      method: "POST",
      url: getFullUrl({ pathname: URLs.quizzes.create }),
      data: dto,
    });
  },

  updateQuiz: (id: string, dto: QuizDTO) => {
    return baseService.request<Quiz>({
      method: "PUT",
      url: getFullUrl({
        pathname: URLs.quizzes.update,
        parameters: { id },
      }),
      data: dto,
    });
  },

  deleteQuiz: (id: string) => {
    return baseService.request<void>({
      method: "DELETE",
      url: getFullUrl({
        pathname: URLs.quizzes.delete,
        parameters: { id },
      }),
    });
  },
};
