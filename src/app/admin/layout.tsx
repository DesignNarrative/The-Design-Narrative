import type { Metadata } from 'next';

// The admin area must never appear in Google.
export const metadata: Metadata = {
  title: 'SEO Admin',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

/**
 * Full-screen layer that sits above the public site's navbar/footer/cursor so the admin
 * has its own clean workspace without touching any public-site file.
 * `data-lenis-prevent` stops the site's smooth-scroll from hijacking scrolling inside it.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100000] overflow-y-auto bg-slate-50 text-slate-900 font-sans"
      style={{ cursor: 'auto' }}
    >
      {children}
    </div>
  );
}
