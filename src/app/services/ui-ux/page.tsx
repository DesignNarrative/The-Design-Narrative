'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle, 
  HelpCircle, 
  ArrowUpRight, 
  Laptop, 
  Gauge, 
  Layers, 
  Code2, 
  Search, 
  Wrench,
  MessageCircle,
  Smartphone
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '1. How much does website design cost in Pune?',
    a: 'Website design costs in Pune depend on the number of pages, design complexity, required features, and development platform. A customised quote helps determine the investment based on your business requirements.',
  },
  {
    q: '2. Which company provides UI/UX and website design services in Pune?',
    a: 'The Design Narrative offers UI/UX design and website design services focused on usability, visual consistency, and business goals. The approach combines intuitive user experiences with responsive layouts and SEO-ready foundations.',
  },
  {
    q: '3. What is the difference between UI and UX design?',
    a: "UI design focuses on a website's visual elements, including layouts, colours, buttons, and typography. UX design focuses on how easily users navigate the website and complete actions such as enquiries or purchases.",
  },
  {
    q: '4. How long does it take to design and develop a website?',
    a: 'Website timelines depend on the number of pages, functionality, content readiness, and approval process. A simple business website generally takes less time than a complex, feature-rich website.',
  },
  {
    q: '5. Will my new website be mobile-friendly and SEO-ready?',
    a: 'A well-built website should adapt to different screen sizes and follow SEO fundamentals, including crawlable pages, proper headings, metadata, and a logical site structure. Search rankings still depend on content quality, competition, and ongoing optimisation.',
  },
  {
    q: '6. Can a website redesign help generate more business enquiries?',
    a: 'Yes, a strategic redesign can improve navigation, page speed, mobile usability, and calls to action. These improvements can make it easier for visitors to understand your offering and contact your business.',
  },
  {
    q: '7. Why are website speed and Core Web Vitals important?',
    a: 'Fast-loading pages improve user experience, while Core Web Vitals measure loading performance, interactivity, and visual stability. Strong performance supports usability and SEO, although it does not guarantee higher rankings.',
  },
  {
    q: '8. Does The Design Narrative provide website redesign and development services?',
    a: "The Design Narrative's website services cover user experience improvements, responsive design, custom high-speed web development, and SEO-ready implementation engineered for conversion.",
  },
];

const WEBSITES_BUILT = [
  {
    title: 'DDS Pune',
    category: 'Healthcare & Clinical UX',
    summary: 'Designed a professional, user-friendly dental website that showcases specialised treatments, advanced technology, and builds patient trust.',
    link: '/work/dds-logistics',
    image: '/assets/projects/dds/Website.jpg',
  },
  {
    title: 'Citara Cinema',
    category: 'Entertainment & Franchising',
    summary: "Developed an engaging website that highlights Citara's cinema experience, franchise opportunities, and entertainment offerings across India.",
    link: '/work/citara-cinema-showbiz',
    image: '/assets/projects/citara/Cinematic Citara Cinema Website Showcase.png',
  },
  {
    title: 'Abhinav Group',
    category: 'Real Estate & SEO Web Architecture',
    summary: 'Designed an intuitive property showcase platform with dynamic project filtering, fast mobile loading, and search-optimized landing pages.',
    link: '/work/abhinav-group',
    image: '/assets/projects/abhinav/Website pages.jpg',
  },
  {
    title: 'Yarnen Fashion',
    category: 'D2C E-Commerce Experience',
    summary: 'Engineered an aesthetic, high-conversion apparel storefront with seamless navigation, mobile checkout, and fluid product browsing.',
    link: '/work/yarnen-fashion',
    image: '/assets/projects/yarnen/Website desktop.jpg',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Plan',
    desc: 'Goals, pages, and structure.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Layouts and prototypes you approve before development.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Development, content, and SEO setup.',
  },
  {
    num: '04',
    title: 'Launch and support',
    desc: 'Testing, go-live, and post-launch fixes.',
  },
];

