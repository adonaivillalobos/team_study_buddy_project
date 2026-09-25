"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CourseFilter({ courseNames }: { courseNames: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("course") ?? "";

  return (
    <div>
      <label htmlFor="course-filter" className="sr-only">
        Filter by course
      </label>
      <select
        id="course-filter"
        value={current}
        onChange={(e) => {
          const value = e.target.value;
          router.push(value ? `/dashboard?course=${encodeURIComponent(value)}` : "/dashboard");
        }}
        className="rounded-control border-gray-300 shadow-sm font-body text-sm"
      >
        <option value="">All Courses</option>
        {courseNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}