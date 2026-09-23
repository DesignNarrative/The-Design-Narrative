'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle, HelpCircle, MapPin, Phone, Mail, Award, CheckCircle } from 'lucide-react';

// Dynamic client-side components to disable SSR conflicts
const ServicesPin = dynamic(() => import('@/components/ServicesPin'), { ssr: false });
const HorizontalGallery = dynamic(() => import('@/components/HorizontalGallery'), { ssr: false });

const CLIENTS = [
  { name: 'SKJ Elite', logo: '/assets/logos/SKJ elite logo.jpg' },
  { name: 'Utopia', logo: '/assets/logos/utopia logo.png' },
  { name: 'Abhinav Group', logo: '/assets/logos/Abhinav Group logo.png' },
  { name: 'Coco Pani', logo: '/assets/logos/Coco pani logo.jpg' },
  { name: 'Yarnen', logo: '/assets/logos/Yarnen logo.jpg' },
  { name: 'Atelier noua', logo: '/assets/logos/Atelier noua logo.png' },
  { name: 'Odaisy', logo: '/assets/logos/Odaisy logo.png' },
  { name: 'All set green', logo: '/assets/logos/All set green logo.jpg' },
  { name: 'PinkWalk', logo: '/assets/logos/pinkwalk logo.jpg' },
  { name: 'A Curve Story', logo: '/assets/logos/A Curve Story logo.jpg' },
  { name: 'PinkWest', logo: '/assets/logos/PinkWest logo.png' },
  { name: 'Saarthi', logo: '/assets/logos/Saarthi logo.jpg' },
  { name: 'DDS', logo: '/assets/logos/DDS logo.png' },
];

const TESTIMONIALS = [
  {
    quote: "TDN literally saved our launch. The rebranding went so hard our conversions grew by 120%. Absolute W.",
    author: "Founder, Utopia",
    tag: "10/10 Rebranding",
  },
  {
    quote: "The UI/UX design is pure main character energy. It is clean, snappy, and our clients keep talking about it.",
    author: "Director, SKJ Elite",
    tag: "Clean AF UI/UX",
  },
  {
    quote: "SEO ranking went crazy. We hit Page 1 on Google for our core terms. They don't miss.",
    author: "Marketing Lead, Saarthi",
    tag: "+150% Organic Traffic",
  },
];

