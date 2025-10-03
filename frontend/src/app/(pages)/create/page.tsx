"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { QuizForm } from "@/shared/types/form";
import { FormInput } from "@/shared/components/FormInput";
import QuestionBlock from "@/shared/components/QuestionBlock";
import NotificationToast from "@/shared/components/NotificationToast";
import { useQuizBuilder } from "@/shared/shared/useQuizBuilder";

export default function CreatePage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuizForm>({
    defaultValues: {
      title: "",
      questions: [{ text: "", type: "boolean", options: ["", ""] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { createQuiz, loading, notification, dismissNotification } =
    useQuizBuilder();

  const onSubmit = (data: QuizForm) => createQuiz(data, reset);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <NotificationToast
        notification={notification}
        onDismiss={dismissNotification}
      />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-3">
          Quiz Builder
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <FormInput
              label="Quiz Title"
              placeholder="e.g., 'React Knowledge Test'"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Questions List</h2>
            <div className="space-y-8">
              {fields.map((field, idx) => (
                <QuestionBlock
                  key={field.id}
                  idx={idx}
                  register={register}
                  watch={watch}
                  errors={errors}
                  remove={remove}
                  total={fields.length}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                append({ text: "", type: "boolean", options: ["", ""] })
              }
              className="flex items-center justify-center w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-200"
            >
              <Plus size={20} className="mr-2" />
              Add Question
            </button>
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold text-lg rounded-lg shadow-xl transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}
