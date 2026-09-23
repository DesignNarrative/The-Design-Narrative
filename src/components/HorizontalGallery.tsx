'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Utopia Organic Brand',
    category: 'Brand Design & Packaging',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761',
  },
  {
    title: 'Coco Pani Identity',
    category: 'Brand strategy & Nomenclature',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761',
  },
  {
    title: 'Yarnen Web Platform',
    category: 'UI/UX Web & E-Commerce',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761',
  },
  {
    title: 'Dangayach Group',
    category: 'Corporate Branding & Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7f26c6d2c49ee69a4c5148d4fb9fcf32d207ec29&profile_id=139&oauth2_token_id=57447761',
  },
  {
    title: 'O\'Daisy E-Commerce',
    category: 'UI/UX App & Strategy',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761',
  },
  {
    title: 'A Curve Story campaigns',
    category: 'Social Campaigns & Media',
    image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&auto=format&fit=crop&q=60',
    video: 'https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761',
  },
];

// Single card component handling hover play logic
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
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

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="snap-start shrink-0 w-[80vw] md:w-[450px] h-[500px] rounded-3xl overflow-hidden glass-card-dark border border-white/5 flex flex-col relative group select-none cursor-pointer"
    >
      {/* Visual Frame */}
      <div className="relative w-full h-[360px] overflow-hidden bg-white/5">
        {/* Placeholder image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 0 : 1 }}
        />

        {/* Hover-reveal video walkthrough */}
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-mono tracking-widest font-bold text-violet-400 uppercase">
          {project.category}
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <h3 className="text-xl font-bold uppercase text-white flex items-center justify-between group-hover:text-violet-400 transition-colors">
          {project.title} <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all" />
        </h3>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          View case study details
        </p>
      </div>
    </div>
  );
}

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsMouseDown(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`drag-gallery flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar scroll-smooth px-6 md:px-12 pb-12 ${
        isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {PROJECTS.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </div>
  );
}
