import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, GraduationCap, CheckCircle2, Flame } from "lucide-react";
import { getOrCreateUser } from "@/lib/auth";
import { getStudyPlansForUser, getTasksDueThisWeekCount } from "@/lib/study-plans-db";
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

  const [allPlans, tasksThisWeek] = await Promise.all([
    getStudyPlansForUser(user.id),
    getTasksDueThisWeekCount(user.id),
  ]);

  const courseNames = Array.from(new Set(allPlans.map((p) => p.courseName))).sort();
  const plans = selectedCourse
    ? allPlans.filter((p) => p.courseName === selectedCourse)
    : allPlans;

  const totalItems = allPlans.reduce((sum, p) => sum + p.totalItems, 0);
  const completedItems = allPlans.reduce((sum, p) => sum + p.completedItems, 0);
  const overallPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const stats = [
    {
      icon: BookOpen,
      value: allPlans.length,
      label: "Active Plans",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: GraduationCap,
      value: courseNames.length,
      label: "Total Courses",
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      icon: CheckCircle2,
      value: tasksThisWeek,
      label: "Tasks This Week",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Flame,
      value: `${overallPercent}%`,
      label: "Overall Progress",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
  ];

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Welcome back, {user.name}
          </h1>
          <p className="font-body text-sm text-gray-600 mt-1">
            Your goals. Your plan. Your progress.
          </p>
        </div>
        <Link href="/plans/new">
          <Button variant="primary">Create Study Plan</Button>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label, iconBg, iconColor }) => (
          <Card key={label}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <p className="font-heading text-2xl font-bold text-foreground mt-3">{value}</p>
            <p className="font-body text-sm text-gray-600">{label}</p>
          </Card>
        ))}
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
          <div className="mt-8 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Your Study Plans</h2>
            <CourseFilter courseNames={courseNames} />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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