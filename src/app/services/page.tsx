'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Paintbrush,
  Layers,
  Code2,
  Share2,
  TrendingUp,
  Video,
  Search,
  Compass,
  Boxes,
  BarChart3,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const SERVICES_LIST = [
  {
    id: 'brand-design',
    category: 'BRANDING',
    title: 'BRAND DESIGN',
    tag: 'IDENTITY & PACKAGING',
    desc: 'Strategy, naming, and packaging design built to stand out.',
    deliverables: ['Visual Identity', 'Luxury Packaging', 'Brand Guidelines', 'Naming & Strategy'],
    image: '/assets/services/Brand Design Card.png',
    link: '/services/brand-design',
    icon: Paintbrush,
    dotColor: 'bg-violet-500',
  },
  {
    id: 'ui-ux',
    category: 'DIGITAL',
    title: 'UI/UX DESIGN',
    tag: 'DIGITAL PRODUCTS',
    desc: 'Websites and apps shaped by user behavior with snappy, high-converting layouts.',
    deliverables: ['Design Systems', 'Mobile App UI', 'Wireframes & Prototypes', 'Conversion UX'],
    image: '/assets/services/UiUX Card.png',
    link: '/services/ui-ux',
    icon: Layers,
    dotColor: 'bg-cyan-500',
  },
  {
    id: 'web-development',
    category: 'DIGITAL',
    title: 'WEB DEVELOPMENT',
    tag: 'FAST & SCALABLE',
    desc: 'Fast, modern, and scalable websites that convert visitors into buyers.',
    deliverables: ['Next.js & React', 'E-Commerce', '3D Motion', 'API Integrations'],
    image: '/assets/services/web-development.jpg',
    link: '/services/ui-ux',
    icon: Code2,
    dotColor: 'bg-blue-500',
  },
  {
    id: 'social-media',
    category: 'MARKETING',
    title: 'SOCIAL MEDIA MARKETING',
    tag: 'VIRAL ENGAGEMENT',
    desc: 'Compelling campaigns and feed-stopping content designed to capture attention.',
    deliverables: ['Short-form Reels', 'Content Calendar', 'Viral Growth Engine', 'Paid Ads'],
    image: '/assets/services/Social Media Card.png',
    link: '/services/social-media',
    icon: Share2,
    dotColor: 'bg-pink-500',
  },
  {
    id: 'seo',
    category: 'MARKETING',
    title: 'SEO & GROWTH',
    tag: 'ORGANIC RANKINGS',
    desc: 'Ranking optimization that gets you organic Page 1 slots on Google.',
    deliverables: ['Technical SEO', 'High-Intent Keywords', 'Entity Search', 'Content Moats'],
    image: '/assets/services/SEO Card.png',
    link: '/services/seo',
    icon: TrendingUp,
    dotColor: 'bg-lime-500',
  },
  {
    id: 'content-creative',
    category: 'MARKETING',
    title: 'CONTENT & CREATIVE',
    tag: 'VISUALS & MOTION',
    desc: 'Visuals, videos, and copywriting that connect with your audience and convert.',
    deliverables: ['Brand Photography', 'Commercial Films', 'Motion Graphics', 'Copywriting'],
    image: '/assets/services/content-creative.jpg',
    link: '/services/social-media',
    icon: Video,
    dotColor: 'bg-purple-500',
  },
];

const SERVICE_FILTER_TABS = ['ALL', 'BRANDING', 'DIGITAL', 'MARKETING'];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand your brand, goals and audience.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Build a bespoke strategy that fits your growth needs.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Design & Develop',
    desc: 'Bring ideas to life with world-class creativity & tech.',
    icon: Boxes,
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'Track, optimize and scale for measurable ROI.',
    icon: BarChart3,
  },
];

