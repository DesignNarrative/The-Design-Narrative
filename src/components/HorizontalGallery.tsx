'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    num: '01',
    title: 'CHAV BHARI',
    category: 'Branding & Packaging',
    tag: 'Main Character Energy',
    image: '/assets/projects/Chav Bhari.png',
    video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761',
    link: '/work/chav-bhari',
  },
  {
    num: '02',
    title: 'PINK WALK',
    category: 'Fashion & Identity',
    tag: 'Viral Fashion Brand',
    image: '/assets/logos/pinkwalk logo.jpg',
    video: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761',
    link: '/work/pinkwalk',
  },
  {
    num: '03',
    title: 'YARNEN WEB PLATFORM',
    category: 'UI/UX Web & E-Commerce',
    tag: 'E-Commerce UX',
    image: '/assets/projects/Yarnen fashion.png',
    video: 'https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761',
    link: '/work/yarnen-fashion',
  },
  {
    num: '04',
    title: 'DANGAYACH GROUP',
    category: 'Corporate Branding & Web',
    tag: 'Corporate Luxury',
    image: '/assets/projects/Dangayach.png',
    video: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7f26c6d2c49ee69a4c5148d4fb9fcf32d207ec29&profile_id=139&oauth2_token_id=57447761',
    link: '/work/dangayach-group',
  },
  {
    num: '05',
    title: "O'DAISY E-COMMERCE",
    category: 'UI/UX App & Strategy',
    tag: 'Strategy & Apps',
    image: '/assets/projects/Odaiysy.png',
    video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761',
    link: '/work/odaisy-preschool',
  },
  {
    num: '06',
    title: 'ATELIER NOVA',
    category: 'Branding & Architecture',
    tag: 'Design Systems',
    image: '/assets/logos/Atelier noua logo.png',
    video: 'https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761',
    link: '/work/atelier-noua',
  },
];

// Single project card with smooth hover interaction
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <Link
      href={project.link}
      className="shrink-0 w-[85vw] sm:w-[420px] md:w-[480px] h-[480px] md:h-[520px] rounded-[2.2rem] overflow-hidden bg-[#0d0d11] border border-white/10 hover:border-violet-500/40 shadow-2xl hover:shadow-[0_30px_70px_rgba(139,92,246,0.18)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative group cursor-pointer"
    >
      {/* Visual Frame */}
      <div className="relative w-full h-[340px] md:h-[370px] overflow-hidden bg-black/50">
        {/* Project Thumbnail Image - Always visible with smooth zoom */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none group-hover:opacity-75 transition-opacity duration-300" />

        {/* Category Pill */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-wider font-bold text-violet-300 uppercase border border-white/10 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          {project.category}
        </div>

        {/* Index Badge */}
        <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-xs font-mono font-bold text-gray-300">
          {project.num}
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-6 md:p-7 flex-grow flex flex-col justify-between bg-gradient-to-b from-[#0d0d11] to-[#08080a]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight group-hover:text-violet-400 transition-colors">
              {project.title}
            </h3>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            View case study details
          </span>
          <span className="text-[10px] font-mono text-violet-400/80 uppercase font-bold tracking-wider">
            Explore ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll based on track width and viewport
      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const padding = windowWidth < 768 ? 48 : 96;
        return -(trackWidth - windowWidth + padding);
      };

      gsap.to(track, {
        x: getScrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 800, 1800)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollPct(self.progress);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] text-white min-h-screen flex flex-col justify-between py-12 md:py-16 overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-12">
        <div className="space-y-3">
          <span className="text-[11px] font-mono tracking-widest text-violet-400 font-bold uppercase block">
            PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
            FEATURED PROJECTS
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest border border-white/15 hover:border-violet-500/40 px-6 py-3 rounded-full hover:bg-white/5 transition-all"
          >
            All Work <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll Track (Controlled by GSAP ScrollTrigger) */}
      <div className="relative z-10 w-full overflow-hidden my-auto py-4">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center gap-6 md:gap-8 px-6 md:px-12 will-change-transform"
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} index={idx} project={project} />
          ))}
        </div>
      </div>

      {/* Bottom Progress & Scroll Cue Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
        <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          <span className="text-violet-400 font-bold">
            0{Math.min(Math.floor(scrollPct * PROJECTS.length) + 1, PROJECTS.length)}
          </span>
          <span>/</span>
          <span>0{PROJECTS.length}</span>
          <span className="text-gray-600 hidden sm:inline">&bull;</span>
          <span className="text-gray-500 hidden sm:inline">Scroll to explore work</span>
        </div>

        {/* Live Progress Bar */}
        <div className="w-full sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
}
