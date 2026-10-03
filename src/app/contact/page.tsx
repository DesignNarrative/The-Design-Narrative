'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

const LOCATIONS = [
  {
    id: 'pune',
    label: 'PUNE (HQ)',
    title: 'Pune Headquarters',
    pinName: 'TDN - Pune HQ',
    address: 'CTS 927, Office No.302, Sanas Memories, F.C. Road, Pune – 411005',
    phone: '+91 9850 417 266',
    email: 'ceo@thedesignnarrative.in',
    mapUrl: 'https://maps.google.com/maps?q=Sanas%20Memories,%20F.C.%20Road,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionUrl: 'https://maps.google.com/?q=Sanas+Memories+F.C.+Road+Pune+411005',
  },
  {
    id: 'jaipur',
    label: 'JAIPUR STUDIO',
    title: 'Jaipur Creative Studio',
    pinName: 'TDN - Jaipur Studio',
    address: '8 Khaliya house, Raj Bhawan Road, Gayatri Nagar, Sodala, Jaipur – 302015',
    phone: '+91 7387 234 785',
    email: 'digital@thedesignnarrative.in',
    mapUrl: 'https://maps.google.com/maps?q=Gayatri%20Nagar,%20Sodala,%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionUrl: 'https://maps.google.com/?q=Gayatri+Nagar+Sodala+Jaipur+302015',
  },
];

const FAQS = [
  {
    question: 'How long does a creative/branding project take?',
    answer:
      'It usually takes 2-4 weeks depending on the scope. We follow a structured process to ensure world-class quality and deliver on time at every stage.',
  },
  {
    question: 'Do you collaborate with early-stage startups?',
    answer:
      'Yes! We work alongside funded startups, emerging D2C brands, and established enterprises to craft bespoke identities, high-converting digital products, and performance engines.',
  },
  {
    question: 'What does your design and marketing workflow look like?',
    answer:
      'Our 4-step framework includes Discover (research & strategy), Plan (wireframing & moodboards), Design & Develop (high-fidelity execution & engineering), and Scale (testing, launch & growth optimization).',
  },
  {
    question: 'Do you offer ongoing support after the project is completed?',
    answer:
      'Absolutely. We offer retainer partnerships for continuous brand stewardship, design systems maintenance, web performance updates, and ongoing social media / SEO campaigns.',
  },
  {
    question: 'Can we schedule a meeting before starting?',
    answer:
      'Of course! You can book a free 30-minute discovery consultation with our strategy team or send us your requirements via WhatsApp to start the conversation immediately.',
  },
];

