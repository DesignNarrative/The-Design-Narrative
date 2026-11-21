'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const isChunkError =
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch') ||
      error.name === 'ChunkLoadError';

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#050505] text-white flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md space-y-6">
          <div className="text-violet-400 font-mono text-xs font-bold tracking-widest uppercase">
            RESTORING SESSION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            WE&apos;LL BE RIGHT BACK
          </h1>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            A temporary connection shift occurred. Tap below to reload the experience.
          </p>
          <div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
            >
              Refresh Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
