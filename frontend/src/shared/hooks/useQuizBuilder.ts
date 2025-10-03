import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizService } from "@/services/quizzesService";
import { QuizForm } from "@/shared/types/form";

export function useQuizBuilder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const dismissNotification = () => setNotification(null);

  const createQuiz = async (data: QuizForm, reset: () => void) => {
    dismissNotification();
    try {
      setLoading(true);

      const payload = {
        ...data,
        questions: data.questions.map((q) => ({
          text: q.text,
          type: q.type,
          options:
            q.type === "checkbox" || q.type === "boolean"
              ? q.options?.filter((opt) => opt.trim() !== "") ?? []
              : undefined,
        })),
      };

      if (!payload.questions.length) {
        setNotification({
          message: "Please add at least one question.",
          type: "error",
        });
        return;
      }

      await quizService.createQuiz(payload);
      reset();
      setNotification({
        message: "Quiz successfully created! 🎉",
        type: "success",
      });

      setTimeout(() => router.push("/quizzes"), 300);
    } catch {
      setNotification({
        message: "Failed to create quiz. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createQuiz, loading, notification, dismissNotification };
}
