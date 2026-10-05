'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle, HelpCircle, MapPin, Phone, Mail, Award, CheckCircle, ArrowLeft, ArrowRight, Star, BarChart3 } from 'lucide-react';

// Dynamic client-side components to disable SSR conflicts
const ServicesPin = dynamic(() => import('@/components/ServicesPin'), { ssr: false });
const HorizontalGallery = dynamic(() => import('@/components/HorizontalGallery'), { ssr: false });

const CLIENTS = [
  { name: 'Pink walk', logo: '/assets/logos/pinkwalk logo.jpg' },
  { name: 'AM to AM', logo: '/assets/logos/AM To AM logo.png' },
  { name: 'Dangayach Group', logo: '/assets/projects/Dangayach.png' },
  { name: 'Citara', logo: '/assets/logos/Citara Logo.jpg' },
  { name: 'Yarnen', logo: '/assets/logos/Yarnen logo.jpg' },
  { name: 'DNL Properties', logo: '/assets/logos/DNL Properties logo.png' },
  { name: 'Pink West', logo: '/assets/logos/PinkWest logo.png' },
  { name: "O'Daisy", logo: '/assets/logos/Odaisy logo.png' },
  { name: 'Northpoint School', logo: '/assets/logos/Northpoint School logo.png' },
  { name: 'All Set Green', logo: '/assets/logos/All set green logo.jpg' },
  { name: 'Tamanna Punjabi Group', logo: '/assets/logos/Tamanna Punjabi kapoor logo.jpg' },
  { name: 'Abhinav Group', logo: '/assets/logos/Abhinav Group logo.png' },
  { name: 'DDS', logo: '/assets/logos/DDS logo.png' },
  { name: 'Atelier Nova', logo: '/assets/logos/Atelier noua logo.png' },
  { name: 'Chav Bhari', logo: '/assets/projects/Chav Bhari.png' },
  { name: 'Dream Space Architects', logo: '/assets/logos/Dream Space Architects logo.png' },
  { name: 'Saafa Banquets', logo: '/assets/logos/Saafa Banquets logo.jpg' },
  { name: 'SKJ Jewellers', logo: '/assets/logos/SKJ elite logo.jpg' },
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "TDN literally saved our launch. The rebranding went so hard our conversions grew by 120%. Absolute W.",
    author: "Founder, Chav Bhari",
    tag: "10/10 Rebranding",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    theme: "light",
  },
  {
    id: 2,
    quote: "The UI/UX design is pure main character energy. It is clean, snappy, and our clients keep talking about it.",
    author: "Director, SKJ Jewellers",
    tag: "Clean AF UI/UX",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    theme: "dark",
  },
  {
    id: 3,
    quote: "SEO ranking went crazy. We hit Page 1 on Google for our core terms. They don't miss.",
    author: "Marketing Lead, Citara",
    tag: "+150% Organic Traffic",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    theme: "light",
  },
  {
    id: 4,
    quote: "Working with TDN felt like having an elite in-house design unit. The brand packaging got us into 50+ retail chains across India.",
    author: "Co-Founder, Pink Walk",
    tag: "Brand Packaging Scale",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    theme: "light",
  },
  {
    id: 5,
    quote: "The e-commerce experience is blazing fast and the conversions spoke for themselves in week 1. Incredible aesthetic sense.",
    author: "E-Commerce Lead, Yarnen",
    tag: "+220% Revenue Scale",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    theme: "dark",
  },
  {
    id: 6,
    quote: "From identity overhaul to luxury digital web layout, TDN delivered beyond our highest expectations. Truly un-ignorable work.",
    author: "VP Branding, Dangayach Group",
    tag: "Corporate Luxury Web",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    theme: "light",
  },
];

const BLOGS = [
  {
    tag: "DESIGN",
    dotColor: "bg-violet-500",
    title: "How to Give Your Brand Main Character Energy in 2026",
    author: "TDN",
    readTime: "4 min read",
    date: "Oct 12, 2026",
    image: "/assets/blogs/brand-design-blog.jpg",
    link: "/services/brand-design",
  },
  {
    tag: "UI/UX",
    dotColor: "bg-cyan-500",
    title: "UI/UX Design Trends That Are Honestly Giving",
    author: "TDN",
    readTime: "5 min read",
    date: "Sep 28, 2026",
    image: "/assets/blogs/uiux-trends-blog.jpg",
    link: "/services/ui-ux",
  },
  {
    tag: "SEO",
    dotColor: "bg-lime-500",
    title: "SEO Hacks: Ranking on Google Without Selling Your Soul",
    author: "TDN",
    readTime: "6 min read",
    date: "Sep 21, 2026",
    image: "/assets/blogs/seo-growth-blog.jpg",
    link: "/services/seo",
  },
];