const SERVICE_OPTIONS = [
  'Brand Design & Packaging',
  'UI/UX & Web Development',
  'Social Media Marketing',
  'SEO & Organic Growth',
  'Full Growth Suite',
  'Custom Requirement',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Brand Design & Packaging',
    message: '',
  });

  const [activeLocation, setActiveLocation] = useState<'pune' | 'jaipur'>('pune');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // First FAQ open by default
  const [copiedEmail, setCopiedEmail] = useState(false);

  const selectedOffice = LOCATIONS.find((loc) => loc.id === activeLocation) || LOCATIONS[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    const waText = `Hey TDN! 🚀
I'm reaching out from your website contact page:
• Name: ${formData.name}
• Email: ${formData.email}
• Mobile: ${formData.phone || 'Not provided'}
• Interested In: ${formData.service}
• Message: ${formData.message}`;

    const formattedLink = `https://wa.me/919850417266?text=${encodeURIComponent(waText)}`;
    window.open(formattedLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-black selection:text-white">
      
      {/* 1. HERO & CONTACT FORM SECTION */}
      <section className="pt-12 md:pt-16 pb-20 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
                CONTACT
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
                LET&apos;S TURN <br />
                YOUR IDEAS INTO <br />
                <span className="font-serif italic font-normal text-gray-500 lowercase">
                  impact.
                </span>
              </h1>

              <p className="text-sm md:text-base text-gray-600 font-medium max-w-xl leading-relaxed">
                Have a project in mind, a question, or just want to say hello? We&apos;d love to hear from you. Let&apos;s start a conversation.
              </p>
            </div>
          </div>

          {/* Right Floating Contact Form Card with Desk Backdrop */}
          <div className="lg:col-span-6 relative">
            {/* Background Desk Ambient Layer */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] overflow-hidden opacity-30 pointer-events-none -z-10">
              <Image
                src="/assets/contact-desk.jpg"
                alt="TDN Creative Studio Desk Setup"
                fill
                className="object-cover filter blur-sm"
              />
            </div>

            {/* Elevated Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2.2rem] md:rounded-[2.5rem] p-7 sm:p-10 border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.12)] space-y-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
                  SEND US A MESSAGE
                </span>
                <h3 className="text-2xl font-black uppercase text-black">Start a Project</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-[#f8f8fa] focus:bg-white focus:border-violet-600 focus:outline-none text-black text-xs placeholder:text-gray-400 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-[#f8f8fa] focus:bg-white focus:border-violet-600 focus:outline-none text-black text-xs placeholder:text-gray-400 transition-all"
                  />
                </div>

                {/* Sub-grid: Mobile Number & Interested In */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider block">
                      Mobile Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-[#f8f8fa] focus:bg-white focus:border-violet-600 focus:outline-none text-black text-xs placeholder:text-gray-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider block">
                      Interested In
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-[#f8f8fa] focus:bg-white focus:border-violet-600 focus:outline-none text-black text-xs transition-all cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider block">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-[#f8f8fa] focus:bg-white focus:border-violet-600 focus:outline-none text-black text-xs placeholder:text-gray-400 transition-all resize-none"
                  />
                </div>

                {/* Submit via WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-lg"
                >
                  SUBMIT VIA WHATSAPP <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>

              {/* Direct email note */}
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>
                  Direct email:{' '}
                  <a
                    href="mailto:ceo@thedesignnarrative.in"
                    className="text-black font-bold hover:text-violet-600 transition-colors"
                  >
                    ceo@thedesignnarrative.in
                  </a>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyEmail('ceo@thedesignnarrative.in')}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-green-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. FIND US HERE / OUR OFFICES SECTION */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Studio Visual Card with "IDEAS BRANDS PEOPLE" */}
          <div className="lg:col-span-6 relative min-h-[440px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 bg-[#09090b] group">
            <Image
              src="/assets/contact-studio.jpg"
              alt="The Design Narrative Creative Studio"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom-Left Branding Pillar */}
            <div className="absolute bottom-8 left-8 z-10 text-white space-y-1">
              <div className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
                IDEAS <br />
                BRANDS <br />
                PEOPLE
              </div>
              <span className="text-[10px] font-mono text-violet-300 tracking-widest uppercase block pt-1">
                TDN CREATIVE LABS
              </span>
            </div>

            {/* Bottom-Right Location Indicator */}
            <div className="absolute bottom-8 right-8 z-10 w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <MapPin className="w-5 h-5 text-violet-400" />
            </div>
          </div>

          {/* Right Office Switcher, Interactive Map & Address Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
                OUR OFFICES
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
                FIND US <br />
                HERE.
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                Come say hello! We work from two locations and collaborate with clients across the globe.
              </p>
            </div>

            {/* Location Switcher Tabs */}
            <div className="flex items-center gap-2 bg-[#f4f4f6] p-1.5 rounded-full border border-black/5 self-start">
              {LOCATIONS.map((loc) => {
                const isActive = activeLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc.id as 'pune' | 'jaipur')}
                    className={`relative px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Embedded Map View with Custom Pin Badge */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-black/10 shadow-md bg-gray-100">
              <iframe
                key={selectedOffice.id}
                title={selectedOffice.title}
                src={selectedOffice.mapUrl}
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-90"
                allowFullScreen
                loading="lazy"
              />
              {/* Floating Pin Indicator Pill */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/15 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span>{selectedOffice.pinName}</span>
              </div>
            </div>

            {/* Address & Direct Actions Bar */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-violet-600 shrink-0 mt-1" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
                  {selectedOffice.address}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5">
                <div className="space-y-1">
                  <a
                    href={`tel:${selectedOffice.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 text-xs font-bold text-black hover:text-violet-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-500" /> {selectedOffice.phone}
                  </a>
                  <a
                    href={`mailto:${selectedOffice.email}`}
                    className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedOffice.email}
                  </a>
                </div>

                <a
                  href={selectedOffice.directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  GET DIRECTIONS <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS (FAQ Accordion Section) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Headline & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-violet-600 font-bold uppercase block">
              HAVE QUESTIONS
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
              FREQUENTLY <br />
              ASKED <br />
              <span className="font-serif italic font-normal text-violet-600">
                QUESTIONS.
              </span>
            </h2>

            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-md">
              Got more questions? Here are some quick answers. Can&apos;t find what you&apos;re looking for? Feel free to reach out &mdash; we&apos;re happy to help.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919850417266?text=Hey%20TDN!%20I%20have%20a%20question%20regarding%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/15 text-black text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                ASK US ANYTHING <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-violet-600/30 bg-[#f9f9fb] shadow-md'
                      : 'border-black/10 bg-white hover:border-black/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 sm:p-7 text-left cursor-pointer transition-colors"
                  >
                    <h3 className="text-sm sm:text-base font-black text-black pr-4 leading-snug">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isExpanded
                          ? 'bg-black text-white border-black rotate-180'
                          : 'bg-[#f4f4f6] text-black border-black/5'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-black/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
