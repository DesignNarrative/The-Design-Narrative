'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Share2, 
  Target, 
  HelpCircle, 
  ArrowUpRight, 
  TrendingUp, 
  BarChart3, 
  Video, 
  Layers, 
  Users2,
  MessageCircle,
  Building,
  UtensilsCrossed,
  Briefcase,
  Rocket
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '1. How much does social media marketing cost in Pune?',
    a: 'Social media marketing costs depend on the number of platforms, content requirements, campaign complexity, and advertising budget. The right package should align with your business goals and expected outcomes.',
  },
  {
    q: '2. Which social media marketing agency in Pune is right for my business?',
    a: 'Choose an agency that understands your audience, creates platform-specific content, and connects social media activities with business goals. Review its creative work, strategy, and reporting approach before making a decision.',
  },
  {
    q: '3. What services does a social media marketing agency provide?',
    a: 'Services typically include social media management, content creation, reels, campaign planning, paid advertising, and performance reporting. These activities help businesses build visibility, engage audiences, and generate enquiries.',
  },
  {
    q: '4. Which social media platform is best for my business?',
    a: 'LinkedIn is useful for B2B audiences, while Instagram and Facebook can help consumer-facing and local businesses reach potential customers. The right platform depends on your industry, audience behaviour, and marketing objectives.',
  },
  {
    q: '5. How can social media marketing generate leads for my business?',
    a: 'Strategic content, targeted advertising, and clear calls to action can encourage potential customers to enquire about your products or services. Lead forms, website visits, and WhatsApp messages can help convert interest into sales opportunities.',
  },
  {
    q: '6. How long does social media marketing take to show results?',
    a: 'Engagement and reach can improve within weeks, while consistent brand growth and lead generation generally require ongoing effort. Results depend on your strategy, audience, industry, and advertising budget.',
  },
  {
    q: '7. Can social media marketing help local businesses in Pune attract more customers?',
    a: 'Yes, location-focused content, local campaigns, and targeted advertising can help Pune businesses reach relevant audiences. These efforts can support enquiries, bookings, store visits, and local brand awareness.',
  },
  {
    q: '8. How do you measure the success of social media marketing campaigns?',
    a: 'Campaign performance is measured through reach, engagement, website traffic, enquiries, conversions, and cost per lead. The most important metrics depend on your business objectives and marketing investment.',
  },
];

const INDUSTRIES = [
  {
    title: 'Real Estate & Properties',
    desc: 'Project launches, floor plan walk-throughs, lifestyle visuals, and targeted ad campaigns driving serious site visit bookings.',
    icon: Building,
    image: '/assets/services/social-media/Modern Homes, Digital Showcase.png',
  },
  {
    title: 'Restaurants & Hospitality',
    desc: 'High-appetite food reels, ambience spotlights, chef stories, and weekend promotion campaigns turning scrollers into diners.',
    icon: UtensilsCrossed,
    image: '/assets/services/social-media/Restaurant Social Media Showcase.png',
  },
  {
    title: 'High-Growth Startups',
    desc: 'Founder storytelling, product drops, hiring showcases, and agile social growth loops that build loyal early communities.',
    icon: Rocket,
    image: '/assets/services/social-media/Collaborative Startup Team in Modern Office.png',
  },
  {
    title: 'Professional Services',
    desc: 'Authority-building LinkedIn carousels, client success breakdowns, and lead-gen campaigns establishing industry trust.',
    icon: Briefcase,
    image: '/assets/services/social-media/Professional Services Meeting.png',
  },
];

