"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudyItemToggle({
  itemId,
  completed,
  label,
}: {
  itemId: string;
  completed: boolean;
  label: string;
}) {
  const [checked, setChecked] = useState(completed);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleChange = async () => {
    const next = !checked;
    setChecked(next); // optimistic update
    setIsSaving(true);

    try {
      const res = await fetch(`/api/study-items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: next }),
      });

      if (!res.ok) {
        setChecked(!next); // revert on failure
        return;
      }

      router.refresh(); // re-fetch the page's server data so lists re-sort
    } catch {
      setChecked(!next);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={isSaving}
        aria-label={`Mark "${label}" as ${checked ? "incomplete" : "complete"}`}
        className="h-4 w-4 rounded border-gray-300 text-primary"
      />
    </label>
  );
}