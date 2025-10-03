import React from "react";
import { Trash2 } from "lucide-react";
import { FormInput } from "@/shared/components/FormInput";
import OptionsBlock from "./OptionsBlock";

import type { QuizForm } from "@/shared/types/form";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

interface QuestionBlockProps {
  idx: number;

  register: UseFormRegister<QuizForm>;
  watch: UseFormWatch<QuizForm>;
  errors: FieldErrors<QuizForm>;
  remove: (index: number) => void;
  total: number;
}

export default function QuestionBlock({
  idx,
  register,
  watch,
  errors,
  remove,
  total,
}: QuestionBlockProps) {
  const type = watch(`questions.${idx}.type`);

  const questionErrors = errors.questions?.[idx];

  return (
    <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md transition hover:shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-700">
          Питання #{idx + 1}
        </h3>
        <button
          type="button"
          onClick={() => remove(idx)}
          disabled={total === 1}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Видалити питання"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <FormInput
          label="Текст питання"
          placeholder="Введіть формулювання питання"
          {...register(`questions.${idx}.text` as const, {
            required: "Текст питання обов'язковий",
          })}
        />
        {questionErrors?.text && (
          <p className="text-red-500 text-sm mt-1">
            {questionErrors.text.message}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Тип відповіді
          </label>
          <select
            {...register(`questions.${idx}.type` as const)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-base text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          >
            <option value="boolean">✅ True / False</option>
            <option value="input">📝 Вільна відповідь (Текст)</option>
            <option value="checkbox">📋 Множинний вибір</option>
          </select>
        </div>

        {(type === "checkbox" || type === "boolean") && (
          <OptionsBlock idx={idx} register={register} type={type} />
        )}
      </div>
    </div>
  );
}
