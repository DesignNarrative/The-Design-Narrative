'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function IceboatCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: logo animation.mp4 covering the entire screen         */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#050505]">
        <video
          src="/assets/projects/iceboat/logo animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
          className="w-full h-full object-cover filter brightness-[0.98] pointer-events-none"
        />
        {/* Soft edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: ICEBOAT in architectural slate / deep cobalt gradient           */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0284C7] bg-clip-text text-transparent drop-shadow-sm">
            ICEBOAT
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 text-[10px] font-mono font-bold tracking-widest text-[#0284C7] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Iceboat Studio is an architecture and BIM firm with offices in Pune and California, delivering architectural, structural, MEPF, and landscape design for clients across the globe. A logo and website were designed for Iceboat Studio and its learning arm, Iceboat Academia.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Logo | Website Design
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE SHOWCASE: Mobile.jpg & Ipad.jpg (Full-Width, Uncropped)   */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-16 bg-transparent">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center w-full"
        >
          {/* Left: Mobile.jpg */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/iceboat/Mobile.jpg"
              alt="Iceboat Studio Mobile Responsive Website UI"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-transparent"
              loading="lazy"
            />
          </div>

          {/* Right: Ipad.jpg */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/iceboat/Ipad.jpg"
              alt="Iceboat Studio iPad & Tablet Experience Interface"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-transparent"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0284C7] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Creating an identity and website that builds trust with international clients, while clearly presenting the firm’s wide range of services and giving the Studio and Academia their own distinct presence.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. FULL-SCREEN STACKED IMAGES: Website pages.jpg & Journey.jpg            */}
      {/* ========================================================================= */}
      <div className="w-full my-8 md:my-14 space-y-6 md:space-y-10">
        {/* 6A: Website pages.jpg */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="w-full overflow-hidden"
        >
          <img
            src="/assets/projects/iceboat/Website pages.jpg"
            alt="Iceboat Studio Official Website Pages Design"
            className="w-full h-auto block"
            loading="lazy"
          />
        </motion.section>

        {/* 6B: Journey.jpg */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="w-full overflow-hidden"
        >
          <img
            src="/assets/projects/iceboat/Journey.jpg"
            alt="Iceboat Client Journey & Process Mapping"
            className="w-full h-auto block"
            loading="lazy"
          />
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0284C7] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            A clean, modern logo and a structured, easy-to-navigate website were designed to showcase services, projects, and client testimonials, with a dedicated Academia section for its training and education offering.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. CARDS: Cards.png (Pure Image, Curved Corners, No Background Card)      */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex justify-center w-full"
        >
          <img
            src="/assets/projects/iceboat/Cards.png"
            alt="Iceboat Brand Identity Cards & Stationery Mockup"
            className="w-auto max-w-full h-auto max-h-[85vh] rounded-2xl md:rounded-3xl shadow-xl block mx-auto transition-transform duration-500 hover:scale-[1.01]"
            loading="lazy"
          />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#0284C7] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#0284C7]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            Iceboat now has a <span className="font-bold text-[#0284C7] underline decoration-[#0284C7]/40 decoration-4 underline-offset-8">professional, globally credible identity</span> and a website that clearly communicates its expertise, making it easier for clients worldwide to <span className="font-bold text-[#1E3A8A]">understand its services and get in touch</span>.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0284C7]">
            <Compass className="w-4 h-4 text-[#0284C7] animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-[#7dd3fc] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#bae6fd] transition-colors flex justify-between items-center">
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
