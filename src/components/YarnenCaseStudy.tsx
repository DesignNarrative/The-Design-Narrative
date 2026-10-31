'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function YarnenCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER IMAGE: Banner yarnen.png covering the entire screen    */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[92vh] md:h-screen overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/yarnen/Banner yarnen.png"
          alt="Yarnen Linen Fashion Brand Banner Hero"
          className="w-full h-full object-cover filter brightness-[0.94] contrast-[1.03]"
        />
        {/* Soft edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: YARNEN in signature soft lilac/lavender gradient                */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#5e3d7a] via-[#7b5b9e] to-[#a380c4] bg-clip-text text-transparent drop-shadow-sm">
            YARNEN
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b5b9e]/10 border border-[#7b5b9e]/20 text-[10px] font-mono font-bold tracking-widest text-[#7b5b9e] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#7b5b9e]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Yarnen is a linen fashion brand built on understated, minimal elegance. We handled its end-to-end branding, from name and logo to website, photoshoots, and social media.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Logo &amp; Branding | Social Media Strategy | Website Design | SEO
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN VIDEO: yarnennn Website video.mp4 (Edge-to-Edge, Uncropped) */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-8 md:my-14 overflow-hidden"
      >
        <video
          src="/assets/projects/yarnen/yarnennn Website video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block pointer-events-none"
        />
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#7b5b9e] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Standing out in a market full of fast fashion by making linen feel fresh, contemporary, and sustainable, while appealing to modern consumers.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. 3-COLUMN SHOWCASE: Social media.jpg, Mobile Mockup.mp4, Website desktop.jpg */}
      {/* ========================================================================= */}
      <div className="w-full px-3 sm:px-5 md:px-8 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center w-full"
        >
          {/* Left: Social media.jpg */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/yarnen/Social media.jpg"
              alt="Yarnen Social Media Curation & Visual Language"
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] block mx-auto"
              loading="lazy"
            />
          </div>

          {/* Center: Mobile Mockup.mp4 */}
          <div className="flex justify-center w-full">
            <video
              src="/assets/projects/yarnen/Mobile Mockup.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-auto max-w-full h-auto max-h-[82vh] object-contain rounded-2xl md:rounded-3xl shadow-xl block mx-auto pointer-events-none bg-transparent"
            />
          </div>

          {/* Right: Website desktop.jpg */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/yarnen/Website desktop.jpg"
              alt="Yarnen Official E-commerce Desktop Interface"
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] block mx-auto"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#7b5b9e] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            We created the name &ldquo;Yarnen&rdquo; (yarn + linen), a minimal wordmark with a floral N, a lifestyle-led social presence, and an elegant e-commerce website.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. FULL-SCREEN IMAGE 1: Logo (1).jpg covering the screen like banner video */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative w-full h-[85vh] md:h-screen overflow-hidden my-12 md:my-16 bg-[#050505] shadow-2xl"
      >
        <img
          src="/assets/projects/yarnen/Logo (1).jpg"
          alt="Yarnen Brand Concept Deconstruction"
          className="w-full h-full object-cover filter brightness-[0.96]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </motion.section>

      {/* ========================================================================= */}
      {/* 9. FULL-SCREEN IMAGE 2: Packaging paper.jpg covering the screen like banner */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative w-full h-[85vh] md:h-screen overflow-hidden my-12 md:my-16 bg-[#050505] shadow-2xl"
      >
        <img
          src="/assets/projects/yarnen/Packaging paper.jpg"
          alt="Yarnen Eco-Friendly Packaging Paper"
          className="w-full h-full object-cover filter brightness-[0.96]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </motion.section>

      {/* Main Content Flow Container (Part 2) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 10. IMPACT: Pure text on canvas, no background card                       */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7b5b9e]/10 border border-[#7b5b9e]/20 text-[#7b5b9e] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#7b5b9e]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            Yarnen is now a <span className="font-bold text-[#7b5b9e] underline decoration-[#7b5b9e]/40 decoration-4 underline-offset-8">distinctive, aspirational yet approachable fashion label</span> with strong brand recall, redefining linen as a <span className="font-bold text-[#5e3d7a]">modern wardrobe essential</span>.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 11. NEXT PROJECTS SECTION: Explore more Projects (3 Cards)                */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pt-10 border-t border-black/10 space-y-8"
        >
          {/* Top-left header */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#7b5b9e]">
            <Compass className="w-4 h-4 text-[#7b5b9e] animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-[#caa8e4] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#dab9f5] transition-colors flex justify-between items-center">
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