export default function UiUxPage() {
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
      "Hey TDN! We'd like to consult on UI/UX & Website Design for our business in Pune. Let's talk!"
    );
    return `https://wa.me/919850417266?text=${text}`;
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#111111] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: Modern Architectural Studio Workspace.png             */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/services/ui-ux/Modern Architectural Studio Workspace.png"
          alt="Modern Architectural Studio Workspace - The Design Narrative"
          className="w-full h-auto max-h-[85vh] object-cover object-center block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Main Content Flow Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20 md:space-y-32">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <Link
            href="/services"
            className="text-xs font-mono font-bold text-gray-500 hover:text-black uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            &larr; <span>Back to All Services</span>
          </Link>
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-cyan-600/10 text-cyan-800 border border-cyan-600/20">
            DIGITAL PRODUCTS & EXPERIENCES
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0284c7] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" /> PUNE UI/UX & DEVELOPMENT
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            UI/UX and Website Design Company in Pune
          </h1>
        </motion.section>

        {/* ========================================================================= */}
        {/* 3. INTRODUCTION / OVERVIEW & DIRECT CTA                                    */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8 max-w-4xl pt-4"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-relaxed font-normal">
            Your website can either win a customer or give them a reason to leave. We design websites for Pune businesses that make a strong first impression, keep visitors moving, and turn curiosity into action with thoughtful UI/UX, faster performance, and SEO built into the foundation.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span>Ready for a website that brings in more enquiries? Let&apos;s Build Your Website</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 4. OUR UI/UX AND WEBSITE SERVICES (4 Core Capabilities)                  */}
        {/* ========================================================================= */}
        <section className="space-y-16 md:space-y-24 pt-8 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#0284c7] font-bold uppercase block">
              CAPABILITIES & ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Our UI/UX and Website Services
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            
            {/* SERVICE 1: UI/UX Design */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#0284c7] tracking-widest uppercase block">
                  01 &bull; USER JOURNEYS & INTERFACES
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  UI/UX Design
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  We map how a visitor moves through your site, then design layouts that make the next step obvious, whether that&apos;s calling, booking, or buying.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/ui-ux/Coding at a Warm Office Desk.png"
                  alt="UI/UX Coding at a Warm Office Desk"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 2: Website Design and Development */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#0284c7] tracking-widest uppercase block">
                  02 &bull; FULL-STACK DIGITAL CRAFT
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Website Design and Development
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  We build responsive, user-friendly websites that do more than look good—they guide visitors towards taking action. From intuitive navigation and fast-loading pages to mobile-first layouts and SEO-ready foundations.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/ui-ux/Modern Analytics Workspace.png"
                  alt="Modern Analytics Workspace for Web Performance"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 3: SEO-Ready Build */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#0284c7] tracking-widest uppercase block">
                  03 &bull; SEARCH ENGINE READY ARCHITECTURE
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  SEO-Ready Build
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Clean heading structure, correct titles and metadata, schema, sitemaps, and fast loading are part of the build, not an afterthought.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/ui-ux/UX Wireframing Session at the Design Desk.png"
                  alt="UX Wireframing Session at the Design Desk"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 4: Redesigns and Performance Fixes */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#0284c7] tracking-widest uppercase block">
                  04 &bull; PERFORMANCE & CONVERSION BOOST
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Redesigns and Performance Fixes
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  If your site looks fine but loads slowly or doesn&apos;t convert, we can find out why and fix it.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/ui-ux/Website Transformation_ Before and After.png"
                  alt="Website Transformation Before and After"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY SPEED AND STRUCTURE MATTER                                         */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[10px] font-mono font-bold tracking-widest text-[#0284c7] uppercase">
              <Gauge className="w-3.5 h-3.5 text-[#0284c7]" /> CORE WEB VITALS & SPEED
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Why Speed and Structure Matter
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
              Slow pages lose visitors before they read a word, and unclear structure makes it harder for Google to understand what you offer. We design with both in mind, targeting good Core Web Vitals on mobile.
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
              src="/assets/services/ui-ux/Smartphone Dashboard with Green Score UI.png"
              alt="Smartphone Dashboard with Green Score UI Core Web Vitals"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. OUR WEBSITE PROCESS (Image + 4 Balanced Process Steps)                  */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#0284c7] font-bold uppercase block">
              METHODICAL EXECUTION
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Our Website Process
            </h2>
          </motion.div>

          {/* Process Whiteboard Presentation Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5"
          >
            <img
              src="/assets/services/ui-ux/Office Workflow Whiteboard Presentation.png"
              alt="Office Workflow Whiteboard Presentation of Website Process"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>

          {/* 4 Process Cards (Uniform Alignment) */}
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
                className="bg-white rounded-2xl p-7 border border-black/5 border-t-2 border-t-[#0ea5e9]/30 hover:border-t-[#0284c7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-start"
              >
                <span className="text-3xl font-mono font-black text-[#0284c7] tracking-tight mb-4 block">
                  {step.num}
                </span>

                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2 min-h-[2.5rem] flex items-center">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 7. WEBSITES WE'VE BUILT                                                   */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#0284c7] font-bold uppercase block">
              PORTFOLIO PROOF
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Websites We&apos;ve Built
            </h2>
          </motion.div>

          {/* Featured Dual Laptop Showcase Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5"
          >
            <img
              src="/assets/services/ui-ux/Dual Laptop Website Showcase.png"
              alt="Dual Laptop Website Showcase"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>

          {/* Case Studies Link Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {WEBSITES_BUILT.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <Link
                  href={project.link}
                  className="group relative flex flex-col justify-end w-full h-[400px] md:h-[460px] rounded-3xl overflow-hidden bg-[#050505] text-white border border-black/5 shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase font-bold block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#a8defa] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal max-w-md">
                      {project.summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)                     */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0284c7] text-xs font-mono font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" /> HAVE QUESTIONS?
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
                    <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#0284c7] transition-colors">
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
        {/* 9. BOTTOM CALL TO ACTION                                                  */}
        {/* ========================================================================= */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl bg-[#050505] text-white p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase block">
              READY FOR A HIGH-CONVERTING WEBSITE?
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Let&apos;s Build a Website That Converts Visitors Into Enquiries.
            </h2>
            <p className="text-base sm:text-xl text-gray-300 font-serif leading-relaxed">
              From intuitive mobile UI/UX and seamless page architecture to blistering performance and built-in SEO, we create digital experiences that win business for Pune enterprises.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0284c7] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#0369a1] transition-colors shadow-lg shadow-[#0284c7]/20"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Start Your Website Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Laptop className="w-96 h-96 text-white" />
          </div>
        </motion.section>

      </div>
    </div>
  );
}
