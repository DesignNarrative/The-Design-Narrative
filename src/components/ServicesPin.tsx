'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const CHAPTERS = [
  {
    title: 'Brand Design',
    desc: 'Strategy, naming, and visual identity that make your business people\'s main character. No templates.',
    video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761',
    accent: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    btnBg: 'bg-violet-600 hover:bg-violet-500',
    link: '/services/brand-design',
  },
  {
    title: 'UI UX Design',
    desc: 'Visually stunning, responsive websites and apps shaped by user behavior. Buttery-smooth layouts.',
    video: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761',
    accent: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    btnBg: 'bg-cyan-600 hover:bg-cyan-500',
    link: '/services/ui-ux',
  },
  {
    title: 'Social Marketing',
    desc: 'Compelling campaigns and feed-stopping page management designed to capture infinite attention.',
    video: 'https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761',
    accent: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
    btnBg: 'bg-pink-600 hover:bg-pink-500',
    link: '/services/social-media',
  },
  {
    title: 'SEO Growth',
    desc: 'Google ranking optimization that gets you organic page 1 slots and crushes the competition.',
    video: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7f26c6d2c49ee69a4c5148d4fb9fcf32d207ec29&profile_id=139&oauth2_token_id=57447761',
    accent: 'text-lime-400 border-lime-500/20 bg-lime-500/5',
    btnBg: 'bg-lime-500 text-black hover:bg-lime-400',
    link: '/services/seo',
  },
];

export default function ServicesPin() {
  const pinRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = pinRef.current;
    const panels = panelsRef.current;

    if (!pin || !panels) return;

    const panelsList = gsap.utils.toArray('.service-panel') as HTMLElement[];

    // Set initial opacity: Panel 0 is visible, rest are hidden
    panelsList.forEach((panel, idx) => {
      if (idx !== 0) {
        gsap.set(panel, { opacity: 0, pointerEvents: 'none' });
      }
    });

    // Create pinning scrolltrigger
    const masterScroll = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: '+=300%', // 300% scroll depth for 4 panels
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalPanels = panelsList.length;
        
        // Calculate the current active panel index and offset progress
        const activeIndex = Math.min(Math.floor(progress * totalPanels), totalPanels - 1);
        
        panelsList.forEach((panel, idx) => {
          if (idx === activeIndex) {
            // Fade in the active panel
            gsap.to(panel, { opacity: 1, pointerEvents: 'auto', duration: 0.35, overwrite: 'auto' });
          } else {
            // Fade out inactive panels
            gsap.to(panel, { opacity: 0, pointerEvents: 'none', duration: 0.35, overwrite: 'auto' });
          }
        });
      }
    });

    return () => {
      masterScroll.kill();
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      <div ref={panelsRef} className="absolute inset-0 w-full h-full">
        {CHAPTERS.map((chapter, idx) => (
          <div
            key={idx}
            className="service-panel absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12"
          >
            {/* Loop Video Background */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <video
                src={chapter.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-20 filter grayscale"
              />
            </div>

            {/* Content Card Overlay */}
            <div className="relative z-20 max-w-4xl mx-auto space-y-8 w-full">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  CHAPTER 0{idx + 1} &bull; SERVICE
                </span>
                
                <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tight leading-none text-white">
                  {chapter.title}
                </h2>
                
                <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed max-w-2xl">
                  {chapter.desc}
                </p>
              </div>

              <div className="pt-4 flex gap-4">
                <Link
                  href={chapter.link}
                  className={`inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${chapter.btnBg}`}
                >
                  Explore Service <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Chapter Indicators at bottom */}
            <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-20 flex justify-between items-center text-[9px] font-mono tracking-widest text-gray-500 uppercase">
              <span>THE DESIGN NARRATIVE</span>
              <div className="flex gap-2">
                {CHAPTERS.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      dotIdx === idx ? 'bg-white' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
