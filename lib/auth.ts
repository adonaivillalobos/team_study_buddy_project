import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "./supabase";

/**
 * Returns the current user's row from the `users` table, creating it
 * on first visit if it doesn't exist yet (syncing from Clerk).
 * Returns null if nobody is signed in.
 */
export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (existing) return existing;

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress ?? "";
  const name = clerkUser?.fullName || clerkUser?.username || "Student";

  const { data: inserted, error } = await supabase
    .from("users")
    .insert({ id: userId, name, email })
    .select()
    .single();

  if (error) {
    console.error("Failed to create user record:", error);
    throw new Error("Something went wrong setting up your account.");
  }

  return inserted;
}