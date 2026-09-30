'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Paintbrush, Globe, MessageSquare, TrendingUp } from 'lucide-react';

const TILES = [
  {
    title: 'Brand Design',
    desc: 'Strategy, naming, and packaging design built to stand out.',
    image: '/assets/services/Brand Design Card.png',
    link: '/services/brand-design',
    icon: Paintbrush,
    color: 'from-violet-500/20 to-transparent',
  },
  {
    title: 'UI UX Design',
    desc: 'Websites and apps shaped by user behavior. Snappy layouts.',
    image: '/assets/services/UiUX Card.png',
    link: '/services/ui-ux',
    icon: Globe,
    color: 'from-cyan-500/20 to-transparent',
  },
  {
    title: 'Social Marketing',
    desc: 'Compelling campaigns designed to capture infinite attention.',
    image: '/assets/services/Social Media Card.png',
    link: '/services/social-media',
    icon: MessageSquare,
    color: 'from-pink-500/20 to-transparent',
  },
  {
    title: 'SEO Growth',
    desc: 'Ranking optimization that gets you organic Page 1 slots.',
    image: '/assets/services/SEO Card.png',
    link: '/services/seo',
    icon: TrendingUp,
    color: 'from-lime-500/20 to-transparent',
  },
];

function ServiceTile({ tile }: { tile: typeof TILES[0] }) {
  const Icon = tile.icon;

  return (
    <Link
      href={tile.link}
      className="relative flex flex-col justify-between h-[450px] p-8 rounded-3xl overflow-hidden bg-[#050505] text-white border border-white/5 group shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-98"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 space-y-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
          <Icon className="w-5 h-5 text-white" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors flex justify-between items-center">
          {tile.title} <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all" />
        </h2>
        
        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
          {tile.desc}
        </p>
      </div>

      <div className="relative z-20 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-500 uppercase">
        <span>Click to open chapter</span>
        <span className="text-white group-hover:underline">Explore</span>
      </div>
    </Link>
  );
}

export default function ServicesHubPage() {
  const [customMsg, setCustomMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We saw your services hub and need a custom package: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* 1. HEADER (White Bg) */}
      <div className="space-y-6 mb-16 max-w-4xl pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-bold text-[#111111] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Capabilities
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.0]">
          digital magic <br />
          <span className="font-serif italic font-normal lowercase text-gray-500">
            crafted for growing
          </span>
        </h1>
      </div>

      {/* 2. TILES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {TILES.map((tile, idx) => (
          <ServiceTile key={idx} tile={tile} />
        ))}
      </section>

      {/* 3. INTAKE FORM (Matches user screenshot) */}
      <section className="py-12 px-8 md:px-12 rounded-3xl bg-[#050505] text-white w-full border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8b5cf6] uppercase font-bold">SUPPORT</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase leading-tight tracking-tight">
              DIDN&apos;T FIND WHAT YOU <br className="hidden md:inline" /> WANT?
            </h2>
            <p className="text-gray-400 font-semibold text-xs leading-relaxed max-w-md">
              Describe your custom branding or digital marketing requirement, and we will formulate a personalized plan.
            </p>
          </div>

          {/* Right Column */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="requirement" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                DESCRIBE REQUIREMENT
              </label>
              <textarea
                id="requirement"
                rows={3}
                required
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="We want a custom package containing branding, full SEO setup, and e-commerce dev..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 focus:border-violet-500 focus:outline-none text-white text-xs placeholder:text-gray-700 transition-colors resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-extrabold uppercase tracking-widest hover:scale-101 active:scale-99 transition-all duration-200 cursor-pointer"
            >
              SUBMIT VIA WHATSAPP ↗
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
