'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050507] text-white border-t border-white/10 relative overflow-hidden z-20">
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Mission (4 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-white/15 bg-white/5 p-1 group-hover:border-violet-500/50 transition-colors">
                <Image
                  src="/assets/logos/TDN logo.png"
                  alt="TDN Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-widest text-white group-hover:text-violet-300 transition-colors">
                THE DESIGN NARRATIVE
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-sm">
              Branding, design, web optimization, and campaigns built for growth. Creating un-ignorable digital experiences.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 text-xs font-mono font-bold text-white transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Let&apos;s Collaborate <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-mono tracking-widest uppercase font-bold text-violet-400">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Say Hello
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-mono tracking-widest uppercase font-bold text-violet-400">
              OUR SERVICES
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/services/brand-design" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Brand Design
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  UI UX Design
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  SEO
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="hover:text-white transition-colors flex items-center gap-1 hover:translate-x-1 duration-200">
                  Social Media Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Pune HQ (2 cols) */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-mono tracking-widest uppercase font-bold text-violet-400">
              PUNE HQ
            </h3>
            <div className="space-y-2 text-xs text-gray-400 leading-relaxed font-medium">
              <p>
                CTS 927, Office No.302, Sanas Memories,<br />
                F.C. Road, Pune &ndash; 411005
              </p>
              <div className="pt-1">
                <a
                  href="tel:+919850417266"
                  className="text-gray-300 hover:text-violet-400 font-mono text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-violet-400" />
                  +91 9850 417 266
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Jaipur Office (2 cols) */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-mono tracking-widest uppercase font-bold text-violet-400">
              JAIPUR OFFICE
            </h3>
            <div className="space-y-2 text-xs text-gray-400 leading-relaxed font-medium">
              <p>
                8 Khaliya house, Raj Bhawan Road, Gayatri Nagar,<br />
                Sodala, Jaipur &ndash; 302015
              </p>
              <div className="pt-1">
                <a
                  href="tel:+917387234785"
                  className="text-gray-300 hover:text-violet-400 font-mono text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-violet-400" />
                  +91 7387 234 785
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>
            &copy; {currentYear} The Design Narrative. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>PUNE &bull; JAIPUR &bull; BENGALURU &bull; MUMBAI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
