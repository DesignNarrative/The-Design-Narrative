'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function AmToAmCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: AM to AM Salon Entrance.png (Full Width, Uncropped)   */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/am-to-am/AM to AM Salon Entrance.png"
          alt="AM to AM Salon Entrance Architecture Hero Banner"
          className="w-full h-auto block"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: AM TO AM in emerald and warm peach gradient                     */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0f4643] block">
            THE MILLS, PUNE | PREMIUM UNISEX SALON
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#0f4643] via-[#115e59] to-[#e9a370] bg-clip-text text-transparent drop-shadow-sm">
            AM TO AM
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f4643]/10 border border-[#0f4643]/20 text-[10px] font-mono font-bold tracking-widest text-[#0f4643] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0f4643]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            AMtoAM is a premium unisex salon at The Mills, Pune. We created its brand name and complete identity, built to stand out and support future expansion.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Identity Design &amp; Visual Branding
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE SHOWCASE 1: SnapInsta & Neon Nails                        */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto"
        >
          {/* Left: SnapInsta */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/am-to-am/SnapInsta.to_490412437_1272140628249594_6002286866939844636_n.jpg"
              alt="AMtoAM Salon Social and Styling Showcase"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
              loading="lazy"
            />
          </div>

          {/* Right: Neon Nails */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/am-to-am/Neon Nails Before Males Salon Nook.png"
              alt="Neon Nails Before Males Salon Nook"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0f4643] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Building a distinct, memorable identity that sets the salon apart and works across signage and collateral, while complementing the existing green interiors.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. SIDE-BY-SIDE SHOWCASE 2: Branded Salon Trolley & Billboard             */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto"
        >
          {/* Left: Branded Salon Trolley */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/am-to-am/Branded Salon Trolley in a Modern Interior.png"
              alt="Branded Salon Trolley in a Modern Interior"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
              loading="lazy"
            />
          </div>

          {/* Right: Clean Salon Billboard */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/am-to-am/Clean Salon Billboard on a Sunny Street.png"
              alt="Clean Salon Billboard on a Sunny Street"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#0f4643] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            We designed a brush-style logotype where &ldquo;to&rdquo; links the two AMs, signifying the salon&apos;s hours from morning to midnight, in a palette of deep emerald, peach, and misty grey.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. SHOWCASE VIDEO: Reel.mp4 (Pure Video, No Background)                   */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-8 md:my-14 flex justify-center items-center px-4 sm:px-6"
      >
        <video
          src="/assets/projects/am-to-am/Reel.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
          className="max-h-[85vh] w-auto max-w-full h-auto block mx-auto rounded-2xl md:rounded-3xl shadow-xl pointer-events-none bg-transparent"
        />
      </motion.section>

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f4643]/10 border border-[#0f4643]/20 text-[#0f4643] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#0f4643]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            In its first month, AMtoAM saw <span className="font-bold text-[#0f4643] underline decoration-[#0f4643]/40 decoration-4 underline-offset-8">4-5 daily walk-ins, 10 new memberships, and ₹5 lakh in turnover</span>, along with interest from brands seeking <span className="font-bold text-[#e9a370]">styling collaborations</span>.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0f4643]">
            <Compass className="w-4 h-4 text-[#0f4643] animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-[#e9a370] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#fed7aa] transition-colors flex justify-between items-center">
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
