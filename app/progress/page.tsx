import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgressData } from "@/lib/progress-db";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/Button";
import Link from "next/link";

export default async function ProgressPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const progress = await getProgressData(userId);

  if (progress.overall.total === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Card>
          <EmptyState
            title="No study items yet"
            description="Create a study plan with some study items to start tracking your progress."
            action={
              <Link href="/plans/new">
                <Button variant="primary">Create Study Plan</Button>
              </Link>
            }
          />
        </Card>
      </main>
    );
  }

  const overallPercent = Math.round(
    (progress.overall.completed / progress.overall.total) * 100
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Your Progress
      </h1>

      <Card>
        <h2 className="font-heading text-lg font-semibold">Overall Progress</h2>
        <div className="mt-4">
          <ProgressBar
            value={overallPercent}
            label={`${progress.overall.completed} of ${progress.overall.total} items completed`}
          />
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-lg font-semibold">Progress by Course</h2>
        <div className="mt-4 space-y-4">
          {progress.byCourse.map((course) => (
            <ProgressBar
              key={course.courseId}
              value={Math.round((course.completed / course.total) * 100)}
              label={`${course.courseName} (${course.completed}/${course.total})`}
            />
          ))}
        </div>
      </Card>

      {progress.overdueItems.length > 0 && (
        <Card>
          <h2 className="font-heading text-lg font-semibold text-error">
            Overdue ({progress.overdueItems.length})
          </h2>
          <ul className="mt-3 space-y-2 font-body text-sm">
            {progress.overdueItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.title}</span>
                <span className="text-gray-500">
                  {item.courseName} — due {item.dueDate}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="font-heading text-lg font-semibold">
          Upcoming ({progress.upcomingItems.length})
        </h2>
        <ul className="mt-3 space-y-2 font-body text-sm">
          {progress.upcomingItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-500">
                {item.courseName}
                {item.dueDate ? ` — due ${item.dueDate}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-heading text-lg font-semibold">
          Completed ({progress.completedItems.length})
        </h2>
        <ul className="mt-3 space-y-2 font-body text-sm text-gray-500">
          {progress.completedItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="line-through">{item.title}</span>
              <span>{item.courseName}</span>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}