import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StudyPlanForm from "@/components/StudyPlanForm";

export default async function NewStudyPlanPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Create Study Plan
      </h1>
      <div className="mt-6">
        <StudyPlanForm />
      </div>
    </main>
  );
}