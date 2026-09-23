'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Sequence of 16 high-quality design steps: sketches -> measurements -> coding -> dashboard -> launch
const IMAGE_SEQUENCE = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80', // 1. Abstract strategy sketch
  'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1000&q=80', // 2. Strategy Mapping
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&q=80', // 3. Design blueprints
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&q=80', // 4. Logo grid alignments
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1000&q=80', // 5. Palette swatches
  'https://images.unsplash.com/photo-1561070791-26c113006238?w=1000&q=80', // 6. Typography print layouts
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1000&q=80', // 7. Packaging layout mock
  'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=1000&q=80', // 8. Brand identity booklet
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&q=80', // 9. UI wireframes Figma
  'https://images.unsplash.com/photo-1541462608141-2f5287b6e665?w=1000&q=80', // 10. Mobile interaction zones
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80', // 11. Code Editor responsive check
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&q=80', // 12. SMO Campaign graphic grid
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80', // 13. Search Optimization graphs
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80', // 14. Performance metric analytics
  'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=1000&q=80', // 15. Organic Reach results chart
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80', // 16. Final launch dashboard
];

export default function ImageSequenceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  // 1. Preload all images on mount to ensure smooth scrubbing without flicker
  useEffect(() => {
    IMAGE_SEQUENCE.forEach((src) => {
      const img = new globalThis.Image();
      img.src = src;
    });
  }, []);

  // 2. Setup GSAP ScrollTrigger timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const frame = frameRef.current;
    const overlay = overlayRef.current;

    if (!container || !frame || !overlay) return;

    // Track scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=200%', // pin page for 2 screen heights
        scrub: 1.2,    // seek momentum
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map progress (0 to 1) to image index (0 to 15)
          const index = Math.floor(self.progress * (IMAGE_SEQUENCE.length - 1));
          setFrameIndex(Math.min(index, IMAGE_SEQUENCE.length - 1));
        },
      },
    });

    // Zoom the visual frame card to full-screen
    tl.to(frame, {
      scale: 1,
      borderRadius: '0px',
      ease: 'none',
      duration: 1,
    }, 0);

    // Fade in the bottom call-to-action overlay
    tl.to(overlay, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      duration: 0.4,
    }, 0.6); // start fade in when the zoom is mostly done

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      {/* Monospace floating metadata header (Un-ignorable layout) */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center px-4 py-2 rounded-full border border-black/10 bg-white/75 backdrop-blur-md text-[9px] font-mono font-bold tracking-widest text-[#111111] uppercase select-none pointer-events-none">
        THE DESIGN NARRATIVE • SHAPING BRAND PERCEPTION
      </div>

      {/* Zooming Flip-Book Frame Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-0 overflow-hidden pointer-events-none">
        <div
          ref={frameRef}
          className="relative w-full h-full scale-[0.65] rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-[#050505]"
          style={{
            willChange: 'transform, border-radius',
          }}
        >
          {/* Flip-book image */}
          <img
            src={IMAGE_SEQUENCE[frameIndex]}
            alt="TDN Creative Process Sequence"
            className="w-full h-full object-cover transition-opacity duration-100"
          />
          
          {/* Dark gradient mask at bottom for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-15" />
        </div>
      </div>

      {/* Floating Bottom CTA (Fades in over full-bleed frames) */}
      <div
        ref={overlayRef}
        className="absolute inset-x-0 bottom-16 flex flex-col items-center justify-center text-center z-20 px-6 opacity-0 translate-y-6 select-none pointer-events-none"
      >
        <div className="flex gap-4 pointer-events-auto">
          <Link
            href="https://wa.me/919850417266?text=Hey%20TDN!%20We%20saw%20your%20design%20sequence%20and%20want%20to%20work%20together!%20Let's%20collaborate."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-full bg-white hover:bg-white/85 text-black font-extrabold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Slide into DMs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
