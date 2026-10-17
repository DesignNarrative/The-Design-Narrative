'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  Award,
  Plus,
  Compass,
  Zap,
  Target,
  Layers,
  Users,
  Flame,
  MapPin,
} from 'lucide-react';

// Current team members dataset
const TEAM = [
  {
    name: 'IRFAN KHAN',
    role: 'CEO ALDS',
    image: '/assets/team/Irfan Khan.png',
    dept: 'Leadership',
  },
  {
    name: 'GAURAVI PITRE',
    role: 'SENIOR GRAPHIC DESIGNER',
    image: '/assets/team/Creative Designer with Colorful Tools.png',
    dept: 'Brand Design',
    type: 'design',
  },
  {
    name: 'ARJUN KOTAGI',
    role: 'SEO SPECIALIST',
    image: '/assets/team/Smiling SEO Strategist with Analytics Graphics.png',
    dept: 'Growth & SEO',
    type: 'seo',
  },
  {
    name: 'VIDHI DALVI',
    role: 'VEDIO EDITOR',
    image: '/assets/team/Creative Video Editor Portrait.png',
    dept: 'Media Production',
    type: 'video',
  },
  {
    name: 'MAYUR BANGERA',
    role: 'AI DEVELOPER',
    image: '/assets/team/Mayur Bangera.png',
    dept: 'AI & Engineering',
  },
  {
    name: 'VAISHNAVI SHINGAVI',
    role: 'SOCIAL MEDIA MANAGER',
    image: '/assets/team/Vaishnavi.png',
    dept: 'Social Media',
  },
  {
    name: 'MEHZABI SHEIKH',
    role: 'DIGITAL MARKETING LEAD',
    image: '/assets/team/Mehzabi.png',
    dept: 'Digital Marketing',
  },
  {
    name: 'KANIKA SHARMA',
    role: 'PERFORMANCE MARKETER',
    image: '/assets/team/Kanika.png',
    dept: 'Performance Ads',
  },
  {
    name: 'PRATIKSHA PATIL',
    role: 'SENIOR TESTER',
    image: '/assets/team/Pratiksha.png',
    dept: 'Quality Assurance',
  },
  {
    name: 'SHITAL GADGE',
    role: 'JUNIOR TESTER',
    image: '/assets/team/Sheetal.png',
    dept: 'Quality Assurance',
  },
  {
    name: 'SURESH BUGALIYA',
    role: 'LEAD DEVELOPER',
    image: '/assets/team/Suresh.png',
    dept: 'Engineering',
  },
  {
    name: 'SWAPNIL',
    role: 'AI VEDIO SPECIALIST',
    image: '/assets/team/AI Video Specialist Creative Workspace.png',
    dept: 'AI Media',
  },
  {
    name: 'AISHWARYA PARDESHI',
    role: 'HR MANAGER',
    image: '/assets/team/HR Talent Engagement Cutout.png',
    dept: 'People & Culture',
  },
];

// Core agency values with full definitions
const CORE_VALUES = [
  {
    num: '01',
    title: 'PASSION',
    subtitle: 'Obsessed with the craft & outcome.',
    desc: 'We are unapologetically meticulous about every typographic kerning, micro-interaction, and visual detail. Good enough is never good enough.',
    icon: Flame,
  },
  {
    num: '02',
    title: 'OWNERSHIP',
    subtitle: 'Radical accountability from wireframe to code.',
    desc: 'We take end-to-end responsibility for our clients’ outcomes. When we partner with a brand, their commercial growth is our personal mission.',
    icon: Target,
  },
  {
    num: '03',
    title: 'CLARITY',
    subtitle: 'Zero design jargon, total transparency.',
    desc: 'Transparent roadmaps, honest timelines, and clean architectural code. We communicate with clarity so founders always know where their brand stands.',
    icon: Compass,
  },
  {
    num: '04',
    title: 'CRAFT',
    subtitle: 'Harmony between aesthetics & high conversion.',
    desc: 'We merge high-fashion editorial art direction with behavioral consumer psychology. Every screen is engineered to convert without sacrificing elegance.',
    icon: Layers,
  },
  {
    num: '05',
    title: 'COLLABORATION',
    subtitle: 'Turning good ideas into un-ignorable icons.',
    desc: 'The best work happens in close synergy with visionary founders. We treat your team as our co-creators at every strategic milestone.',
    icon: Users,
  },
  {
    num: '06',
    title: 'AMBITION',
    subtitle: 'Driven by curiosity & relentless conviction.',
    desc: 'We do not follow trends; we set precedents. We empower brands to challenge category incumbents and command market authority.',
    icon: Zap,
  },
];

