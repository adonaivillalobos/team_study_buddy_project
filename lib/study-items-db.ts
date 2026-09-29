import { supabase } from "./supabase";

// Toggles a study item's completion, scoped to the owning user via a join
// through study_plans. Returns null if the item doesn't exist OR belongs
// to someone else -- same "indistinguishable" pattern used elsewhere in
// this app, so no information leaks about items that aren't the caller's.
export async function setStudyItemCompletion(
  itemId: string,
  userId: string,
  completed: boolean
) {
  const { data: owned, error: ownedError } = await supabase
    .from("study_items")
    .select("id, study_plans!inner(user_id)")
    .eq("id", itemId)
    .eq("study_plans.user_id", userId)
    .maybeSingle();

  if (ownedError) throw ownedError;
  if (!owned) return null;

  const { data, error } = await supabase
    .from("study_items")
    .update({ completed })
    .eq("id", itemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}