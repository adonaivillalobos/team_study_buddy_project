"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { StudyPlanFormSchema, type StudyPlanFormState } from "./definitions";
import {
  getOrCreateCourse,
  createStudyPlan,
  createStudyItems,
  updateStudyPlan,
  replaceStudyItems,
  deleteStudyPlan,
} from "./study-plans-db";

const FORM_FIELDS = ["courseName", "title", "startDate", "targetDate", "studyItems"] as const;

function snapshotValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of FORM_FIELDS) {
    const raw = formData.get(field);
    if (typeof raw === "string") values[field] = raw;
  }
  return values;
}

export async function createStudyPlanAction(
  prevState: StudyPlanFormState,
  formData: FormData
): Promise<StudyPlanFormState> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const values = snapshotValues(formData);

  const validatedFields = StudyPlanFormSchema.safeParse({
    courseName: formData.get("courseName"),
    title: formData.get("title"),
    startDate: formData.get("startDate"),
    targetDate: formData.get("targetDate"),
    studyItems: formData.get("studyItems"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    };
  }

  const data = validatedFields.data;

  try {
    const course = await getOrCreateCourse(userId, data.courseName);
    const plan = await createStudyPlan({
      userId,
      courseId: course.id,
      title: data.title,
      startDate: data.startDate,
      targetDate: data.targetDate,
    });
    await createStudyItems(plan.id, data.studyItems);
  } catch (error) {
    console.error("Failed to create study plan:", error);
    throw new Error("Something went wrong while creating your study plan. Please try again.");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateStudyPlanAction(
  planId: string,
  prevState: StudyPlanFormState,
  formData: FormData
): Promise<StudyPlanFormState> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const values = snapshotValues(formData);

  const validatedFields = StudyPlanFormSchema.safeParse({
    courseName: formData.get("courseName"),
    title: formData.get("title"),
    startDate: formData.get("startDate"),
    targetDate: formData.get("targetDate"),
    studyItems: formData.get("studyItems"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    };
  }

  const data = validatedFields.data;

  try {
    const course = await getOrCreateCourse(userId, data.courseName);
    await updateStudyPlan(planId, userId, {
      courseId: course.id,
      title: data.title,
      startDate: data.startDate,
      targetDate: data.targetDate,
    });
    await replaceStudyItems(planId, data.studyItems);
  } catch (error) {
    console.error("Failed to update study plan:", error);
    throw new Error("Something went wrong while updating your study plan. Please try again.");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteStudyPlanAction(planId: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to delete a study plan.");
  }

  try {
    await deleteStudyPlan(planId, userId);
  } catch (error) {
    console.error("Failed to delete study plan:", error);
    throw new Error("Something went wrong while deleting your study plan. Please try again.");
  }

  revalidatePath("/dashboard");
}