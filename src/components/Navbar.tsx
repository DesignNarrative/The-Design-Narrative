'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our Work' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Say Hello' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-45 bg-white/70 backdrop-blur-md border-b border-black/5 text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-black/10 group-hover:border-black transition-colors">
            <Image
              src="/assets/logos/TDN logo.png"
              alt="The Design Narrative Logo"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="font-bold tracking-tight text-[#111111] group-hover:opacity-75 transition-opacity">
            THE DESIGN NARRATIVE
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold tracking-wide transition-colors duration-200 py-2 hover:text-[#111111]/70 text-[#111111]"
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="https://wa.me/919850417266"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#111111]/85 text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Slide into DMs <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#111111] hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white/95 border-b border-black/10 backdrop-blur-xl md:hidden z-30"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold tracking-wide py-2 ${
                      isActive ? 'text-[#111111] border-l-2 border-black pl-3' : 'text-[#111111]/60 pl-3'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="https://wa.me/919850417266"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-[#111111] text-white w-full"
              >
                Slide into DMs <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
