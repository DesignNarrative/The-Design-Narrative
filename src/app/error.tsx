'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Check if error is due to chunk loading failure after new deployment
    const isChunkError =
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.name === 'ChunkLoadError';

    if (isChunkError) {
      // Auto-reload once to fetch fresh chunks from the latest deployment
      const hasReloaded = sessionStorage.getItem('chunk_reload_attempt');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_reload_attempt', 'true');
        window.location.reload();
        return;
      }
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-white text-[#111111]">
      <div className="max-w-md space-y-6">
        <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
          TEMPORARY GLITCH
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          SOMETHING WENT QUIET.
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          The page encountered a brief connection or memory hiccup. A quick refresh brings everything back into rhythm.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              sessionStorage.removeItem('chunk_reload_attempt');
              reset();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Page
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 text-black hover:bg-black/5 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
