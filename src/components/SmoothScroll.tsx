'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On mobile and touch devices, use native hardware-accelerated momentum scrolling
    // to prevent browser tab memory exhaustion and ResizeObserver thrashing.
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) {
      return;
    }

    let lenis: Lenis | null = null;
    let animationFrameId: number;
    let resizeFrameId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        }
      }

      animationFrameId = requestAnimationFrame(raf);

      // Debounce resize via requestAnimationFrame to prevent ResizeObserver loop limit exceeded crashes
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrameId);
        resizeFrameId = requestAnimationFrame(() => {
          try {
            lenis?.resize();
          } catch {
            // Ignore benign resize observer interruptions
          }
        });
      });

      if (document.body) {
        resizeObserver.observe(document.body);
      }

      return () => {
        cancelAnimationFrame(animationFrameId);
        cancelAnimationFrame(resizeFrameId);
        resizeObserver.disconnect();
        lenis?.destroy();
        lenis = null;
      };
    } catch {
      // Fallback to native scrolling if Lenis fails to initialize
    }
  }, []);

  return <>{children}</>;
}
