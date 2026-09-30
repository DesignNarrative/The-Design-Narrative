'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const CHAPTERS = [
  {
    num: '01',
    title: 'Brand Design',
    desc: "Strategy, naming, and visual identity that make your business people's main character. No templates.",
    image: '/assets/services/Brand Design.png',
    accentColor: '#8b5cf6',
    accent: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    btnBg: 'bg-violet-600 hover:bg-violet-500 text-white',
    link: '/services/brand-design',
  },
  {
    num: '02',
    title: 'UI UX Design',
    desc: 'Visually stunning, responsive websites and apps shaped by user behavior. Buttery-smooth layouts.',
    image: '/assets/services/UiUX.png',
    accentColor: '#06b6d4',
    accent: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    btnBg: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    link: '/services/ui-ux',
  },
  {
    num: '03',
    title: 'Social Marketing',
    desc: 'Compelling campaigns and feed-stopping page management designed to capture infinite attention.',
    image: '/assets/services/Social Media.png',
    accentColor: '#ec4899',
    accent: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
    btnBg: 'bg-pink-600 hover:bg-pink-500 text-white',
    link: '/services/social-media',
  },
  {
    num: '04',
    title: 'SEO Growth',
    desc: 'Google ranking optimization that gets you organic page 1 slots and crushes the competition.',
    image: '/assets/services/SEO.png',
    accentColor: '#a3e635',
    accent: 'text-lime-400 border-lime-500/20 bg-lime-500/5',
    btnBg: 'bg-lime-500 text-black hover:bg-lime-400',
    link: '/services/seo',
  },
];

export default function ServicesPin() {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = pinRef.current;
    if (!pin) return;

    const panels = gsap.utils.toArray('.service-panel') as HTMLElement[];
    const contentBlocks = gsap.utils.toArray('.service-content') as HTMLElement[];
    const bgImages = gsap.utils.toArray('.service-bg-image') as HTMLElement[];

    // Set initial states
    panels.forEach((panel, idx) => {
      if (idx !== 0) {
        gsap.set(panel, { opacity: 0, pointerEvents: 'none' });
        gsap.set(contentBlocks[idx], { y: 60, opacity: 0 });
      } else {
        gsap.set(panel, { opacity: 1, pointerEvents: 'auto' });
        gsap.set(contentBlocks[idx], { y: 0, opacity: 1 });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: '+=280%', // Smooth and responsive scroll depth
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollPct(Math.round(progress * 100));

        // Update progress bar fill
        if (progressBarRef.current) {
          progressBarRef.current.style.height = `${Math.max(progress * 100, 5)}%`;
        }

        const total = panels.length;
        const index = Math.min(Math.floor(progress * total), total - 1);
        setActiveIdx(index);

        panels.forEach((panel, idx) => {
          const content = contentBlocks[idx];
          const bg = bgImages[idx];

          // Normalized progress within this specific slide [0, 1]
          const slideStart = idx / total;
          const rawProgress = (progress - slideStart) / (1 / total);
          const slideProgress = Math.max(0, Math.min(1, rawProgress));

          // Continuous responsive zoom: scales from 1.02 to 1.30 on scroll
          const dynamicScale = 1.02 + (slideProgress * 0.28);

          if (idx === index) {
            // Active slide: smooth fade and parallax in
            gsap.to(panel, {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.25,
              overwrite: 'auto',
            });
            gsap.to(content, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            if (bg) {
              // Direct responsive zoom tied immediately to scroll position
              gsap.to(bg, {
                scale: dynamicScale,
                duration: 0.08,
                ease: 'none',
                overwrite: 'auto',
              });
            }
          } else {
            // Inactive slide: fade out smoothly
            gsap.to(panel, {
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.2,
              overwrite: 'auto',
            });
            gsap.to(content, {
              y: idx < index ? -40 : 60,
              opacity: 0,
              duration: 0.2,
              ease: 'power2.in',
              overwrite: 'auto',
            });
            if (bg) {
              gsap.to(bg, {
                scale: idx < index ? 1.30 : 1.02,
                duration: 0.2,
                overwrite: 'auto',
              });
            }
          }
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      {/* 1. All Full-Screen Chapter Panels */}
      <div className="absolute inset-0 w-full h-full">
        {CHAPTERS.map((chapter, idx) => (
          <div
            key={idx}
            className="service-panel absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24"
          >
            {/* Background Image with Parallax Scale */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
              <div className="service-bg-image relative w-full h-full will-change-transform">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  priority={idx === 0}
                  className="object-cover opacity-85 filter contrast-[1.08] brightness-[0.9]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            </div>

            {/* Content Card with Smooth GSAP Scrub */}
            <div className="service-content relative z-20 max-w-4xl space-y-6 md:space-y-8 w-full drop-shadow-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                    CHAPTER {chapter.num} &bull; SERVICE
                  </span>
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: chapter.accentColor }}
                  />
                </div>

                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white drop-shadow-lg">
                  {chapter.title}
                </h2>

                <p className="text-base sm:text-xl md:text-2xl text-gray-200 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                  {chapter.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={chapter.link}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${chapter.btnBg}`}
                >
                  Explore Service <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Floating Live Vertical Progress Tracker (Right Rail) */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
        {/* Active Chapter Index Display */}
        <div className="text-[11px] font-mono font-black text-white bg-black/70 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md tracking-widest shadow-lg">
          0{activeIdx + 1} <span className="text-gray-500">/ 04</span>
        </div>

        {/* Vertical Track & Live Fill Line */}
        <div className="relative w-[3px] h-32 sm:h-40 bg-white/15 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full bg-gradient-to-b from-violet-500 via-cyan-400 to-lime-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_#8b5cf6]"
            style={{ height: '25%' }}
          />
        </div>

        {/* 4 Navigation Chapter Dots */}
        <div className="flex flex-col gap-2.5">
          {CHAPTERS.map((chap, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'bg-white scale-125 shadow-[0_0_8px_#ffffff]'
                  : 'bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Bottom Live Scrolling Helper Cue */}
      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-400 uppercase pointer-events-none">
        <span className="hidden sm:inline-block">THE DESIGN NARRATIVE &bull; CAPABILITIES</span>

        {/* Live Scroll indicator */}
        <div className="flex items-center gap-2 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-white shadow-lg mx-auto sm:mx-0">
          <span className="text-gray-400">SCROLL TO EXPLORE</span>
          <span className="text-violet-400 font-bold">[ {activeIdx + 1} / 4 ]</span>
          <ChevronDown className="w-3.5 h-3.5 text-violet-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
