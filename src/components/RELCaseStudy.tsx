'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass, Building2, Globe2 } from 'lucide-react';
import { Project } from '@/data/projects';

export default function RELCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: Beach RuralEnhancers Office Corridor Branding.png     */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/rel/Beach RuralEnhancers Office Corridor Branding.png"
          alt="Rural Enhancers Group REL Office Corridor Branding Hero Banner"
          className="w-full h-auto max-h-[88vh] object-cover object-center block mx-auto"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: REL / RURAL ENHANCERS GROUP in luxury sky blue                  */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#0ea5e9]">
            <Globe2 className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>PURPOSE-DRIVEN GLOBAL INVESTMENTS | INDIA • DUBAI • NETHERLANDS</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] text-[#0ea5e9] drop-shadow-sm">
            RURAL ENHANCERS (REL)
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[10px] font-mono font-bold tracking-widest text-[#0ea5e9] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Rural Enhancers Group (REL) is a purpose-driven investment company funding healthcare and infrastructure projects across India, Dubai, and the Netherlands. Custom wall graphics were designed to bring its space to life.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Visual Branding | Environmental Design | Custom Wall Graphics
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE: Modern Orange Wall & Corridor with Social Impact Mural   */}
      {/* ========================================================================= */}
      <div className="w-full px-2 sm:px-4 md:px-6 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full items-stretch"
        >
          {/* Image 1: Modern Orange Corporate Branding Wall */}
          <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Modern Orange Corporate Branding Wall.png"
              alt="REL Modern Orange Corporate Branding Wall"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* Image 2: Modern Corridor with Social Impact Mural */}
          <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Modern Corridor with Social Impact Mural.png"
              alt="REL Modern Corridor with Social Impact Mural"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </motion.section>
      </div>

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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0ea5e9] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            Translating a large-scale, serious business of healthcare and infrastructure investment into wall graphics that feel inspiring and human while still conveying trust and credibility.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. THREE-IMAGE GRID: Conference Room, Lobby Display, Meeting Room        */}
      {/* ========================================================================= */}
      <div className="w-full px-2 sm:px-4 md:px-6 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full items-stretch"
        >
          {/* Image 1: Local Base, Global Operations Conference Room */}
          <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Local Base, Global Operations Conference Room.png"
              alt="REL Local Base Global Operations Conference Room"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* Image 2: Modern Corporate Lobby Display */}
          <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Modern Corporate Lobby Display.png"
              alt="REL Modern Corporate Lobby Display"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* Image 3: Modern Meeting Room Office Interior */}
          <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Modern Meeting Room Office Interior.png"
              alt="REL Modern Meeting Room Office Interior"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </motion.section>
      </div>

      {/* Main Content Flow Container (Part 3) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0ea5e9] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            Wall graphics were crafted around REL’s purpose of empowering communities through impactful investments, with visuals reflecting healthcare, infrastructure, and its global presence.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. SIDE-BY-SIDE: Reception Lobby Signage & Where Ideas Brew Cafe Nook     */}
      {/* ========================================================================= */}
      <div className="w-full px-2 sm:px-4 md:px-6 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full items-stretch"
        >
          {/* Image 1: Modern Luxury Reception Lobby with REL Signage */}
          <div className="w-full h-[55vh] md:h-[75vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Modern Luxury Reception Lobby with REL Signage.png"
              alt="REL Modern Luxury Reception Lobby with Signage"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* Image 2: Where Ideas Brew Cafe Nook */}
          <div className="w-full h-[55vh] md:h-[75vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/rel/Where Ideas Brew Cafe Nook.png"
              alt="REL Where Ideas Brew Cafe Nook"
              className="w-full h-full object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </motion.section>
      </div>

      {/* Main Content Flow Container (Part 4) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 9. IMPACT: Measurable Outcome & Pure Typography                           */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#0ea5e9]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            The wall graphics gave REL’s space a <span className="font-bold text-[#0ea5e9] underline decoration-[#0ea5e9]/40 decoration-4 underline-offset-8">distinctive, purposeful look</span> that reinforces its brand story and leaves a <span className="font-bold text-[#0284c7]">strong impression on visitors, partners, and investors</span>.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0ea5e9]">
            <Compass className="w-4 h-4 text-[#0ea5e9] animate-spin" style={{ animationDuration: '10s' }} />
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
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
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
                  <span className="text-[9px] font-mono tracking-widest text-[#70c3f3] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#a8defa] transition-colors flex justify-between items-center">
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
