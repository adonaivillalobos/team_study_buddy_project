import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Welcome, {user.name}
      </h1>
      <p className="font-body text-sm text-gray-600 mt-2">
        Your account is set up. (Real dashboard coming in issue #4.)
      </p>
    </main>
  );
}