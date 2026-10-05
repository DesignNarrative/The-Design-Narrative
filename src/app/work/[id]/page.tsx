'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Sparkles, CheckCircle, Award } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

export default function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Find next project in the sequence to construct the infinite loop navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="relative min-h-screen bg-white text-[#111111] py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
      
      {/* Back link */}
      <Link href="/work" className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest flex items-center gap-1.5 mb-12">
        &larr; Back to Our Work
      </Link>

      {/* SECTION 1: EDITORIAL HERO BANNER (Widescreen Mockup + Metadata Board) */}
      <section className="space-y-12">
        {/* Full-width image header */}
        <div className="relative w-full h-[55vh] rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-[#050505] group">
          {project.image.endsWith('.mp4') || project.image.includes('.mp4') ? (
            <video
              src={project.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 space-y-2 text-white">
            <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400">CASE STUDY</span>
            <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight">{project.title}</h1>
          </div>
        </div>

        {/* Metadata Board Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/5 text-xs">
          <div className="space-y-1">
            <div className="font-mono text-gray-400 uppercase tracking-widest">CLIENT</div>
            <div className="font-extrabold text-black uppercase">{project.client}</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-gray-400 uppercase tracking-widest">CATEGORY</div>
            <div className="font-extrabold text-black uppercase">{project.category}</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-gray-400 uppercase tracking-widest">YEAR</div>
            <div className="font-extrabold text-black uppercase">{project.year}</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-gray-400 uppercase tracking-widest">SERVICES PROVIDED</div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.services.map((service, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-black/5 border border-black/10 text-[9px] font-mono font-bold text-gray-600 uppercase"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE BRIEF */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[9px] font-mono font-bold tracking-widest text-[#111111] uppercase">
            <Sparkles className="w-3 h-3 text-violet-600" /> THE BRIEF
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 className="text-xl md:text-3xl font-serif italic text-gray-600 leading-relaxed">
            &ldquo;{project.brief}&rdquo;
          </h2>
        </div>
      </section>

      {/* SECTION 3: THE APPROACH & PROCESS VISUALS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-8">
        {/* Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">THE APPROACH</span>
          <h3 className="text-2xl font-black uppercase text-[#111111] leading-tight">
            CRAFTING AN UN-IGNORABLE VISUAL SYSTEM.
          </h3>
          <p className="text-sm text-gray-500 font-semibold leading-relaxed">
            {project.approach}
          </p>
        </div>

        {/* Process Visuals Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {project.processVisuals.map((visual, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-black/5 bg-[#fafafa]">
              <img
                src={visual}
                alt="Process moodboards sketches blueprints"
                className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: VISUAL DELIVERABLES GRID */}
      <section className="space-y-8">
        <div className="space-y-1.5 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">CASE STUDY VISUALS</span>
          <h3 className="text-2xl font-black uppercase text-[#111111]">THE DELIVERABLES</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((img, idx) => (
            <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-black/5">
              <img
                src={img}
                alt={`${project.title} final visual deliverable ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: IMPACT & CLIENT QUOTE */}
      <section className="py-12 px-8 md:px-12 rounded-3xl bg-[#050505] text-white w-full border border-white/5 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Results metrics */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">THE RESULTS</span>
          <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight">PROJECT IMPACT</h3>
          
          <div className="flex gap-3 items-start pt-2">
            <CheckCircle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 font-semibold leading-relaxed">
              {project.results}
            </p>
          </div>
        </div>

        {/* Pull quote if available */}
        {project.quote && (
          <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center">
            <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">CLIENT VOICE</span>
            <blockquote className="text-base md:text-lg font-serif italic text-gray-300 leading-relaxed">
              &ldquo;{project.quote}&rdquo;
            </blockquote>
          </div>
        )}
      </section>

      {/* SECTION 6: NEXT PROJECT NAVIGATION (Endless case-study loop) */}
      <section className="pt-12 border-t border-black/5">
        <Link
          href={`/work/${nextProject.id}`}
          className="relative block w-full h-48 md:h-64 rounded-3xl overflow-hidden bg-[#050505] text-white border border-black/5 group shadow-md"
        >
          {/* Faded background visual */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <img
              src={nextProject.image}
              alt={nextProject.title}
              className="w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
          </div>

          {/* Nav overlay */}
          <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center p-6 space-y-2">
            <span className="text-[9px] font-mono tracking-widest uppercase text-violet-400 font-bold group-hover:translate-x-1 transition-transform">
              NEXT PROJECT &rarr;
            </span>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors">
              {nextProject.title}
            </h3>
          </div>
        </Link>
      </section>

    </div>
  );
}
