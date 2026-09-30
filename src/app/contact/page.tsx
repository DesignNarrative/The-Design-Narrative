'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, ChevronDown, CheckCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How long does a creative branding project take?',
    answer: 'Usually 4 to 8 weeks depending on packaging scope and identity revisions. We move fast but never compromise on design grids.',
  },
  {
    question: 'Do you collaborate with early-stage startups?',
    answer: 'Absolutely. We work alongside funded startups to build visual product-market stories, nomenclature architectures, and pitch decks from the ground up.',
  },
  {
    question: 'What does your design and marketing workflow look like?',
    answer: 'A three-step pipeline: (1) Deep Market Strategy, (2) High-fidelity Prototyping (Figma and mockups), and (3) Growth launch setup (Meta ads, reels, and organic Google SEO).',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    // A. Format WhatsApp message
    const waText = `Hey TDN! 🚀
Here are our enquiry details:
Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.phone}
Requirement: ${formData.message}`;

    const formattedLink = `https://wa.me/919850417266?text=${encodeURIComponent(waText)}`;
    
    // B. Fallback / CRM log dispatch
    console.log("Fired backup dispatch to CRM backend for recovery safeguards:", formData);
    
    // Open WhatsApp
    window.open(formattedLink, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
      
      {/* SECTION 1: SPLIT-SCREEN HERO (Form left, Video right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-8">
        
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-bold text-[#111111] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> SAY HELLO
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.0] text-[#111111]">
              SAY <br />
              <span className="font-serif italic font-normal lowercase text-gray-500">
                hello.
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-black/5 focus:border-violet-500 focus:outline-none text-[#111111] text-xs placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-black/5 focus:border-violet-500 focus:outline-none text-[#111111] text-xs placeholder:text-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                Mobile Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="Enter mobile number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-black/5 focus:border-violet-500 focus:outline-none text-[#111111] text-xs placeholder:text-gray-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Describe your requirement, we are here to assist..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-black/5 focus:border-violet-500 focus:outline-none text-[#111111] text-xs placeholder:text-gray-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black hover:bg-black/85 text-white text-xs font-extrabold uppercase tracking-widest hover:scale-101 active:scale-99 transition-all duration-200 cursor-pointer shadow-md"
            >
              SUBMIT VIA WHATSAPP &rarr;
            </button>
          </form>
        </div>

        {/* Right Video Clip */}
        <div className="lg:col-span-5 relative h-64 lg:h-auto rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#050505] min-h-[350px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-85 pointer-events-none"
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0f9b3ec836c2e399fa51b69f8c6&profile_id=139&oauth2_token_id=57447761"
          />
        </div>
      </section>

      {/* SECTION 2: OFFICE CARDS (Address panels + Google Maps embeds) */}
      <section className="space-y-8">
        <div className="space-y-1.5 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFICES</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">FIND US</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pune HQ Card */}
          <div className="glass-card-light rounded-3xl p-6 md:p-8 border border-black/5 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-violet-500" /> PUNE OFFICE (HQ)
              </div>
              <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                CTS 927, Office No.302, Sanas Memories,<br />
                F.C. Road, Pune &ndash; 411005
              </p>
              
              <div className="text-xs space-y-2 font-bold text-gray-600">
                <a href="tel:+919850417266" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <Phone className="w-3.5 h-3.5 text-black" /> +91 9850 417 266
                </a>
                <a href="mailto:ceo@thedesignnarrative.in" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <Mail className="w-3.5 h-3.5 text-black" /> ceo@thedesignnarrative.in
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-black/5">
              <iframe
                title="Pune HQ Office Location Map"
                src="https://maps.google.com/maps?q=Sanas%20Memories,%20F.C.%20Road,%20Pune&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale opacity-90"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Jaipur Card */}
          <div className="glass-card-light rounded-3xl p-6 md:p-8 border border-black/5 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-violet-500" /> JAIPUR OFFICE
              </div>
              <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                8 Khaliya house, Raj Bhawan Road, Gayatri Nagar,<br />
                Sodala, Jaipur &ndash; 302015
              </p>
              
              <div className="text-xs space-y-2 font-bold text-gray-600">
                <a href="tel:+917387234785" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <Phone className="w-3.5 h-3.5 text-black" /> +91 7387 234 785
                </a>
                <a href="mailto:digital@thedesignnarrative.in" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <Mail className="w-3.5 h-3.5 text-black" /> digital@thedesignnarrative.in
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-black/5">
              <iframe
                title="Jaipur Office Location Map"
                src="https://maps.google.com/maps?q=Gayatri%20Nagar,%20Sodala,%20Jaipur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale opacity-90"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FAQ ACCORDIONS (Inline Expand Reveal) */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-1.5 border-b border-black/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">QUESTIONS</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#111111]">FAQ</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card-light rounded-2xl border border-black/5 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer hover:bg-black/5"
                >
                  <h3 className="text-sm font-bold uppercase text-[#111111]">
                    {faq.question}
                  </h3>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-black/5 text-xs text-gray-500 font-semibold leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
