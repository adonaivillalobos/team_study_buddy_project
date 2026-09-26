import Link from "next/link";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import DeleteStudyPlanButton from "./DeleteStudyPlanButton";
import type { StudyPlanCardData } from "@/lib/study-plans-db";

export default function StudyPlanCard({ plan }: { plan: StudyPlanCardData }) {
  const percent =
    plan.totalItems > 0
      ? Math.round((plan.completedItems / plan.totalItems) * 100)
      : 0;

  return (
    <Card>
      <p className="font-body text-xs uppercase tracking-wide text-gray-500">
        {plan.courseName}
      </p>
      <h3 className="font-heading text-lg font-semibold mt-1">{plan.title}</h3>
      <p className="font-body text-sm text-gray-600 mt-1">
        {plan.startDate} &rarr; {plan.targetDate}
      </p>

      <div className="mt-4">
        <ProgressBar
          value={percent}
          label={`${plan.completedItems} of ${plan.totalItems} items`}
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Link
          href={`/plans/${plan.id}/edit`}
          className="text-sm text-primary hover:underline"
        >
          Edit
        </Link>
        <DeleteStudyPlanButton planId={plan.id} planTitle={plan.title} />
      </div>
    </Card>
  );
}