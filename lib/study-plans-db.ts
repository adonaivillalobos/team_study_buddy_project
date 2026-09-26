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

export type StudyPlanCardData = {
  id: string;
  title: string;
  startDate: string;
  targetDate: string;
  courseId: string;
  courseName: string;
  totalItems: number;
  completedItems: number;
};

// Fetches every study plan belonging to the signed-in user, with its
// course name and item-completion counts for the progress bar. Ownership
// is enforced here via .eq("user_id", userId) -- a user can only ever
// get their own plans back from this query.
export async function getStudyPlansForUser(
  userId: string
): Promise<StudyPlanCardData[]> {
  const { data, error } = await supabase
    .from("study_plans")
    .select(
      `
      id, title, start_date, target_date,
      courses ( id, name ),
      study_items ( id, completed )
    `
    )
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((plan) => {
    const course = Array.isArray(plan.courses) ? plan.courses[0] : plan.courses;
    const items = plan.study_items ?? [];
    return {
      id: plan.id,
      title: plan.title,
      startDate: plan.start_date,
      targetDate: plan.target_date,
      courseId: course?.id ?? "unknown",
      courseName: course?.name ?? "Unknown course",
      totalItems: items.length,
      completedItems: items.filter((i) => i.completed).length,
    };
  });
}

export type StudyPlanWithItems = {
  id: string;
  title: string;
  startDate: string;
  targetDate: string;
  courseName: string;
  studyItems: { title: string; dueDate: string | null }[];
};

// Fetches a single study plan for editing, scoped to the owning user.
// Returns null if the plan doesn't exist OR doesn't belong to this user --
// the two cases are indistinguishable on purpose, so a user probing
// another person's plan ID learns nothing (same as a 404).
export async function getStudyPlanForEdit(
  id: string,
  userId: string
): Promise<StudyPlanWithItems | null> {
  const { data, error } = await supabase
    .from("study_plans")
    .select(
      `
      id, title, start_date, target_date,
      courses ( name ),
      study_items ( title, due_date )
    `
    )
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const course = Array.isArray(data.courses) ? data.courses[0] : data.courses;

  return {
    id: data.id,
    title: data.title,
    startDate: data.start_date,
    targetDate: data.target_date,
    courseName: course?.name ?? "",
    studyItems: (data.study_items ?? []).map((item) => ({
      title: item.title,
      dueDate: item.due_date,
    })),
  };
}

// Updates a study plan. The WHERE clause includes user_id, not just id --
// this is the actual authorization boundary: even if a user somehow
// submits another user's plan ID, this query matches zero rows and
// silently does nothing rather than modifying someone else's data.
export async function updateStudyPlan(
  id: string,
  userId: string,
  data: {
    courseId: string;
    title: string;
    startDate: string;
    targetDate: string;
  }
) {
  const { error } = await supabase
    .from("study_plans")
    .update({
      course_id: data.courseId,
      title: data.title,
      start_date: data.startDate,
      target_date: data.targetDate,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function replaceStudyItems(
  studyPlanId: string,
  items: { title: string; dueDate: string | null }[]
) {
  const { error: deleteError } = await supabase
    .from("study_items")
    .delete()
    .eq("study_plan_id", studyPlanId);

  if (deleteError) throw deleteError;

  if (items.length > 0) {
    await createStudyItems(studyPlanId, items);
  }
}

// Deletes a study plan, scoped to the owning user (same ownership pattern
// as updateStudyPlan above). study_items are removed automatically via
// the ON DELETE CASCADE foreign key defined in the schema.
export async function deleteStudyPlan(id: string, userId: string) {
  const { error } = await supabase
    .from("study_plans")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}