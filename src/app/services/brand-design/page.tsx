'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle, 
  Layers, 
  HelpCircle, 
  ArrowUpRight, 
  Palette, 
  ShieldCheck, 
  Target,
  MessageCircle,
  Lightbulb
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '1. What does a branding agency do?',
    a: 'A branding agency develops your brand strategy, visual identity, messaging, and guidelines to create a consistent brand image. These elements help your business stand out, build recognition, and earn customer trust.',
  },
  {
    q: '2. How much does branding cost in Pune?',
    a: 'Branding costs in Pune depend on the project scope, strategy requirements, logo design, visual identity, and brand collateral. The final investment varies according to your business needs and deliverables.',
  },
  {
    q: '3. What is included in a complete branding package?',
    a: 'A branding package may include brand strategy, logo design, colour palette, typography, visual identity, and brand guidelines. Additional deliverables can include packaging, brochures, presentations, and social media templates.',
  },
  {
    q: '4. What is the difference between a logo and a brand identity?',
    a: 'A logo is a visual symbol that identifies your business, while brand identity includes colours, typography, imagery, and design elements. Together, they create a consistent and recognisable brand experience.',
  },
  {
    q: '5. How long does a branding project take?',
    a: "A branding project's timeline depends on research, strategy, design complexity, feedback, and revisions. The Design Narrative tailors the typical project duration based on its actual delivery process and client milestones.",
  },
  {
    q: '6. Why is brand strategy important for business growth?',
    a: 'Brand strategy defines your target audience, positioning, unique value, and communication style. It helps your business communicate consistently and differentiate itself from competitors.',
  },
  {
    q: '7. Can branding and digital marketing work together?',
    a: 'Yes, branding establishes your identity, while digital marketing helps communicate it to the right audience. Combining both creates consistent messaging across your website, social media, and advertising campaigns.',
  },
  {
    q: '8. How do I choose the right branding agency in Pune?',
    a: "Evaluate an agency's portfolio, strategic approach, design quality, industry experience, and understanding of your target audience. Choose a team that can translate your business goals into a distinctive, consistent brand identity.",
  },
];

const CASE_STUDIES = [
  {
    title: 'Chav Bhari',
    category: 'Branding & Packaging',
    summary: 'A distinct Maharashtrian heritage brand identity and bold retail packaging built to stand out on store shelves.',
    link: '/work/chav-bhari',
    image: '/assets/projects/chav-bhari/packaging 1.png',
  },
  {
    title: 'AM to AM Salon',
    category: 'Identity & Environment',
    summary: 'Complete salon naming, continuous brush logotype, and interior signage reflecting morning-to-midnight hours.',
    link: '/work/am-to-am',
    image: '/assets/projects/am-to-am/AM to AM Salon Entrance.png',
  },
  {
    title: 'Citara Cinema',
    category: 'Visual Identity & Experience',
    summary: 'Nationwide cinematic identity, theatre wall environmental graphics, and investor-ready brand guidelines.',
    link: '/work/citara-cinema-showbiz',
    image: '/assets/projects/citara/CITARA Cinema at Dusk.png',
  },
  {
    title: 'DDS Dental Clinic',
    category: 'Healthcare Rebranding',
    summary: 'Warm, reassuring visual identity and calming clinic environmental design that doubled patient bookings.',
    link: '/work/dds-logistics',
    image: '/assets/projects/dds/Signage.png',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We learn your business, customers, and competitors.',
  },
  {
    num: '02',
    title: 'Define',
    desc: 'We set the positioning and direction.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'We create the identity and test it in real use.',
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'You get the files, guidelines, and a plan for launching.',
  },
];

