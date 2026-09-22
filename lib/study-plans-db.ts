import { supabase } from "./supabase";

export async function getOrCreateCourse(userId: string, courseName: string) {
  const { data: existing } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", userId)
    .eq("name", courseName)
    .maybeSingle();

  if (existing) return existing;

  const { data: inserted, error } = await supabase
    .from("courses")
    .insert({ user_id: userId, name: courseName })
    .select()
    .single();

  if (error) throw error;
  return inserted;
}

export async function createStudyPlan(data: {
  userId: string;
  courseId: string;
  title: string;
  startDate: string;
  targetDate: string;
}) {
  const { data: plan, error } = await supabase
    .from("study_plans")
    .insert({
      user_id: data.userId,
      course_id: data.courseId,
      title: data.title,
      start_date: data.startDate,
      target_date: data.targetDate,
    })
    .select()
    .single();

  if (error) throw error;
  return plan;
}

export async function createStudyItems(
  studyPlanId: string,
  items: { title: string; dueDate: string | null }[]
) {
  if (items.length === 0) return [];

  const rows = items.map((item) => ({
    study_plan_id: studyPlanId,
    title: item.title,
    due_date: item.dueDate,
  }));

  const { data, error } = await supabase.from("study_items").insert(rows).select();
  if (error) throw error;
  return data;
}