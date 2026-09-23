'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Laptop } from 'lucide-react';

const OFFERINGS = [
  {
    title: 'Web Application',
    desc: 'UX research, interactive wireframing, component libraries, and dashboard interface design systems.',
    screens: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    title: 'Phone / Desktop App',
    desc: 'iOS and Android app layouts, tactile micro-interactions, mobile systems, and desktop wrappers.',
    screens: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1541462608141-2f5287b6e665?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    title: 'E-Commerce Website',
    desc: 'Engineering conversion-driven shopping carts, detailed product grids, filters, and checkouts.',
    screens: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    title: 'Business Website',
    desc: 'Corporate visual systems, strategic landing architectures, SEO wireframes, and conversion flows.',
    screens: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop&q=60',
    ],
  },
];

export default function UiUxPage() {
  const [customMsg, setCustomMsg] = useState('');

  const getWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(`Hey TDN! We want to enquire about your UI/UX offering: ${serviceName}. Let's chat.`);
    return `https://wa.me/919850417266?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We need a custom UI/UX design package: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  // 3D Card Hover Tilt Calculations
  const handleDeviceMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
  };

  const handleDeviceMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] select-none py-16 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Back link */}
      <Link href="/services" className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest flex items-center gap-1.5 mb-12">
        &larr; Back to Services
      </Link>

      {/* 1. HERO SECTION (3D Laptop Tilt Mockup) */}
      <section className="relative w-full h-[55vh] bg-[#050505] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 mb-24 shadow-lg">
        <div className="relative z-20 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
            <Laptop className="w-3.5 h-3.5 text-cyan-300" /> UI UX DESIGN
          </div>

          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-[1.0] text-white">
            stunning and <br />
            <span className="font-serif italic font-normal lowercase text-cyan-300">
              buttery smooth.
            </span>
          </h1>
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
            Hover over the device mockup to experience dynamic 3D cursor tilt vectors.
          </p>
        </div>

        {/* 3D Tilting Device Frame */}
        <div className="w-full lg:w-1/2 flex items-center justify-center pt-8 lg:pt-0">
          <div
            onMouseMove={handleDeviceMouseMove}
            onMouseLeave={handleDeviceMouseLeave}
            className="relative w-72 md:w-96 aspect-video bg-black rounded-xl p-2 border border-white/15 shadow-2xl transition-all duration-200 origin-center"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden bg-white/5 relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gloss reflection overlay */}
            <div className="absolute inset-2 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none rounded-lg z-30" />
          </div>
        </div>
      </section>

      {/* 2. OFFERING BLOCKS (Horizontal Mockup Carousels) */}
      <section className="space-y-24 mb-24">
        {OFFERINGS.map((offering, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-black/5">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFERING 0{idx + 1}</span>
                <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">
                  {offering.title}
                </h2>
              </div>
              <p className="text-sm text-gray-500 font-semibold max-w-sm leading-relaxed">
                {offering.desc}
              </p>
            </div>

            {/* Horizontal Mockup Slider */}
            <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
              {offering.screens.map((screen, sIdx) => (
                <div
                  key={sIdx}
                  className="snap-start shrink-0 w-[70vw] md:w-[350px] aspect-video relative rounded-2xl overflow-hidden shadow-md border border-black/5 group"
                >
                  <img
                    src={screen}
                    alt={`${offering.title} UI screen`}
                    className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/80 uppercase font-bold tracking-wider">
                    Interface Layer {sIdx + 1}
                  </div>
                </div>
              ))}

              {/* Inquiry slide card */}
              <div className="snap-start shrink-0 w-[50vw] md:w-[220px] aspect-video rounded-2xl bg-black text-white flex flex-col justify-between p-6">
                <div className="text-[9px] font-mono text-violet-400 uppercase tracking-widest">ENQUIRY</div>
                <h4 className="text-xs font-bold uppercase leading-tight">Need a custom plan?</h4>
                <Link
                  href={getWhatsAppLink(offering.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-white hover:text-violet-400 transition-colors"
                >
                  WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. SPLIT FOOTER FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
        <div className="relative h-64 lg:h-auto rounded-3xl overflow-hidden shadow-lg border border-black/5 min-h-[300px]">
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60"
            alt="Design wireframes"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 space-y-2 text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-300">UX LABS</span>
            <h3 className="text-xl font-bold uppercase">BUTTERY SMOOTH WIREFRAMES</h3>
          </div>
        </div>

        <div className="bg-[#050505] text-white p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            <span className="text-[9px] font-mono tracking-widest text-cyan-300">INQUIRY PANEL</span>
            <h3 className="text-2xl font-black uppercase leading-tight">DIDN&apos;T FIND YOUR FIT?</h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Have complex layout architectures, data tables, or bespoke design systems? Route details to WhatsApp immediately.
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
                placeholder="We want a SaaS web application layout with data visualization filters, user flows, and Figma files..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/30 focus:border-cyan-500 focus:outline-none text-white text-xs placeholder:text-gray-700 transition-colors resize-none"
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