// Scroll-triggered count-up counter component
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

    return () => {
      if (observer) observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [activeValue, setActiveValue] = useState<number | null>(0);

  // 3D Card Hover Tilt Calculations
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.transform = `perspective(800px) rotateX(${-y / 14}deg) rotateY(${x / 14}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] selection:bg-black selection:text-white">
      
      {/* ========================================================================= */}
      {/* SECTION 1: EDITORIAL HERO (Off-White / Crisp Light)                       */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-12 pb-20 md:pt-16 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden bg-white">
        {/* Subtle decorative background blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/10 text-[10px] font-mono font-bold tracking-widest text-violet-700 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
            INSIDE TDN &bull; PUNE &amp; JAIPUR
          </div>

          {/* Two-tier oversized editorial headline */}
          <div className="space-y-1 md:space-y-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#111111] leading-[0.92]">
              DIFFERENT MINDS.
            </h1>
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic font-normal text-violet-600 tracking-tight leading-[1.0] pl-1 md:pl-2">
              One standard.
            </div>
          </div>

          {/* Narrative & Metrics Split Row */}
          <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-t border-black/10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                WHO WE ARE &bull; OUR PURPOSE
              </span>
              <p className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed max-w-2xl">
                We are a multidisciplinary collective united by an obsession for bold ideas, honest collaboration, and digital experiences that are built to command authority and endure.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-6 bg-[#f8f8fa] border border-black/5 rounded-2xl p-6 shadow-sm">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#111111]">
                  <StatCounter target={300} suffix="+" />
                </div>
                <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                  Projects Delivered
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-violet-600">
                  <StatCounter target={9} suffix="+" />
                </div>
                <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                  Years of Craft
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#111111]">
                  <StatCounter target={2} />
                </div>
                <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                  Creative Studios
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-violet-600">
                  <StatCounter target={18} suffix="+" />
                </div>
                <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                  Premier Brands
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CINEMATIC STORY VIDEO (Fullscreen Video Backdrop)              */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[95vh] bg-[#050505] overflow-hidden">
        <video
          src="/assets/videos/Home banner vedio.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CORE MANIFESTO & WORKING BELIEF (Off-White / Light Section)     */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#fafafa] border-y border-black/5 relative text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          
          {/* Manifesto Header */}
          <div className="space-y-6 max-w-4xl">
            <span className="text-[10px] font-mono tracking-widest text-violet-600 uppercase">
              OUR WORKING BELIEF &bull; PHILOSOPHY
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-[1.05]">
              &ldquo;DESIGN IS NOT JUST ART. <br />
              <span className="font-serif italic font-normal text-violet-600 lowercase">
                it&apos;s a measurable experience.&rdquo;
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
              We reject cookie-cutter templates, superficial trends, and hollow metrics. Every identity, UI architecture, and search campaign we architect is custom-crafted to build deep customer trust and compound over years.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-black/5 hover:border-violet-500/40 rounded-2xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 font-mono font-black text-sm">
                01
              </div>
              <h3 className="text-lg font-black uppercase text-[#111111] tracking-wide">
                Strategic Intent
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Every visual asset, layout grid, and typographic hierarchy serves a direct commercial objective. We design for clarity, prestige, and seamless conversion.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-violet-500/40 rounded-2xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 font-mono font-black text-sm">
                02
              </div>
              <h3 className="text-lg font-black uppercase text-[#111111] tracking-wide">
                Uncompromising Craft
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Zero shortcuts. Bespoke digital experiences engineered with clean code, buttery 60fps animations, and relentless attention to real-world performance.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-violet-500/40 rounded-2xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 font-mono font-black text-sm">
                03
              </div>
              <h3 className="text-lg font-black uppercase text-[#111111] tracking-wide">
                Compounding Impact
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                We build enduring brand equity. Our work is structured to remain iconic and continue driving high search rank and customer loyalty as your business scales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE 6 CORE VALUES (Dark Editorial Section)                     */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#0a0a0a] text-white border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
              THE 6 PILLARS &bull; GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              OUR CORE <br />
              <span className="font-serif italic font-normal text-violet-400 lowercase">
                values.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed pt-2">
              The internal moral compass that governs how we brainstorm, design, engineer, and partner with brands every day.
            </p>
          </div>

          {/* Right Interactive Values List */}
          <div className="lg:col-span-8 space-y-2 border-t border-white/10">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              const isOpen = activeValue === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveValue(isOpen ? null : idx)}
                  className={`border-b border-white/10 transition-colors duration-300 cursor-pointer group p-6 rounded-2xl ${
                    isOpen ? 'bg-white/[0.05] border-violet-500/40' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-mono font-black text-violet-400">
                        {val.num}
                      </span>
                      <div className="space-y-0.5">
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-violet-300 transition-colors">
                          {val.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium hidden sm:block">
                          {val.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full border transition-all duration-300 ${
                        isOpen ? 'bg-violet-600 border-violet-500 text-white rotate-45' : 'border-white/10 text-gray-400 group-hover:border-white/30 group-hover:text-white'
                      }`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-12 text-sm text-gray-300 font-normal leading-relaxed border-t border-white/5 mt-4 flex items-start gap-3">
                          <Icon className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                          <p>{val.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FOUNDER SPOTLIGHT (Off-White / Crisp Light Section)             */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-white text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Portrait frame with Mayuri's photo */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[540px] md:h-[600px] lg:h-[620px] rounded-3xl overflow-hidden border border-black/10 shadow-xl bg-gray-100 group">
            <Image
              src="/assets/team/Mayuri.jpeg"
              alt="Mayuri Shende Kankariya - CEO & Founder"
              fill
              className="object-cover contrast-105 transition-all duration-700"
              style={{ objectPosition: 'center 18%' }}
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-25% to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-violet-400" />
                CEO &amp; FOUNDER
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-200 bg-black/50 px-2.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                Raffles Design Alumni
              </span>
            </div>
          </div>

          {/* Bio & Leadership Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-violet-600 uppercase">
              LEADERSHIP SPOTLIGHT
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              MAYURI SHENDE KANKARIYA
            </h2>

            {/* Pull quote typography */}
            <blockquote className="text-xl md:text-3xl font-serif italic text-gray-800 border-l-2 border-violet-600 pl-6 my-6 leading-relaxed">
              &ldquo;We don&apos;t sell layouts. We align customer perception and engineer un-ignorable brand narratives.&rdquo;
            </blockquote>

            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4 font-medium">
              <p>
                Alumni of Raffles Design International and co-founder of Design Quarry. Mayuri has steered over 300 successful brand launch campaigns across luxury real estate, high-growth e-commerce, and enterprise sectors.
              </p>
              
              {/* Dynamic Read-More bio expand */}
              <AnimatePresence>
                {isBioExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pt-3 text-gray-600 border-t border-black/10 font-normal"
                  >
                    <p>
                      With a deep foundation in international design methodologies and conversion-driven digital strategy, she mentors TDN&apos;s creative force. Her philosophy is centered on turning disparate digital touchpoints into cohesive, iconic brand journeys.
                    </p>
                    <p>
                      Mayuri collaborates directly with ambitious startup founders and legacy business leaders to articulate their core story, establish category dominance, and deploy digital products that scale sustainably.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <button
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="text-xs font-bold text-violet-700 hover:text-violet-800 uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer bg-violet-50 hover:bg-violet-100 border border-violet-200 px-4 py-2 rounded-full transition-all"
                >
                  {isBioExpanded ? 'Read Less' : 'Read Full Bio'}
                  <Plus className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isBioExpanded ? 'rotate-45' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: THE CREW & CULTURE (Off-White / Light Soft Grid)               */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto space-y-16 bg-[#f8f8fa] border-y border-black/5 rounded-3xl my-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-violet-600 uppercase">
              THE MINDS BEHIND THE MAGIC
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
              THE CREATIVE CREW.
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-600 max-w-md font-medium">
            Designers, engineers, video editors, and growth tacticians obsessed with shipping game-changing work.
          </p>
        </div>

        {/* Irfan Khan - CEO ALDS (Centered on Top) */}
        <div className="flex justify-center w-full">
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="w-full max-w-sm sm:max-w-md bg-white hover:bg-white rounded-3xl overflow-hidden border border-black/8 hover:border-violet-500/40 p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 group origin-center shadow-sm hover:shadow-2xl hover:-translate-y-1.5 relative"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[#f6f6f8] border border-black/5">
              <Image
                src={TEAM[0].image}
                alt={TEAM[0].name}
                fill
                sizes="(max-width: 640px) 100vw, 448px"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                priority
              />

              {/* Department Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-mono font-bold text-white border border-white/10 uppercase tracking-wider">
                {TEAM[0].dept}
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-black uppercase text-[#111111] leading-tight">
              {TEAM[0].name}
            </h3>
            
            <div className="text-xs sm:text-sm font-mono font-bold text-violet-700 uppercase tracking-wider mt-2">
              {TEAM[0].role}
            </div>
          </div>
        </div>

        {/* Remaining 12 Creative Crew Members (3-column grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM.slice(1).map((member, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="bg-white hover:bg-white rounded-3xl overflow-hidden border border-black/8 hover:border-violet-500/40 p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 group origin-center shadow-sm hover:shadow-2xl hover:-translate-y-1.5 relative"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Natural original colors (no grayscale) with hover zoom */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[#f6f6f8] border border-black/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Role Specific Motion Graphics / Animation Overlays */}
                {member.type === 'design' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {member.type === 'seo' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {member.type === 'video' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-indigo-500/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {/* Audio Equalizer bars animation */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-end gap-0.5 px-2 py-1.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10">
                      <span className="w-0.5 h-2.5 bg-violet-400 animate-pulse" style={{ animationDuration: '0.6s' }} />
                      <span className="w-0.5 h-4 bg-pink-400 animate-pulse" style={{ animationDuration: '0.4s' }} />
                      <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.7s' }} />
                      <span className="w-0.5 h-3.5 bg-violet-300 animate-pulse" style={{ animationDuration: '0.5s' }} />
                    </div>
                  </>
                )}

                {/* Department Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-mono font-bold text-white border border-white/10 uppercase tracking-wider">
                  {member.dept}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black uppercase text-[#111111] leading-tight">
                {member.name}
              </h3>
              
              <div className="text-xs sm:text-sm font-mono font-bold text-violet-700 uppercase tracking-wider mt-2">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: DUAL CREATIVE HUBS (Dark Architectural Section)                */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#0c0c0c] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
              PHYSICAL PRESENCE &bull; CREATIVE HUBS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              WHERE IDEAS COME TO LIFE.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pune Hub */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-6 group hover:border-violet-500/40 transition-colors">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/TDN Modern Reception Lobby.png"
                  alt="TDN Pune Studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-white uppercase tracking-widest">
                  <MapPin className="w-3 h-3 text-violet-400" /> PUNE STUDIO
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  PUNE STUDIO
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  Our central innovation engine housing brand strategy labs, UI/UX interaction design, and core software engineering operations.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-violet-400 hover:text-white transition-colors"
                  >
                    Explore Pune Office ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* Jaipur Hub */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-6 group hover:border-violet-500/40 transition-colors">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/TDN Office Meeting Discussion.png"
                  alt="TDN Jaipur Creative Studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-white uppercase tracking-widest">
                  <MapPin className="w-3 h-3 text-violet-400" /> JAIPUR STUDIO
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  JAIPUR CREATIVE LAB
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  Dedicated to visual storytelling, narrative film production, commercial photography, and Northern India client relations.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-violet-400 hover:text-white transition-colors"
                  >
                    Explore Jaipur Studio ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: BOTTOM MAGNETIC CALL TO ACTION (Off-White / Light Contrast)    */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 border-t border-black/5 bg-[#f4f4f6] text-center px-6 relative overflow-hidden text-[#111111]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial from-violet-200/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-violet-700 uppercase">
            LET&apos;S WORK TOGETHER
          </span>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
            READY TO CRAFT YOUR <br />
            <span className="font-serif italic font-normal text-violet-600 lowercase">
              brand narrative?
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed font-medium">
            Whether you are launching a breakthrough venture or repositioning a market leader, we are ready to build something remarkable together.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-extrabold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Start a project <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-gray-50 border border-black/10 text-[#111111] font-extrabold text-xs uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore services <ArrowUpRight className="w-4 h-4 text-[#111111]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
