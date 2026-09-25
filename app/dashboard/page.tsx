import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/auth";
import { getStudyPlansForUser } from "@/lib/study-plans-db";
import StudyPlanCard from "@/components/StudyPlanCard";
import CourseFilter from "@/components/CourseFilter";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage(props: {
  searchParams?: Promise<{ course?: string }>;
}) {
  const user = await getOrCreateUser();
  if (!user) {
    redirect("/");
  }

  const searchParams = await props.searchParams;
  const selectedCourse = searchParams?.course ?? "";

  const allPlans = await getStudyPlansForUser(user.id);
  const courseNames = Array.from(new Set(allPlans.map((p) => p.courseName))).sort();
  const plans = selectedCourse
    ? allPlans.filter((p) => p.courseName === selectedCourse)
    : allPlans;

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Welcome, {user.name}
        </h1>
        <Link href="/plans/new">
          <Button variant="primary">Create Study Plan</Button>
        </Link>
      </div>

      {allPlans.length === 0 ? (
        <Card className="mt-6">
          <EmptyState
            title="No study plans yet"
            description="Create your first study plan to get started."
            action={
              <Link href="/plans/new">
                <Button variant="primary">Create Study Plan</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <>
          <div className="mt-6">
            <CourseFilter courseNames={courseNames} />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <StudyPlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {plans.length === 0 && (
            <p className="mt-6 font-body text-sm text-gray-600">
              No study plans for this course yet.
            </p>
          )}
        </>
      )}
    </main>
  );
}