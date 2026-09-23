'use client';

import Link from 'next/link';
import { ArrowUpRight, Briefcase, Sparkles, MapPin, CheckCircle } from 'lucide-react';

const CULTURE_PHOTOS = [
  {
    title: 'Visual Brainstorms',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60',
  },
  {
    title: 'Studio Coffee Runs',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=60',
  },
  {
    title: 'Typographic Sketching',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=600&auto=format&fit=crop&q=60',
  },
  {
    title: 'Team Lunches',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60',
  },
  {
    title: 'Sprint Code Reviews',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
  },
];

const JOBS = [
  {
    title: 'Social Media Manager',
    desc: 'We are looking for a content engine who lives on TikTok/Instagram, understands algorithm shifts, and knows how to create scroll-stopping visual hooks.',
    requirements: [
      '2+ years managing high-growth brand pages',
      'Strong copywriting & meme knowledge',
      'Basic graphic editing/CapCut skills',
    ],
  },
  {
    title: 'UX Designer',
    desc: 'Help us conduct user research, map visual user journeys, build interactive wireframes, and design complex layouts that are completely frictionless.',
    requirements: [
      'Proficiency in Figma (auto-layout, components)',
      'Portfolio demonstrating clean user flows',
      'Strong understanding of interactive design systems',
    ],
  },
  {
    title: 'UI Designer',
    desc: 'Make digital products look premium. Focus on layout aesthetics, glassmorphism systems, visual components, typography pairings, and micro-interactions.',
    requirements: [
      'Excellent visual design sense & layout skills',
      'Strong understanding of CSS grid & flexbox systems',
      'Experience working alongside frontend developers',
    ],
  },
  {
    title: 'Video Editor',
    desc: 'Create high-retention vertical reels, corporate branding videos, and commercial advertisements. Master pacing, audio design, and visual styling.',
    requirements: [
      'Expertise in Premiere Pro, After Effects, or Resolve',
      'A portfolio of high-retention short-form videos',
      'Understanding of sound design and visual flow',
    ],
  },
];

export default function CareersPage() {
  const getApplyLink = (jobTitle: string) => {
    const text = encodeURIComponent(`Hey TDN! I want to apply for the ${jobTitle} position. Let's chat.`);
    return `https://wa.me/919850417266?text=${text}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] select-none py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
      
      {/* 1. HERO SECTION (Collage Graphic grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-bold text-[#111111] tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" /> WE ARE HIRING
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.0] text-[#111111]">
            FEEL FULFILLED. <br />
            HAVE FUN. <br />
            <span className="font-serif italic font-normal lowercase text-gray-500">
              shape the future.
            </span>
          </h1>
        </div>

        {/* Collage grid visual */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-4 h-64 md:h-80">
          <div className="relative rounded-2xl overflow-hidden border border-black/5">
            <img
              src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=500&auto=format&fit=crop&q=60"
              alt="Design whiteboards"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-black/5 translate-y-4">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60"
              alt="Collaborative meeting"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-black/5">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60"
              alt="Workspace critiques"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* 2. LIFE AT TDN (Scroll-driven horizontal photo gallery) */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OUR WORLD</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">LIFE AT TDN</h2>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
          {CULTURE_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[65vw] md:w-[320px] h-64 relative rounded-2xl overflow-hidden shadow-md border border-black/5 group"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/90 uppercase font-bold tracking-wider">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OPEN OPENINGS (Detailed Cards) */}
      <section className="space-y-8">
        <div className="space-y-1.5 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">CAREER BOARD</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">OPEN OPENINGS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOBS.map((job, idx) => (
            <div
              key={idx}
              className="glass-card-light glass-card-light-hover rounded-3xl p-8 md:p-10 border border-black/5 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <h3 className="text-xl font-bold uppercase text-[#111111] group-hover:text-black/75 transition-colors">
                    {job.title}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[9px] font-mono font-bold text-gray-500 uppercase">
                    Full-time
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-mono font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> Pune, India (On-site)
                </div>

                <p className="text-sm text-gray-500 font-semibold leading-relaxed">
                  {job.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-black/5">
                  <div className="text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider">Key Requirements:</div>
                  <ul className="space-y-1">
                    {job.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="text-xs text-gray-500 font-medium flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-black shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-black/5">
                <Link
                  href={getApplyLink(job.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black hover:bg-black/85 text-white text-xs font-bold uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-98 transition-all duration-200"
                >
                  Apply via WhatsApp <ArrowUpRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
