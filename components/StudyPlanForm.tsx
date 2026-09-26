"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createStudyPlanAction, updateStudyPlanAction } from "@/lib/actions";
import type { StudyPlanFormState } from "@/lib/definitions";

const initialState: StudyPlanFormState = {};

type StudyPlanFormProps = {
  mode?: "create" | "edit";
  planId?: string;
  defaultValues?: {
    courseName: string;
    title: string;
    startDate: string;
    targetDate: string;
    studyItems: string;
  };
};

export default function StudyPlanForm({
  mode = "create",
  planId,
  defaultValues,
}: StudyPlanFormProps) {
  const action =
    mode === "edit" && planId
      ? updateStudyPlanAction.bind(null, planId)
      : createStudyPlanAction;

  const [state, formAction, isPending] = useActionState(action, initialState);

  // React clears uncontrolled fields after every action call. Bumping this
  // key remounts the form so `v` below is re-applied as each input's
  // defaultValue, making what the user typed reappear after a failed submit.
  const [resetKey, setResetKey] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setResetKey((k) => k + 1);
  }, [state]);

  const v = {
    courseName: state.values?.courseName ?? defaultValues?.courseName ?? "",
    title: state.values?.title ?? defaultValues?.title ?? "",
    startDate: state.values?.startDate ?? defaultValues?.startDate ?? "",
    targetDate: state.values?.targetDate ?? defaultValues?.targetDate ?? "",
    studyItems: state.values?.studyItems ?? defaultValues?.studyItems ?? "",
  };

  return (
    <form action={formAction} key={resetKey} className="space-y-6">
      {state.message && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <Field
        id="courseName"
        label="Course Name"
        defaultValue={v.courseName}
        errors={state.errors?.courseName}
      />

      <Field
        id="title"
        label="Study Plan Title"
        defaultValue={v.title}
        errors={state.errors?.title}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field
          id="startDate"
          label="Start Date"
          type="date"
          defaultValue={v.startDate}
          errors={state.errors?.startDate}
        />
        <Field
          id="targetDate"
          label="Target Date"
          type="date"
          defaultValue={v.targetDate}
          errors={state.errors?.targetDate}
        />
      </div>

      <div>
        <label htmlFor="studyItems" className="block text-sm font-medium text-gray-700">
          Study Items (one per line, format: Title | Due Date, e.g. Read Chapter 3 | 2026-10-05)
        </label>
        <textarea
          id="studyItems"
          name="studyItems"
          rows={5}
          defaultValue={v.studyItems}
          aria-describedby="studyItems-error"
          className="mt-1 block w-full rounded-control border-gray-300 shadow-sm"
        />
        <div id="studyItems-error" aria-live="polite" className="mt-1 text-sm text-red-600">
          {state.errors?.studyItems?.map((msg) => (
            <p key={msg}>{msg}</p>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-control bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50"
      >
        {isPending
          ? mode === "edit"
            ? "Saving..."
            : "Creating..."
          : mode === "edit"
          ? "Save Changes"
          : "Create Study Plan"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        aria-describedby={`${id}-error`}
        className="mt-1 block w-full rounded-control border-gray-300 shadow-sm"
      />
      <div id={`${id}-error`} aria-live="polite" className="mt-1 text-sm text-red-600">
        {errors?.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
}