export default function BrandDesignPage() {
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
      "Hey TDN! We'd like to consult with you on Branding & Identity Design for our business. Let's talk!"
    );
    return `https://wa.me/919850417266?text=${text}`;
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#111111] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: Collaborative Branding Workshop in a Modern Office    */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <img
          src="/assets/services/brand-design/Collaborative Branding Workshop in a Modern Office.png"
          alt="Collaborative Branding Workshop in a Modern Office - The Design Narrative"
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
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-violet-600/10 text-violet-700 border border-violet-600/20">
            STRATEGY & IDENTITY
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#259cde]/10 border border-[#259cde]/20 text-[#259cde] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#259cde]" /> PUNE BRANDING STUDIO
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            Branding and Digital Marketing Agency in Pune
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
            A brand is more than a logo. It&apos;s the impression people form when they see your website, your posts, and your packaging. We build brands for Pune businesses and connect them to a marketing plan, so the identity gets seen by the right people.
          </p>
        </motion.section>

        {/* ========================================================================= */}
        {/* 4. OUR BRANDING SERVICES (4 Core Capabilities with Rich Visuals)         */}
        {/* ========================================================================= */}
        <section className="space-y-16 md:space-y-24 pt-8 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#259cde] font-bold uppercase block">
              EXPERTISE & DELIVERABLES
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Our Branding Services
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            
            {/* SERVICE 1: Brand Strategy */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#259cde] tracking-widest uppercase block">
                  01 &bull; STRATEGIC FOUNDATION
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Brand Strategy
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  We work out who you serve, what makes you different, and how you should sound. This comes before any design work.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/brand-design/Brand Strategy Brainstorming Workspace.png"
                  alt="Brand Strategy Brainstorming Workspace"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 2: Logo and Visual Identity */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#259cde] tracking-widest uppercase block">
                  02 &bull; VISUAL EXPRESSION
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Logo and Visual Identity
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Logo, colour, typography, and the rules for using them, so everything you publish looks consistent.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/brand-design/Citara Cinema Brand Workspace.png"
                  alt="Citara Cinema Brand Workspace"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 3: Brand Guidelines */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#259cde] tracking-widest uppercase block">
                  03 &bull; BRAND GOVERNANCE
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Brand Guidelines
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  A short document your team and any future agency can follow.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/brand-design/Elegant Green Brand Guidelines Mockup.png"
                  alt="Elegant Green Brand Guidelines Mockup"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* SERVICE 4: Brand Collateral and Digital Assets */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono font-black text-[#259cde] tracking-widest uppercase block">
                  04 &bull; MULTI-CHANNEL TOUCHPOINTS
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
                  Brand Collateral and Digital Assets
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-700 leading-relaxed font-normal">
                  Social templates, presentations, brochures, and website graphics.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5 mt-6">
                <img
                  src="/assets/services/brand-design/Premium Real Estate Branding Flat Lay.png"
                  alt="Premium Real Estate Branding Flat Lay"
                  className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY BRANDING AND MARKETING BELONG TOGETHER                             */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#259cde]/10 border border-[#259cde]/20 text-[10px] font-mono font-bold tracking-widest text-[#259cde] uppercase">
              <Target className="w-3.5 h-3.5 text-[#259cde]" /> INTEGRATED PHILOSOPHY
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Why Branding and Marketing Belong Together
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed font-normal">
              A good brand with no marketing stays unseen. Marketing without a clear brand gets forgotten. When one team handles both, your ads, website, and social posts all say the same thing.
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
              src="/assets/services/brand-design/Modern Property Marketing Workspace.png"
              alt="Modern Property Marketing Workspace"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. OUR BRANDING PROCESS (Image + 4 Clear Structured Steps)                 */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#259cde] font-bold uppercase block">
              OUR METHODOLOGY
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Our Branding Process
            </h2>
          </motion.div>

          {/* Process Whiteboard Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5"
          >
            <img
              src="/assets/services/brand-design/Collaborative Whiteboard Process Meeting.png"
              alt="Collaborative Whiteboard Process Meeting"
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
                className="bg-white rounded-2xl p-7 border border-black/5 border-t-2 border-t-[#259cde]/30 hover:border-t-[#259cde] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-start"
              >
                <span className="text-3xl font-mono font-black text-[#259cde] tracking-tight mb-4 block">
                  {step.num}
                </span>

                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2">
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
        {/* 7. BRANDING WORK WE'VE DONE                                              */}
        {/* ========================================================================= */}
        <section className="space-y-12 md:space-y-16 pt-12 border-t border-black/10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#259cde] font-bold uppercase block">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111]">
              Branding Work We&apos;ve Done
            </h2>
          </motion.div>

          {/* Featured Botanical Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-black/5"
          >
            <img
              src="/assets/services/brand-design/Luxury Botanical Branding Still Life.png"
              alt="Luxury Botanical Branding Still Life"
              className="w-full h-auto max-h-[85vh] object-cover block transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </motion.div>

          {/* Case Studies Link Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CASE_STUDIES.map((project, idx) => (
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
                      className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#259cde] uppercase font-bold block">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#259cde]/10 border border-[#259cde]/20 text-[#259cde] text-xs font-mono font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-[#259cde]" /> GOT QUESTIONS?
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
                    <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#259cde] transition-colors">
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
            <span className="text-xs font-mono font-bold tracking-widest text-[#259cde] uppercase block">
              READY TO LAUNCH OR REPOSITION?
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Let&apos;s Build a Brand That Commands Attention.
            </h2>
            <p className="text-base sm:text-xl text-gray-300 font-serif leading-relaxed">
              From strategic positioning and timeless visual identities to market launch campaigns across Pune, we connect your brand with the people who matter most.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#259cde] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1b7bb3] transition-colors shadow-lg shadow-[#259cde]/20"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Palette className="w-96 h-96 text-white" />
          </div>
        </motion.section>

      </div>
    </div>
  );
}
