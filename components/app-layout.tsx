import { getCurrentUser } from '@/lib/session';
import AppNavbar from './NavBar';
import { QueryProvider } from './query-provider';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) redirect(authOptions.pages?.signIn || '/login');
  return (
    <>
      <AppNavbar />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
