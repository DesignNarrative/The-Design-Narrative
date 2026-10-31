'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function DreamSpaceCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: SnapInsta Hero Image (Full Width, Screen Cover)       */}
      {/* ========================================================================= */}
      <section className="relative w-full max-h-[85vh] overflow-hidden bg-[#050505] flex justify-center items-center">
        <img
          src="/assets/projects/dream-space/SnapInsta.to_656846578_18335195395171248_4256214206782149767_n.jpg"
          alt="Dream Space Architects Rebranding Hero Banner"
          className="w-full h-auto max-h-[85vh] object-cover block"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: DREAM SPACE ARCHITECTS in architectural navy/orange gradient    */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ea580c] block">
            14+ YEARS OF EXCELLENCE | 812+ DELIVERED PROJECTS | PUNE
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#001c5b] via-[#1e3a8a] to-[#ff8201] bg-clip-text text-transparent drop-shadow-sm">
            DREAM SPACE
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8201]/10 border border-[#ff8201]/25 text-[10px] font-mono font-bold tracking-widest text-[#ea580c] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8201]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Dream Space Architects is a Pune-based firm with 14+ years of experience and 812+ projects delivered. As it moved to a bigger office, we rebranded the firm and redesigned its website.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Identity Design | Stationery | Website Design | Event collaterals
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE SHOWCASE 1: 15th anniversey_2.mp4 & 15th anniversey_1.jpg */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto"
        >
          {/* Left: 15th anniversey_2.mp4 */}
          <div className="flex justify-center w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-black">
            <video
              src="/assets/projects/dream-space/15th anniversey_2.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              className="w-full h-auto block rounded-2xl md:rounded-3xl pointer-events-none"
            />
          </div>

          {/* Right: 15th anniversey_1.jpg */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/dream-space/15th anniversey_1.jpg"
              alt="Dream Space Architects 15th Anniversary Milestone"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#ea580c] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Modernizing the brand while keeping the essence of its previous identity, and fixing a website with poor contrast, inconsistent typography, and confusing navigation.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. SHOWCASE: SnapInsta Identity Visual (Pure Image, Transparent Background)*/}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex justify-center w-full max-w-5xl mx-auto"
        >
          <img
            src="/assets/projects/dream-space/SnapInsta.to_642980239_18040092203768838_4228201142749073196_n.png"
            alt="Dream Space Architects Visual Branding and Logo Identity"
            className="w-auto max-w-full h-auto max-h-[85vh] object-contain block mx-auto bg-transparent transition-transform duration-500 hover:scale-[1.01]"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#ea580c] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            We created a logo mark from the initials D, S, and A, along with a brand guidebook and collateral, then redesigned the website with clear hierarchy, simple navigation, and strong imagery aligned to the new brand.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. SIDE-BY-SIDE SHOWCASE 2: Rebranded Collateral & Digital Website        */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto"
        >
          {/* Left: SnapInsta Collateral */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/dream-space/SnapInsta.to_656858376_18194783869358913_1799920782640731148_n.jpg"
              alt="Dream Space Architects Rebranded Collateral Showcase"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
              loading="lazy"
            />
          </div>

          {/* Right: SnapInsta Digital Architecture */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/dream-space/SnapInsta.to_662068380_18433608529136275_6181036061396500258_n.jpg"
              alt="Dream Space Architects Digital and Website Architecture"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-white"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff8201]/10 border border-[#ff8201]/25 text-[#ea580c] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#ff8201]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            Dream Space Architects now has a <span className="font-bold text-[#ff8201] underline decoration-[#ff8201]/40 decoration-4 underline-offset-8">cohesive, professional identity across print and digital</span>, with a <span className="font-bold text-[#001c5b]">captivating website that reflects its expertise and leaves a lasting impression on potential clients</span>.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c]">
            <Compass className="w-4 h-4 text-[#ea580c] animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-[#ff8201] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#fb923c] transition-colors flex justify-between items-center">
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
