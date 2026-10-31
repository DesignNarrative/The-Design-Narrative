'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { Project } from '@/data/projects';

// Smooth animated stat counter hook component
function StatCounter({ target, suffix = '', duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let start: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(Math.floor((progress / duration) * target), target);
      setCount(val);
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    if (ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span>{count}</span>
      {suffix && <span className="text-rose-500 ml-0.5">{suffix}</span>}
    </div>
  );
}

export default function CitaraCaseStudy({ nextProjects }: { nextProjects: Project[] }) {
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
      {/* 1. TOP HERO BANNER: Banner citara.png (Fit perfectly, Uncropped)          */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/projects/citara/Banner citara.png"
          alt="Citara Cinema Brand Showcase Hero Banner"
          className="w-full h-auto block"
        />
      </section>

      {/* Main Content Flow Container (Part 1) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 2. TITLE: CITARA CINEMA in cinematic ruby/rose gradient                   */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3 pt-2 border-b border-black/10 pb-8"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e11d48] block">
            CINEMA &amp; ENTERTAINMENT SHOWBIZ
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] bg-gradient-to-r from-[#881337] via-[#e11d48] to-[#fb7185] bg-clip-text text-transparent drop-shadow-sm">
            CITARA
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e11d48]/10 border border-[#e11d48]/20 text-[10px] font-mono font-bold tracking-widest text-[#e11d48] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" /> PROJECT OVERVIEW
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-normal">
            Citara aimed to bring a unique cinema and entertainment experience to Tier 2, 3, and 4 cities, while creating attractive franchise opportunities for investors.
          </p>

          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-xl bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
              Category: Branding | Social Media | Website Design | SEO
            </div>
          </div>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE: CITARA Cinema at Dusk.png & Citara Cinema Instagram Showcase */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 my-8 md:my-16 bg-transparent">
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center w-full"
        >
          {/* Left: CITARA Cinema at Dusk.png */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/citara/CITARA Cinema at Dusk.png"
              alt="CITARA Cinema at Dusk Architectural Exterior"
              className="w-full h-auto block rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] mx-auto bg-transparent"
              loading="lazy"
            />
          </div>

          {/* Right: Citara Cinema Instagram Showcase.png */}
          <div className="flex justify-center w-full">
            <img
              src="/assets/projects/citara/Citara Cinema Instagram Showcase.png"
              alt="Citara Cinema Instagram Showcase & Social Visual Language"
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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#e11d48] block">
            CHALLENGE
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            &ldquo;Building a distinctive brand identity for a new concept that appealed to cinema enthusiasts, Gen Z audiences, and potential investors while communicating its vision and business potential.&rdquo;
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 6. FULL-WIDTH SHOWCASE: Brochure.png (Covering the screen, Uncropped)     */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-8 md:my-14 overflow-hidden"
      >
        <img
          src="/assets/projects/citara/Brochure.png"
          alt="Citara Cinema Franchise Brochure & Investor Presentation"
          className="w-full h-auto block"
          loading="lazy"
        />
      </motion.section>

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
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#e11d48] block">
            BRAND STRATEGY
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
            We developed a vibrant brand identity, engaging logo, compelling investor deck, and immersive, responsive website to communicate Citara&apos;s vision and position it as a promising cinema franchise brand.
          </p>
        </motion.section>
      </div>

      {/* ========================================================================= */}
      {/* 8. COUNTDOWN METRICS STRIP: 50 franchise | 100% reach | 100% engagement   */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-10 md:my-16 bg-[#08080a] border-y border-white/10 py-10 md:py-16 text-white relative overflow-hidden shadow-2xl"
      >
        {/* Cinematic glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {/* Stat 1 */}
            <div className="space-y-2 pt-4 md:pt-0">
              <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white flex items-center justify-center font-mono">
                <StatCounter target={50} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-rose-300 font-bold">
                Franchises All Over India
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 pt-6 md:pt-0">
              <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white flex items-center justify-center font-mono">
                <StatCounter target={100} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-rose-300 font-bold">
                Growth in Reach
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 pt-6 md:pt-0">
              <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white flex items-center justify-center font-mono">
                <StatCounter target={100} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-rose-300 font-bold">
                Growth in Engagement
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 9. FULL-WIDTH SHOWCASE: Cinematic Citara Cinema Website Showcase.png     */}
      {/* ========================================================================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full my-8 md:my-14 overflow-hidden"
      >
        <img
          src="/assets/projects/citara/Cinematic Citara Cinema Website Showcase.png"
          alt="Cinematic Citara Cinema Official Website Showcase"
          className="w-full h-auto block"
          loading="lazy"
        />
      </motion.section>

      {/* Main Content Flow Container (Part 4) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ========================================================================= */}
        {/* 10. IMPACT: Measurable Outcome & Pure Typography                          */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e11d48]/10 border border-[#e11d48]/20 text-[#e11d48] text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-[#e11d48]" /> MEASURABLE OUTCOME
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none">
            IMPACT
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-snug font-normal">
            Within one month of presenting the investor deck and brochure, Citara <span className="font-bold text-[#e11d48] underline decoration-[#e11d48]/40 decoration-4 underline-offset-8">attracted multiple investors</span>, with over <span className="font-bold text-[#881337]">10 franchise owners joining the brand</span> through effective branding and lead generation.
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
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#e11d48]">
            <Compass className="w-4 h-4 text-[#e11d48] animate-spin" style={{ animationDuration: '10s' }} />
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
                  <span className="text-[9px] font-mono tracking-widest text-[#fda4af] uppercase font-black block">
                    {p.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#fecdd3] transition-colors flex justify-between items-center">
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
