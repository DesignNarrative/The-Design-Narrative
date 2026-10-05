'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';

const FILTERS = ['All', 'Branding', 'UI-UX', 'Social', 'Packaging', 'Web Design'] as const;
type FilterType = typeof FILTERS[number];

function WorkCard({ project, idx }: { project: Project; idx: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Asymmetric height classes to create masonry-style rhythm
  const heightClass = idx % 3 === 0 ? 'h-[480px]' : idx % 3 === 1 ? 'h-[360px]' : 'h-[420px]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full shrink-0 snap-start"
    >
      <Link
        href={`/work/${project.id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col justify-end w-full ${heightClass} rounded-3xl overflow-hidden bg-[#050505] text-white border border-black/5 group shadow-sm transition-transform duration-300 hover:scale-[1.02] active:scale-98`}
      >
        {/* Visual Cover / Loop video */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
          {project.image.endsWith('.mp4') || project.image.includes('.mp4') ? (
            <video
              src={project.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
            />
          ) : (
            <>
              {/* Static Cover */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isHovered ? 0 : 1 }}
              />

              {/* Hover Walkthrough Video */}
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.35 : 0 }}
              />
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-15 pointer-events-none" />
        </div>

        {/* Floating details */}
        <div className="relative z-20 p-8 space-y-2">
          <span className="text-[9px] font-mono tracking-widest text-violet-400 uppercase font-black">
            {project.category}
          </span>
          
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors flex justify-between items-center">
            {project.title} <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkHubPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  // Filter project lists
  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.filter === activeFilter;
  });

  return (
    <div className="relative min-h-screen bg-white text-[#111111] py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* 1. HEADER (White Bg) */}
      <div className="space-y-6 max-w-4xl pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-bold text-[#111111] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Case Studies
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.0]">
          OUR WORK. <br />
          <span className="font-serif italic font-normal lowercase text-gray-500">
            stories that stick.
          </span>
        </h1>
      </div>

      {/* 2. STICKY FILTER BAR */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 border-b border-black/5 -mx-6 px-6 md:-mx-12 md:px-12">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer text-black hover:bg-black/5"
              >
                {/* Active Indicator background pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-portfolio-pill"
                    className="absolute inset-0 bg-[#111111] rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-[#111111]'}`}>
                  {filter}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ASYMMETRICAL PORTFOLIO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <WorkCard key={project.id} project={project} idx={idx} />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