const CASE_STUDIES = [
  {
    client: 'Chaav Bhari',
    service: 'Rebranding',
    metric: '+120% Conversions',
    image: '/assets/projects/Chav Bhari.png',
    link: '/work/chav-bhari',
  },
  {
    client: 'Yarnen',
    service: 'UI/UX Design',
    metric: '3x Engagement',
    image: '/assets/projects/Yarnen fashion.png',
    link: '/work/yarnen',
  },
  {
    client: 'Saarthi',
    service: 'SEO & Growth',
    metric: '+150% Organic Traffic',
    image: '/assets/blogs/seo-growth-blog.jpg',
    link: '/services/seo',
  },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [customMsg, setCustomMsg] = useState('');

  const filteredServices = SERVICES_LIST.filter(
    (service) => activeFilter === 'ALL' || service.category === activeFilter
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We saw your services page and have a custom requirement: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 md:pt-16 pb-20 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
                OUR SERVICES
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
                DIGITAL MAGIC <br />
                <span className="font-serif italic font-normal text-gray-500 lowercase">
                  crafted for growing
                </span> <br />
                brands.
              </h1>

              <p className="text-sm md:text-base text-gray-600 font-medium max-w-xl leading-relaxed">
                Strategy, design and digital solutions that help you stand out, connect with your audience, and grow faster.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#services-grid"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                EXPLORE OUR SERVICES <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/15 text-black text-xs font-bold uppercase tracking-wider hover:bg-black/5 hover:scale-105 active:scale-95 transition-all"
              >
                GET A FREE CONSULTATION
              </Link>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10 max-w-lg">
              <div>
                <div className="text-2xl md:text-3xl font-black text-black">50+</div>
                <div className="text-[10px] md:text-xs text-gray-500 font-medium">Brands Worked With</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-black">3+</div>
                <div className="text-[10px] md:text-xs text-gray-500 font-medium">Cities</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-black">100%</div>
                <div className="text-[10px] md:text-xs text-gray-500 font-medium">Custom Strategies</div>
              </div>
            </div>
          </div>

          {/* Right Hero Moodboard Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] md:min-h-[460px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-white"
            >
              <Image
                src="/assets/services/Services Banner.png"
                alt="The Design Narrative Services Banner"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. SOLUTIONS FOR EVERY STAGE (Large 2-Column Cards Grid with Tabs & Animations) */}
      <section id="services-grid" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              SOLUTIONS FOR EVERY <br />
              STAGE OF <span className="font-serif italic font-normal text-violet-600">YOUR GROWTH.</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-xl">
              From brand identity to high-performing websites and campaigns &mdash; we help you build a strong digital presence that delivers real results.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#f4f4f6] p-1.5 rounded-full border border-black/5 self-start lg:self-end">
            {SERVICE_FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Large 2-Column Cards Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence>
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Link
                    href={service.link}
                    className="group bg-white rounded-[2.2rem] md:rounded-[2.5rem] border border-black/10 shadow-xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2.5 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full"
                  >
                    {/* Big Prominent Image Section */}
                    <div className="relative h-80 sm:h-96 md:h-[420px] lg:h-[460px] w-full overflow-hidden bg-gray-900">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Top-Left Frosted Tag */}
                      <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/15 shadow-md">
                        <span className={`w-2 h-2 rounded-full ${service.dotColor}`} />
                        <span>{service.tag}</span>
                      </div>

                      {/* Top-Right Floating Icon Pill */}
                      <div className="absolute top-5 right-5 z-10 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center border border-black/5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-violet-600" />
                      </div>

                      {/* Title overlay at bottom of image for cinematic depth */}
                      <div className="absolute bottom-5 left-6 right-6 z-10 text-white">
                        <span className="text-[10px] font-mono tracking-widest text-violet-300 font-bold uppercase block mb-1">
                          CHAPTER 0{idx + 1} &bull; {service.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase drop-shadow-md">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Compact Text Section */}
                    <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between flex-grow gap-4 bg-white">
                      <div className="space-y-3">
                        <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                          {service.desc}
                        </p>

                        {/* Deliverables / Capabilities Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f6f8] text-[10px] font-mono font-semibold text-gray-700 border border-black/5 group-hover:border-violet-500/20 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-violet-500" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                          Deep-Dive Chapter
                        </span>
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-wider group-hover:bg-violet-600 group-hover:shadow-lg transition-all duration-300 shadow-sm">
                          EXPLORE SERVICE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. OUR PROCESS (From Idea to Impact) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Process Headline */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
              OUR PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              FROM IDEA <br />
              TO <span className="font-serif italic font-normal text-violet-600">IMPACT.</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
              A simple, collaborative process to turn your goals into a powerful digital presence.
            </p>
          </div>

          {/* Right Process 4-Step Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#fafafc] rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400">{step.num}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black text-black uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. REAL RESULTS (Brands That Grew With Us) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
              REAL RESULTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              BRANDS THAT <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-violet-600">GREW WITH US.</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-md leading-relaxed">
              A glimpse of what&apos;s possible when strategy, design and execution come together.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-black/15 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200 self-start md:self-auto shrink-0 shadow-sm"
          >
            VIEW ALL CASE STUDIES <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs, idx) => (
            <Link
              key={idx}
              href={cs.link}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                <Image
                  src={cs.image}
                  alt={cs.client}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-6 md:p-7 flex flex-col justify-between flex-grow gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-black group-hover:text-violet-600 transition-colors">
                      {cs.client}
                    </h3>
                    <div className="text-[11px] font-mono text-gray-400 uppercase font-bold">{cs.service}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-black text-violet-600">
                  <span>{cs.metric}</span>
                  <span className="text-[10px] font-mono uppercase text-gray-400 font-medium">Impact</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. DIDN'T FIND WHAT YOU'RE LOOKING FOR? (Custom Requirement CTA) */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#060608] text-white p-8 md:p-14 border border-white/10 shadow-2xl">
          
          {/* Ambient Background Artwork */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="/assets/cta-laptop.jpg"
              alt="Custom Plan Setup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 font-bold uppercase block">
                LET&apos;S COLLABORATE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                DIDN&apos;T FIND WHAT <br />
                YOU&apos;RE LOOKING FOR?
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-lg">
                Tell us about your project and we&apos;ll formulate a custom plan for your brand, website, marketing or any digital requirement.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  SUBMIT VIA WHATSAPP <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="mailto:ceo@thedesignnarrative.in"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  EMAIL CEO
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Form Bar */}
            <div className="lg:col-span-5">
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <label htmlFor="service-req" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                  Quick requirement details
                </label>
                <div className="relative">
                  <input
                    id="service-req"
                    type="text"
                    required
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="We want a rebranding project, new e-commerce UI design, and SEO setup..."
                    className="w-full pl-5 pr-14 py-4 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 focus:outline-none text-white text-xs placeholder:text-gray-500 backdrop-blur-md transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    aria-label="Submit requirement"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
