'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function DDSCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
  // Smooth slide-up transition variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#111111] overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: Wall graphics.png covering the entire screen          */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[92vh] md:h-screen overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/dds/Wall graphics.png"
          alt="DDS Dental Clinic Wall Graphics Hero"
          className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04]"
        />
        {/* Soft edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: DDS in signature deep plum/wine brand color                      */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#360920] via-[#5A1038] to-[#781B4E] bg-clip-text text-transparent drop-shadow-sm">
            DDS
          </h1>
        </motion.section>

        {/* ========================================================================= */}
        {/* 3. PROJECT OVERVIEW                                                       */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A1038]/10 border border-[#5A1038]/20 text-[10px] font-mono font-bold tracking-widest text-[#5A1038] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#5A1038]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            DDS Dental Clinic is a Pune-based digital dentistry practice led by Dr. Priti Munde, with 18+ years of experience in advanced, comfortable dental care. A logo, stationery, and wall graphics were designed to shape its identity.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Logo | Stationery | Website | Visual Branding
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN VIDEO: Logo Video.mp4 covering the entire screen like banner */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative w-full h-[85vh] md:h-screen overflow-hidden my-12 md:my-16 bg-[#050505] shadow-2xl"
      >
        <video
          src="/assets/projects/dds/Logo Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter brightness-[0.96]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </motion.section>

      {/* Main Content Flow Container (Part 2) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 5. CHALLENGE                                                              */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4 max-w-4xl"
        >
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#5A1038] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Creating an identity that feels clean, trustworthy, and welcoming, while reflecting the clinic’s technology-led precision and its soothing, sophisticated environment.&rdquo;
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 6. 3 IMAGES BESIDE EACH OTHER: Signage.png, Wall graphics_1, Wall Graphics_2*/}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center"
        >
          <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            <img
              src="/assets/projects/dds/Signage.png"
              alt="DDS Clinic Exterior Signage"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            <img
              src="/assets/projects/dds/Wall graphics_1.png"
              alt="DDS Interior Wall Graphics 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            <img
              src="/assets/projects/dds/Wall Graphics_2.jpeg"
              alt="DDS Interior Wall Graphics 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 7. BRAND STRATEGY                                                         */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4 max-w-4xl"
        >
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#5A1038] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            A refined logo, cohesive stationery, and calming wall graphics were designed around the clinic’s “Diagnose. Design. Smile.” philosophy, balancing clinical expertise with warmth.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 8. TWO IMAGES SIDE BY SIDE: Stationery Design.png & Website.jpg           */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            <img
              src="/assets/projects/dds/Stationery Design.png"
              alt="DDS Corporate Stationery Design"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            <img
              src="/assets/projects/dds/Website.jpg"
              alt="DDS Official Website Interface"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 9. IMPACT: Pure text on canvas, no background card                        */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A1038]/10 border border-[#5A1038]/20 text-[#5A1038] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#5A1038]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            DDS now presents a <span className="font-bold text-[#5A1038] underline decoration-[#5A1038]/40 decoration-4 underline-offset-8">consistent, premium identity</span> across its logo, print, and interiors, reinforcing patient trust and its position as a <span className="font-bold text-[#781B4E]">benchmark in digital dentistry</span> in Pune.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 10. NEXT PROJECTS SECTION: Explore more Projects (3 Cards)                */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pt-10 border-t border-black/10 space-y-8"
        >
          {/* Top-left header */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5A1038]">
            <Compass className="w-4 h-4 text-[#5A1038] animate-spin" style={{ animationDuration: '10s' }} />
            <span>Explore more Projects</span>
          </div>

          {/* 3 Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nextProjects.map((p) => (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                className="group relative flex flex-col justify-end w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden bg-[#050505] text-white border border-black/5 shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-98"
              >
                {/* Background visual/video */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
                  {p.image.endsWith('.mp4') || p.image.includes('.mp4') ? (
                    <video
                      src={p.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-15 pointer-events-none" />
                </div>

                {/* Floating details */}
                <div className="relative z-20 p-6 md:p-8 space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#d87c9f] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#f3a6c4] transition-colors flex justify-between items-center">
                    <span>{p.title}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
