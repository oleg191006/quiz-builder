import { z } from "zod";

const optionSplitter = (val: string) =>
  val
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

export const questionSchema = z
  .object({
    type: z.enum(["boolean", "input", "checkbox"]),
    text: z.string().min(5, "Question text must be at least 5 characters."),
    optionsText: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.type === "checkbox" || data.type === "boolean") {
      const options = optionSplitter(data.optionsText);
      if (options.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["optionsText"],
          message:
            "This question type requires at least 2 options (separated by a comma).",
        });
      }
    }
  });

export const quizFormSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters."),
  questions: z
    .array(questionSchema)
    .min(1, "You must add at least one question."),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;

export type QuestionFormValues = z.infer<typeof questionSchema>;