const BLOGS = [
  {
    title: "How to Give Your Brand Main Character Energy in 2026",
    category: "Branding",
    readTime: "4 min read",
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: "UI/UX Design Trends That are Honestly Giving 2012",
    category: "Design",
    readTime: "5 min read",
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: "SEO Hacks: Ranking on Google Without Selling Your Soul",
    category: "SEO",
    readTime: "6 min read",
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=60',
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
    <div className="relative min-h-screen bg-white text-[#111111] select-none">
      
      {/* SECTION 1: HERO (WebGL Canvas + Cinematic Loop) */}
      <section className="relative w-full h-[95vh] bg-[#050505] overflow-hidden flex flex-col justify-center items-center text-center">
        {/* Cinematic Backdrop Video */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
            src="/assets/videos/hero-banner.mp4"
          />
        </div>

        {/* WebGL interactive refraction canvas overlay */}


        {/* Slogan details overlay */}
        <div className="relative z-20 px-6 max-w-4xl mx-auto space-y-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-8xl font-black tracking-tight leading-[0.95] uppercase text-white drop-shadow-lg">
            WE BUILD BRANDS <br />
            <span className="font-serif italic font-normal lowercase text-violet-400">
              people can&apos;t
            </span> <br />
            SCROLL PAST.
          </h1>
          
          <p className="text-sm md:text-base text-gray-300 font-semibold max-w-md mx-auto leading-relaxed drop-shadow-sm">
            End-to-end branding &amp; digital marketing, engineered for scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 pointer-events-auto">
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth' })}
              className="flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              See the work &darr;
            </button>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>

        {/* Scroll Cue Tag */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-gray-400">
          <span>keep scrolling, it gets better.</span>
          <div className="w-[1px] h-6 bg-white/30 animate-pulse mt-1" />
        </div>
      </section>

      {/* SECTION 2: TRUST / CLIENT MARQUEE & STATS STRIP (Dark Background) */}
      <section className="bg-[#050505] text-white py-16 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">TRUSTED BY INDUSTRY LEADERS</span>
          
          {/* Animated counter Strip */}
          <div className="flex gap-8 text-sm font-bold uppercase tracking-wider text-violet-400">
            <div>
              <StatCounter target={300} suffix="+" /> <span className="text-gray-500">PROJECTS</span>
            </div>
            <div>
              <StatCounter target={2} /> <span className="text-gray-500">CITIES</span>
            </div>
            <div>
              <StatCounter target={9} suffix="+" /> <span className="text-gray-500">YEARS</span>
            </div>
          </div>
        </div>

        {/* Grayscale Client logotype loop */}
        <div className="relative flex overflow-x-hidden border-t border-white/5 pt-10">
          <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
            {CLIENTS.concat(CLIENTS).map((client, idx) => (
              <div
                key={idx}
                className="relative h-10 w-28 md:w-36 flex items-center justify-center filter invert grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PINNED CHAPTERS (Pinned Viewport Reveal) */}
      <ServicesPin />

      {/* SECTION 4: FEATURED WORK GALLERY (Draggable Portfolio Snap Showcase) */}
      <section className="bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">FEATURED PROJECTS</h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 hover:border-violet-500/30 px-6 py-3 rounded-full transition-all"
          >
            All Work <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Draggable slide list */}
        <HorizontalGallery />
      </section>

      {/* SECTION 5: MANIFESTO & candids showreel (White Background) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OUR CORE MANIFESTO</span>
          
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            WE DON&apos;T DO <br />
            TEMPLATES. WE DO <br />
            <span className="font-serif italic font-normal lowercase text-violet-600">
              stories
            </span> <br />
            THAT STICK.
          </h2>
          
          <p className="text-sm text-gray-500 font-semibold max-w-md leading-relaxed">
            Great communication isn&apos;t built on generic blocks. We deep-dive into your target vision and build visual systems that demand attention.
          </p>
        </div>

        {/* Candid Studio Reel mockup */}
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#050505] group">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-500 pointer-events-none"
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761"
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-violet-400" /> Candid Studio B-Roll
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS (3D Card Tilt Grid - White Background) */}
      <section className="py-24 border-t border-black/5 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">NO CAP REVIEWS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="glass-card-light p-8 rounded-2xl border border-black/5 flex flex-col justify-between transition-all duration-200 origin-center shadow-sm select-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="text-base text-gray-700 font-medium italic mb-8 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-xs font-bold pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="uppercase text-black">{t.author}</span>
                  <span className="text-gray-400 font-black uppercase">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: RESOURCES (Blog Previews - White Background) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">RESOURCES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">BIG BRAIN READS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog, idx) => (
            <div
              key={idx}
              className="glass-card-light rounded-2xl overflow-hidden group border border-black/5 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <h3 className="text-base font-bold uppercase line-clamp-2 leading-snug text-black group-hover:text-black/75 transition-colors">
                  {blog.title}
                </h3>
                <div className="pt-4 mt-4 border-t border-black/5 flex justify-between items-center text-[9px] font-mono font-black text-gray-400">
                  <span>{blog.readTime}</span>
                  <span className="text-black uppercase group-hover:opacity-75 transition-opacity flex items-center gap-0.5">
                    Read article <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: BIG CTA & INDIA ROUTE MAP (Dark Background - 10% height) */}
      <section className="bg-[#050505] text-white py-24 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Big Headline & Form path */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">LET&apos;S WORK</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                GOT A BRAND WORTH <br /> TALKING ABOUT?
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <label htmlFor="custom-requirement" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  Quick requirement details
                </label>
                <textarea
                  id="custom-requirement"
                  rows={3}
                  required
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="We want a rebranding project, new e-commerce UI design, and Google SEO setup..."
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 focus:border-violet-500 focus:outline-none text-white text-xs placeholder:text-gray-600 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Enquire Now <ArrowUpRight className="w-4 h-4" />
                </button>
                <Link
                  href="mailto:ceo@thedesignnarrative.in"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Email CEO
                </Link>
              </div>
            </form>
          </div>

          {/* India network outline map column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] border border-white/5 rounded-3xl p-6 bg-white/5 backdrop-blur-md">
            {/* Pulsing Dots Connect Map Vector representation */}
            <div className="relative w-full h-[200px] flex items-center justify-center">
              
              {/* Coordinates Graph Grid */}
              <div className="absolute inset-0 border border-white/5 grid grid-cols-4 grid-rows-4 opacity-25">
                {Array(16).fill(null).map((_, i) => (
                  <div key={i} className="border-t border-l border-white/10" />
                ))}
              </div>

              {/* Pulsing Dot: Jaipur (Top-Left) */}
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-lime-400 relative z-10" />
                <span className="text-[8px] font-mono tracking-widest text-lime-400 font-bold mt-1.5 uppercase">Jaipur</span>
              </div>

              {/* Connecting line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                  d="M 125 50 Q 110 90 100 135"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Pulsing Dot: Pune (Bottom-Left) */}
              <div className="absolute bottom-1/4 left-1/4 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500 relative z-10" />
                <span className="text-[8px] font-mono tracking-widest text-violet-400 font-bold mt-1.5 uppercase">Pune HQ</span>
              </div>

              {/* Title representation */}
              <div className="absolute bottom-4 right-4 text-right text-[8px] font-mono tracking-widest text-gray-500 uppercase">
                COORDINATES NETWORK
              </div>
            </div>
          </div>
        </div>

        {/* Global info footer */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 mt-20 border-t border-white/10 text-xs text-gray-500">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/assets/logos/TDN logo.png"
                  alt="TDN Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-white tracking-widest">THE DESIGN NARRATIVE</span>
            </div>
            <p className="max-w-xs leading-relaxed">
              Branding, design, web optimization, and campaigns built for growth.
            </p>
            <p className="font-semibold text-gray-600">
              &copy; {new Date().getFullYear()} The Design Narrative. All rights reserved.
            </p>
          </div>

          <div className="space-y-3">
            <div className="font-bold uppercase tracking-widest text-white">PUNE HQ</div>
            <p className="leading-relaxed">
              CTS 927, Office No.302, Sanas Memories,<br />
              F.C. Road, Pune &ndash; 411005
            </p>
            <div>Phone: +91 9850 417 266</div>
          </div>

          <div className="space-y-3">
            <div className="font-bold uppercase tracking-widest text-white">JAIPUR OFFICE</div>
            <p className="leading-relaxed">
              8 Khaliya house, Raj Bhawan Road, Gayatri Nagar,<br />
              Sodala, Jaipur &ndash; 302015
            </p>
            <div>Phone: +91 7387 234 785</div>
          </div>
        </div>
      </section>
    </div>
  );
}