export default function SocialMediaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      "Hey TDN! We'd like to consult with you on Social Media Marketing & Campaigns for our business. Let's talk!"
    );
    return `https://wa.me/919850417266?text=${text}`;
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#111111] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: Banner - Sunset Social Media Workspace.png            */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/services/social-media/Banner - Sunset Social Media Workspace.png"
          alt="Sunset Social Media Workspace - The Design Narrative"
          className="w-full h-auto max-h-[85vh] object-cover object-center block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Main Flow Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20 md:space-y-32">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <Link
            href="/services"
            className="text-xs font-mono font-bold text-gray-500 hover:text-black uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            &larr; <span>Back to All Services</span>
          </Link>
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-rose-600/10 text-rose-700 border border-rose-600/20">
            ATTENTION & PERFORMANCE MARKETING
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 2. TITLE SECTION                                                          */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" /> PUNE SOCIAL MEDIA AGENCY
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            Social Media Marketing Agency in Pune
          </h1>
        </motion.section>

        {/* ========================================================================= */}
        {/* 3. INTRODUCTION / OVERVIEW                                                */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 max-w-4xl pt-4"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-relaxed font-normal">
            Your social media should do more than fill your feed. We help Pune businesses turn attention into meaningful engagement through strategic content, targeted campaigns, and consistent audience interaction that builds brand awareness, trust, and business growth.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 4. OUR SOCIAL MEDIA SERVICES (4 Core Capabilities with Visuals)          */}
        {/* ========================================================================= */}
        <section className="space-y-16 md:space-y-24 pt-8 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-rose-600 font-bold uppercase block">
              SERVICES & CHANNELS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Our Social Media Services
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            
            {/* SERVICE 1: Social Media Management */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-rose-600 tracking-widest uppercase block">
                  01 &bull; END-TO-END FEED DIRECTION
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Social Media Management
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Content calendars, design, captions, publishing, and community replies across Instagram, Facebook, and LinkedIn.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/social-media/Social Media Content Planning Workspace.png"
                  alt="Social Media Content Planning Workspace"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 2: Paid Social Campaigns */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-rose-600 tracking-widest uppercase block">
                  02 &bull; HIGH-ROI PERFORMANCE ADS
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Paid Social Campaigns
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Ad campaigns for lead generation, enquiries, and sales, with budgets set against what a lead is worth to you.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/social-media/Laptop Analytics Dashboard at Work.png"
                  alt="Laptop Analytics Dashboard at Work"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 3: Content Creation */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-rose-600 tracking-widest uppercase block">
                  03 &bull; BESPOKE CREATIVE ASSETS
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Content Creation
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Posts, carousels, short video and brand assets that look like they belong together.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/social-media/Content creation.png"
                  alt="Social Media Content Creation"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 4: Reporting and Optimisation */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-rose-600 tracking-widest uppercase block">
                  04 &bull; TRANSPARENT METRICS & AUDITS
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Reporting and Optimisation
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Monthly reports covering reach, engagement and, more usefully, enquiries and cost per lead.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/social-media/Social Media Analytics Workspace.png"
                  alt="Social Media Analytics Workspace"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. HOW WE PLAN YOUR SOCIAL MEDIA                                          */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono font-bold tracking-widest text-rose-600 uppercase">
              <Target className="w-3.5 h-3.5 text-rose-600" /> STRATEGIC PLAYBOOK
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              How We Plan Your Social Media
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
              We begin with your audience, your goals and what competitors are doing. Then we choose the platforms that make sense, set a posting rhythm you can sustain, and decide how we&apos;ll measure success before anything is published.
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5"
          >
            <img
              src="/assets/services/social-media/Social Media Strategy Meeting.png"
              alt="Social Media Strategy Meeting"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SOCIAL MEDIA FOR DIFFERENT INDUSTRIES                                  */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <span className="text-[11px] font-mono tracking-widest text-rose-600 font-bold uppercase block">
              TAILORED PLAYBOOKS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Social Media for Different Industries
            </h2>
            <p className="text-xl sm:text-2xl font-serif text-gray-800 leading-relaxed font-normal">
              Real estate, restaurants, startups, and professional services all use social media differently. A property developer needs project launches and site visit bookings. A café needs footfall and regulars. We plan for the actual goal.
            </p>
          </motion.div>

          {/* Big Cards: All 4 in One Line, Pure Images with No Text, 100% Uncropped */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full items-start"
          >
            {INDUSTRIES.map((ind, idx) => (
              <div
                key={idx}
                className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-transparent group flex items-center justify-center"
              >
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-auto block rounded-2xl md:rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 7. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)                     */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-mono font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> GOT QUESTIONS?
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              FAQ’s
            </h2>
          </motion.div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 sm:py-8 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group"
                  >
                    <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:text-rose-600 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-black/10 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-black text-white' : 'bg-white text-black'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-base sm:text-lg font-serif text-gray-700 leading-relaxed max-w-4xl font-normal">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. BOTTOM CALL TO ACTION                                                  */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl bg-[#050505] text-white p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase block">
              STOP THE SCROLL & WIN CLIENTS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Let&apos;s Build a Social Presence That Drives Real Business.
            </h2>
            <p className="text-base sm:text-xl text-gray-300 font-serif leading-relaxed">
              From creative reel production and cohesive organic feeds to high-converting paid meta ads across Pune and beyond, we turn attention into predictable revenue.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Plan a Campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Share2 className="w-96 h-96 text-white" />
          </div>
        </motion.section>

      </div>
    </div>
  );
}
