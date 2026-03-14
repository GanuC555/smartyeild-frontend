import AppShellLayout from '@/components/layout/AppShellLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
