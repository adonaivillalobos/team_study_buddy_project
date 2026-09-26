"use client";

import { useTransition } from "react";
import { deleteStudyPlanAction } from "@/lib/actions";

export default function DeleteStudyPlanButton({
  planId,
  planTitle,
}: {
  planId: string;
  planTitle: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${planTitle}"? This will also delete all of its study items. This cannot be undone.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      await deleteStudyPlanAction(planId);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-error hover:underline disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}