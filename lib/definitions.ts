import { z } from "zod";

export const StudyPlanFormSchema = z
  .object({
    courseName: z.string().min(1, "Course name is required"),
    title: z.string().min(1, "Study plan title is required"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
    targetDate: z
      .string()
      .min(1, "Target date is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Target date must be in YYYY-MM-DD format"),
    // Optional multi-line field: "Title | YYYY-MM-DD" or just "Title" per line
    studyItems: z
      .string()
      .optional()
      .transform((val) =>
        val
          ? val
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => {
                const [title, dueDate] = line.split("|").map((s) => s.trim());
                return { title, dueDate: dueDate || null };
              })
          : []
      ),
  })
  .refine((data) => data.targetDate >= data.startDate, {
    message: "Target date must be on or after the start date",
    path: ["targetDate"],
  });

export type StudyPlanFormState = {
  message?: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
};