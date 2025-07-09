import AppNavbar from './NavBar';
import { QueryProvider } from './query-provider';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
