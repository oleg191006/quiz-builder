import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Trash2 } from "lucide-react";

type QuestionType = "boolean" | "input" | "checkbox";

interface QuestionFormType {
  text: string;
  type: QuestionType;
  options?: string[];
}

interface QuizFormType {
  title: string;
  questions: QuestionFormType[];
}

interface QuestionFieldProps {
  index: number;
  register: UseFormRegister<QuizFormType>;
  watchType: QuestionType;
  remove: (index: number) => void;
  isOnlyQuestion: boolean;
  errors: FieldErrors<QuizFormType> | undefined;
}

const InputField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ label, className, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${className}`}
      {...props}
    />
  </div>
);

const QuestionField: React.FC<QuestionFieldProps> = ({
  index,
  register,
  watchType,
  remove,
  isOnlyQuestion,
  errors,
}) => {
  const questionErrors = errors?.questions?.[index];

  return (
    <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md transition hover:shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-700">
          Питання #{index + 1}
        </h3>
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Видалити питання"
          disabled={isOnlyQuestion}
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <InputField
          label="Текст питання"
          placeholder="Введіть формулювання питання"
          {...register(`questions.${index}.text` as const, {
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
            {...register(`questions.${index}.type` as const)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-base text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          >
            <option value="boolean">✅ True / False</option>
            <option value="input">📝 Вільна відповідь (Текст)</option>
            <option value="checkbox">📋 Множинний вибір</option>
          </select>
        </div>
        {(watchType === "checkbox" || watchType === "boolean") && (
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 space-y-3">
            <p className="text-sm font-medium text-gray-700">
              {watchType === "checkbox"
                ? "Варіанти відповіді (заповніть хоча б 2)"
                : "Варіанти (наприклад: Так, Ні)"}
            </p>
            <div className="space-y-2">
              {[0, 1, 2].map((optionIdx) => (
                <input
                  key={optionIdx}
                  {...register(
                    `questions.${index}.options.${optionIdx}` as const
                  )}
                  placeholder={`Варіант ${optionIdx + 1} ${
                    optionIdx >= 2 ? "(опціонально)" : ""
                  }`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionField;
