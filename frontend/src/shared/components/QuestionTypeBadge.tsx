import { CheckSquare, ListChecks, MinusSquare, Type } from "lucide-react";
import { Question } from "../types/quiz";

export const QuestionTypeBadge: React.FC<{ type: Question["type"] }> = ({
  type,
}) => {
  let text = "";
  let Icon = Type;
  let color = "bg-gray-200 text-gray-700";

  switch (type) {
    case "boolean":
      text = "True/False";
      Icon = CheckSquare;
      color = "bg-green-100 text-green-700";
      break;
    case "input":
      text = "Текстове поле";
      Icon = Type;
      color = "bg-blue-100 text-blue-700";
      break;
    case "checkbox":
      text = "Множинний вибір";
      Icon = ListChecks;
      color = "bg-purple-100 text-purple-700";
      break;
    default:
      text = "Невідомий тип";
      Icon = MinusSquare;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${color}`}
    >
      <Icon size={14} />
      {text}
    </span>
  );
};