// Stat counter hook component
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

export default function HomePage() {
  const whatsappLink = "https://wa.me/919850417266?text=Hey%20TDN!%20We%20saw%20your%20website%20and%20want%20to%20collaborate%20on%20our%20brand%20design/marketing.%20Let's%20talk!";
  const [customMsg, setCustomMsg] = useState('');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // 3D Card Hover Tilt Calculations
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! Here are my enquiry details: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111]">
      
      {/* SECTION 1: HERO (WebGL Canvas + Cinematic Loop) */}
      <section className="relative w-full h-[95vh] bg-[#050505] overflow-hidden flex flex-col justify-center items-center text-center">
        {/* Cinematic Backdrop Video */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
            src="/assets/videos/Homepage website video.mp4"
          />
        </div>

        {/* WebGL interactive refraction canvas overlay */}


        {/* Scroll Cue Tag */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-gray-400">
          <span>keep scrolling, it gets better.</span>
          <div className="w-[1px] h-6 bg-white/30 animate-pulse mt-1" />
        </div>
      </section>

      {/* SECTION 2: TRUST / CLIENT MARQUEE & STATS STRIP (Off-White Background) */}
      <section className="bg-[#f8f8f8] text-[#111111] py-16 border-y border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="text-[9px] font-mono tracking-widest uppercase text-gray-400 font-bold">TRUSTED BY INDUSTRY LEADERS</span>
          
          {/* Animated counter Strip */}
          <div className="flex gap-8 text-sm font-bold uppercase tracking-wider text-violet-600">
            <div>
              <StatCounter target={300} suffix="+" /> <span className="text-gray-400">PROJECTS</span>
            </div>
            <div>
              <StatCounter target={2} /> <span className="text-gray-400">CITIES</span>
            </div>
            <div>
              <StatCounter target={9} suffix="+" /> <span className="text-gray-400">YEARS</span>
            </div>
          </div>
        </div>

        {/* Client logo cards marquee loop */}
        <div className="relative flex overflow-x-hidden border-t border-black/5 pt-8 pb-10">
          <div className="animate-marquee whitespace-nowrap flex gap-6 items-center">
            {CLIENTS.concat(CLIENTS).map((client, idx) => (
              <div
                key={idx}
                className="group w-44 h-24 md:w-52 md:h-28 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center justify-center p-4 md:p-5 cursor-pointer shrink-0"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    fill
                    className="object-contain filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PINNED CHAPTERS (Pinned Viewport Reveal) */}
      <ServicesPin />

      {/* SECTION 4: FEATURED WORK GALLERY (Scroll-driven Horizontal Showcase) */}
      <HorizontalGallery />

      {/* SECTION 5: MANIFESTO & Ideas That Stick Visual (White Background) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">OUR CORE MANIFESTO</span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            WE DON&apos;T DO <br />
            TEMPLATES. <br />
            WE DO <br />
            <span className="relative inline-block font-serif italic font-normal lowercase text-violet-600">
              stories
              <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-violet-500 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M 2 14 Q 50 4 98 12" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span> <br />
            THAT STICK.
          </h2>
          
          <p className="text-xs md:text-sm text-gray-500 font-semibold max-w-md leading-relaxed">
            Great communication isn&apos;t built on generic blocks. We deep-dive into your vision and build visual systems that demand attention.
          </p>

          <div className="pt-2">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white text-xs font-black uppercase tracking-widest shadow-[0_10px_35px_rgba(139,92,246,0.45)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              EXPLORE OUR WORK &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Composition */}
        <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[480px] md:h-[560px] flex items-center justify-center">
          <Image
            src="/assets/Ideas that stick.png"
            alt="Ideas that stick - The Design Narrative"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS (Redesigned with floating polaroids & sliding cards) */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-12 overflow-hidden bg-gradient-to-b from-white via-[#fafafc] to-white border-t border-black/5">
        
        {/* Floating Top Moodboard Polaroids & Annotations */}
        <div className="max-w-7xl mx-auto px-6 relative mb-16 md:mb-20">
          
          {/* Left Annotation & Arrow */}
          <div className="hidden lg:flex flex-col items-start absolute top-4 left-4 xl:left-8 z-10 select-none pointer-events-none">
            <span className="font-mono text-[10px] uppercase font-extrabold text-gray-400 tracking-widest leading-tight -rotate-12">
              IDEAS<br />DESIGN<br />IMPACT
            </span>
            <svg className="w-10 h-12 text-gray-300 mt-2 -rotate-12" viewBox="0 0 40 50" fill="none">
              <path d="M 20 5 Q 5 25 30 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 22 45 L 32 46 L 29 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Left Floating Polaroid Card */}
          <div className="hidden md:block absolute -top-12 left-16 lg:left-24 w-48 lg:w-60 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
              alt="Creative workspace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Annotation & Arrow */}
          <div className="hidden lg:flex flex-col items-end absolute top-2 right-8 xl:right-16 z-10 select-none pointer-events-none">
            <span className="font-mono text-[10px] uppercase font-extrabold text-gray-400 tracking-widest leading-tight rotate-6 text-right">
              BRANDS<br />THAT<br />GROW
            </span>
            <svg className="w-10 h-12 text-gray-300 mt-2 rotate-12" viewBox="0 0 40 50" fill="none">
              <path d="M 15 5 Q 30 25 15 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 10 36 L 14 46 L 24 43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right Floating Polaroid 1 (Top) */}
          <div className="hidden md:block absolute -top-16 right-16 lg:right-28 w-40 lg:w-48 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-8 hover:rotate-0 transition-transform duration-500 z-10 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
              alt="Creative studio planning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Floating Polaroid 2 (Bottom) */}
          <div className="hidden md:block absolute top-12 right-4 lg:right-10 w-44 lg:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80"
              alt="UI UX design screens"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Heading Content */}
          <div className="text-center max-w-2xl mx-auto relative z-20 space-y-4 pt-4 md:pt-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold block">
              TESTIMONIALS
            </span>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              THEY VISIONED IT. <br />
              <span className="font-serif italic font-normal text-violet-600">WE DESIGNED IT</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
              From startups to growing brands &mdash; here&apos;s what our clients say about working with The Design Narrative.
            </p>
          </div>
        </div>

        {/* Sliding Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-center">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrevTestimonial}
            aria-label="Previous Testimonials"
            className="absolute left-2 lg:left-4 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white shadow-xl border border-black/5 flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* 3-Card Carousel Track */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-8 md:px-12">
            {[0, 1, 2].map((offset) => {
              const itemIdx = (activeTestimonialIdx + offset) % TESTIMONIALS_DATA.length;
              const item = TESTIMONIALS_DATA[itemIdx];
              const isHeroDark = offset === 1; // Center card is dark hero card in 3-card layout

              return (
                <motion.div
                  key={`${item.id}-${activeTestimonialIdx}-${offset}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl p-7 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[320px] transition-all duration-300 ${
                    isHeroDark
                      ? 'bg-[#13111c] text-white border border-violet-500/25 shadow-[0_20px_50px_rgba(139,92,246,0.3)] ring-1 ring-violet-500/20 md:-translate-y-2'
                      : 'bg-white text-[#111111] border border-black/5 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {/* Top Stars & Quote icon */}
                  <div className="flex items-center justify-between">
                    {isHeroDark ? (
                      <>
                        <span className="text-3xl font-serif text-violet-400 font-bold leading-none">&ldquo;</span>
                        <div className="flex gap-1 text-violet-400">
                          {Array(5).fill(null).map((_, sIdx) => (
                            <Star key={sIdx} className="w-4 h-4 fill-violet-400 text-violet-400" />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-1 text-amber-400">
                        {Array(5).fill(null).map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quote Text */}
                  <p className={`text-sm md:text-base font-semibold leading-relaxed my-4 ${isHeroDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Profile Details */}
                  <div className={`pt-4 flex items-center gap-3 border-t ${isHeroDark ? 'border-white/10' : 'border-black/5'}`}>
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-black/10">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className={`text-xs md:text-sm font-extrabold uppercase ${isHeroDark ? 'text-white' : 'text-black'}`}>
                        {item.author}
                      </div>
                      <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                        {item.tag}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextTestimonial}
            aria-label="Next Testimonials"
            className="absolute right-2 lg:right-4 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white shadow-xl border border-black/5 flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveTestimonialIdx(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeTestimonialIdx
                  ? 'w-6 bg-violet-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7: RESOURCES (Blog Previews - White Background) */}
      <section className="pt-8 md:pt-12 pb-24 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-gray-400 font-bold uppercase block">
              RESOURCES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-[0.95]">
              THINGS YOUR BRAND <span className="font-serif italic font-normal text-violet-600">SHOULD KNOW</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium max-w-2xl leading-relaxed">
              Actionable insights, creative ideas and real strategies to help you build a stronger brand, better design and measurable growth.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-xs font-black uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all duration-200 self-start md:self-auto shrink-0 shadow-sm"
          >
            VIEW ALL ARTICLES <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BLOGS.map((blog, idx) => (
            <Link
              key={idx}
              href={blog.link}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10">
                  <span className={`w-2 h-2 rounded-full ${blog.dotColor}`} />
                  <span>{blog.tag}</span>
                </div>
              </div>

              <div className="p-6 md:p-7 flex flex-col justify-between flex-grow gap-6">
                <h3 className="text-lg md:text-xl font-black text-black leading-snug tracking-tight group-hover:text-violet-600 transition-colors">
                  {blog.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1.5 font-mono">
                    <span>{blog.readTime}</span>
                    <span className="text-gray-300">•</span>
                    <span>{blog.date}</span>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 shadow-sm shrink-0">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 8: BIG CTA & INDIA ROUTE MAP (Dark Background - Match Screenshot) */}
      <section className="bg-[#050507] text-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Big Headline & Form path */}
          <div className="lg:col-span-6 space-y-8 z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest text-violet-400 font-bold uppercase">
                  LET&apos;S WORK
                </span>
                <span className="w-8 h-[1px] bg-violet-500/50" />
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
                GOT A BRAND <br />
                WORTH <span className="font-serif italic font-normal text-violet-400">TALKING ABOUT?</span>
              </h2>

              <p className="text-sm md:text-base text-gray-400 font-medium max-w-xl leading-relaxed">
                Whether it&apos;s branding, a new website, or growth through SEO &mdash; we&apos;d love to hear about your ideas and turn them into something impactful.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 max-w-xl">
              {/* Single-line input with arrow */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="w-full pl-6 pr-14 py-4 rounded-full bg-white/[0.05] border border-white/10 hover:border-violet-500/40 focus:border-violet-500 focus:outline-none text-white text-sm placeholder:text-gray-500 backdrop-blur-md transition-all shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Submit project enquiry"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Buttons row */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  ENQUIRE NOW <ArrowUpRight className="w-4 h-4" />
                </button>
                <Link
                  href="mailto:ceo@thedesignnarrative.in"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/15 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  EMAIL CEO
                </Link>
              </div>
            </form>
          </div>

          {/* Right Visual Network & Moodboard Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] md:min-h-[520px]">
            <div className="relative w-full h-[450px] flex items-center justify-center">
              
              {/* Subtle Map Grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                {Array(36).fill(null).map((_, i) => (
                  <div key={i} className="border-t border-l border-white/30" />
                ))}
              </div>

              {/* 3D Realistic India Relief Map with Animated Glowing Beacons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-[150px] sm:w-[175px] md:w-[200px] aspect-square flex items-center justify-center rounded-3xl"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/india-3d-map.jpg"
                    alt="3D Realistic India Map"
                    fill
                    className="object-contain filter drop-shadow-[0_0_35px_rgba(139,92,246,0.25)] select-none pointer-events-none"
                  />

                  {/* Animated Glowing Routes Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
                    {/* Route: Pune (28, 56) to Jaipur (32, 36) */}
                    <path
                      d="M 28 56 Q 26 44 32 36"
                      fill="none"
                      stroke="url(#route3DGlow)"
                      strokeWidth="0.9"
                      strokeDasharray="1.5 1.5"
                      className="animate-pulse"
                    />
                    {/* Secondary route: Pune to Delhi (40, 30) */}
                    <path
                      d="M 28 56 Q 36 42 40 30"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.45)"
                      strokeWidth="0.6"
                      strokeDasharray="1 1"
                    />
                    {/* Secondary route: Pune to Bengaluru (30, 68) */}
                    <path
                      d="M 28 56 Q 27 63 30 68"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.45)"
                      strokeWidth="0.6"
                      strokeDasharray="1 1"
                    />
                    {/* Secondary route: Pune to Kolkata/East (60, 48) */}
                    <path
                      d="M 28 56 Q 44 48 60 48"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.35)"
                      strokeWidth="0.5"
                      strokeDasharray="1 1"
                    />

                    <defs>
                      <linearGradient id="route3DGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#e879f9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Pulsing Beacon: PUNE HQ */}
                  <div className="absolute left-[28%] top-[56%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-violet-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-500 shadow-[0_0_15px_#a855f7] border border-white/60" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-black/90 border border-violet-500/60 text-[9px] font-mono font-bold tracking-widest text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] backdrop-blur-md whitespace-nowrap">
                      PUNE HQ
                    </div>
                  </div>

                  {/* Pulsing Beacon: JAIPUR */}
                  <div className="absolute left-[32%] top-[36%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-violet-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-400 shadow-[0_0_10px_#c084fc] border border-white/50" />
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-[8px] font-mono font-bold tracking-widest text-gray-200 shadow-md backdrop-blur-md whitespace-nowrap">
                      JAIPUR
                    </div>
                  </div>

                  {/* Secondary network dots */}
                  <div className="absolute left-[40%] top-[30%] w-2 h-2 rounded-full bg-violet-400/70 shadow-[0_0_8px_#a855f7]" />
                  <div className="absolute left-[30%] top-[68%] w-2 h-2 rounded-full bg-violet-400/70 shadow-[0_0_8px_#a855f7]" />
                  <div className="absolute left-[60%] top-[48%] w-1.5 h-1.5 rounded-full bg-violet-400/50 shadow-[0_0_6px_#a855f7]" />
                </div>
              </motion.div>

              {/* Hand-drawn Annotation: Top Left IDEAS BRANDS PEOPLE */}
              <div className="absolute -top-4 left-0 md:left-2 z-20 pointer-events-none hidden sm:block">
                <div className="font-serif italic text-xs tracking-wider text-gray-400 leading-tight">
                  <div>IDEAS</div>
                  <div>BRANDS</div>
                  <div>PEOPLE</div>
                </div>
                <svg className="w-10 h-10 text-violet-400 ml-6 -mt-1" viewBox="0 0 50 50" fill="none">
                  <path
                    d="M 5 5 Q 30 10 35 38"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 28 32 L 36 40 L 40 30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Left Floating Studio Photo Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 sm:left-4 md:left-6 top-8 md:top-12 z-20 w-36 sm:w-44 md:w-48 bg-[#111116] border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-md"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-900">
                  <Image
                    src="/assets/cta-studio.jpg"
                    alt="TDN Studio Setup"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="py-2 px-1 text-center">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                    Strategy | Design | Growth
                  </span>
                </div>
              </motion.div>

              {/* Top Right Floating Pill: 50+ Brands trust us */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-0 sm:right-2 md:right-4 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-[#13121a]/95 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="Client"
                    className="w-6 h-6 rounded-full border border-black/40 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="Client"
                    className="w-6 h-6 rounded-full border border-black/40 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                    alt="Client"
                    className="w-6 h-6 rounded-full border border-black/40 object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-black text-white">50+</div>
                  <div className="text-[9px] text-gray-400 font-medium">Brands trust us</div>
                </div>
              </motion.div>

              {/* Right Floating Laptop Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 6 }}
                animate={{ opacity: 1, y: 0, rotate: 6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 sm:right-2 md:right-4 top-14 md:top-18 z-20 w-36 sm:w-44 md:w-48 bg-[#111116] border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-md"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-900">
                  <Image
                    src="/assets/cta-laptop.jpg"
                    alt="Good Design Builds Better Brands"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Bottom Metric Pill Card: Projects Across 10+ Cities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 left-6 sm:left-12 md:left-16 z-30 flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#13121a]/95 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-[9px] font-mono tracking-wider text-gray-400 uppercase">Projects Across</div>
                  <div className="text-sm font-black text-white">10+ Cities</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa] animate-pulse ml-2" />
              </motion.div>

              {/* Hand-drawn Annotation: Bottom Right FROM IDEAS TO IMPACT */}
              <div className="absolute -bottom-4 right-0 md:right-2 z-20 pointer-events-none hidden sm:block">
                <svg className="w-10 h-10 text-violet-400 ml-4 mb-1" viewBox="0 0 50 50" fill="none">
                  <path
                    d="M 15 45 Q 35 30 25 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 18 15 L 24 6 L 32 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="font-serif italic text-xs tracking-wider text-gray-400 leading-tight text-right">
                  <div>FROM</div>
                  <div>IDEAS</div>
                  <div>TO IMPACT</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
