'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Award, Plus } from 'lucide-react';

const TEAM = [
  {
    name: 'Irfan Khan',
    role: 'CEO ALDS',
    tagline: 'Scale operations master.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Gauravi Pitre',
    role: 'Senior Designer',
    tagline: 'Color systems & grid wizard.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Arjun Kotagi',
    role: 'SEO Specialist',
    tagline: 'Ranking code cracker.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Pratiksha Patil',
    role: 'Senior Tester',
    tagline: 'Zero tolerance for bugs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vishnavi Dherenge',
    role: 'UI UX Designer',
    tagline: 'Frictionless wireframe queen.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vaishnavi Shingavi',
    role: 'SMO Strategist',
    tagline: 'Scroll-stopping content hooker.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Shital Gadge',
    role: 'Junior Tester',
    tagline: 'Quality inspector & reviewer.',
    image: 'https://images.unsplash.com/photo-1506919258185-6078bba55d2a?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Kanika Sharma',
    role: 'Performance Marketer',
    tagline: 'Meta & Google ad optimizer.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vidhi Dalvi',
    role: 'Video Editor',
    tagline: 'Pacing, sound design, & retention.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Suresh Bugaliya',
    role: 'Lead Developer',
    tagline: 'Next.js & React compiler.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  },
];

// Scroll triggered count-up counter component
function StatCounter({ target, suffix = '', duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
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

  // 3D Card Hover Tilt Calculations
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.transform = `perspective(800px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale(1.03)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111]">
      
      {/* SECTION 1: HERO (Moody Team Photo + Strategic Design Slogan) */}
      <section className="relative w-full h-[65vh] bg-[#050505] overflow-hidden flex flex-col justify-end p-6 md:p-16">
        {/* Full-width creative portrait team backdrop */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80"
            alt="TDN Creative Studio Team"
            fill
            className="object-cover opacity-35 filter brightness-[0.5] contrast-[1.05]"
            priority
          />
        </div>

        <div className="relative z-20 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold tracking-widest text-white uppercase backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-violet-300" /> ABOUT TDN
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.0] text-white">
            SOLUTIONS THROUGH <br />
            <span className="font-serif italic font-normal lowercase text-violet-400">
              strategic design.
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-400 font-bold max-w-md leading-relaxed">
            We build un-ignorable branding guidelines, buttery-smooth digital interfaces, and high-growth search campaigns. No templates, just narratives.
          </p>
        </div>
      </section>

      {/* SECTION 2: STORY & STATS BLOCK (Split Layout) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left story */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OUR STORY</span>
          <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-[#111111]">
            BRIDGING BRAND STRATEGY <br /> &amp; GROWTH ENGINEERING.
          </h2>
          <p className="text-sm text-gray-500 font-semibold leading-relaxed">
            Founded in Pune, TDN operates as a cohesive creative agency. We believe design should do more than just look pretty — it must dictate customer perception, increase conversion funnels, and rank search metrics to drive scale.
          </p>
        </div>

        {/* Right count-up stats */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-8 border-l border-black/5 pl-8">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-violet-600">
              <StatCounter target={300} suffix="+" />
            </div>
            <div className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Projects Done</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-[#111111]">
              <StatCounter target={9} suffix="+" />
            </div>
            <div className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Years Active</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-[#111111]">
              <StatCounter target={2} />
            </div>
            <div className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Hub Cities</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-violet-600">
              <StatCounter target={13} suffix="+" />
            </div>
            <div className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Team Members</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUNDER SPOTLIGHT (Mayuri Shende Kankariya) */}
      <section className="bg-[#050505] text-white py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Portrait frame */}
          <div className="lg:col-span-5 relative h-80 md:h-[450px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
              alt="Mayuri Shende Kankariya - CEO &amp; Founder"
              fill
              className="object-cover filter grayscale contrast-110"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-violet-400" /> CEO &amp; Founder
            </div>
          </div>

          {/* Bio info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">FOUNDER SPOTLIGHT</span>
            
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
              MAYURI SHENDE KANKARIYA
            </h2>

            {/* Huge pull quote typography */}
            <blockquote className="text-xl md:text-3xl font-serif italic text-gray-300 border-l-2 border-violet-500 pl-6 my-6 leading-relaxed">
              &ldquo;We don&apos;t sell layouts. We align customer perception.&rdquo;
            </blockquote>

            <div className="text-sm text-gray-400 font-semibold leading-relaxed space-y-4">
              <p>
                Alumni of Raffles Design International and co-founder of Design Quarry. Mayuri has steered over 300 successful brand launch campaigns across real estate, e-commerce, and healthcare sectors.
              </p>
              
              {/* Dynamic Read-More bio expand */}
              {isBioExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2 text-gray-400 border-t border-white/5"
                >
                  <p>
                    With a rich foundation in global design systems and strategic marketing, she guides TDN&apos;s creative direction. Her work focuses on transforming digital touchpoints into memorable brand experiences that drive quantifiable growth.
                  </p>
                  <p>
                    Mayuri works directly with startup founders to define product-market narratives and design frameworks that command attention in crowded digital spaces.
                  </p>
                </motion.div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="text-xs font-bold text-white hover:text-violet-400 uppercase tracking-widest flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                >
                  {isBioExpanded ? 'Read Less' : 'Read More Bio'} <Plus className={`w-3.5 h-3.5 transform transition-transform ${isBioExpanded ? 'rotate-45' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 2D TEAM GRID */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">THE CREATIVE CREW</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">THE BEASTS</h2>
        </div>

        {/* 10 team members with 3D interactive tilt cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="glass-card-light rounded-2xl overflow-hidden border border-black/5 p-4 flex flex-col items-center text-center transition-all duration-200 group origin-center shadow-sm"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Grayscale default -> colorized hover image */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 border border-black/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h3 className="text-sm font-black uppercase text-black leading-tight">
                {member.name}
              </h3>
              
              <div className="text-[9px] font-mono font-black text-violet-600 uppercase tracking-widest mt-1">
                {member.role}
              </div>

              {/* Tagline revealed on hover */}
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: JOIN US CTA (Gen-Z themed footer) */}
      <section className="py-24 border-t border-black/5 bg-[#fafafa] text-center px-6">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">WE ARE SCOUTING</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight text-[#111111]">
            WE&apos;RE ALWAYS SCOUTING <br /> FOR WEIRD, BRILLIANT PEOPLE.
          </h2>
          <div className="pt-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#111111]/85 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Careers openings <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
