'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  HelpCircle, 
  TrendingUp, 
  Search, 
  BarChart3, 
  MapPin, 
  Link2, 
  ShieldCheck, 
  Cpu, 
  MessageCircle,
  Building2,
  Rocket,
  Store,
  Briefcase
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '1. How much does SEO cost in Pune?',
    a: 'SEO costs in Pune depend on your website size, competition, target keywords, and required services. Pricing is usually based on a monthly retainer tailored to your business goals.',
  },
  {
    q: '2. How long does SEO take to show results?',
    a: 'SEO typically takes three to six months to show meaningful improvements, depending on competition, website health, and strategy. Results vary, and consistent optimisation is essential for sustainable growth.',
  },
  {
    q: '3. What SEO services does an SEO company in Pune provide?',
    a: 'An SEO company in Pune typically offers technical SEO, on-page optimisation, keyword research, content optimisation, link building, and local SEO. These services help improve search visibility, attract relevant visitors, and generate enquiries.',
  },
  {
    q: '4. What is local SEO, and how can it help my Pune business?',
    a: 'Local SEO helps your business appear in location-based searches and Google Maps results. It improves local visibility and helps nearby customers discover your services and contact your business.',
  },
  {
    q: '5. How can SEO generate leads for my business?',
    a: 'SEO attracts people actively searching for your products or services through relevant search results. Optimised landing pages and clear calls to action help convert visitors into enquiries, calls, and WhatsApp messages.',
  },
  {
    q: '6. What is the difference between on-page SEO and technical SEO?',
    a: 'On-page SEO improves page content, headings, keywords, metadata, and internal links. Technical SEO focuses on crawling, indexing, site speed, structured data, and website accessibility for search engines.',
  },
  {
    q: '7. Is SEO better than Google Ads for generating leads?',
    a: 'SEO builds long-term organic visibility, while Google Ads can deliver paid visibility as soon as campaigns become active. The right choice depends on your budget, competition, timeline, and lead generation goals.',
  },
  {
    q: '8. Can an SEO company help my website rank on Google AI Overviews?',
    a: 'An SEO company can improve your website’s eligibility for AI-generated search answers through helpful content, clear explanations, structured data, and credible sources. However, inclusion in Google AI Overviews cannot be guaranteed.',
  },
  {
    q: '9. What is the difference between SEO, AEO, and GEO?',
    a: 'SEO improves visibility in traditional search results, AEO focuses on answering questions directly, and GEO aims to improve visibility in generative AI responses. A coordinated strategy can support discoverability across these search experiences.',
  },
];

const SEO_SERVICES = [
  {
    num: '01',
    title: 'Technical SEO',
    tag: 'CRAWLABILITY & ARCHITECTURE',
    desc: 'We fix what stops Google from crawling and understanding your site: sitemaps, robots.txt, canonical tags, page speed, structured data, and indexing problems.',
    image: '/assets/services/seo/01_technical_seo_analytics.jpg',
  },
  {
    num: '02',
    title: 'On-Page SEO and Content',
    tag: 'SEARCH INTENT & RELEVANCE',
    desc: 'We research the keywords your customers use, then write and optimise pages to answer them. That covers titles, headings, copy, internal links, and FAQs.',
    image: '/assets/services/seo/02_on_page_seo_keyword_research.jpg',
  },
  {
    num: '03',
    title: 'Local SEO for Pune Businesses',
    tag: 'GOOGLE MAPS & REGIONAL DOMINANCE',
    desc: 'We set up and manage your Google Business Profile, keep your name, address, and phone number consistent across directories, and build the reviews that decide the map results.',
    image: '/assets/services/seo/03_local_seo_business_listing.jpg',
  },
  {
    num: '04',
    title: 'Link Building and Digital PR',
    tag: 'AUTHORITY & TRUST SIGNALS',
    desc: "We earn links from relevant, trustworthy sites. We don't buy links or use private networks, because the short-term gain isn't worth a penalty.",
    image: '/assets/services/seo/04_link_building_digital_pr.jpg',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Audit',
    desc: 'A full review of your technical health, content, and competitors.',
    image: '/assets/services/seo/Analytics Dashboard in a Warm Workspace.png',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'A keyword and page plan with priorities, not a generic checklist.',
    image: '/assets/services/seo/SEO Strategy Meeting in Modern Office.png',
  },
  {
    num: '03',
    title: 'Implementation',
    desc: 'We make the changes, or give your developer exact instructions.',
    image: '/assets/services/seo/Focused Developer Coding at a Modern Workspace.png',
  },
  {
    num: '04',
    title: 'Reporting',
    desc: 'Monthly updates on rankings, leads, and next steps.',
    image: '/assets/services/seo/Professional Analytics Dashboard Workspace.png',
  },
];

