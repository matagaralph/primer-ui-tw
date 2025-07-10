import { getCurrentUser } from '@/lib/session';
import AppNavbar from './NavBar';
import { QueryProvider } from './query-provider';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AuthProvider from './session-provider';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) redirect(authOptions.pages?.signIn || '/login');
  return (
    <AuthProvider>
      <AppNavbar />
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
