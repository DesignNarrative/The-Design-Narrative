'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Sparkles, BookOpen, Search } from 'lucide-react';

const ARTICLES = [
  {
    id: 'brand-main-character-energy',
    title: 'How to Give Your Brand Main Character Energy in 2026',
    excerpt: 'Actionable strategies for standing out in an infinite-scroll ecosystem through distinctive visual systems and un-ignorable brand voice.',
    category: 'DESIGN',
    dotColor: 'bg-violet-500',
    readTime: '4 min read',
    date: 'Oct 12, 2026',
    image: '/assets/blogs/brand-design-blog.jpg',
    link: '/services/brand-design',
  },
  {
    id: 'ui-ux-trends-2026',
    title: 'UI/UX Design Trends That Are Honestly Giving',
    excerpt: 'Ditching generic templates for snappy, tactile micro-interactions, dark aesthetic spatial hierarchies, and high-conversion UX flows.',
    category: 'UI/UX',
    dotColor: 'bg-cyan-500',
    readTime: '5 min read',
    date: 'Sep 28, 2026',
    image: '/assets/blogs/uiux-trends-blog.jpg',
    link: '/services/ui-ux',
  },
  {
    id: 'seo-hacks-organic-growth',
    title: 'SEO Hacks: Ranking on Google Without Selling Your Soul',
    excerpt: 'Modern search optimization strategies that balance technical architecture, high-intent keywords, and engaging brand content.',
    category: 'SEO',
    dotColor: 'bg-lime-500',
    readTime: '6 min read',
    date: 'Sep 21, 2026',
    image: '/assets/blogs/seo-growth-blog.jpg',
    link: '/services/seo',
  },
  {
    id: 'fmcg-packaging-scale',
    title: 'From Concept to 50+ Retail Stores: FMCG Packaging Playbook',
    excerpt: 'How packaging aesthetics and physical shelf presence drive immediate buyer consideration and retailer shelf adoption.',
    category: 'BRANDING',
    dotColor: 'bg-amber-500',
    readTime: '7 min read',
    date: 'Sep 10, 2026',
    image: '/assets/cta-studio.jpg',
    link: '/services/brand-design',
  },
  {
    id: 'social-media-retention',
    title: 'Short-Form Video Mastery: Capturing Infinite Attention',
    excerpt: 'The psychological blueprints behind reels, motion graphics, and content engines that convert passive scrollers into brand advocates.',
    category: 'MARKETING',
    dotColor: 'bg-fuchsia-500',
    readTime: '5 min read',
    date: 'Aug 30, 2026',
    image: '/assets/cta-laptop.jpg',
    link: '/services/social-media',
  },
];

const CATEGORIES = ['ALL', 'DESIGN', 'UI/UX', 'SEO', 'BRANDING', 'MARKETING'];

export default function BlogsPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCat = selectedCat === 'ALL' || article.category === selectedCat;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#111111] pb-24">
      {/* Hero Header */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-black/5">
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-mono tracking-widest text-gray-400 font-bold uppercase block">
            RESOURCES &bull; BIG BRAIN READS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#111111]">
            THINGS YOUR BRAND <br />
            <span className="font-serif italic font-normal text-violet-600">SHOULD KNOW.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-medium max-w-2xl leading-relaxed pt-2">
            Actionable insights, creative frameworks, and battle-tested strategies from our design and marketing team to help you build un-ignorable brands.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-black/5">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-black/5 text-gray-600 hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/10 bg-[#fafafa] text-xs font-medium placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pt-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={article.link}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with Tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10">
                  <span className={`w-2 h-2 rounded-full ${article.dotColor}`} />
                  <span>{article.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col justify-between flex-grow gap-6">
                <div className="space-y-3">
                  <h2 className="text-xl font-black text-black leading-snug tracking-tight group-hover:text-violet-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1.5 font-mono">
                    <span>{article.readTime}</span>
                    <span className="text-gray-300">&bull;</span>
                    <span>{article.date}</span>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 shadow-sm shrink-0">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-violet-500" />
            <p className="text-sm font-bold uppercase tracking-wider">No articles match your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