const CLIENT_TYPES = [
  {
    title: 'High-Growth Startups',
    category: 'SaaS & Tech',
    image: '/assets/services/seo/Collaborative Startup Team in Modern Office.png',
  },
  {
    title: 'Real Estate Brands',
    category: 'Commercial & Luxury Living',
    image: '/assets/services/seo/Golden-Hour Modern Residential Towers.png',
  },
  {
    title: 'Local Service Businesses',
    category: 'Pune Clinics & Consultancies',
    image: '/assets/services/seo/Local Service Business Consultation.png',
  },
  {
    title: 'Franchises & Retail',
    category: 'Multi-Location Brands',
    image: '/assets/services/seo/Upscale Mall Cafe Corridor with Franchises Sign.png',
  },
];

export default function SeoPage() {
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
      "Hey TDN! We'd like to consult with you on SEO & Lead Generation for our business in Pune. Let's talk!"
    );
    return `https://wa.me/919850417266?text=${text}`;
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#111111] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: SEO Growth Analytics Workspace.png                    */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/services/seo/SEO Growth Analytics Workspace.png"
          alt="SEO Growth Analytics Workspace - The Design Narrative"
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
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-800 border border-emerald-600/20">
            SEARCH & ORGANIC REVENUE
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> PUNE SEO & LEAD GENERATION
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            SEO Company in Pune for Businesses That Want Leads, Not Just Traffic
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
            We&apos;re an SEO company in Pune that focuses on the searches that lead to enquiries. Traffic is easy to inflate. We aim for the visitors who call, fill in a form, or message you on WhatsApp.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 4. WHAT OUR SEO SERVICES INCLUDE (4 Core Capabilities with Visuals)      */}
        {/* ========================================================================= */}
        <section className="space-y-16 md:space-y-24 pt-8 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-emerald-700 font-bold uppercase block">
              CORE CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              What Our SEO Services Include
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            {SEO_SERVICES.map((srv, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="space-y-6"
              >
                <div className="max-w-3xl space-y-2">
                  <span className="text-xs font-mono font-black text-emerald-700 tracking-widest uppercase block">
                    {srv.num} &bull; {srv.tag}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                    {srv.title}
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                    {srv.desc}
                  </p>
                </div>

                <div className="w-fit max-w-xl mx-auto overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-transparent mt-6">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-auto block rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. HOW OUR SEO PROCESS WORKS (4 Steps with Real Images)                   */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <span className="text-[11px] font-mono tracking-widest text-emerald-700 font-bold uppercase block">
              EXECUTION BLUEPRINT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              How Our SEO Process Works
            </h2>
          </motion.div>

          {/* 4 Process Cards with Images & Content (Uniform Single Row Grid) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 border-t-2 border-t-emerald-600/30 hover:border-t-emerald-600 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-black/5">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-black/70 backdrop-blur-md flex items-center justify-center font-mono font-black text-emerald-400 text-sm">
                    {step.num}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-2 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg font-black text-black uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. WHO OUR SEO SERVICES SUIT (Pure Uncropped Images)                      */}
        {/* ========================================================================= */}
        <section className="space-y-10 md:space-y-14 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <span className="text-[11px] font-mono tracking-widest text-emerald-700 font-bold uppercase block">
              TARGET AUDIENCE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Who Our SEO Services Suit
            </h2>
            <p className="text-xl sm:text-2xl font-serif text-gray-800 leading-relaxed font-normal">
              Local service businesses, startups, real estate brands, franchises, and software companies that depend on search for new customers.
            </p>
          </motion.div>

          {/* 4 Big Uncropped Images in One Line */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full items-start"
          >
            {CLIENT_TYPES.map((item, idx) => (
              <div
                key={idx}
                className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-transparent group flex items-center justify-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> GOT QUESTIONS?
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Frequently Asked Questions
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
                    <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
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
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase block">
              STOP PAYING FOR INFLATED TRAFFIC
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Let&apos;s Target the Searches That Bring Qualified Enquiries.
            </h2>
            <p className="text-base sm:text-xl text-gray-300 font-serif leading-relaxed">
              From in-depth technical audits and local Pune Google Maps dominance to strategic keyword architecture and clean digital PR, we build search authority that turns visitors into revenue.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Request an SEO Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <TrendingUp className="w-96 h-96 text-white" />
          </div>
        </motion.section>

      </div>
    </div>
  );
}
