"use client";

import { useState, useCallback, useEffect } from "react";
import { Quiz } from "@/shared/types/quiz";
import { quizService } from "@/services/quizzesService";

import NotificationToast, {
  Notification,
} from "@/shared/components/NotificationToast";
import QuizList from "@/shared/components/QuizList";
import ConfirmationModal from "@/shared/components/ConfirmationModal";

interface QuizListClientProps {
  initialQuizzes: Quiz[];
  initialError: string | null;
}

export default function QuizListClient({
  initialQuizzes,
  initialError,
}: QuizListClientProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [quizToConfirm, setQuizToConfirm] = useState<string | null>(null);

  const showNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 4000);
    },
    []
  );

  useEffect(() => {
    if (initialError) {
      showNotification(initialError, "error");
    }
  }, [initialError, showNotification]);

  const openDeleteModal = useCallback((id: string) => {
    setQuizToConfirm(id);
  }, []);

  const executeDelete = useCallback(async () => {
    if (!quizToConfirm) return;

    const id = quizToConfirm;
    setQuizToConfirm(null);

    setDeletingId(id);
    try {
      await quizService.deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      showNotification("Quiz successfully deleted!", "success");
    } catch (error) {
      console.error("Failed to delete quiz", error);
      showNotification("Failed to delete quiz. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  }, [quizToConfirm, showNotification]);

  const cancelDelete = useCallback(() => {
    setQuizToConfirm(null);
  }, []);

  const getQuizTitle = (id: string | null) => {
    const quiz = quizzes.find((q) => q.id === id);
    return quiz ? quiz.title : "this quiz";
  };

  return (
    <>
      {notification && (
        <NotificationToast
          notification={notification}
          onDismiss={() => setNotification(null)}
        />
      )}

      <ConfirmationModal
        isOpen={!!quizToConfirm}
        quizTitle={getQuizTitle(quizToConfirm)}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />

      <QuizList
        quizzes={quizzes}
        deletingId={deletingId}
        handleDeleteQuiz={openDeleteModal}
      />
    </>
  );
}
