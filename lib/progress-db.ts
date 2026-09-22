import { supabase } from "./supabase";

export type ProgressData = {
  overall: { completed: number; total: number };
  byCourse: { courseId: string; courseName: string; completed: number; total: number }[];
  completedItems: { id: string; title: string; courseName: string }[];
  overdueItems: { id: string; title: string; dueDate: string; courseName: string }[];
  upcomingItems: { id: string; title: string; dueDate: string | null; courseName: string }[];
};

export async function getProgressData(userId: string): Promise<ProgressData> {
  const { data, error } = await supabase
    .from("study_items")
    .select(
      `
      id, title, due_date, completed,
      study_plans!inner (
        id, user_id,
        courses ( id, name )
      )
    `
    )
    .eq("study_plans.user_id", userId);

  if (error) throw error;

  const today = new Date().toISOString().slice(0, 10);

  const overall = { completed: 0, total: 0 };
  const byCourseMap = new Map<string, { courseName: string; completed: number; total: number }>();
  const completedItems: ProgressData["completedItems"] = [];
  const overdueItems: ProgressData["overdueItems"] = [];
  const upcomingItems: ProgressData["upcomingItems"] = [];

  for (const row of data ?? []) {
    // Supabase types this as an array in TS even though it's a to-one relation
    const plan = Array.isArray(row.study_plans) ? row.study_plans[0] : row.study_plans;
    const course = Array.isArray(plan?.courses) ? plan.courses[0] : plan?.courses;
    const courseId = course?.id ?? "unknown";
    const courseName = course?.name ?? "Unknown course";

    overall.total += 1;
    if (row.completed) overall.completed += 1;

    if (!byCourseMap.has(courseId)) {
      byCourseMap.set(courseId, { courseName, completed: 0, total: 0 });
    }
    const courseStats = byCourseMap.get(courseId)!;
    courseStats.total += 1;
    if (row.completed) courseStats.completed += 1;

    if (row.completed) {
      completedItems.push({ id: row.id, title: row.title, courseName });
    } else if (row.due_date && row.due_date < today) {
      overdueItems.push({ id: row.id, title: row.title, dueDate: row.due_date, courseName });
    } else {
      upcomingItems.push({ id: row.id, title: row.title, dueDate: row.due_date, courseName });
    }
  }

  const byCourse = Array.from(byCourseMap.entries()).map(([courseId, stats]) => ({
    courseId,
    ...stats,
  }));

  return { overall, byCourse, completedItems, overdueItems, upcomingItems };
}