import AdminShell from '@/components/admin-seo/AdminShell';

export default function SeoAdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
