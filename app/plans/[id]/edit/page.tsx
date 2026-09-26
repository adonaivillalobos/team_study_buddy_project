import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getStudyPlanForEdit } from "@/lib/study-plans-db";
import StudyPlanForm from "@/components/StudyPlanForm";

export const metadata: Metadata = {
  title: "Edit Study Plan",
};

export default async function EditStudyPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const { id } = await params;
  const plan = await getStudyPlanForEdit(id, userId);

  // If the plan doesn't exist, OR exists but belongs to someone else,
  // getStudyPlanForEdit returns null either way -- so this 404 doubles
  // as the authorization check for this page.
  if (!plan) {
    notFound();
  }

  const studyItemsText = plan.studyItems
    .map((item) => (item.dueDate ? `${item.title} | ${item.dueDate}` : item.title))
    .join("\n");

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Edit Study Plan
      </h1>
      <div className="mt-6">
        <StudyPlanForm
          mode="edit"
          planId={plan.id}
          defaultValues={{
            courseName: plan.courseName,
            title: plan.title,
            startDate: plan.startDate,
            targetDate: plan.targetDate,
            studyItems: studyItemsText,
          }}
        />
      </div>
    </main>
  );
}