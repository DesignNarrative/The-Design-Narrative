'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Paintbrush } from 'lucide-react';

const OFFERINGS = [
  {
    title: 'Brand Strategy & Design',
    desc: 'Deep-diving into target consumer behaviors to map visual narratives and core market positioning.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Nomenclature (Naming)',
    desc: 'Formulating unforgettable, legally clear names that hold digital and physical brand presence.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Brand Identity',
    desc: 'Crafting premium logotypes, grids, rules, typographic pairings, and color guidelines.',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Packaging Design',
    desc: 'Engineering tactile layouts, structural materials, and box graphics built to pop on shelves.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60',
  },
];

export default function BrandDesignPage() {
  const [customMsg, setCustomMsg] = useState('');

  const getWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(`Hey TDN! We want to enquire about your Branding offering: ${serviceName}. Let's chat.`);
    return `https://wa.me/919850417266?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We need a custom Brand Strategy package: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] py-16 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Back link */}
      <Link href="/services" className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest flex items-center gap-1.5 mb-12">
        &larr; Back to Services
      </Link>

      {/* 1. HERO SECTION (Widescreen video loop + Slogan) */}
      <section className="relative w-full h-[50vh] bg-[#050505] rounded-3xl overflow-hidden flex flex-col justify-end p-8 md:p-12 mb-24 shadow-lg">
        {/* Sketch-to-lockup morph loop video */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-25 filter grayscale"
            src="https://player.vimeo.com/external/494252666.sd.mp4?s=3de3ecb70868f0a0c6a5a898b3c6a461e1b8b2b6&profile_id=139&oauth2_token_id=57447761"
          />
        </div>

        <div className="relative z-20 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
            <Paintbrush className="w-3.5 h-3.5 text-violet-300" /> BRAND DESIGN
          </div>

          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-[1.0] text-white">
            Every brand needs a personality. <br />
            <span className="font-serif italic font-normal lowercase text-violet-400">
              we design one that sticks.
            </span>
          </h1>
        </div>
      </section>

      {/* 2. OFFERING BLOCKS (No duplicate copywriting, visual card layouts) */}
      <section className="space-y-24 mb-24">
        {OFFERINGS.map((offering, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Mockup Image */}
            <div className="w-full lg:w-1/2 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-black/5 bg-[#fafafa] group">
              <img
                src={offering.image}
                alt={offering.title}
                className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-widest text-white uppercase font-bold">
                0{idx + 1} &bull; Mockup
              </div>
            </div>

            {/* Description content */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#111111] leading-tight">
                {offering.title}
              </h2>
              <p className="text-sm text-gray-500 font-semibold leading-relaxed">
                {offering.desc}
              </p>
              
              <div className="pt-2">
                <Link
                  href={getWhatsAppLink(offering.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black hover:bg-black/85 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Enquire Now <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. SPLIT FOOTER FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
        {/* Left Column (Brand Board visual card) */}
        <div className="relative h-64 lg:h-auto rounded-3xl overflow-hidden shadow-lg border border-black/5 min-h-[300px]">
          <img
            src="https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&auto=format&fit=crop&q=60"
            alt="Brand assets showcase"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 space-y-2 text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-violet-400">DESIGN NARRATIVE RETRO</span>
            <h3 className="text-xl font-bold uppercase">PREMIUM BRAND SYSTEMS</h3>
          </div>
        </div>

        {/* Right Column (Dark Intake form) */}
        <div className="bg-[#050505] text-white p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            <span className="text-[9px] font-mono tracking-widest text-violet-400 uppercase">INQUIRY PANEL</span>
            <h3 className="text-2xl font-black uppercase leading-tight">DIDN&apos;T FIND YOUR FIT?</h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Describe your brand scale, timeline, and deliverables. We will get back to you with custom strategy guidelines.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="custom-req" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                Describe requirements
              </label>
              <textarea
                id="custom-req"
                rows={3}
                required
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="We want a rebranding project including nomenclature research, visual guidelines, and packaging renders..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 focus:border-violet-500 focus:outline-none text-white text-xs placeholder:text-gray-700 transition-colors resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-white/85 text-black text-xs font-extrabold uppercase tracking-widest hover:scale-103 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Send Requirement (WhatsApp) <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
