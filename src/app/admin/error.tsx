"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
      <div className="bg-surface-2 rounded-[15px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-12 text-center">
        <h1 className="text-[2rem] font-bold text-app-text mb-1 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">Something went wrong</h1>
        <p className="text-[0.95rem] text-text-muted mb-8 font-normal">
          Failed to load organization settings. Please try again.
        </p>
        <button className="save-button" onClick={reset}>
          Retry
        </button>
      </div>
    </div>
  );
}
