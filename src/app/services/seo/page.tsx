'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';

export default function SeoPage() {
  const [customMsg, setCustomMsg] = useState('');

  const getWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(`Hey TDN! We want to enquire about your SEO offering: ${serviceName}. Let's chat.`);
    return `https://wa.me/919850417266?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We need a custom SEO package: ${customMsg}`);
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
        {/* Abstract SEO data graph loop */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20 filter grayscale"
            src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f26c6d2c49ee69a4c5148d4fb9fcf32d207ec29&profile_id=139&oauth2_token_id=57447761"
          />
        </div>

        <div className="relative z-20 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-lime-300" /> SEO GROWTH
          </div>

          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-[1.0] text-white">
            dominate the <br />
            <span className="font-serif italic font-normal lowercase text-lime-300">
              google search.
            </span>
          </h1>
        </div>
      </section>

      {/* 2. OFFERING BLOCKS (No generic stock images, custom SVG infographics) */}
      <section className="space-y-24 mb-24">
        
        {/* Offering 1: On-Page SEO */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Custom SVG: Google Search Snippet Card Mockup */}
          <div className="w-full lg:w-1/2 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-black/5 bg-[#fafafa] flex items-center justify-center p-6 md:p-12 shadow-sm">
            <div className="w-full max-w-md bg-white border border-black/5 p-5 rounded-xl shadow-md space-y-3">
              <div className="flex items-center gap-2 text-[8px] font-mono text-gray-400">
                <span>Google Search Result Snippet</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                  The Design Narrative &bull; Premium Brand Strategy &amp; Marketing Agency
                </h4>
                <div className="text-[10px] text-green-700 font-mono">
                  https://www.thedesignnarrative.in &rsaquo; services &rsaquo; branding
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
                Strategic branding, wireframed UI/UX designs, and growth campaigns engineered for scale. Rank on Google Page 1.
              </p>
              <div className="flex gap-2 pt-1.5 border-t border-black/5 text-[8px] font-mono text-lime-600 font-bold">
                <span>✓ metadata_tags</span>
                <span>✓ alt_attributes</span>
                <span>✓ keyword_density</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFERING 01</span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#111111] leading-tight">
              On-Page SEO
            </h2>
            <p className="text-sm text-gray-500 font-semibold leading-relaxed">
              Optimizing page hierarchy, title tags, body keywords, image attributes, and technical XML schemas. We make every layout transparent and readable to crawlers.
            </p>
            <div className="pt-2">
              <Link
                href={getWhatsAppLink('On-Page SEO')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black hover:bg-black/85 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Enquire Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Offering 2: Off-Page SEO */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Custom SVG: Connecting Backlink Network */}
          <div className="w-full lg:w-1/2 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-black/5 bg-[#fafafa] flex items-center justify-center p-6 shadow-sm">
            <svg className="w-64 h-48" viewBox="0 0 200 150">
              {/* Backlink lines */}
              <line x1="100" y1="75" x2="30" y2="40" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="100" y1="75" x2="170" y2="30" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="100" y1="75" x2="160" y2="120" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="100" y1="75" x2="40" y2="110" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Main Hub Node */}
              <circle cx="100" cy="75" r="14" fill="#8b5cf6" />
              <text x="100" y="78" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">TDN</text>
              
              {/* External Backlink Nodes */}
              <circle cx="30" cy="40" r="8" fill="#111111" />
              <circle cx="170" cy="30" r="9" fill="#111111" />
              <circle cx="160" cy="120" r="7" fill="#111111" />
              <circle cx="40" cy="110" r="10" fill="#111111" />

              <text x="30" y="53" fill="#666" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Authority DA 80</text>
              <text x="170" y="44" fill="#666" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">PR Mentions</text>
              <text x="160" y="132" fill="#666" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Blogs</text>
              <text x="40" y="125" fill="#666" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Directories</text>
            </svg>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFERING 02</span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#111111] leading-tight">
              Off-Page SEO
            </h2>
            <p className="text-sm text-gray-500 font-semibold leading-relaxed">
              Generating high-authority backlinks, guest columns, directory listings, and online brand mentions to build domain reputation.
            </p>
            <div className="pt-2">
              <Link
                href={getWhatsAppLink('Off-Page SEO')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black hover:bg-black/85 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Enquire Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Offering 3: Google Ranking Growth */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Custom SVG: Rising ranking line graph */}
          <div className="w-full lg:w-1/2 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-black/5 bg-[#fafafa] flex items-center justify-center p-6 shadow-sm">
            <svg className="w-64 h-48" viewBox="0 0 200 150">
              {/* Grid Lines */}
              <line x1="20" y1="120" x2="180" y2="120" stroke="#eee" strokeWidth="1" />
              <line x1="20" y1="90" x2="180" y2="90" stroke="#eee" strokeWidth="1" />
              <line x1="20" y1="60" x2="180" y2="60" stroke="#eee" strokeWidth="1" />
              <line x1="20" y1="30" x2="180" y2="30" stroke="#eee" strokeWidth="1" />
              
              {/* Chart Line */}
              <path d="M 20 120 Q 60 100 100 65 T 180 20" fill="none" stroke="#8b5cf6" strokeWidth="3" />
              
              {/* Nodes */}
              <circle cx="20" cy="120" r="3.5" fill="#111" />
              <circle cx="100" cy="65" r="4.5" fill="#8b5cf6" />
              <circle cx="180" cy="20" r="5.5" fill="#a3e635" />

              <text x="180" y="10" fill="#a3e635" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Pos #1</text>
              <text x="100" y="55" fill="#8b5cf6" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Page 1</text>

              {/* Axis Label */}
              <text x="100" y="140" fill="#999" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">COMPRESSED TIMELINE (6 MONTHS)</text>
            </svg>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFERING 03</span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#111111] leading-tight">
              Google Ranking Growth
            </h2>
            <p className="text-sm text-gray-500 font-semibold leading-relaxed">
              Multiplying organic search listings and queries through technical site speed improvements, structured content hubs, and continuous index checks.
            </p>
            <div className="pt-2">
              <Link
                href={getWhatsAppLink('Google Ranking Growth')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black hover:bg-black/85 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Enquire Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 3. SPLIT FOOTER FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
        <div className="relative h-64 lg:h-auto rounded-3xl overflow-hidden shadow-lg border border-black/5 min-h-[300px]">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
            alt="Search growth analytics report"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 space-y-2 text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-lime-300">SEARCH ANALYTICS</span>
            <h3 className="text-xl font-bold uppercase">ORGANIC KEYWORD DOMINANCE</h3>
          </div>
        </div>

        <div className="bg-[#050505] text-white p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            <span className="text-[9px] font-mono tracking-widest text-lime-300">INQUIRY PANEL</span>
            <h3 className="text-2xl font-black uppercase leading-tight">DIDN&apos;T FIND YOUR FIT?</h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              We perform complete SEO audits and offer organic rank growth packages. Let us know how we can boost your search visibility.
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
                placeholder="We want a complete SEO setup for a multi-lingual e-commerce website to rank on page 1..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-lime-500/30 focus:border-lime-500 focus:outline-none text-white text-xs placeholder:text-gray-700 transition-colors resize-none"
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
