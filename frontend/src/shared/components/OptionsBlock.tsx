import { UseFormRegister } from "react-hook-form";
import { QuizForm } from "../types/form";

interface Props {
  idx: number;
  register: UseFormRegister<QuizForm>;
  type: string;
}

export default function OptionsBlock({ idx, register, type }: Props) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 space-y-3">
      <p className="text-sm font-medium text-gray-700">
        {type === "checkbox"
          ? "Варіанти відповіді (заповніть хоча б 2)"
          : "Варіанти (наприклад: Так, Ні)"}
      </p>
      <div className="space-y-2">
        {[0, 1, 2].map((optionIdx) => (
          <input
            key={optionIdx}
            {...register(`questions.${idx}.options.${optionIdx}`)}
            placeholder={`Варіант ${optionIdx + 1} ${
              optionIdx >= 2 ? "(опціонально)" : ""
            }`}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
          />
        ))}
      </div>
    </div>
  );
}
