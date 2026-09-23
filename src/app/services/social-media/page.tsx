'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';

const STORY_SLIDES = [
  {
    title: 'PinkWalk Campaigns',
    desc: 'Increasing retail footfalls and brand visibility by 150% through high-retention vertical fashion reels.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    tag: 'FASHION CAMPAIGN',
  },
  {
    title: 'Utopia Launch Grid',
    desc: 'Creating custom, color-themed organic grids that co-exist with influencer assets to drive high brand authority.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    tag: 'BRAND CO-PARTNER',
  },
  {
    title: 'Yarnen Marketing Feed',
    desc: 'Managing full page visuals, captions, post pacing, and targeted meta ads to scale online traffic by 120%.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    tag: 'E-COMMERCE METRIC',
  },
];

export default function SocialMediaPage() {
  const [customMsg, setCustomMsg] = useState('');
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);

  const getWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(`Hey TDN! We want to enquire about your Social Media offering: ${serviceName}. Let's chat.`);
    return `https://wa.me/919850417266?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = encodeURIComponent(`Hey TDN! We need a custom Social Media campaign package: ${customMsg}`);
    window.open(`https://wa.me/919850417266?text=${text}`, '_blank');
  };

  // Instagram story auto-cycle interval (5 seconds)
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStory((prevStory) => (prevStory + 1) % STORY_SLIDES.length);
          return 0;
        }
        return prev + 2; // Increments to reach 100% in 5s (100ms * 50 steps)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory]);

  const handlePrevStory = () => {
    setActiveStory((prev) => (prev === 0 ? STORY_SLIDES.length - 1 : prev - 1));
  };

  const handleNextStory = () => {
    setActiveStory((prev) => (prev + 1) % STORY_SLIDES.length);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] select-none py-16 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Back link */}
      <Link href="/services" className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest flex items-center gap-1.5 mb-12">
        &larr; Back to Services
      </Link>

      {/* 1. HERO SECTION (Phone Frame Feed Mockup) */}
      <section className="relative w-full h-[50vh] bg-[#050505] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 mb-24 shadow-lg">
        <div className="relative z-20 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
            <MessageCircle className="w-3.5 h-3.5 text-pink-400" /> SOCIAL MARKETING
          </div>

          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-[1.0] text-white">
            stopping the <br />
            <span className="font-serif italic font-normal lowercase text-pink-400">
              infinite scroll.
            </span>
          </h1>
        </div>

        {/* Smartphone Screen Scroll representation */}
        <div className="w-full lg:w-1/2 flex items-center justify-center pt-8 lg:pt-0">
          <div className="relative w-44 aspect-[9/19] bg-[#111111] rounded-[36px] p-2.5 border-4 border-white/10 shadow-2xl overflow-hidden">
            {/* Phone notch */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full z-30" />
            <div className="w-full h-full rounded-[28px] overflow-hidden bg-black relative z-10">
              <video
                autoPlay
                muted
                loop
                playsInline
                src="https://player.vimeo.com/external/403848777.sd.mp4?s=a7b05101d293d05260840b2efd489bdf11f2a36b&profile_id=139&oauth2_token_id=57447761"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTAGRAM STORY CAROUSEL SECTION */}
      <section className="mb-24 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-2 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">CREATIVE Retainer case studies</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">CAMPAIGN REELS</h2>
        </div>

        {/* Custom stories UI Card */}
        <div className="relative w-full md:w-[480px] aspect-[9/16] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#050505] text-white flex flex-col justify-between p-6">
          
          {/* Story Progress bars */}
          <div className="absolute top-4 left-6 right-6 z-30 flex gap-1.5">
            {STORY_SLIDES.map((_, idx) => (
              <div key={idx} className="h-1 bg-white/20 rounded-full flex-grow overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{
                    width: idx === activeStory ? `${progress}%` : (idx < activeStory ? '100%' : '0%'),
                  }}
                />
              </div>
            ))}
          </div>

          {/* Active story background image */}
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            <img
              src={STORY_SLIDES[activeStory].image}
              alt={STORY_SLIDES[activeStory].title}
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
          </div>

          {/* Manual tap controls */}
          <button
            onClick={handlePrevStory}
            className="absolute top-12 bottom-24 left-0 w-1/3 z-20 cursor-w-resize"
          />
          <button
            onClick={handleNextStory}
            className="absolute top-12 bottom-24 right-0 w-1/3 z-20 cursor-e-resize"
          />

          {/* Details header */}
          <div className="relative z-30 pt-6 flex justify-between items-center">
            <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
              {STORY_SLIDES[activeStory].tag}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/50">
              0{activeStory + 1} / 0{STORY_SLIDES.length}
            </span>
          </div>

          {/* Story description info */}
          <div className="relative z-30 space-y-4">
            <h3 className="text-xl font-bold uppercase text-white leading-none">
              {STORY_SLIDES[activeStory].title}
            </h3>
            <p className="text-xs text-gray-300 font-semibold leading-relaxed">
              {STORY_SLIDES[activeStory].desc}
            </p>
            <div className="pt-2">
              <Link
                href={getWhatsAppLink(STORY_SLIDES[activeStory].title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white text-black font-extrabold text-[10px] uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Enquire Story <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPLIT FOOTER FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
        <div className="relative h-64 lg:h-auto rounded-3xl overflow-hidden shadow-lg border border-black/5 min-h-[300px]">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60"
            alt="Instagram management creatives"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 space-y-2 text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-pink-400">ENGAGEMENT MEDIA</span>
            <h3 className="text-xl font-bold uppercase">SCROLL STOPPING STORIES</h3>
          </div>
        </div>

        <div className="bg-[#050505] text-white p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            <span className="text-[9px] font-mono tracking-widest text-pink-400">INQUIRY PANEL</span>
            <h3 className="text-2xl font-black uppercase leading-tight">DIDN&apos;T FIND YOUR FIT?</h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              We create customized social media retainer packages and co-partnership agreements. Let us know what fits your brand goals.
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
                placeholder="We need full page management, content generation (reels/posts), and meta ad management..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-pink-500/30 focus:border-pink-500 focus:outline-none text-white text-xs placeholder:text-gray-700 transition-colors resize-none"
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
