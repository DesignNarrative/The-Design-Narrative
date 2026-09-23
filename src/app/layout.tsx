import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

// Components
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Design Narrative (TDN) | Digital Marketing & Branding Agency Pune',
  description: 'End-to-End Branding, UI/UX Design, Social Media Marketing, and SEO built for scalable growth. The main character energy your brand needs.',
  keywords: ['branding agency pune', 'uiux design agency', 'digital marketing pune', 'seo services', 'the design narrative'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] selection:bg-black selection:text-white overflow-x-hidden font-sans">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
