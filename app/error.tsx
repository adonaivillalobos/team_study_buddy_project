"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="font-body text-gray-600 mt-3">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-control bg-primary px-4 py-2 text-white hover:bg-primary-hover"
        >
          Try Again
        </button>
        <Link href="/">
          <Button variant="secondary">Go Home</Button>
        </Link>
      </div>
    </main>
  );
}