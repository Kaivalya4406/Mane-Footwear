"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-navy sm:text-3xl">Something Went Wrong</h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
        We&apos;re having trouble loading this page right now. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark"
      >
        Try Again
      </button>
    </div>
  );
}