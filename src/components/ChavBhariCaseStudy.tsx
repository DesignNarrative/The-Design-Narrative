'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function ChavBhariCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER IMAGE: chavbhariBanner.png                             */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
        <img
          src="/assets/projects/chav-bhari/chavbhariBanner.png"
          alt="Chav Bhari Widescreen Banner"
          className="w-full h-auto max-h-[85vh] object-cover block mx-auto filter brightness-[0.96] contrast-[1.03]"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: CHAV BHARI + Subtitle                                           */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
            CHAV BHARI
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold tracking-widest text-amber-700 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Chav Bhari is a pure Maharashtrian spices brand from Satara, bringing the authentic taste of traditional Marathi masalas to homes everywhere. We handled its branding and packaging design.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Logo Design | Packaging
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN VIDEO: Chav Bhari logo meaning.mp4 covering the screen     */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative w-full h-[85vh] md:h-screen overflow-hidden my-12 md:my-16 bg-[#050505] shadow-2xl"
      >
        <video
          src="/assets/projects/chav-bhari/Chav Bhari logo meaning.mp4"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-amber-600 block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Creating an identity that roots the brand in Maharashtrian heritage while giving it a modern, premium look that stands out on the shelf.&rdquo;
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 6. SIDE-BY-SIDE: packaging 1.png & packaging 2.png                        */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <img
            src="/assets/projects/chav-bhari/packaging 1.png"
            alt="Chav Bhari Packaging Showcase 1"
            className="w-full h-auto max-h-[550px] block object-contain mx-auto rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />

          <img
            src="/assets/projects/chav-bhari/packaging 2.png"
            alt="Chav Bhari Packaging Showcase 2"
            className="w-full h-auto max-h-[550px] block object-contain mx-auto rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 7. FULL-SCREEN IMAGE: Hoarding.png (Covering screen like home hero video) */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative w-full h-[85vh] md:h-screen overflow-hidden my-12 md:my-16 bg-[#050505] shadow-2xl"
      >
        <img
          src="/assets/projects/chav-bhari/Hoarding.png"
          alt="Chav Bhari Outdoor Billboard Hoarding"
          className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </motion.section>

      {/* Main Content Flow Container (Part 3) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 8. BRAND STRATEGY                                                         */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4 max-w-4xl"
        >
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-violet-700 block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            We designed a bold Devanagari logo in mustard yellow, set against earthy brown and black, with hand-drawn spice illustrations and the tagline &ldquo;महाराष्ट्राचा खरा स्वाद.&rdquo;
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 9. SIDE-BY-SIDE: chav bhari (1).mp4 (video) & Label.jpg (image)           */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Video: pure video, no black bars on sides */}
          <div className="flex justify-center w-full">
            <video
              src="/assets/projects/chav-bhari/chav bhari (1).mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-auto max-w-full max-h-[60vh] rounded-2xl md:rounded-3xl shadow-2xl block mx-auto"
            />
          </div>

          {/* Image: Label.jpg, pure image, fits cleanly without scroll */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/chav-bhari/Label.jpg"
              alt="Chav Bhari Spice Label"
              className="w-auto max-w-full max-h-[60vh] object-contain rounded-2xl md:rounded-3xl shadow-2xl block mx-auto"
              loading="lazy"
            />
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 10. IMPACT: Pure Text (No black card background)                          */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-amber-600" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            Chav Bhari now has a <span className="font-bold text-amber-600 underline decoration-amber-500/40 decoration-4 underline-offset-8">warm, premium identity</span> with <span className="font-bold text-amber-700">strong shelf presence</span>, positioning it as a true symbol of Maharashtrian taste ready to reach kitchens worldwide.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 11. NEXT PROJECTS SECTION: 3 Cards for the Next 3 Projects                */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pt-10 border-t border-black/10 space-y-8"
        >
          {/* Top-left header */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-violet-700">
            <Compass className="w-4 h-4 text-violet-600 animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-violet-400 uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors flex justify-between items-center">
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
