'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

export default function DNLCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: Beach Club 01.jpg (Full Width, Uncropped)             */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/dnl/Beach Club 01.jpg"
          alt="DNL Properties Beach Club Dubai Real Estate Hero Banner"
          className="w-full h-auto block"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: DNL PROPERTIES in luxury sky blue                               */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#259cde] block">
            ESTD. 2015 | DUBAI LUXURY REAL ESTATE
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] text-[#259cde] drop-shadow-sm">
            DNL PROPERTIES
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#259cde]/10 border border-[#259cde]/20 text-[10px] font-mono font-bold tracking-widest text-[#259cde] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#259cde]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            DNL Properties is an award-winning Dubai real estate agency, founded in 2015, offering residential, commercial, and off-plan properties. Its online growth was driven through social media posts, paid ad marketing, and SEO.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Social Media | Paid Ads | SEO
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE VIDEOS: Drone Lagoon & Gemini Video (Edge-Covering, Viewport-Fit) */}
      {/* ========================================================================= */}
      <div className="w-full px-2 sm:px-4 md:px-6 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full"
        >
          {/* Video 1: Drone Sweeping Lagoon */}
          <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <video
              src="/assets/projects/dnl/Drone_camera_sweeping_lagoon_.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              className="w-full h-[60vh] md:h-[80vh] object-cover block rounded-2xl md:rounded-3xl pointer-events-none"
            />
          </div>

          {/* Video 2: Gemini Generated Video */}
          <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <video
              src="/assets/projects/dnl/gemini_generated_video_35d38266.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              className="w-full h-[60vh] md:h-[80vh] object-cover block rounded-2xl md:rounded-3xl pointer-events-none"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#259cde] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Standing out in Dubai’s crowded real estate market while generating quality leads for off-plan launches and property listings, and building trust with both local and international investors.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. SIDE-BY-SIDE SHOWCASE: Instagram Phone Mockups (Big Size, No Side Blank)*/}
      {/* ========================================================================= */}
      <div className="w-full px-2 sm:px-4 md:px-6 my-8 md:my-14">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full"
        >
          {/* Mockup 2 */}
          <div className="flex justify-center w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/dnl/Beige Modern New Online Store Phone Mockup Instagram Post (2).jpg"
              alt="DNL Properties Dubai Off-Plan Campaign Showcase 2"
              className="w-full h-auto max-h-[82vh] object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* Mockup 1 */}
          <div className="flex justify-center w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
            <img
              src="/assets/projects/dnl/Beige Modern New Online Store Phone Mockup Instagram Post (1).jpg"
              alt="DNL Properties Dubai Off-Plan Campaign Showcase 1"
              className="w-full h-auto max-h-[82vh] object-cover block rounded-2xl md:rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#259cde] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            A consistent content plan of project launches, property highlights, and market insights was paired with targeted paid ads and SEO-driven content to reach serious buyers and investors across platforms.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. FULL-WIDTH SHOWCASE: Pool Clubhouse.jpg (Covering the screen)          */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-8 md:my-14 overflow-hidden"
      >
        <img
          src="/assets/projects/dnl/Pool Clubhouse.jpg"
          alt="DNL Properties Pool Clubhouse Dubai Luxury Architecture"
          className="w-full h-auto block"
          loading="lazy"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#259cde]/10 border border-[#259cde]/20 text-[#259cde] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#259cde]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            The campaigns boosted DNL’s <span className="font-bold text-[#259cde] underline decoration-[#259cde]/40 decoration-4 underline-offset-8">online visibility and lead flow</span>, strengthening its position as a <span className="font-bold text-[#1b7bb3]">trusted Dubai real estate name with steady buyer and investor enquiries</span>.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#259cde]">
            <Compass className="w-4 h-4 text-[#259cde] animate-spin" style={{ animationDuration: '10s' }} />
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
