'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.warn('Next.js client error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F6F2] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
        <h1 className="font-heading text-2xl font-medium">Studio Experience Notice</h1>
        <p className="text-xs text-white/60 leading-relaxed font-mono">
          A temporary rendering event occurred. You can refresh the view or return to the studio overview.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#91A99B] text-[#111215] text-xs font-semibold rounded hover:bg-[#A5B5AA] transition-colors cursor-pointer"
          >
            Reload View
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-white/20 text-xs font-mono rounded hover:bg-white/10 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}