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
    title: 'BRAND DESIGN',
    tag: 'IDENTITY & PACKAGING',
    desc: 'Naming, brand strategy, visual identity, brand guidelines, and packaging design for businesses that are launching or repositioning.',
    image: '/assets/services/Brand Design Card.png',
    link: '/services/brand-design',
    icon: Paintbrush,
    dotColor: 'bg-violet-500',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX DESIGN',
    tag: 'DIGITAL PRODUCTS',
    desc: 'Wireframes, prototypes, design systems and mobile app interfaces, built around how people actually use your site and designed to turn visits into enquiries.',
    image: '/assets/services/UiUX Card.png',
    link: '/services/ui-ux',
    icon: Layers,
    dotColor: 'bg-cyan-500',
  },
  {
    id: 'social-media',
    title: 'SOCIAL MEDIA MARKETING',
    tag: 'VIRAL ENGAGEMENT',
    desc: 'Content calendars, short-form video and paid campaigns for the platforms your customers use.',
    image: '/assets/services/Social Media Card.png',
    link: '/services/social-media',
    icon: Share2,
    dotColor: 'bg-pink-500',
  },
  {
    id: 'seo',
    title: 'SEO & GROWTH',
    tag: 'ORGANIC RANKINGS',
    desc: 'Technical SEO, keyword research, and content that brings in search traffic and turns it into leads. We improve your visibility, and we don’t promise a ranking.',
    image: '/assets/services/SEO Card.png',
    link: '/services/seo',
    icon: TrendingUp,
    dotColor: 'bg-lime-500',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We learn your brand, goals, and audience.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'We build a strategy around your growth goals and budget.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Design and develop',
    desc: 'We create and build the work.',
    icon: Boxes,
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'We track results and report on leads and traffic.',
    icon: BarChart3,
  },
];


export default function ServicesPage() {
  const [customMsg, setCustomMsg] = useState('');

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
                <span className="font-serif italic font-normal text-violet-600 lowercase">
                  crafted for growing
                </span> <br />
                brands.
              </h1>

              <p className="text-sm md:text-base text-gray-600 font-medium max-w-xl leading-relaxed">
                The Design Narrative offers brand design, UI/UX design, SEO, and social media marketing from studios in Pune and Jaipur. One team handles all four, so your identity, website, and marketing pull in the same direction.
              </p>
            </div>


            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10 max-w-lg">
              <div>
                <div className="text-2xl md:text-3xl font-black text-black">18+</div>
                <div className="text-[10px] md:text-xs text-gray-500 font-medium">Brands Worked With</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-black">2+</div>
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
                src="/assets/services/SERVICES BANNER IMAGE.png"
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
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
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

        {/* Large 2-Column Cards Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence>
            {SERVICES_LIST.map((service, idx) => {
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
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-end pt-4 border-t border-black/5">
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
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5 space-y-12 md:space-y-16">
        {/* Section Header: Headline & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
              OUR PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              FROM IDEA <br />
              TO <span className="font-serif italic font-normal text-violet-600">IMPACT.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-md">
            A simple, collaborative process to turn your goals into a powerful digital presence.
          </p>
        </div>

        {/* 4-Step Process Cards Grid (Perfect Alignment & Equal Heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#fafafc] rounded-2xl p-6 sm:p-7 border border-black/5 border-t-2 border-t-violet-600/30 hover:border-t-violet-600 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-start group"
              >
                {/* Top: Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-violet-600 tracking-tight">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-200">
                    <StepIcon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Description with exact vertical alignment */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-black uppercase tracking-tight min-h-[2.5rem] flex items-center">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
